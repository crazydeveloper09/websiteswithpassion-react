import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { Project } from "../../interfaces";

const NewProject: React.FC = () => {

    const { register, handleSubmit } = useForm<Project>()
    const onAddProject: SubmitHandler<Project> = (data) => {
        console.log(data);
    }

    return (
        <HeaderForm title="Dodaj projekt" height="100%">
            <form onSubmit={handleSubmit(onAddProject)} encType="multipart/form-data">
                <Field label="Nazwa">
                    <input type="text" {...register("title")} placeholder="Nazwa" className="form-control" />
                </Field>
                <Field label="Opis">
                    <textarea {...register("description")} placeholder="Opis" className="form-control" />
                </Field>
                <Field label="Opis po angielsku">
                    <textarea {...register("en")} placeholder="Opis" className="form-control" />
                </Field>
                <Field label="Status">
                    <input type="text" {...register("status")} placeholder="Status" className="form-control" />
                </Field>
                <Field label="Status po angielsku">
                    <input type="text" {...register("statusEn")} placeholder="Angielski status" className="form-control" />
                </Field>
                <Field label="Link">
                    <input type="text" {...register("link")} placeholder="Link" className="form-control" />
                </Field>
                <Field label="Zdjęcie główne">
                    <input type="file" {...register("profile")} className="form-control" />
                </Field>
                <input type="submit" value="Dodaj projekt" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default NewProject;