import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { fetchUserProfile } from "@/redux/slices/user.slice";
import { AuthService } from "@/services/auth/auth.service";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

interface IAuth {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
}

interface ILogin {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch()
  const registration = useMutation(
    (data: IAuth) => AuthService.register({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Вы успешно прошли регистрацию");
        push('/');
      },
      onError: (error: any) => {
        toastError(`Что-то пошло не так: ${error.response.data.message}`)
      },
    }
  );

  const login = useMutation(
    (data: ILogin) => AuthService.login(data),
    {
      onSuccess: ({ data }) => {
        toastSuccess("Добро пожаловать");
        push('/');
      },
      onError: (error: any) => {
        toastError(`Что-то пошло не так: ${error.response.data.message}`)
      },
    }
  );

  const handleOnSubmit = (type: string, data: any) => {
    if (type === "registr") {
      registration.mutate(data, {
        onSuccess: () => {
          dispatch(fetchUserProfile());
        }
      });
    } else if (type === "login") {
      login.mutate(data, {
        onSuccess: () => {
          dispatch(fetchUserProfile());
        }
      });
    }
  }

  return { handleOnSubmit, login, registration };
}