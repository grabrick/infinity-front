import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const checkIsPlaying = (lessonData: any, context: GetServerSidePropsContext) => {
  const { user } = parseCookies(context);
  const parsedUser = JSON.parse(user)
  if (lessonData?.sharedPlayUrl === null) {
    return {
      props: {
        access: false,
        message: "Доступ к материалам урока закрыт",
        getLesson: [],
      },
      notFound: true,
    };
  } else {
    return {
      props: {
        access: true,
        message: null,
        getLesson: lessonData,
      },
    };
  }
}

export default checkIsPlaying;