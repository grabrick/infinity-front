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

  async getPlayingLesson(_id: string) {
    const response = await axiosClassic.get(
      getLessonsUrl(`/playLesson/${_id}`),
    )

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

  async saveLesson(lessonID: any, data: any) {
    const response = await instance.put(
      getLessonsUrl(`/${lessonID}/saveLesson`),
      {
        data: data
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
  },

  async saveLessonSettings(lessonID: string, data: any) {
    const response = await instance.put(
      getLessonsUrl(`/${lessonID}/saveSettings`),
      {
        lessonSettings: data
      }
    )
    
    return response;
  },

  async uploadMusicFile(file: any, lessonID: any) {
    const response = await instance.post(
      getLessonsUrl(`/uploadMusic`), 
      {
        file: file,
        lessonID: lessonID
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    
    return response;
  },

  async uploadSoundsFile(data: any, lessonID: any) {
    const response = await instance.post(
      getLessonsUrl(`/uploadSounds`), 
      {
        file: data.file,
        data: data.sectionData,
        lessonID: lessonID,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    
    return response;
  },

  async deleteUploadMusicFile(fileName: any, lessonID: any) {
    const response = await instance.put(
      getLessonsUrl(`/${fileName}/deleteMusic`), { lessonID: lessonID }
    )
    
    return response;
  },

  async deleteUploadSoundFile(fileName: any, lessonID: any) {
    const response = await instance.put(
      getLessonsUrl(`/${fileName}/deleteSound`), { lessonID: lessonID }
    )
    
    return response;
  },

  async createShareUrl(data: any) {
    const response = await instance.patch(
      getLessonsUrl(`/createShareUrl`), data
    )

    return response
  }
}