import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import m from './Items.module.scss';
import { Field } from '../../types/types';

interface ItemsProps {
  items: Field;
}

const Items: React.FC<ItemsProps> = ({ items }) => {
  const draggedRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "allFields",
    item: { ...items },
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

export default Items;