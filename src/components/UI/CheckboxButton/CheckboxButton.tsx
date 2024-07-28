import m from './CheckboxButton.module.scss';

const CheckboxButton = ({ item, title, isChecked, onChange }: any) => {
  
  return (
    <div className={m.container}>
      <label className={m.label}>
        <input 
          className={m.input} 
          type='checkbox'
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={`${m.customCheckbox} ${isChecked ? m.checked : ''}`}></span>
        <span className={m.title}>{title}</span>
      </label>
    </div>
  )
}

export default CheckboxButton;
