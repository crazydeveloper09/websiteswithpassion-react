import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { User } from "../../interfaces";
import { editUser, selectLoggedInUser } from "./userSlice";


const EditUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.user)
    const { user_id } = useParams();
    const user = useSelector(selectLoggedInUser);
    const { register, handleSubmit } = useForm<User>({
        defaultValues: {
            username: user?.username,
            about: user?.about,
            en: user?.en,
            email: user?.email,
            fbLink: user?.fbLink,
            igLink: user?.igLink
        }
    });
    const onEditUser: SubmitHandler<User> = (data) => {
        dispatch(editUser({...data, _id: user_id!}));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }

    return (
        <HeaderForm title={`Edytuj użytkownika ${user?.username}`} height="100%">
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onEditUser)}>
                <Field label="Nazwa użytkownika">
                    <input type="text" {...register("username")} placeholder="Nazwa użytkownika" className="form-control" />
                </Field>
                <Field label="Opis">
                    <textarea {...register("about")} placeholder="Opis" className="form-control" />
                </Field>
                <Field label="Opis po angielsku">
                    <textarea {...register("en")} placeholder="Opis po angielsku" className="form-control" />
                </Field>
                <Field label="Email">
                    <input type="text" {...register("email")} placeholder="Email" className="form-control" />
                </Field>
                <Field label="Status po angielsku">
                    <input type="text" {...register("fbLink")} placeholder="Angielski status" className="form-control" />
                </Field>
                <Field label="Link">
                    <input type="text" {...register("igLink")} placeholder="Link" className="form-control" />
                </Field>
                <input type="submit" value="Edytuj użytkownika" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditUser;