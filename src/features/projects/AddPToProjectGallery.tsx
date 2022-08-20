import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ProjectForm } from "../../interfaces";
import { addPictureToGallery, selectAllProjects } from "./projectsSlice";

const AddPictureToProjectGallery: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects)
    const { project_id } = useParams();
    const projects = useSelector(selectAllProjects);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedProject = projects.find(project => project._id === project_id);
    const { register, handleSubmit } = useForm<ProjectForm>();
    const onAddPictureToProjectGallery: SubmitHandler<ProjectForm> = (data) => {
        const formData = new FormData();
        formData.append("picture", data.profile[0])
        dispatch(addPictureToGallery({file: formData as unknown as string, projectID: project_id!}));
        if(!isLoading && !hasError){
            navigate(`/projects/${selectedProject?.subpageLink}`);
        }
    }

    return (
        <HeaderForm title={`Dodaj zdjęcie do galerii projektu ${selectedProject?.title}`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddPictureToProjectGallery)}>
                <Field label="Zdjęcie główne">
                    <input type="file" {...register("profile")} className="form-control" />
                </Field>
                <input type="submit" value="Dodaj zdjęcie" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default AddPictureToProjectGallery;