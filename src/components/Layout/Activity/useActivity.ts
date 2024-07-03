import { toastError } from "@/components/UI/Toast/Toast";
import { FolderService } from "@/services/folder/folder.service";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface IFolder {
  folderName: string,
  folderID?: string,
}

export const useActivity = (ownerID: string) => {
  const queryClient = useQueryClient();

  const getMyActivity = useQuery(['getMyActivity', ownerID], () => UserService.getActivity(ownerID), {
    enabled: !!ownerID,

    onSuccess: ({data}) => {},
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
    (foldersID: any) => FolderService.deleteFolder(foldersID), {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(['getMyActivity', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в удалении папки")
      },
    }
  )

  return {
    ...getMyActivity,
    createNewFolder,
    deleteFolder
  }
}