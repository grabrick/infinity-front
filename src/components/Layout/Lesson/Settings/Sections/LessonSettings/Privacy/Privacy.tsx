import m from "./Privacy.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import Image from "next/image";
import ClipboardIcon from "@/assets/icons/clipboard-text.svg";
import ClipboardCheckIcon from "@/assets/icons/clipboard-tick.svg";
import { useRouter } from "next/router";
import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { AnimatePresence, motion } from "framer-motion";

const Privacy = ({ item, control, setValue, symbolFormState }: any) => {
  const { asPath } = useRouter();
  const fullUrl = `${window.location.protocol}//${window.location.host}${asPath}`;
  const [isClicked, setIsClicked] = useState(false);

  const [privacy, setprivacy] = useState(
    item?.options?.map((option: any) => ({
      id: option.id,
      title: option.title,
      selected: option.id === 2,
    }))
  );
  const findOpened = privacy.find((item: any) => item.id === 1);

  useEffect(() => {
    if (symbolFormState) {
      setValue("lessonSettings.privacy", symbolFormState);
      setprivacy(symbolFormState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolFormState]);

  const handleRadioButtonChange = (id: any) => {
    const updatedSymbols = privacy.map((option: any) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setprivacy(updatedSymbols);
    setValue("lessonSettings.privacy", updatedSymbols);
  };

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

  return (
    <div className={m.container}>
      <div className={m.RadioButtonWrapper}>
        {privacy.map((el: any) => (
          <Controller
            key={el.id}
            name={`lessonSettings.privacy[${el.id - 1}].selected`}
            control={control}
            render={({ field }) => (
              <RadioButton
                key={el.id}
                items={el}
                title={el.title}
                isChecked={el.selected}
                onChange={() => {
                  handleRadioButtonChange(el.id);
                }}
              />
            )}
          />
        ))}
      </div>
      <AnimatePresence>
        <div className={m.linkWrapper}>
          {findOpened?.title === "Открытый доступ к уроку" &&
          findOpened?.selected === true ? (
            <>
              <span className={m.title}>Ссылка для доступа к уроку</span>
              <motion.div 
                className={m.link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                key={findOpened?.selected}
              >
                <p className={m.linkText}>{fullUrl}</p>
                <Image
                  className={m.copy}
                  src={isClicked ? ClipboardCheckIcon : ClipboardIcon}
                  alt=""
                  onClick={() => handleClick()}
                />
              </motion.div>
            </>
          ) : (
            <>
              <span className={m.title}>Ссылка для доступа к уроку</span>
              <motion.div
                className={m.warningWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                key={findOpened?.selected}
              >
                <p className={m.warning}>
                  Вы закрыли доступ к просмотру урока, зашедший пользователь не
                  сможет просматривать контент урока.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Privacy;
