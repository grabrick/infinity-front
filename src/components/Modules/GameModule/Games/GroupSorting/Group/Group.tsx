import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import m from './Group.module.scss';
import BasketFieldsItems from '../BasketFieldsItems/BasketFieldsItems';
import { Field, Question } from '../types/types';

interface GroupProps {
  items: Question;
  basketItems: Field[];
  handleMoveToBasket: (groupId: number, draggedEl: Field) => void;
  handleMoveToFields: (groupId: number, returnedEl: Field) => void;
}

const Group: React.FC<GroupProps> = ({ items, basketItems, handleMoveToBasket, handleMoveToFields }) => {
  const basketRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "allFields",
    drop: (draggedItem: Field) => {
      handleMoveToBasket(items.id, draggedItem);
      return { groupId: items.id };
    },
  }));

  drop(basketRef);

  return (
    <div className={m.container}>
      <h2 className={m.title}>{items.groupName}</h2>
      <div className={m.basket} ref={basketRef}>
        {basketItems?.map((el) => (
          <BasketFieldsItems
            key={`${el.id}-${el.linkGroupID}`}
            items={el}
            sourceGroupId={items.id}
            handleMoveToFields={handleMoveToFields}
          />
        ))}
      </div>
    </div>
  );
};

export default Group;