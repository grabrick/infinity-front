import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
import m from './LeaderSize.module.scss';

const LeaderSize = ({item}: any) => {
  return (
    <div className={m.container}>
      <ProgressBar min={3} max={40} steps={[3, 10, 15, 20, 30, 40]} />
      <span>Минимальное количество лидеров составляет 3 участника, максимальная 40</span>
    </div>
  )
}

export default LeaderSize;