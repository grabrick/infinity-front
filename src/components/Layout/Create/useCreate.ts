import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { setIssueData } from "@/redux/slices/lessonConstructor.slice";
import { FolderService } from "@/services/folder/folder.service";
import { LessonService } from "@/services/lesson/lesson.service";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface ILesson {
  lessonName: string;
  template: string;
  desc: string
}

export const useCreate = (ownerID: string, lessonID?: string | any) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const getCurrentLesson = useQuery(
    ["getCurrentLesson", ownerID],
    () =>
      LessonService.findById(lessonID),
    {
      enabled: !!lessonID,

      onSuccess: ({ data }) => {
        dispatch(setIssueData(data.questions.length === 0 ? null : data.questions))
      },
      onError: (error) => {},
    }
  );

  const createNewLesson = useMutation(
    (data: ILesson) => LessonService.create(data, ownerID),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно создали урок");
        push("/activity");
        // queryClient.invalidateQueries(['getMyActivity', ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в создании папки");
      },
    }
  );

  const createNewIssue = useMutation(
    (lessonID: string) => LessonService.createIssue(lessonID),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["getCurrentLesson", ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в создании папки");
      },
    }
  );

  const changeIsCurrent = useMutation(
    (data: any) => LessonService.changeIsCurrent(data),
    {
      onSuccess: ({ data }: any) => {
        queryClient.invalidateQueries(["getCurrentLesson", ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в изменение статуса ответа");
      },
    }
  )

  const deleteSelectedIssue = useMutation(
    (lessonID: string) => LessonService.deleteSelectedIssue(lessonID),
    {
      onSuccess: ({ data }: any) => {
        queryClient.invalidateQueries(["getCurrentLesson", ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в изменение статуса ответа");
      },
    }
  )

  const saveLesson = useMutation(
    (data: any) => LessonService.saveLesson(lessonID, data),
    {
      onSuccess: ({ data }: any) => {
        // queryClient.invalidateQueries(["getCurrentLesson", ownerID]);
      },
      onError: (error) => {
        toastError("Ошибка в изменение статуса ответа");
      },
    }
  )

  // const getCurrentLesson = useQuery(
  //   ["getCurrentLesson", ownerID],
  //   () =>
  //     LessonService.findById(
  //       lessonID === undefined ? createNewLesson?.data?.data?._id : lessonID
  //     ),
  //   {
  //     enabled: !!createNewLesson?.data?.data?._id,

  //     onSuccess: ({ data }) => {},
  //     onError: (error) => {},
  //   }
  // );

  return {
    ...getCurrentLesson,
    createNewLesson,
    createNewIssue,
    changeIsCurrent,
    saveLesson,
    deleteSelectedIssue
  };
};
