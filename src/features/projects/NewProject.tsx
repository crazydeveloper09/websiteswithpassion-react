import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Project, ProjectForm } from "../../interfaces";
import { selectAllCategories } from "../categories/categoriesSlice";
import { addProject } from "./projectsSlice";

const NewProject: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useSelector(selectAllCategories);
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects)
    const { register, handleSubmit } = useForm<Project>()
    const onAddProject: SubmitHandler<Project> = (data) => {
        const formData = new FormData();
        formData.append("profile", (data.profile as unknown as FileList)[0]);
        formData.append("title", data.title);
        formData.append("description", data.description)
        formData.append("en", data.en)
        formData.append("status", data.status)
        formData.append("statusEn", data.statusEn)
        formData.append("link", data.link)
        formData.append("categories", data.categories as string)
        
        dispatch(addProject(formData as unknown as ProjectForm));
        
        if(!isLoading && !hasError){
            navigate("/projects");
        }
    
    }

    return (
        <HeaderForm title="Dodaj projekt" height="100%">
              {hasError && <p className="error">{errMessage}</p>}
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
                <Field label="Kategorie">
                    <select {...register("categories")} className="form-select" multiple>
                        { categories.map((category) => <option value={category._id}>{category.title}</option>) }
                    </select>
                </Field>
                <input type="submit" value="Dodaj projekt" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default NewProject;