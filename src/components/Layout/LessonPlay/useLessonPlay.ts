import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { setFolderData } from "@/redux/slices/myResultsFolders.slice";
import { setLessonData } from "@/redux/slices/myResultsLesson.slice";
import { MyResultsService } from "@/services/myResults/myResults.service";
import { FolderService } from "@/services/folder/folder.service";
import { LessonService } from "@/services/lesson/lesson.service";

interface IFolder {
  folderName: string,
  createdIn: string,
  folderID?: string,
}

export const useLessonPlay = (lessonID: string) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // const getMyActivity = useQuery(['getMyResults', ownerID], () => MyResultsService.getResults(ownerID), {
  //   enabled: !!ownerID,

  //   onSuccess: ({data}) => {
  //     dispatch(setFolderData(data.folder));
  //     dispatch(setLessonData(data.sharedLesson));
  //   },
  //   onError: (error) => {}
  // })

  const addedName = useMutation(
    (data: { userName: string, userID: string }) => MyResultsService.addedName(lessonID, data), {
      onSuccess: ({ data }: any) => {
        toastSuccess("Результаты об прохождении урока успешно отправлены");
      },
      onError: (error) => {
        toastError("Ошибка в сохранении данных об прохождении урока")
      },
    }
  )

  return {
    addedName,
  }
}