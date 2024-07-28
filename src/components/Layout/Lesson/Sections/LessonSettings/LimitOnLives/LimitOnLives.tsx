import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
import m from './LimitOnLives.module.scss';

const LimitOnLives = () => {
  return (
    <div className={m.container}>
      <ProgressBar min={1} max={10} steps={[3, 10]} />
      <span>Минимальное количество жизней составляет 1, максимальное 10</span>
    </div>
  )
}

export default LimitOnLives;