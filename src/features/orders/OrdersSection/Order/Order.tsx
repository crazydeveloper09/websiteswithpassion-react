import React from "react"
import { Order as IOrder } from "../../../../interfaces";
import Button from "../../../../components/common/Button/Button";
import './Order.scss';

const Order: React.FC<{order: IOrder, handleDelete: Function}> = ({ order, handleDelete }) => {
    const onDelete = () => {
        handleDelete(order)
    }
    return (
        <div className="order-card">
            <div className="order-card--info">
                <h3 className="order-card__title">{order.websiteTitle}</h3>
                
                {order.previousWebsite && <p className="order-card__description">
                    <a href={order.previousWebsite}>{order.previousWebsite}</a>
                </p>}
                <p className="order-card__description">
                    Budżet: <strong>{order.budget}</strong>
                </p>
              
                    <details className="order-card__description">
                        <strong>
                            {order.whatYouWish}
                        </strong>
                        <summary>
                            Wymagania
                        </summary>
                    </details>
                <br />
                <p className="order-card__description">
                    Status: <strong>
                        { order.status } | { order.statusEn }
                    </strong>
                </p>
                <p className="order-card__description">
                    Imię i nazwisko: <strong> { order.name } </strong>
                </p>
                <p className="order-card__description">
                    Email: <strong>{ order.email }</strong>
                </p>
                <div>
                    <Button type="button" class="button button-yellow" click={onDelete}>
                        Usuń
                    </Button>
                </div>
            </div>
            
        </div>
    )
}

export default Order;