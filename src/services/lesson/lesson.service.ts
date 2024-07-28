import { getLessonsUrl, getUsersUrl } from "@/api/api.config"
import instance, { axiosClassic } from "@/api/interceptor"

export const LessonService = {
  async findById(lessonID: string) {
    const response = await instance.get(
      getLessonsUrl(`/${lessonID}/find`),
    );
    
    return response;
  },

  async getSelectedLesson(lessonID: string) {
    const response = await instance.get(
      getLessonsUrl(`/${lessonID}`),
    );
    
    return response;
  },

  async create(data: any, ownerID: string) {
    const response = await instance.post(
      getLessonsUrl('/create'),
      {
        ownerID: ownerID,
        lessonName: data.lessonName,
        template: data.template,
      }
    );
    
    return response;
  },

  async changeIsCurrent(data: any) {
    const response = await instance.patch(
      getLessonsUrl(`/${data.data.issueID}/change-current`),
      {
        isCurrent: data.data.isCurrent,
        symbol: data.data.symbol
      }
    );
    
    return response;
  },

  async delete(lessonID: string) {
    const response = await instance.delete(
      getLessonsUrl(`/delete-lesson/${lessonID}`)
    )

    return response;
  },

  async deleteSelectedIssue(lessonID: string) {
    const response = await instance.delete(
      getLessonsUrl(`/${lessonID}/delete-issue`)
    )

    return response;
  },
  
  async createIssue(lessonID: string) {
    const response = await instance.post(
      getLessonsUrl(`/${lessonID}/create-issue`)
    )

    return response;
  },

  async moveLesson(targetID: string, draggedID: string) {
    const response = await instance.patch(
      getLessonsUrl(`/${targetID}/moveLesson`),
      {
        draggedID: draggedID
      }
    )

    return response;
  },

  async moveBackLesson(draggedLessonID: string, folderID: string) {
    const response = await instance.patch(
      getLessonsUrl(`/${draggedLessonID}/moveBackLesson`),
      {
        folderID: folderID
      }
    )

    return response;
  }
}