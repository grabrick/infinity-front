import { motion } from "framer-motion";
import m from "./MusicPlayer.module.scss";
import { useEffect, useState } from "react";
import Player from "../SoundPlayer/Player/Player";
import { Controller } from "react-hook-form";

const MusicPlayer = ({
  control,
  setValue,
  uploadAudioFile,
  deleteUploadAudioFile,
  formState,
  lessonSlug,
}: any) => {
  const [isFile, setIsFile] = useState<any>(null);

  const handleDeleteFile = () => {
    deleteUploadAudioFile.mutate({ file: isFile });
    setIsFile(null)
  }
  
  useEffect(() => {
    if (formState !== null || undefined) {
      setValue("lessonSettings.soundboard.music", formState)
      setIsFile(formState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

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

  // useEffect(() => {
  //   if (formState?.music !== null) {
  //     saveLessonMusic.mutate(formState?.music)
  //   }
  // }, [formState?.music])

  return (
    <div className={m.container}>
      <Controller
        name="lessonSettings.soundboard.music"
        control={control}
        render={({ field }) => (
          <>
            {isFile === null || undefined ? (
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
                  onChange={(event) => {
                    handleFileChange(event);
                  }}
                />
              </div>
            ) : (
              <>
                <div className={m.soundBoard}>
                  <h3 className={m.soundName}>{isFile?.file?.originalName}</h3>
                  <Player
                    file={isFile}
                    progressTextColor={"rgba(0, 0, 0, 0.6)"}
                    controlTextColor={"#94acff"}
                  />
                </div>
                <motion.button
                  className={m.delete}
                  type="button"
                  onClick={() => handleDeleteFile()}
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
  );
};

export default MusicPlayer;
