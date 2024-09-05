import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import LessonSection from "@/components/Layout/Lesson/Lesson";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";
import { getLessonById } from "@/utils/helpers/getLessonByID";
import checkIsOpened from "@/utils/guards/checkIsOpened";
import { MyResultsService } from "@/services/myResults/myResults.service";
import { LessonService } from "@/services/lesson/lesson.service";

export default function Lesson({ getLesson, sharedLesson }: any) {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="audio-policy" content="grant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <LessonSection lessonSlug={getLesson} sharedLesson={sharedLesson} />
      </LayoutWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const redirectBasedOnTokenResult = redirectBasedOnToken(context, false);
  if (redirectBasedOnTokenResult?.redirect) {
    return redirectBasedOnTokenResult;
  }

  const { data: getLesson, error } = await getLessonById(context.query.lesson, context);
  const sharedLesson = await LessonService.getPlayingLesson(context.query.lesson);
  const selected = getLesson?.lessonSettings?.privacy?.find(
    (items: any) => items.selected === true
  );

  const isCheck = checkIsOpened(selected, getLesson, context);
  if (!isCheck.props.access) {
    return isCheck
  }

  if (error) {
    return {
      notFound: true,
      props: {
        getLesson: [],
        sharedLesson: []
      },
    };
  }

  return {
    props: {
      getLesson,
      sharedLesson: sharedLesson.data
    },
  };
};
