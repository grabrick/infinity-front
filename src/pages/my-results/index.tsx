import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import LessonSection from "@/components/Layout/Lesson/Lesson";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";
import { FolderService } from "@/services/folder/folder.service";
import { LessonService } from "@/services/lesson/lesson.service";

export default function MyResults({ getLesson }: any) {    
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="audio-policy" content="grant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        {/* <LessonSection lessonSlug={getLesson} /> */}
        <h1>MyResults</h1>
      </LayoutWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const redirectBasedOnTokenResult = redirectBasedOnToken(context, false);
  if (redirectBasedOnTokenResult?.redirect) {
    return redirectBasedOnTokenResult;
  }

  // try {
  //   const getActiveLesson = await LessonService.getSelectedLesson(context.query.lesson);
  //   return {
  //     props: {
  //       getLesson: getActiveLesson.data
  //     }
  //   };
  // } catch (error) {
  //   return {
  //     notFound: true,
  //     props: {
  //       getLesson: []
  //     }
  //   };
  // }
  return { props: {} }
}