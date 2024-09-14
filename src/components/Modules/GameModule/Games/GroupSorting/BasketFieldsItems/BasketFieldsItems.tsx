import React, { useRef } from 'react';
import m from './BasketFieldsItems.module.scss';
import { useDrag } from 'react-dnd';
import { Field } from '../types/types';

interface BasketFieldsItemsProps {
  items: Field;
  sourceGroupId: number;
  handleMoveToFields: (groupId: number, returnedEl: Field) => void;
}

const BasketFieldsItems: React.FC<BasketFieldsItemsProps> = ({ items, sourceGroupId, handleMoveToFields }) => {
  const draggedRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "basket",
    item: { ...items, sourceGroupId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult === null) {
        handleMoveToFields(sourceGroupId, item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(draggedRef);

  return (
    <div ref={draggedRef} className={`${m.item} ${isDragging ? m.dragging : ''}`}>
      <span className={m.text}>{items.answer}</span>
    </div>
  );
};

export default BasketFieldsItems;