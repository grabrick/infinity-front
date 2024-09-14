import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Group from './Group/Group';
import m from './GroupSorting.module.scss';
import AllFieldsItems from './AllFieldsItems/AllFieldsItems';
import { Field, Question } from './types/types';

interface GroupSortingProps {
  questions: Question[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const GroupSorting: React.FC<GroupSortingProps> = ({ questions, currentTime, isPlayingUser, setIsPlayingUser, setIsEnd }) => {
  const [allFields, setAllFields] = useState<Field[]>([]);
  const [groupBasketItems, setGroupBasketItems] = useState<Record<number, Field[]>>({});

  useEffect(() => {
    const fields = questions.flatMap((q) => q.fields);
    setAllFields(fields);
    
    const initialGroupBaskets = questions.reduce<Record<number, Field[]>>((acc, question) => {
      acc[question.id] = [];
      return acc;
    }, {});
    setGroupBasketItems(initialGroupBaskets);
  }, [questions]);

  const handleMoveToBasket = (groupId: number, draggedEl: Field) => {
    setAllFields((prev) => prev.filter((item) => !(item.id === draggedEl.id && item.linkGroupID === draggedEl.linkGroupID)));
    setGroupBasketItems((prev) => ({
      ...prev,
      [groupId]: [...prev[groupId], draggedEl],
    }));
  };

  const handleMoveToFields = (groupId: number, returnedEl: Field) => {
    setGroupBasketItems((prev) => ({
      ...prev,
      [groupId]: prev[groupId].filter((item) => !(item.id === returnedEl.id && item.linkGroupID === returnedEl.linkGroupID)),
    }));
    setAllFields((prev) => [...prev, returnedEl]);
  };
  
  const handleSubmitResults = () => {
    let correctCount = 0;

    Object.entries(groupBasketItems).forEach(([groupId, basketItems]) => {
      const question = questions.find(q => q.id === parseInt(groupId));
      
      if (question) {
        basketItems.forEach((basketItem) => {
          const correspondingField = question.fields.find(
            (field) => field.id === basketItem.id && field.linkGroupID === basketItem.linkGroupID
          );
  
          if (correspondingField) {
            correctCount += 1;
          }
        });
      }
    });
  
    setIsEnd(true);
    setIsPlayingUser({
      ...isPlayingUser,
      correct: correctCount,
      incorrect: 0,
      currentTime: currentTime,
      selectedAnswers: [],
    });
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={m.container}>
        <AllFieldsItems
          allFields={allFields}
          handleMoveToFields={handleMoveToFields}
        />
        <div className={m.groups}>
          {questions.map((q) => (
            <Group
              key={q.id}
              items={q}
              basketItems={groupBasketItems[q.id]}
              handleMoveToBasket={handleMoveToBasket}
              handleMoveToFields={handleMoveToFields}
            />
          ))}
        </div>
        <div className={m.buttons}>
          <button className={m.button} onClick={() => handleSubmitResults()}>
            Отправить результаты
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default GroupSorting;