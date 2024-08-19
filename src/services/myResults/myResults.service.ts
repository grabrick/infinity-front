import { getMyResultsUrl } from "@/api/api.config"
import instance from "@/api/interceptor"

export const MyResultsService = {
  async getResults(_id: string) {
    const response = await instance.get(
      getMyResultsUrl(`/${_id}/my-results`),
    )

    return response;
  },
  async getSharedLessonResults(_id: string) {
    const response = await instance.get(
      getMyResultsUrl(`/sharedLesson/${_id}`),
    )

    return response;
  },
  async moveLesson(targetID: string, draggedID: string) {
    const response = await instance.patch(
      getMyResultsUrl(`/${targetID}/moveLesson`),
      {
        draggedID: draggedID
      }
    )

    return response;
  },

  async moveBackLesson(draggedLessonID: string, folderID: string) {
    const response = await instance.patch(
      getMyResultsUrl(`/${draggedLessonID}/moveBackLesson`),
      {
        folderID: folderID
      }
    )

    return response;
  },
}