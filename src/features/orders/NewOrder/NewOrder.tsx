import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Order } from "../../../interfaces";
import Field from "../../../components/common/Field/Field";
import HeaderForm from "../../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addOrder } from "../ordersSlice";
import { useSearchParams } from "react-router-dom";
import { loadServices, selectAllServices } from "../../services/serviceSlice";
import { useTranslation } from "react-i18next";
import LocaleContext from "../../../LocaleContext";

const NewOrder: React.FC = () => {
    const dispatch = useAppDispatch();


    const [type, setType] = useState<string>("Nowa strona");
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.orders)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Order>();
    const { t } = useTranslation();
    const { locale } = useContext(LocaleContext)
    const [searchParams] = useSearchParams();

    const chosenService = searchParams.get('service');
    document.title = `Nowe zamówienie | Websites With Passion`;

    useEffect(() => {
        dispatch(loadServices());
    }, [dispatch])

    const services = useSelector(selectAllServices);

    const changeType = (e: any) => {
        setType(e.target.value)
    }

    const onSubmit: SubmitHandler<Order> = data => {
        
        dispatch(addOrder(data));
        if(!isLoading && !hasError){
            navigate("/website-orders/description?success=true");
        }
        
    } 
    return (
        <HeaderForm title={`${t('Zamów usługę')}`} height="100%">
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <Field label={`${t('Wybierz usługę')}`}>
                    <select {...register("type")} className="form-select" onChange={changeType} required>
                        { chosenService && <option value={chosenService}>{chosenService}</option> }
                        { services && services.map(service => <option value={service.title} key={service._id}>{locale === 'pl' ? service.title : service.titleEn}</option>) }
                    </select>
                </Field>
                <Field label={`${t('Nazwa strony')}`}>
                    <input type="text" {...register("websiteTitle")} className="form-control" placeholder={`${t('Nazwa strony')}`} required />
                </Field>
                { (type === "Aktualizacja" || type === "update") && <Field label={`${t('Link do aktualnej wersji')}`}>
                    <input type="text" {...register("previousWebsite")} className="form-control" placeholder={`${t('Link do aktualnej wersji')}`}  required />
                </Field>}
                
                <Field label={`${t('Twoje oczekiwania')}`}>
                    <textarea {...register("whatYouWish")} className="form-control" placeholder={`${t('Twoje oczekiwania')}`} required></textarea>
                </Field>
                <Field label={`${t('Telefon kontaktowy')}`}>
                    <input type="tel" {...register("phone")} className="form-control" placeholder={`${t('Telefon kontaktowy')}`} required />
                </Field>
                <Field label={`${t('Imię i nazwisko')}`}>
                    <input type="text" {...register("name")} className="form-control" placeholder={`${t('Imię i nazwisko')}`} required />
                </Field>
                <Field label={`${t('Email kontaktowy')}`}>
                    <input type="email" {...register("email")} className="form-control" placeholder={`${t('Email kontaktowy')}`} required />
                </Field>
                
                <input type="submit" value={`${t('Zamów usługę')}`} className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default NewOrder;