import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Achievement } from "../../interfaces";
import { addAchievement } from "./achievementsSlice";

const NewAchievement: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.achievements)
    const { register, handleSubmit } = useForm<Achievement>()
    const onAddAchievement: SubmitHandler<Achievement> = (data) => {
        const formData = new FormData();
        formData.append("picture", (data.picture as unknown as FileList)[0])
        formData.append('title', data.title);
        formData.append('titleEn', data.titleEn)
        
        dispatch(addAchievement(formData as unknown as Achievement));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }

    return (
        <HeaderForm title="Dodaj osiągnięcie">
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddAchievement)} encType="multipart/form-data">
                <Field label="Nazwa">
                    <input type="text" {...register("title")} placeholder="Nazwa" className="form-control" />
                </Field>
                <Field label="Nazwa po angielsku">
                    <input type="text" {...register("titleEn")} placeholder="Nazwa po angielsku" className="form-control" />
                </Field>
                <Field label="Zdjęcie główne">
                    <input type="file" {...register("picture")} className="form-control" />
                </Field>
                <input type="submit" value="Dodaj osiągnięcie" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default NewAchievement;