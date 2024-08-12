import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";
import MyResultsSection from  "@/components/Layout/MyResults/MyResults";
import { getLessonById } from "@/utils/helpers/getLessonByID";
import LessonResult from "@/components/Layout/LessonResult/LessonResult";

export default function Shared({ getLesson }: any) {    
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="audio-policy" content="grant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <LessonResult />
      </LayoutWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const redirectBasedOnTokenResult = redirectBasedOnToken(context, false);
  if (redirectBasedOnTokenResult?.redirect) {
    return redirectBasedOnTokenResult;
  }

  // const { data: getLesson, error } = await getLessonById(context.query.play, context);
  // const isCheck = checkIsPlaying(getLesson, context);
  // if (!isCheck.props.access) {
  //   return isCheck
  // }

  // if (error) {
  //   return {
  //     notFound: true,
  //     props: {
  //       getLesson: [],
  //     },
  //   };
  // }

  // return {
  //   props: {
  //     getLesson,
  //   },
  // };

  return { props: {} }
}