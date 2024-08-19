import { LessonService } from "@/services/lesson/lesson.service";
import { MyResultsService } from "@/services/myResults/myResults.service";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export const getSharedLessonById = async (
  lessonId: string,
  context: GetServerSidePropsContext
) => {
  const { user } = parseCookies(context);
  const parsedUser = JSON.parse(user);
  
  try {
    const response = await MyResultsService.getSharedLessonResults(lessonId);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "Lesson not found",
    };
  }
};
