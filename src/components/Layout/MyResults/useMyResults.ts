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

export const useMyResults = (ownerID: string) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const getMyActivity = useQuery(['getMyResults', ownerID], () => MyResultsService.getResults(ownerID), {
    enabled: !!ownerID,

    onSuccess: ({data}) => {
      dispatch(setFolderData(data.folder));
      dispatch(setLessonData(data.sharedLesson));
    },
    onError: (error) => {}
  })

  const deleteFolder = useMutation(
    (foldersID: any) => FolderService.deleteFolder(foldersID, null), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно удалили папку");
        queryClient.invalidateQueries(['getMyResults', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в удалении папки")
      },
    }
  )

  const createNewFolder = useMutation(
    (data: IFolder) => FolderService.createNewFolder(ownerID, data), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно создали папку");
        queryClient.invalidateQueries(['getMyResults', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в создании папки")
      },
    }
  )

  const deleteLesson = useMutation(
    (lessonID: any) => LessonService.delete(lessonID), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно удалили урок");
        queryClient.invalidateQueries(['getMyResults', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в удалении урока")
      },
    }
  )

  const changeNameFolder = useMutation(
    (data: { folderID: string, folderName: string }) => FolderService.changeFolderName(data.folderID, data.folderName), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно изменили название папки");
        queryClient.invalidateQueries(['getMyResults', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в переименовании папки")
      },
    }
  )

  const moveFolders = useMutation(
    (data: { targetID: string, draggedId: string }) => FolderService.moveFolder(data.targetID, data.draggedId), {
      onSuccess: ({ data }) => {
        toastSuccess("Папка перемещена");
      },
      onError: (error) => {
        toastError("Ошибка в переименовании папки")
      },
    }
  )

  const moveLessons = useMutation(
    (data: { targetID: string, draggedId: string }) => LessonService.moveLesson(data.targetID, data.draggedId), {
      onSuccess: ({ data }) => {
        toastSuccess("Урок перемещен");
      },
      onError: (error) => {
        toastError("Ошибка в переименовании урока")
      },
    }
  )

  return {
    ...getMyActivity,
    createNewFolder,
    deleteFolder,
    deleteLesson,
    changeNameFolder,
    moveFolders,
    moveLessons,
  }
}