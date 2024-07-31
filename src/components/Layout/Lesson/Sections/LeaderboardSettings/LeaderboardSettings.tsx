import { motion } from 'framer-motion';
import ClearLeaderboard from './ClearLeaderboard/ClearLeaderboard';
import DuplicateName from './DuplicateName/DuplicateName';
import m from './LeaderboardSettings.module.scss';
import LeaderSize from './LeaderSize/LeaderSize';

const LeaderboardSettings = ({ control, setValue }: any) => {
  const data = [
    {
      id: 0,
      settingsTitle: "Размер количества лидеров",
    },
    {
      id: 1,
      settingsTitle: "Дубликаты имен участников",
      options: [
        {
          id: 1,
          title: "Разрешить дубликаты имен",
        },
        {
          id: 2,
          title: "Только лучший результат среди имен",
        },
      ],
    },
    {
      id: 2,
      settingsTitle: "Очистка таблицы лидеров",
      options: [
        {
          id: 1,
          title: "Никогда",
        },
        {
          id: 2,
          title: "24 часа",
        },
        {
          id: 3,
          title: "1 неделя",
        },
        {
          id: 4,
          title: "1 месяц",
        },
        {
          id: 5,
          title: "1 год",
        }
      ],
    },
  ]

  return (
    <motion.div 
      className={m.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={m.sectionTitle}>Параметры таблицы лидеров</h1>

      <div className={m.content}>
        {data.map((item) => (
          <div className={m.card} key={item.id}>
            <div className={m.isActiveHeader}>
              <h3 className={m.title}>{item.settingsTitle}</h3>
            </div>

            <>
              {item.settingsTitle === "Размер количества лидеров" && (
                <LeaderSize item={item} control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Дубликаты имен участников" && (
                <DuplicateName item={item} control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Очистка таблицы лидеров" && (
                <ClearLeaderboard item={item} control={control} setValue={setValue} />
              )}
            </>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default LeaderboardSettings;