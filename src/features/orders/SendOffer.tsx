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
import { loadOrders, selectAllOrders, sendOffer } from "./ordersSlice";

export interface SendO {
    topic: string,
    text: string
}

const SendOffer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.orders) 
    const navigate = useNavigate();
    const { order_id } = useParams<string>();
    const { register, handleSubmit } = useForm<SendO>();

    const onSendOffer: SubmitHandler<SendO> = (data) => {
      
        dispatch(sendOffer(data))
        navigate("/website-orders")
          
    }

    useEffect(() => {
        loadOrders();
    }, [dispatch])

    const orders = useSelector(selectAllOrders);
    const selectedOrder = orders.find(order => order._id === order_id);
    document.title = 'Wyślij ofertę | Websites With Passion';

    if(isLoading) {
        return (
          <Loading />
        )
    } 

    return (
        <HeaderForm title={`Wyślij ofertę do zamówienia ${selectedOrder?.websiteTitle}`}>
              {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onSendOffer)}>
                <Field label="Temat maila">
                    <input type="text" {...register("text")}  className="form-control" placeholder="Temat maila" required />
                </Field>
                <Field label="Treść maila">
                    <textarea {...register("topic")} rows={70} className="form-control" placeholder="Treść" required></textarea>
                </Field>
                <input type="submit" value="Wyślij ofertę" className="button button-grey"/>
            </form>
        </HeaderForm>
    )
}

export default SendOffer;