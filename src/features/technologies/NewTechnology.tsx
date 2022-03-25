import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { Technology } from "../../interfaces";


const NewTechnology: React.FC = () => {
    const { register, handleSubmit } = useForm<Technology>();
    const onAddTechnology: SubmitHandler<Technology> = (data) => {
        console.log(data);
    }
    return (
        <HeaderForm title={`Dodaj technologię`}>
            <form onSubmit={handleSubmit(onAddTechnology)}>
                <Field label="Klasa ikony">
                    <input type="text" {...register("icon")} className="form-control" placeholder="Klasa ikony" />
                </Field>
                <Field label="Nazwa technologii">
                    <input type="text" {...register("name")} className="form-control" placeholder="Nazwa technologii" />
                </Field>
                <input type="submit" value="Dodaj technologię" className="button button-grey" />
            </form>
            
        </HeaderForm>
    )
}

export default NewTechnology;