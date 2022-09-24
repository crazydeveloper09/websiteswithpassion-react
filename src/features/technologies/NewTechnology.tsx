import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Technology } from "../../interfaces";
import { addTechnology } from "./technologySlice";


const NewTechnology: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.technologies)
    const { register, handleSubmit } = useForm<Technology>();
    const onAddTechnology: SubmitHandler<Technology> = (data) => {
        dispatch(addTechnology(data));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }
    document.title = `Nowa technologia | Websites With Passion`;
    return (
        <HeaderForm title={`Dodaj technologię`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddTechnology)}>
                <Field label="Klasa ikony">
                    <input type="text" {...register("icon")} className="form-control" placeholder="Klasa ikony" />
                </Field>
                <Field label="Nazwa technologii">
                    <input type="text" {...register("name")} className="form-control" placeholder="Nazwa technologii" />
                </Field>
                <input type="submit" value="Dodaj technologię" className="button button-grey" />
            </form>
            
        </HeaderForm>
    )
}

export default NewTechnology;