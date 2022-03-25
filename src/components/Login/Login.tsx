import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { API_URL } from "../..";
import { User } from "../../interfaces";
import { logInUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../hooks";
import HeaderForm from "../common/HeaderForm/HeaderForm";
import './Login.scss';
import Field from "../common/Field/Field";

type LoginValues = {
    username: string,
    password: string
}

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<LoginValues>();
    const onSubmit: SubmitHandler<LoginValues> = data => {
        axios
            .post(`${API_URL}/login`, data, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                dispatch(logInUser((response.data as User)));
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message)
            })
    };

    return (
      <HeaderForm title="Logowanie do panelu">
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