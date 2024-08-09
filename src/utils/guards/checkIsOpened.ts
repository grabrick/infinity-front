import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const checkIsOpened = (selected: any, lessonData: any, context: GetServerSidePropsContext) => {
  const { user } = parseCookies(context);
  const parsedUser = JSON.parse(user)
  
  if ((selected?.title === "Закрытый доступ к уроку" && selected?.selected === true) && lessonData?.ownerID !== parsedUser?._id) {
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
};

export default checkIsOpened;
