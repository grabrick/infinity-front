import { motion } from "framer-motion";
import m from "./SoundPlayer.module.scss";
import { useEffect, useState } from "react";
import Player from "./Player/Player";
import { Controller } from "react-hook-form";
import Image from "next/image";
import TrashCan from '@/assets/icons/trash-can.svg';
import Upload from '@/assets/icons/upload.svg';

const SoundPlayer = ({
  item,
  control,
  setValue,
  formState,
  uploadSoundsFile,
  deleteUploadSoundFile,
  lessonSlug,
  userData,
}: any) => {
  const [openIds, setOpenIds] = useState<any>([]);

  useEffect(() => {
    if (formState.length !== 0) {
      setValue("lessonSettings.soundboard.sounds", formState);
      setOpenIds(formState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (id: any, fileUrl: any, file: any, name: any) => {
    setOpenIds((prevIds: any) => {
      const existingIndex = prevIds.findIndex(
        (openId: any) => openId.id === id
      );
      const newSound = {
        id: id,
        name: name,
        audioFile: {
          file: {
            fileName: file.filename,
            size: file.size,
            originalName: file.originalname,
            mimeType: file.mimetype,
          },
          fileUrl: fileUrl,
        },
      };

      if (existingIndex >= 0) {
        const newIds = [...prevIds];
        newIds[existingIndex] = newSound;
        return newIds;
      } else {
        const newIds = [...prevIds, newSound];
        setValue("lessonSettings.soundboard.sounds", newIds);
        return newIds;
      }
    });
  };

  const handleFileChange = (event: any, id: any, name: any) => {
    const file = event.target.files[0];
    if (file) {
      uploadSoundsFile.mutate(
        { file, sectionData: { id: id, name: name } },
        {
          onSuccess: ({ data }: any) => {
            handleOpen(
              Number(data.data.data.id),
              data.file.path,
              data.file,
              data.data.data.name
            );
          },
        }
      );
    }
  };

  const handleDelete = (id: any, fileName: any) => {
    deleteUploadSoundFile.mutate(fileName, {
      onSuccess: () => {
        setOpenIds((prevIds: any) => {
          const updatedIds = prevIds.filter((openId: any) => openId.id !== id);
          return updatedIds;
        });
        setValue("lessonSettings.soundboard.sounds", openIds);
      },
    });
  };

  let isOpen = (id: any) => openIds?.some((openId: any) => openId.id === id);

  const getFileById = (id: any) => {
    const openItem = openIds.find((openId: any) => openId.id === id);
    return openItem;
    // return openItem ? { audioFile: { file: openItem.file, fileUrl: openItem.fileUrl } } : null;
  };

  return (
    <div className={m.container}>
      {item.options.map((el: any) => (
        <div className={m.card} key={el.id}>
          <h1 className={m.title}>{el.title}</h1>
          <Controller
            name="lessonSettings.soundboard.sounds"
            control={control}
            render={({ field }) => (
              <>
                {!isOpen(el.id) ? (
                  <div className={m.loadContainer}>
                    {lessonSlug.ownerID === userData?._id && (
                      <>
                        <motion.button className={m.load} type="button">
                          <Image src={Upload} alt="" />
                          Загрузить звук
                        </motion.button>
                        <input
                          type="file"
                          accept="audio/*"
                          className={m.fileInput}
                          onChange={(event) =>
                            handleFileChange(event, el.id, el.title)
                          }
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={m.soundBoard}>
                      <h3 className={m.soundName}>
                        {getFileById(el.id)?.audioFile?.file?.originalName}
                      </h3>
                      <Player
                        file={getFileById(el.id)?.audioFile}
                        progressTextColor={"rgba(255, 255, 255, 0.7)"}
                        controlTextColor={"#7a90da"}
                      />
                    </div>
                    {lessonSlug.ownerID === userData?._id && (
                      <motion.button
                        className={m.delete}
                        type="button"
                        onClick={() =>
                          handleDelete(
                            el.id,
                            getFileById(el.id)?.audioFile?.file?.fileName
                          )
                        }
                      >
                        <Image src={TrashCan} alt="" />
                        Удалить звук
                      </motion.button>
                    )}
                  </>
                )}
              </>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default SoundPlayer;
