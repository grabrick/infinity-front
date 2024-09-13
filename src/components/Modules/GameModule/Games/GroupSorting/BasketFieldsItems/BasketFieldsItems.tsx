import { useRef } from 'react';
import m from './BasketFieldsItems.module.scss';
import { useDrag } from 'react-dnd';

const BasketFieldsItems = ({ items, handleMoveToAllFields, handleMoveToBasket }: any) => {
  const draggedRef = useRef<any>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "basket",
    item: { id: items?.id, answer: items.answer, linkGroupID: items.linkGroupID },
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
