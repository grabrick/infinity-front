import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import m from './Items.module.scss';

const Items = ({ items, allFieldsRef, handleMoveToAllFields }: any) => {
  const draggedRef = useRef<any>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "allFields",
    item: { id: items?.id, answer: items.answer, linkGroupID: items.linkGroupID },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  drag(draggedRef)

  return (
    <div ref={draggedRef} className={`${m.item} ${isDragging ? m.dragging : ''}`}>
      <span className={m.text}>{items.answer}</span>
    </div>
  )
}

export default Items;