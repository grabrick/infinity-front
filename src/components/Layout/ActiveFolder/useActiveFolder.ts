import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { setChildFolderData } from "@/redux/slices/folder.slice";
import { setChildLessonData } from "@/redux/slices/lesson.slice";
import { FolderService } from "@/services/folder/folder.service";
import { LessonService } from "@/services/lesson/lesson.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface IFolder {
  folderName: string;
  folderID?: string;
}

export const useActiveFolder = (ownerID: string, folderID: string) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  
  const getChildFolder = useQuery(
    ["getMyChild", folderID],
    () => FolderService.getChild(folderID),
    {
      enabled: !!folderID,
      onSuccess: ({ data }) => {
        // console.log(data);
        dispatch(setChildFolderData(data.folder));
        dispatch(setChildLessonData(data.lesson));
      }
    },
  );

  const createNewFolder = useMutation(
    (data: IFolder) => FolderService.createNewFolder(ownerID, data),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["getMyChild", folderID]);
      },
      onError: (error) => {
        toastError("Ошибка в создании папки");
      },
    }
  );

  const deleteFolder = useMutation(
    (folderIDs: string[] | string) => FolderService.deleteFolder(folderIDs, folderID),
    {
      onSuccess: () => {
        toastSuccess("Вы успешно удалили папку");
        queryClient.invalidateQueries(["getMyChild", folderID]);
      },
      onError: (error) => {
        toastError("Ошибка в удалении папки");
      },
    }
  );

  const deleteLesson = useMutation(
    (lessonID: any) => LessonService.delete(lessonID),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно удалили урок");
        queryClient.invalidateQueries(["getMyChild", folderID]);
      },
      onError: (error) => {
        toastError("Ошибка в удалении урока");
      },
    }
  );

  const changeNameFolder = useMutation(
    (data: { folderID: string; folderName: string }) =>
      FolderService.changeFolderName(data.folderID, data.folderName),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно изменили название папки");
        queryClient.invalidateQueries(["getMyChild", folderID]);
      },
      onError: (error) => {
        toastError("Ошибка в переименовании папки");
      },
    }
  );

  const moveFolders = useMutation(
    (data: { targetID: string; draggedId: string }) =>
      FolderService.moveFolder(data.targetID, data.draggedId),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Папка перемещена");
      },
      onError: (error) => {
        toastError("Ошибка в перемещении папки");
      },
    }
  );

  const moveLessons = useMutation(
    (data: { targetID: string; draggedId: string }) =>
      LessonService.moveLesson(data.targetID, data.draggedId),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Урок перемещен");
      },
      onError: (error) => {
        toastError("Ошибка в перемещении папки");
      },
    }
  );

  const moveBackLesson = useMutation(
    (draggedLessonID: string) =>
      LessonService.moveBackLesson(draggedLessonID, folderID),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Урок перемещен");
      },
      onError: (error) => {
        toastError("Ошибка в перемещении урока");
      },
    }
  );

  const moveBackFolder = useMutation(
    (draggedFolderID: string) =>
      FolderService.moveBackFolder(draggedFolderID, folderID),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Папка перемещена");
      },
      onError: (error) => {
        toastError("Ошибка в перемещении папки");
      },
    }
  );

  return {
    ...getChildFolder,
    createNewFolder,
    deleteFolder,
    deleteLesson,
    changeNameFolder,
    moveFolders,
    moveLessons,
    moveBackLesson,
    moveBackFolder
  };
};
