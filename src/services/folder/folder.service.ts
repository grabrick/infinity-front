import { getFoldersUrl } from "@/api/api.config"
import instance, { axiosClassic } from "@/api/interceptor"

export const FolderService = {
  async getActiveFolder(_id: string) {
    const response = await axiosClassic.get(
      getFoldersUrl(`/${_id}`),
    )

    return response;
  },

  async getChildFolder(_id: string) {
    const response = await axiosClassic.get(
      getFoldersUrl(`/${_id}/children`),
    )

    return response.data;
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
        folderID: data.folderID ?? null
      }
    )

    return response;
  },

  async deleteFolder(foldersIDs: any) {
    const response = await axiosClassic.put(
      getFoldersUrl(`/delete`),
      {
        foldersID: foldersIDs
      }
    )

    return response;
  }
}