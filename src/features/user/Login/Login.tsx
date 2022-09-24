import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { logInUser } from "../userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import HeaderForm from "../../../components/common/HeaderForm/HeaderForm";
import './Login.scss';
import Field from "../../../components/common/Field/Field";

export type LoginValues = {
    username: string,
    password: string
}

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.user)
    const { register, handleSubmit } = useForm<LoginValues>();
    const onSubmit: SubmitHandler<LoginValues> = data => {
      dispatch(logInUser(data));
      if(!isLoading && !hasError){
        navigate("/");
      }
    };

    document.title = 'Logowanie | Websites With Passion';

    return (
      <HeaderForm title="Logowanie do panelu">
        {hasError && <p className="error">{errMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field label="Nazwa użytkownika">
            <input
              type="text"
              {...register("username")}
              className="form-control"
              placeholder="Nazwa użytkownika"
            />
          </Field>
          <Field label="Hasło">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              placeholder="Hasło"
            />
          </Field>
        
          <input
            type="submit"
            value="Zaloguj się"
            className="button button-grey"
          />
        </form>
      </HeaderForm>
    );
}

export default Login;