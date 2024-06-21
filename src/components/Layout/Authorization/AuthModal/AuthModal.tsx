import { useForm } from "react-hook-form";
import m from "./AuthModal.module.scss";

const AuthModal = ({ title, setIsRegister, isRegister }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const onChangeMode = () => {
    setIsRegister(!isRegister);
    reset({ email: '', passwd: '', againPasswd: '' });
  }
  
  return (
    <form className={m.container} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={m.title}>{title}</h1>

      <div className={m.inputs}>
        <input
          type="text"
          className={m.email}
          placeholder="Введите почту"
          {...register("email", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          className={m.passwd}
          placeholder="Введите пароль"
          {...register("passwd", { required: true, maxLength: 80 })}
        />
        {title === "Регистрация" && (
          <input
            type="text"
            className={m.againPasswd}
            placeholder="Повторный пароль"
            {...register("againPasswd", { required: true, maxLength: 80 })}
          />
        )}
      </div>

      <div className={m.confirm}>
        <button className={m.confirmBtn}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
              stroke="#EDF5FA"
              stroke-width="1.5"
            />
            <g opacity="0.5">
              <path
                d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z"
                fill="#EDF5FA"
              />
              <path
                d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                fill="#EDF5FA"
              />
              <path
                d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                fill="#EDF5FA"
              />
            </g>
            <path
              opacity="0.5"
              d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5"
              stroke="#EDF5FA"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          {title === "Регистрация" ? "Регистрация" : "Вход"}
        </button>
        <span className={m.text}>
          {title === "Регистрация"
            ? "У вас уже есть аккаунт?"
            : "У вас нет аккаунта?"}{" "}
          <span
            className={m.changeModal}
            onClick={() => onChangeMode()}
          >
            {title === "Регистрация" ? "Авторизация" : "Регистрация"}
          </span>
        </span>
      </div>
    </form>
  );
};

export default AuthModal;
