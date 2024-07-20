import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { FolderService } from "@/services/folder/folder.service";
import { LessonService } from "@/services/lesson/lesson.service";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { setFolderData } from "@/redux/slices/folder.slice";
import { setLessonData } from "@/redux/slices/lesson.slice";

interface IFolder {
  folderName: string,
  folderID?: string,
}

export const useActivity = (ownerID: string) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const getMyActivity = useQuery(['getMyActivity', ownerID], () => UserService.getActivity(ownerID), {
    enabled: !!ownerID,

    onSuccess: ({data}) => {
      dispatch(setFolderData(data.folder));
      dispatch(setLessonData(data.lesson));
    },
    onError: (error) => {}
  })

  const createNewFolder = useMutation(
    (data: IFolder) => FolderService.createNewFolder(ownerID, data), {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['getMyActivity', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в создании папки")
      },
    }
  )

  const deleteFolder = useMutation(
    (foldersID: any) => FolderService.deleteFolder(foldersID, null), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно удалили папку");
        queryClient.invalidateQueries(['getMyActivity', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в удалении папки")
      },
    }
  )

  const deleteLesson = useMutation(
    (lessonID: any) => LessonService.delete(lessonID), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно удалили урок");
        queryClient.invalidateQueries(['getMyActivity', ownerID]);
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
        queryClient.invalidateQueries(['getMyActivity', ownerID]);
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
    moveLessons
  }
}