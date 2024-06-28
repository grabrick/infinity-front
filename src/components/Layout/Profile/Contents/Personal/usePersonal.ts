import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { setUserData } from "@/redux/slices/user.slice";
import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";
import { IUser } from "@/types/types";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

export const usePersonal = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const changeProfile = useMutation(
    (data: {id: string, data: IUser}) =>
      UserService.changeProfile(data),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно обновили профиль");
        dispatch(setUserData(data));
      },
      onError: (error: any) => {
        toastError(`Что-то пошло не так: ${error.response.data.message}`);
      },
    }
  );

  const handleOnSubmit = (id: string, data: any) => {
    changeProfile.mutate({id, data});
  };

  return { handleOnSubmit, changeProfile };
};
