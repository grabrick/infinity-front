import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import m from './AllFieldsItems.module.scss';
import Items from './Items/Items';
import { Field } from '../types/types';

interface AllFieldsItemsProps {
  allFields: Field[];
  handleMoveToFields: (groupId: number, returnedEl: Field) => void;
}

const AllFieldsItems: React.FC<AllFieldsItemsProps> = ({ allFields, handleMoveToFields }) => {
  const allFieldsRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "basket",
    drop: (draggedItem: Field & { sourceGroupId: number }) => {
      handleMoveToFields(draggedItem.sourceGroupId, draggedItem);
    },
  }));

  drop(allFieldsRef);

  return (
    <div
      className={m.itemsSection}
      ref={allFieldsRef}
    >
      {allFields.map((item) => (
        <Items
          key={`${item.answer}-${item.linkGroupID}`}
          items={item}
        />
      ))}
    </div>
  );
};

export default AllFieldsItems;
