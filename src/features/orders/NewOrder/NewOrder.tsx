import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Order } from "../../../interfaces";
import Field from "../../../components/common/Field/Field";
import HeaderForm from "../../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addOrder } from "../ordersSlice";
import { useSearchParams } from "react-router-dom";
import { selectAllServices } from "../../services/serviceSlice";

const NewOrder: React.FC = () => {
    const dispatch = useAppDispatch();
    const [type, setType] = useState<string>("Nowa strona");
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.orders)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Order>();
    const services = useSelector(selectAllServices);
    const [searchParams] = useSearchParams();

    const chosenService = searchParams.get('service');

    useEffect(() => {

    }, [type])

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
        <HeaderForm title="Zamów usługę" height="100%">
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <Field label="Wybierz usługę">
                    <select {...register("type")} className="form-select" onChange={changeType}>
                        { chosenService && <option value={chosenService}>{chosenService}</option> }
                        { services && services.map(service => <option value={service.title} key={service._id}>{service.title}</option>) }
                    </select>
                </Field>
                <Field label="Nazwa strony">
                    <input type="text" {...register("websiteTitle")} className="form-control" placeholder="Nazwa strony" />
                </Field>
                { (type === "Aktualizacja" || type === "update") && <Field label="Link do aktualnej wersji">
                    <input type="text" {...register("previousWebsite")} className="form-control" placeholder="Link do aktualnej wersji" />
                </Field>}
                
                <Field label="Czego oczekujesz po stronie">
                    <textarea {...register("whatYouWish")} className="form-control" placeholder="Czego oczekujesz"></textarea>
                </Field>
                <Field label="Maksymalny budżet">
                    <input type="number" {...register("budget")} className="form-control" placeholder="Maksymalny budżet" />
                </Field>
                <Field label="Imię i nazwisko">
                    <input type="text" {...register("name")} className="form-control" placeholder="Imię i nazwisko" />
                </Field>
                <Field label="Email kontaktowy">
                    <input type="email" {...register("email")} className="form-control" placeholder="Email kontaktowy" />
                </Field>
                
                <input type="submit" value="Zamów usługę" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default NewOrder;