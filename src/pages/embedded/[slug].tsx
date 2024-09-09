import Quiz from '@/components/Modules/GameModule/Games/Quiz/Quiz';
import LessonPlay from '@/components/Layout/LessonPlay/LessonPlay';
import { getEmbeddedLessonById } from '@/utils/helpers/getEmbeddedLessonByID';
import { getSharedLessonById } from '@/utils/helpers/getSharedLessonByID';
import { GetServerSideProps } from 'next';

export default function Embedded({ getLesson }: any) {
  // return <Quiz questions={getLesson.shared.questions} lessonSettings={getLesson.shared.lessonSettings} />;
  return <LessonPlay lessonSlug={getLesson} />
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  
  const { data: getLesson, error } = await getEmbeddedLessonById(context.query.slug, context);
  // const isCheck = checkIsPlaying(getLesson, context);
  // if (!isCheck.props.access) {
  //   return isCheck
  // }
  
  if (error) {
    return {
      notFound: true,
      props: {
        getLesson: [],
      },
    };
  }

  return {
    props: {
      getLesson,
    },
  };

  // return { props: {} }
}