import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Category } from "../../interfaces";
import { addCategory } from "./categoriesSlice";


const NewCategory: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.categories)
    const { register, handleSubmit } = useForm<Category>();
    const onAddCategory: SubmitHandler<Category> = (data) => {
        dispatch(addCategory(data as unknown as Category));
        if(!isLoading && !hasError){
            navigate("/projects")
        }
        
    }
    document.title = `Nowa kategoria | Websites With Passion`;
    return (
        <HeaderForm title={`Dodaj kategorię`}>
              {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddCategory)}>
                <Field label="Nazwa po polsku">
                    <textarea {...register("title")} className="form-control" placeholder="Nazwa po polsku" required></textarea>
                </Field>
                <Field label="Nazwa po angielsku">
                    <textarea {...register("titleEn")} className="form-control" placeholder="Nazwa po angielsku" required></textarea>
                </Field>
                <Field label="Kolor">
                    <input type="color" {...register("color")} className="form-control" placeholder="Kolor" required />
                </Field>
                <Field label="Ikona">
                    <input type="text" {...register("icon")} className="form-control" placeholder="Ikona" required />
                </Field>
                <input type="submit" value="Dodaj kategorię" className="button button-grey" />
            </form>
            
        </HeaderForm>
    )
}

export default NewCategory;