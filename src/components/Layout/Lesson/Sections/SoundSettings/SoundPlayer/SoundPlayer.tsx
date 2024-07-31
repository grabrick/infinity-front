import { motion } from "framer-motion";
import m from "./SoundPlayer.module.scss";
import { useState } from "react";
import Player from "./Player/Player";
import { Controller } from "react-hook-form";

const SoundPlayer = ({ item, control, setValue }: any) => {
  const [openIds, setOpenIds] = useState<any>([]);

  const handleOpen = (id: any, fileUrl: any, file: any, name: any) => {
    setOpenIds((prevIds: any) => {
      const existingIndex = prevIds?.findIndex(
        (openId: any) => openId.id === id
      );
      if (existingIndex >= 0) {
        const newIds = [...prevIds];
        newIds[existingIndex] = { id, name, audioFile: { fileUrl, file } };
        return newIds;
      }
      setValue("lessonSettings.soundboard.sounds", [
        ...prevIds,
        { id, name, audioFile: { fileUrl, file } },
      ]);
      return [...prevIds, { id, name, audioFile: { fileUrl, file } }];
    });
  };

  const handleFileChange = (event: any, id: any, name: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl: any = URL.createObjectURL(file);
      handleOpen(id, fileUrl, file, name);
    }
  };

  const handleDelete = (id: any) => {
    setOpenIds((prevIds: any) => {
      const updatedIds = prevIds.filter((openId: any) => openId.id !== id);
      setValue("lessonSettings.soundboard.sounds", updatedIds.length === 0 ? null : updatedIds);
      return updatedIds;
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
                    <motion.button className={m.load} type="button">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                          stroke="#D8E9FE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g opacity="0.4">
                          <path
                            d="M9 11.51L12 14.51L15 11.51"
                            stroke="#D8E9FE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 14.51V6.51001"
                            stroke="#D8E9FE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 16.51C9.89 17.81 14.11 17.81 18 16.51"
                            stroke="#D8E9FE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
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
                  </div>
                ) : (
                  <>
                    <div className={m.soundBoard}>
                      <h3 className={m.soundName}>
                        {getFileById(el.id)?.audioFile?.file?.name}
                      </h3>
                      <Player
                        file={getFileById(el.id)?.audioFile}
                        progressTextColor={"rgba(255, 255, 255, 0.7)"}
                        controlTextColor={"#7a90da"}
                      />
                    </div>

                    <motion.button
                      className={m.delete}
                      type="button"
                      onClick={() => handleDelete(el.id)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                          stroke="#D8E9FE"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          opacity="0.34"
                          d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                          stroke="#D8E9FE"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                          stroke="#D8E9FE"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          opacity="0.34"
                          d="M10.33 16.5H13.66"
                          stroke="#D8E9FE"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          opacity="0.34"
                          d="M9.5 12.5H14.5"
                          stroke="#D8E9FE"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Удалить звук
                    </motion.button>
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
