import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { Service } from "../../interfaces";
import { selectUserServices } from "../user/userSlice";

const EditService: React.FC = () => {
  const { register, handleSubmit } = useForm<Service>();
  const { service_id } = useParams<string>();
  const services = useSelector(selectUserServices);
  const selectedService = services.find(
    (service) => service._id === service_id
  );

  const onEditService: SubmitHandler<Service> = (data) => {
    console.log(data);
  };

  return (
    <HeaderForm title={`Edytuj usługę ${selectedService?.title}`}>
      <form onSubmit={handleSubmit(onEditService)}>
        <Field label="Ikona">
          <input
            type="text"
            {...register("icon", { value: selectedService?.icon })}
            placeholder="Ikona"
            className="form-control"
          />
        </Field>
        <Field label="Nazwa">
          <input
            type="text"
            {...register("title", { value: selectedService?.title })}
            placeholder="Nazwa"
            className="form-control"
          />
        </Field>
        <Field label="Nazwa po angielsku">
          <input
            type="text"
            {...register("titleEn", { value: selectedService?.titleEn })}
            placeholder="Nazwa po angielsku"
            className="form-control"
          />
        </Field>
        <Field label="Opis">
          <input
            type="text"
            {...register("description", {
              value: selectedService?.description,
            })}
            placeholder="Opis"
            className="form-control"
          />
        </Field>
        <Field label="Opis po angielsku">
          <input
            type="text"
            {...register("descriptionEn", {
              value: selectedService?.descriptionEn,
            })}
            placeholder="Opis po angielsku"
            className="form-control"
          />
        </Field>
        <input
          type="submit"
          value="Edytuj usługę"
          className="button button-grey"
        />
      </form>
    </HeaderForm>
  );
};

export default EditService;
