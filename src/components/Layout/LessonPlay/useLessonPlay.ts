import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useMutation } from "react-query";
import { MyResultsService } from "@/services/myResults/myResults.service";

interface IFolder {
  folderName: string,
  createdIn: string,
  folderID?: string,
}

export const useLessonPlay = (lessonID: string) => {
  const wrapUpLesson = useMutation(
    (data: any) => MyResultsService.wrapUpLesson(lessonID, data), {
      onSuccess: ({ data }: any) => {
        toastSuccess("Результаты об прохождении урока успешно отправлены");
      },
      onError: (error) => {
        toastError("Ошибка в сохранении данных об прохождении урока")
      },
    }
  )

  return {
    wrapUpLesson,
  }
}