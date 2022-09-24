import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ProjectForm } from "../../interfaces";
import { selectAllCategories } from "../categories/categoriesSlice";
import { editProject, selectAllProjects } from "./projectsSlice";

const EditProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);
  const { isLoading, hasError, errMessage } = useAppSelector(
    (state) => state.projects
  );
  const { project_id } = useParams();
  const projects = useSelector(selectAllProjects);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedProject = projects.find(
    (project) => project._id === project_id
  );
  const { register, handleSubmit } = useForm<ProjectForm>({
    defaultValues: {
      title: selectedProject?.title,
      description: selectedProject?.description,
      en: selectedProject?.en,
      status: selectedProject?.status,
      statusEn: selectedProject?.statusEn,
      link: selectedProject?.link,
    },
  });
  document.title = `Edytuj projekt ${selectedProject?.title} | Websites With Passion`;
  const onEditProject: SubmitHandler<ProjectForm> = (data) => {
    dispatch(editProject({ ...data, _id: project_id! }));
    if (!isLoading && !hasError) {
      navigate(`/projects/${selectedProject?.subpageLink}`);
    }
  };

  return (
    <HeaderForm title="Edytuj projekt" height="100%">
      {hasError && <p className="error">{errMessage}</p>}
      <form
        onSubmit={handleSubmit(onEditProject)}
        encType="multipart/form-data"
      >
        <Field label="Nazwa">
          <input
            type="text"
            {...register("title")}
            placeholder="Nazwa"
            className="form-control"
          />
        </Field>
        <Field label="Opis">
          <textarea
            {...register("description")}
            placeholder="Opis"
            className="form-control"
          />
        </Field>
        <Field label="Opis po angielsku">
          <textarea
            {...register("en")}
            placeholder="Opis"
            className="form-control"
          />
        </Field>
        <Field label="Status">
          <input
            type="text"
            {...register("status")}
            placeholder="Status"
            className="form-control"
          />
        </Field>
        <Field label="Status po angielsku">
          <input
            type="text"
            {...register("statusEn")}
            placeholder="Angielski status"
            className="form-control"
          />
        </Field>
        <Field label="Link">
          <input
            type="text"
            {...register("link")}
            placeholder="Link"
            className="form-control"
          />
        </Field>
        <Field label="Kategorie">
          <select {...register("categories")} className="form-select" multiple>
            {categories?.map((category) => (
              <option
                value={category._id}
                selected={
                  selectedProject?.categories.find(
                    (foundCategory) => foundCategory.title === category.title
                  )
                    ? true
                    : false
                }
              >
                {category.title}
              </option>
            ))}
          </select>
        </Field>
        <input
          type="submit"
          value="Edytuj projekt"
          className="button button-grey"
        />
      </form>
    </HeaderForm>
  );
};

export default EditProject;
