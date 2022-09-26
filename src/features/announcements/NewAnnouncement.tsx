import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Announcement } from "../../interfaces";
import { addAnnouncement } from "./announcementsSlice";


const NewAnnouncement: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.announcements)
    const { register, handleSubmit } = useForm<Announcement>();
    const onAddAnnouncement: SubmitHandler<Announcement> = (data) => {
        dispatch(addAnnouncement(data));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }
    document.title = `Nowe ogłoszenie | Websites With Passion`;
    return (
        <HeaderForm title={`Dodaj ogłoszenie`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddAnnouncement)}>
                <Field label="Tekst po polsku">
                    <textarea {...register("pl")} className="form-control" placeholder="Tekst po polsku" required></textarea>
                </Field>
                <Field label="Tekst po angielsku">
                    <textarea {...register("en")} className="form-control" placeholder="Tekst po angielsku" required></textarea>
                </Field>
                <input type="submit" value="Dodaj ogłoszenie" className="button button-grey" />
            </form>
            
        </HeaderForm>
    )
}

export default NewAnnouncement;