import React from "react";
import Description from "../../../components/common/Description/Description";
import "./OrderDescription.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import Advantage from "./Advantage/Advantage";
import { advantages } from "./advantages";
import Button from "../../../components/common/Button/Button";
import Alert, { ALERT_TYPES } from "../../../components/common/Alert/Alert";
import { useTranslation } from "react-i18next";

const OrderDescription: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  let [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const success = searchParams.get("success");
  return (
    <section className="website-orders">
      {success && (
        <Alert
          type={ALERT_TYPES.SUCCESS}
          message="Zamówienie zostało wysłane pomyślnie"
        />
      )}
      <h2>{t("Szukasz kogoś do napisania strony?")}</h2>
      <h1>{t("Trafiłeś do właściwej osoby")}!</h1>
      {currentUser && (
        <Link to="/website-orders" className="button button-blue">
          Zobacz zamówienia
        </Link>
      )}

      <ul>
        {advantages.map((advantage) => (
          <Advantage text={advantage} />
        ))}
      </ul>
      <strong>
        <Description class="description">
          {t('Każdy projekt traktuję indywidualnie dlatego cena jest dostosowana do wymagań klienta.')}
        </Description>
      </strong>
      <div className="website-orders__buttons">
        <Button redirect="/projects" class="button button-grey" type="link">
          {t('Zobacz projekty')}
        </Button>
        <Button
          redirect="/website-orders/new"
          class="button button-grey"
          type="link"
        >
          {t('Zamów stronę')}
        </Button>
        <Button
          redirect="/website-orders/check-status"
          class="button button-grey"
          type="link"
        >
          {t('Zobacz status zamówienia')}
        </Button>
      </div>
    </section>
  );
};

export default OrderDescription;
