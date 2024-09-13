import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import m from './Group.module.scss';
import BasketFieldsItems from '../BasketFieldsItems/BasketFieldsItems';

const Group = ({ items, basketItems, handleMoveToBasket, handleMoveToFields }: any) => {
  const basketRef = useRef(null);
  
  const [, drop] = useDrop(() => ({
    accept: "allFields",
    drop: (draggedItem: any) => {
      if (basketItems.find((el: any) => el.id === draggedItem.id)) {
        handleMoveToFields(draggedItem);
      } else {
        handleMoveToBasket(draggedItem);
      }
    },
  }));

  drop(basketRef);

  return (
    <div className={m.container}>
      <h2 className={m.title}>{items.groupName}</h2>
      <div className={m.basket} ref={basketRef}>
        {basketItems.map((el: any) => (
          <BasketFieldsItems
            key={el.id}
            items={el}
            handleMoveToAllFields={handleMoveToFields}
            handleMoveToBasket={handleMoveToBasket}
          />
        ))}
      </div>
    </div>
  );
};

export default Group;
