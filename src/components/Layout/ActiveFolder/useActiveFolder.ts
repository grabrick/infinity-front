import { toastError } from "@/components/UI/Toast/Toast";
import { FolderService } from "@/services/folder/folder.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface IFolder {
  folderName: string,
  folderID?: string,
}

export const useActiveFolder = (ownerID: string, folderID: string) => {
  const queryClient = useQueryClient();

  const getChildFolder = useQuery(['getMyActivity', folderID], () => FolderService.getChildFolder(folderID), {
    enabled: !!folderID,
  });

  const createNewFolder = useMutation(
    (data: IFolder) => FolderService.createNewFolder(ownerID, data), {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['getMyActivity', folderID]); // Инвалидация запроса при успешном создании папки
      },
      onError: (error) => {
        toastError("Ошибка в создании папки");
      },
    }
  );

  const deleteFolder = useMutation(
    (folderIDs: string[]) => FolderService.deleteFolder(folderIDs), {
      onSuccess: () => {
        queryClient.invalidateQueries(['getMyActivity', folderID]); // Инвалидация запроса при успешном удалении папки
      },
      onError: (error) => {
        toastError("Ошибка в удалении папки");
      },
    }
  );

  return {
    ...getChildFolder,
    createNewFolder,
    deleteFolder
  }
}
