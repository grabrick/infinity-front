import { getFoldersUrl } from "@/api/api.config"
import instance, { axiosClassic } from "@/api/interceptor"

export const FolderService = {
  async getActiveFolder(_id: string) {
    const response = await axiosClassic.get(
      getFoldersUrl(`/${_id}`),
    )

    return response;
  },

  async getChild(_id: string) {
    const response = await axiosClassic.get(
      getFoldersUrl(`/${_id}/children`),
    )

    return response;
  },

  async changeFolderName(id: string, folderName: string) { 
    const response = await axiosClassic.patch(
      getFoldersUrl(`/${id}/rename`),
      {
        folderName: folderName,
      }
    )

    return response;
  },

  async createNewFolder(_id: string, data: any) {
    // console.log({ _id: _id, data: data });
    const response = await axiosClassic.post(
      getFoldersUrl(`/create`),
      {
        ownerID: _id,
        folderName: data.folderName,
        createdIn: data.createdIn,
        folderID: data.folderID ?? null
      }
    )

    return response;
  },

  async deleteFolder(foldersIDs: any, folderID: string | null) {
    const response = await axiosClassic.put(
      getFoldersUrl(`/delete`),
      {
        foldersID: foldersIDs,
        folderID: folderID
      }
    )

    return response;
  },

  async moveFolder(targetID: string, draggedID: string) {
    const response = await instance.patch(
      getFoldersUrl(`/${targetID}/moveFolder`),
      {
        draggedID: draggedID
      }
    )

    return response;
  },

  async moveBackFolder(draggedFolderID: string, folderID: string) {
    const response = await instance.patch(
      getFoldersUrl(`/${draggedFolderID}/moveBackFolder`),
      {
        folderID: folderID
      }
    )

    return response;
  }
}