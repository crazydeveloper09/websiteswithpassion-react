import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { API_URL } from "../../..";
import { Order } from "../../../interfaces";
import Field from "../../../components/common/Field/Field";
import HeaderForm from "../../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch } from "../../../hooks";
import { selectUserServices } from "../../user/userSlice";
import { addOrder } from "../ordersSlice";
import { useSearchParams } from "react-router-dom";

const NewOrder: React.FC = () => {
    const dispatch = useAppDispatch();
    const [type, setType] = useState<string>("Nowa strona");
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Order>();
    const services = useSelector(selectUserServices);
    const [searchParams] = useSearchParams();

    const chosenService = searchParams.get('service');

    useEffect(() => {

    }, [type])

    const changeType = (e: any) => {
        setType(e.target.value)
    }

    const onSubmit: SubmitHandler<Order> = data => {
        axios
            .post(`${API_URL}/website-orders`, data)
            .then((response) => {
                console.log(response.data)
                dispatch(addOrder(response.data));
                navigate("/website-orders/description?success=true");
            })
            .catch((err) => {
                console.log(err)
            })
    } 
    return (
        <HeaderForm title="Zamów usługę">
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