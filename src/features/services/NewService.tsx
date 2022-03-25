import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { Service } from "../../interfaces";

const NewService: React.FC = () => {
    const { register, handleSubmit } = useForm<Service>();

    const onAddService: SubmitHandler<Service> = (data) => {
        console.log(data)
    }

    return (
        <HeaderForm title="Dodaj usługę">
            <form onSubmit={handleSubmit(onAddService)}>
                <Field label="Ikona">
                    <input type="text" {...register("icon")} placeholder="Ikona" className="form-control" />
                </Field>
                <Field label="Nazwa">
                    <input type="text" {...register("title")} placeholder="Nazwa" className="form-control" />
                </Field>
                <Field label="Nazwa po angielsku">
                    <input type="text" {...register("titleEn")} placeholder="Nazwa po angielsku" className="form-control" />
                </Field>
                <Field label="Opis">
                    <input type="text" {...register("description")} placeholder="Opis" className="form-control" />
                </Field>
                <Field label="Opis po angielsku">
                    <input type="text" {...register("descriptionEn")} placeholder="Opis po angielsku" className="form-control" />
                </Field>
                <input type="submit" value="Dodaj usługę" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default NewService;