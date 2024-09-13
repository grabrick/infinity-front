import { useRef } from 'react';
import m from './AllFieldsItems.module.scss';
import { useDrag, useDrop } from 'react-dnd';
import Items from './Items/Items';

const AllFieldsItems = ({ allFields, handleMoveToAllFields, handleMoveToBasket }: any) => {
  const allFieldsRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: "basket",
    drop: (draggedItem: any) => {
      handleMoveToAllFields(draggedItem);
    },
  }));
  drop(allFieldsRef)

  return (
    <div 
      className={m.itemsSection} 
      ref={allFieldsRef}
      style={{ maxWidth: allFields?.length === 0 ? '200px' : 'fit-content' }}
    >
      {allFields?.map((item: any) => (
        <Items
          key={item.id}
          items={item}
          allFieldsRef={allFieldsRef}
          handleMoveToAllFields={handleMoveToAllFields}
          handleMoveToBasket={handleMoveToBasket}
        />
      ))}
    </div>
  );
};

export default AllFieldsItems;
