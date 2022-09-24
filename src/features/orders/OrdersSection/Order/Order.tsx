import React, { useContext } from "react";
import { Order as IOrder } from "../../../../interfaces";
import Button from "../../../../components/common/Button/Button";
import "./Order.scss";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../user/userSlice";
import { useTranslation } from "react-i18next";
import LocaleContext from "../../../../LocaleContext";

const Order: React.FC<{ order: IOrder; handleDelete?: Function }> = ({
  order,
  handleDelete,
}) => {
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();
  
  const onDelete = () => {
    handleDelete!(order);
  };

  const isLoggedIn = useSelector(selectLoggedInUser);
  return (
    <div className="order-card">
      <div className="order-card--info">
        <h3 className="order-card__title">{order.websiteTitle}</h3>

        {order.previousWebsite && (
          <p className="order-card__description">
            <a href={order.previousWebsite}>{order.previousWebsite}</a>
          </p>
        )}
        <p className="order-card__description">
         {t('Budżet')}: <strong>{order.budget}</strong>
        </p>
        <p className="order-card__description">
          {t('Typ')}: <strong>{order.type}</strong>
        </p>

        <details className="order-card__description">
          
          <strong>{order.whatYouWish}</strong>
          <summary>{t('Wymagania')}</summary>
        </details>
        <br />
        <p className="order-card__description">
          Status:{" "}
          <strong>
          { locale === 'pl' ? order.status : order.statusEn}
          </strong>
        </p>
        <p className="order-card__description">
          {t('Imię i nazwisko')}: <strong> {order.name} </strong>
        </p>
        <p className="order-card__description">
          Email: <strong>{order.email}</strong>
        </p>
        <div>
          {isLoggedIn && <>
            <Button
            type="link"
            redirect={`/website-orders/${order._id}/edit`}
            class="button button-yellow"
          >
            Edytuj
          </Button>
          {order.status === "Zamówienie wysłane do mnie" &&  <Button
            type="link"
            redirect={`/website-orders/${order._id}/send`}
            class="button button-grey"
          >
            Wyślij ofertę
          </Button>}
         
          <Button type="button" class="button button-blue" click={onDelete}>
            Usuń
          </Button>
          <br />
          <br />
          </>}
          
          {(order.status === "Oferta zaakceptowana" ||
            order.statusEn === "Order has been accepted") && (
            <a
              href={order.rockLink}
              className="button button-rock"
              target={'_blank'}
              rel={'noreferrer'}
            >
              {t('Zobacz postępy')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
