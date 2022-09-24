import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ProjectForm } from "../../interfaces";
import { editProjectMainPhoto, selectAllProjects } from "./projectsSlice";

const EditProjectMainPhoto: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects)
    const { project_id } = useParams();
    const projects = useSelector(selectAllProjects);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedProject = projects.find(project => project._id === project_id);
    const { register, handleSubmit } = useForm<ProjectForm>();
    document.title = `Edytuj zdjęcie główne projektu ${selectedProject?.title} | Websites With Passion`;
    const onEditProjectMainPhoto: SubmitHandler<ProjectForm> = (data) => {
        const formData = new FormData();
        formData.append("picture", data.profile[0])
        dispatch(editProjectMainPhoto({file: formData as unknown as string, projectID: project_id!}));
        
        if(!isLoading && !hasError){
            navigate(`/projects/${selectedProject?.subpageLink}`);
        }
    }

    return (
        <HeaderForm title={`Edytuj zdjęcie główne projektu ${selectedProject?.title}`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onEditProjectMainPhoto)}>
                <Field label="Zdjęcie główne">
                    <input type="file" {...register("profile")} className="form-control" />
                </Field>
                <input type="submit" value="Edytuj projekt" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditProjectMainPhoto;