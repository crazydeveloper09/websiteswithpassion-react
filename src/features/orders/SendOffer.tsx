/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import Loading from "../../components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loadOrders, selectAllOrders } from "./ordersSlice";

interface SendO {
    topic: string,
    text: string
}

const SendOffer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.orders) 
    const navigate = useNavigate();
    const { order_id } = useParams<string>();
    const { register, handleSubmit } = useForm<SendO>();

    const onSendOffer: SubmitHandler<SendO> = (data) => {
        console.log(data)
    }

    useEffect(() => {
        loadOrders();
    }, [dispatch])

    const orders = useSelector(selectAllOrders);
    const selectedOrder = orders.find(order => order._id === order_id);

    if(isLoading) {
        return (
          <Loading />
        )
    } 

    return (
        <HeaderForm title={`Wyślij ofertę do zamówienia ${selectedOrder?.websiteTitle}`}>
            <form onSubmit={handleSubmit(onSendOffer)}>
                <Field label="Temat maila">
                    <input type="text" {...register("text")}  className="form-control" placeholder="Temat maila" />
                </Field>
                <Field label="Treść maila">
                    <textarea {...register("topic")} rows={70} className="form-control" placeholder="Treść"></textarea>
                </Field>
                <input type="submit" value="Wyślij ofertę" className="button button-grey"/>
            </form>
        </HeaderForm>
    )
}

export default SendOffer;