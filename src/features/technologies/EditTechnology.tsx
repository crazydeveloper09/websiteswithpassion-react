import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Technology } from "../../interfaces";
import { editTechnology, loadTechnologies, selectAllTechnologies } from "./technologySlice";

const EditTechnology: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, hasError, errMessage } = useAppSelector((state) => state.technologies)
  const { technology_id } = useParams<string>();

  useEffect(() => {
    dispatch(loadTechnologies());
  }, [dispatch]);

  const technologies = useSelector(selectAllTechnologies);
  const selectedTechnology = technologies.find(
    (technology) => technology._id === technology_id
  );
  const { register, handleSubmit } = useForm<Technology>({
    defaultValues: {
      icon: selectedTechnology?.icon,
      name: selectedTechnology?.name
    }
  });
  const onEditTechnology: SubmitHandler<Technology> = (data) => {
    dispatch(editTechnology({...data, _id: technology_id! }));
    if(!isLoading && !hasError){
      navigate("/");
    }
  };
  return (
    <HeaderForm title={`Edytuj technologię ${selectedTechnology?.name}`}>
        {hasError && <p className="error">{errMessage}</p>}
      <form onSubmit={handleSubmit(onEditTechnology)}>
        <Field label="Klasa ikony">
          <input
            type="text"
            {...register("icon")}
            className="form-control"
            placeholder="Klasa ikony"
          />
        </Field>
        <Field label="Nazwa technologii">
          <input
            type="text"
            {...register("name")}
            className="form-control"
            placeholder="Nazwa technologii"
          />
        </Field>
        <input
          type="submit"
          value="Edytuj technologię"
          className="button button-grey"
        />
      </form>
    </HeaderForm>
  );
};

export default EditTechnology;
