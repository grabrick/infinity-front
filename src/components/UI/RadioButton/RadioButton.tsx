import m from './RadioButton.module.scss';

const RadioButton = ({ items, title, isChecked, onChange }: any) => {
  return (
    <div className={m.container}>
      <label className={m.label}>
        <input 
          className={m.input} 
          type='radio'
          checked={isChecked}
          onChange={(e) => onChange({ optionID: items?.id, isActive: e.target.checked, name: title})}
        />
        <span className={`${m.customCheckbox} ${isChecked ? m.checked : ''}`}></span>
        <span className={m.title}>{title}</span>
      </label>
    </div>
  )
}

export default RadioButton;