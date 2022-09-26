import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Service } from "../../interfaces";
import { editService, loadServices, selectAllServices } from "./serviceSlice";

const EditService: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, hasError, errMessage } = useAppSelector((state) => state.services)
  const { service_id } = useParams<string>();

  useEffect(() => {
    dispatch(loadServices());
  }, [dispatch]);

  const services = useSelector(selectAllServices);
  const selectedService = services.find(
    (service) => service._id === service_id
  );

  const { register, handleSubmit } = useForm<Service>({
    defaultValues: {
      icon: selectedService?.icon,
      title: selectedService?.title,
      titleEn: selectedService?.titleEn,
      description: selectedService?.description,
      descriptionEn: selectedService?.descriptionEn,
    }
  });

  const onEditService: SubmitHandler<Service> = (data) => {
    dispatch(editService({...data, _id: service_id!}));
    if(!isLoading && !hasError){
      navigate("/");
    }
    
  };
  document.title = `Edytuj usługę ${selectedService?.title} | Websites With Passion`;
  return (
    <HeaderForm title={`Edytuj usługę ${selectedService?.title}`}>
        {hasError && <p className="error">{errMessage}</p>}
      <form onSubmit={handleSubmit(onEditService)}>
        <Field label="Ikona">
          <input
            type="text"
            {...register("icon")}
            placeholder="Ikona"
            className="form-control"
            required
          />
        </Field>
        <Field label="Nazwa">
          <input
            type="text"
            {...register("title")}
            placeholder="Nazwa"
            className="form-control"
            required
          />
        </Field>
        <Field label="Nazwa po angielsku">
          <input
            type="text"
            {...register("titleEn")}
            placeholder="Nazwa po angielsku"
            className="form-control"
            required
          />
        </Field>
        <Field label="Opis">
          <input
            type="text"
            {...register("description")}
            placeholder="Opis"
            className="form-control"
            required
          />
        </Field>
        <Field label="Opis po angielsku">
          <input
            type="text"
            {...register("descriptionEn")}
            placeholder="Opis po angielsku"
            className="form-control"
            required
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
