import { useState } from 'react';
import m from './RadioButton.module.scss';

const RadioButton = ({ items, title, isChecked, onChange }: any) => {
  return (
    <div className={m.container}>
      <label className={m.label}>
        <input 
          className={m.input} 
          type='radio'
          checked={isChecked.optionID === items.id}
          onChange={(e) => onChange({ optionID: items.id, isActive: e.target.checked})}
        />
        <span className={`${m.customCheckbox} ${(isChecked.isActive && isChecked?.optionID === items.id) ? m.checked : ''}`}></span>
        <span className={m.title}>{title}</span>
      </label>
    </div>
  )
}

export default RadioButton;