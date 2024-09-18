import { motion } from "framer-motion";
import m from "./MusicPlayer.module.scss";
import { useEffect, useState } from "react";
import Player from "../SoundPlayer/Player/Player";
import { Controller } from "react-hook-form";
import Image from "next/image";
import TrashCan from '@/assets/icons/trash-can.svg';
import Upload from '@/assets/icons/upload.svg';

const MusicPlayer = ({
  control,
  setValue,
  uploadAudioFile,
  deleteUploadMusicFile,
  formState,
  lessonSlug,
  userData,
}: any) => {
  const [isFile, setIsFile] = useState<any>(null);

  const handleDeleteFile = () => {
    deleteUploadMusicFile.mutate(isFile?.file?.fileName);
    setValue("lessonSettings.soundboard.music", null);
    setIsFile(null);
  };

  useEffect(() => {
    if (formState !== null || undefined) {
      setValue("lessonSettings.soundboard.music", formState);
      setIsFile(formState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      uploadAudioFile.mutate(file, {
        onSuccess: ({ data }: any) => {
          setValue("lessonSettings.soundboard.music", {
            file: {
              fileName: data.filename,
              size: data.size,
              originalName: data.originalname,
              mimeType: data.mimetype,
            },
            fileUrl: data.path,
          });
          setIsFile({
            fileUrl: data.path,
            file: {
              fileName: data.filename,
              size: data.size,
              originalName: data.originalname,
              mimeType: data.mimetype,
            },
          });
        },
      });
    }
  };
  
  return (
    <div className={m.container}>
      <Controller
        name="lessonSettings.soundboard.music"
        control={control}
        render={({ field }) => (
          <>
            {isFile === null || undefined ? (
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
                      onChange={(event) => {
                        handleFileChange(event);
                      }}
                    />
                  </>
                )}
              </div>
            ) : (
              <>
                <div className={m.soundBoard} style={{ borderBottom: lessonSlug.ownerID === userData?._id ? "2px solid #d8e9fe" : "none" }}>
                  <h3 className={m.soundName}>{isFile?.file?.originalName}</h3>
                  <Player
                    file={isFile}
                    progressTextColor={"rgba(0, 0, 0, 0.6)"}
                    controlTextColor={"#94acff"}
                  />
                </div>
                {lessonSlug.ownerID === userData?._id && (
                  <motion.button
                    className={m.delete}
                    type="button"
                    onClick={() => handleDeleteFile()}
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
  );
};

export default MusicPlayer;
