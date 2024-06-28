import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
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
  const registration = useMutation(
    // ['1'],
    (data: IAuth) =>
      AuthService.register({
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
    // ['2'],
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
      registration.mutate(data);
    } else if (type === "login") {
      login.mutate(data);
    }
  }

  return { handleOnSubmit, login, registration };
}