import CheckboxButton from '@/components/UI/CheckboxButton/CheckboxButton';
import m from './SoundSettings.module.scss';
import { useState } from 'react';
import MusicPlayer from './MusicPlayer/MusicPlayer';
import SoundPlayer from './SoundPlayer/SoundPlayer';

const SoundSettings = () => {
  const [isMusic, setIsMusic] = useState(false);
  const [isSound, setIsSound] = useState(false);

  const data = [
    {
      id: 0,
      settingsTitle: "Фоновая музыка",
      isChecked: isMusic,
      onChange: setIsMusic
    },
    {
      id: 1,
      settingsTitle: "Интерактивные звуковые элементы",
      isChecked: isSound,
      onChange: setIsSound,
      options: [
        {
          id: 1,
          title: "Звук клика на элемент"
        },
        {
          id: 2,
          title: "Звук перетаскивания"
        },
        {
          id: 3,
          title: "Звук клика на верный ответ"
        },
        {
          id: 4,
          title: "Звук клика на неверный ответ"
        },
      ]
    },
  ]

  return (
    <div className={m.container}>
      <h1 className={m.sectionTitle}>Параметры музыкального сопровождения</h1>

      <div className={m.content}>
        {data.map((item) => (
          <div className={m.card} key={item.id}>
            <div className={item.isChecked ? m.isActiveHeader : m.header}>
              <h3 className={m.title}>{item.settingsTitle}</h3>
              {(item.isChecked && item.onChange) !== null && (
                <CheckboxButton
                  isChecked={item.isChecked}
                  onChange={item.onChange}
                  title={"Включить"}
                />
              )}
            </div>

            <>
              {(item.settingsTitle === "Фоновая музыка" && item.isChecked) && (
                <MusicPlayer item={item} />
              )}
              {(item.settingsTitle === "Интерактивные звуковые элементы" && item.isChecked) && (
                <SoundPlayer item={item} />
              )}
            </>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoundSettings;