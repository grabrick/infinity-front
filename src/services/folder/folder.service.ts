import { getFoldersUrl } from "@/api/api.config"
import instance from "@/api/interceptor"

export const FolderService = {
  async getActiveFolder(_id: string) {
    const response = await instance.get(
      getFoldersUrl(`/${_id}`),
    )

    return response;
  },

  async getChildFolder(_id: string) {
    const response = await instance.get(
      getFoldersUrl(`/${_id}/children`),
    )

    return response.data;
  },

  async createNewFolder(_id: string, data: any) {
    // console.log({ _id: _id, data: data });
    const response = await instance.post(
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
    const response = await instance.put(
      getFoldersUrl(`/delete`),
      {
        foldersID: foldersIDs
      }
    )

    return response;
  }
}