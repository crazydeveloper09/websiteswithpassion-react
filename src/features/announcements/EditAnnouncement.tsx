import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Announcement } from "../../interfaces";
import { editAnnouncement, selectAllAnnouncements } from "./announcementsSlice";


const EditAnnouncement: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.announcements)
    const { announcement_id } = useParams<string>();
    const announcements = useSelector(selectAllAnnouncements);
    const selectedAnnouncement = announcements.find((announcement) => announcement._id === announcement_id)
    const { register, handleSubmit } = useForm<Announcement>({
        defaultValues: {
            pl: selectedAnnouncement?.pl,
            en: selectedAnnouncement?.en
        }
    });
    const onEditAnnouncement: SubmitHandler<Announcement> = (data) => {
        dispatch(editAnnouncement({...data, _id: announcement_id!}));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }
    document.title = `Edytuj ogłoszenie | Websites With Passion`;
    return (
        <HeaderForm title={`Edytuj ogłoszenie`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onEditAnnouncement)}>
                <Field label="Tekst po polsku">
                    <textarea {...register("pl")} className="form-control" placeholder="Tekst po polsku"></textarea>
                </Field>
                <Field label="Tekst po angielsku">
                    <textarea {...register("en")} className="form-control" placeholder="Tekst po angielsku"></textarea>
                </Field>
                <input type="submit" value="Edytuj ogłoszenie" className="button button-grey" />
            </form>
            
        </HeaderForm>
    )
}

export default EditAnnouncement;