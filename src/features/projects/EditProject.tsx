import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { Project } from "../../interfaces";
import { selectAllProjects } from "./projectsSlice";

const EditProject: React.FC = () => {

    const { register, handleSubmit } = useForm<Project>();
    const { project_id } = useParams();
    const projects = useSelector(selectAllProjects);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedProject = projects.find(project => project._id === project_id);
    const onEditProject: SubmitHandler<Project> = (data) => {
        console.log(data);
    }

    return (
        <HeaderForm title="Edytuj projekt" height="100%">
            <form onSubmit={handleSubmit(onEditProject)} encType="multipart/form-data">
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
                <input type="submit" value="Edytuj projekt" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditProject;