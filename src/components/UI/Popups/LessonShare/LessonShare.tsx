import { motion } from "framer-motion";
import m from "./LessonShare.module.scss";
import { isVisible } from "@/assets/animation/animation";
import { useState } from "react";
import Image from "next/image";
import ClipboardIcon from "@/assets/icons/clipboard-text.svg";
import ClipboardCheckIcon from "@/assets/icons/clipboard-tick.svg";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { useRouter } from "next/router";

const LessonShare = ({ setIsShareOpen, isShareOpen, createShareUrl }: any) => {
  const [isShareConfirmOpen, setIsShareConfirmOpen] = useState(false);
  const fullUrl = `${window.location.protocol}//${window.location.host}/lesson/play/${isShareOpen?.lessonData?._id}`;
  const [isClicked, setIsClicked] = useState(false);
  console.log(isShareOpen?.lessonData?._id);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      const result = await navigator.clipboard.readText();
      if (result) {
        toastSuccess("Адрес был скопирован в буфер обмена");

        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 2000);
      }
    } catch (err) {
      toastError("Не удалось скопировать текст");
    }
  };

  const handleCreateLesson = () => {
    createShareUrl.mutate(
      { data: { lessonData: isShareOpen?.lessonData, sharedPlayUrl: fullUrl } },
      {
        onSuccess: () => {
          setIsShareConfirmOpen(true);
        },
      }
    );
  };

  return (
    <motion.div className={m.overlay} onClick={() => setIsShareOpen(false)}>
      <motion.div
        className={m.modal}
        // ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={isVisible}
      >
        {!isShareConfirmOpen ? (
          <>
            <motion.div className={m.textWrapper}>
              <h1 className={m.title}>Поделиться уроком</h1>
              <span className={m.subTitle}>
                Вы можете делится учебными материалами и ресурсами
              </span>
            </motion.div>
            <motion.div className={m.wrapp}>
              <div className={m.btnContainer}>
                <motion.div
                  className={m.buttonWrapp}
                  whileHover={{ scale: 1.02, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.button
                    className={m.button}
                    initial={{ backgroundColor: "#88a1f3" }}
                    whileHover={{
                      backgroundColor: "#9fb3ff",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    Поделиться страницей
                  </motion.button>
                </motion.div>
                <span>
                  Делает страницу занятий доступной для других пользователей.
                </span>
              </div>
              <div className={m.btnContainer}>
                <motion.div
                  className={m.buttonWrapp}
                  whileHover={{ scale: 1.02, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => handleCreateLesson()}
                >
                  <motion.button
                    className={m.button}
                    initial={{ backgroundColor: "#88a1f3" }}
                    whileHover={{
                      backgroundColor: "#9fb3ff",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    Создать задание
                  </motion.button>
                </motion.div>
                <span>
                  Создает приватную ссылку, не отвлекая внимание. Собирает
                  подробные результаты.
                </span>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div className={m.textWrapper}>
              <h1 className={m.title}>Поделиться уроком</h1>
              <span className={m.subTitle}>
                Финальный этап, поделитесь ссылкой на урок чтобы пользователи
                могли пройти ваш урок.
              </span>
            </motion.div>
            <div className={m.confirm}>
              <motion.div
                className={m.link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className={m.linkText}>{fullUrl}</p>
                <Image
                  className={m.copy}
                  src={isClicked ? ClipboardCheckIcon : ClipboardIcon}
                  alt=""
                  onClick={() => handleClick()}
                />
              </motion.div>
              {/* <div className={m.labelWrapper}>
                <h4 className={m.label}>Или</h4>
                <span className={m.info}>
                  Поделитесь страницей использую код встраивания
                </span>
              </div>
              <div className={m.moreShare}>
                <p>
                  {`
                    <iframe
                      style="max-width:100%"
                      src="https://wordwall.net/ru/embed/e3c433a340634b89bfe26f6fe0843fc9?themeId=54&templateId=5&fontStackId=0"
                      width="500"
                      height="380"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  `}
                </p>
              </div> */}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LessonShare;
