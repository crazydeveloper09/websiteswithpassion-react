import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { Technology } from "../../interfaces";
import { selectUserTechnologies } from "../user/userSlice";

const EditTechnology: React.FC = () => {
  const { register, handleSubmit } = useForm<Technology>();
  const { technology_id } = useParams<string>();
  const technologies = useSelector(selectUserTechnologies);
  const selectedTechnology = technologies.find(
    (technology) => technology._id === technology_id
  );
  const onEditTechnology: SubmitHandler<Technology> = (data) => {
    console.log(data);
  };
  return (
    <HeaderForm title={`Edytuj technologię ${selectedTechnology?.name}`}>
      <form onSubmit={handleSubmit(onEditTechnology)}>
        <Field label="Klasa ikony">
          <input
            type="text"
            {...(register("icon"), { value: selectedTechnology?.icon })}
            className="form-control"
            placeholder="Klasa ikony"
          />
        </Field>
        <Field label="Nazwa technologii">
          <input
            type="text"
            {...(register("name"), { value: selectedTechnology?.name })}
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
