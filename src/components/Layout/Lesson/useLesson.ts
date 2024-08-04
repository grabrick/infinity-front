import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { LessonService } from "@/services/lesson/lesson.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useLesson = (lessonID: string) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const getSelectedLesson = useQuery(['getSelectedLesson', lessonID], () => LessonService.getSelectedLesson(lessonID), {
    enabled: !!lessonID,
    onSuccess: ({data}) => {},
    onError: (error) => {}
  })

  const saveLessonSettings = useMutation(
    (lessonSettings: any) => LessonService.saveLessonSettings(lessonID, lessonSettings), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно сохранили настройки урока");
        queryClient.invalidateQueries(['getSelectedLesson', lessonID]);
      },
      onError: (error) => {
        toastError("Ошибка в сохранение настроек к уроку");
      },
    }
  )

  const uploadAudioFile = useMutation(
    (file: any) => LessonService.uploadAudioFile(file), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно загрузили аудио файл");
        // queryClient.invalidateQueries(['getMyActivity', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в загрузке аудио файла");
      },
    }
  )

  const deleteUploadAudioFile = useMutation(
    (file: any) => LessonService.deleteUploadAudioFile(file), {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно загрузили аудио файл");
        // queryClient.invalidateQueries(['getMyActivity', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в загрузке аудио файла");
      },
    }
  )
  
  return {
    ...getSelectedLesson,
    saveLessonSettings,
    uploadAudioFile,
    deleteUploadAudioFile
  }
}