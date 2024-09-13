import { DndProvider, useDrop } from 'react-dnd';
import { useEffect, useRef, useState } from 'react';
import Group from './Group/Group';
import m from './GroupSorting.module.scss';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AllFieldsItems from './AllFieldsItems/AllFieldsItems';

const GroupSorting = ({ questions, setIsEnd }: any) => {
  const [allFields, setAllFields] = useState<any[]>([]);
  const [basketItems, setBasketItems] = useState<any[]>([]);

  useEffect(() => {
    const fields = questions.flatMap((q: any) => q.fields);
    setAllFields(fields);
  }, [questions]);

  const handleMoveToBasket = (draggedEl: any) => {
    setAllFields((prevFields) =>
      prevFields.filter((item) => item?.id !== draggedEl.id)
    );
    setBasketItems((prevBasket) => [...prevBasket, draggedEl]);
  };

  const handleMoveToFields = (returnedEl: any) => {
    setBasketItems((prevBasket) =>
      prevBasket.filter((item) => item?.id !== returnedEl.id)
    );
    
    setAllFields((prevFields) => {
      const isElementAlreadyInAllFields = prevFields.some(item => item.id === returnedEl.id);
      if (!isElementAlreadyInAllFields) {
        return [...prevFields, returnedEl];
      }
      return prevFields;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={m.container}>
        <AllFieldsItems
          allFields={allFields}
          handleMoveToAllFields={handleMoveToFields}
          handleMoveToBasket={handleMoveToBasket}
        />
        <div className={m.groups}>
          {questions.map((q: any) => (
            <Group
              key={q.id}
              items={q}
              basketItems={basketItems}
              handleMoveToBasket={handleMoveToBasket}
              handleMoveToFields={handleMoveToFields}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default GroupSorting;
