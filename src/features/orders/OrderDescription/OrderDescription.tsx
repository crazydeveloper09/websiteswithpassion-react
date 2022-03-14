import React from 'react';
import Description from '../../../components/common/Description/Description';
import './OrderDescription.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import Advantage from './Advantage/Advantage';
import { advantages } from './advantages';
import Button from '../../../components/common/Button/Button';
import Alert, { ALERT_TYPES } from '../../../components/common/Alert/Alert';

const OrderDescription: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.user);
    let [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    return (
        <section className='website-orders'>
            { success && <Alert type={ALERT_TYPES.SUCCESS} message="Zamówienie zostało wysłane pomyślnie" />}
            <h2>Szukasz kogoś do napisania strony?</h2>
            <h1>Trafiłeś do właściwej osoby!</h1>
            {currentUser && <Link to="/website-orders" className="button button-blue">
                Zobacz zamówienia
            </Link>}
           
            <ul>
                { advantages.map(advantage => <Advantage text={advantage} />) }
            </ul>
            <strong><Description class="description">Każdy projekt traktuję indywidualnie dlatego cena jest dostosowana do wymagań klienta.</Description></strong>
            <Button redirect="/projects" class='button button-blue' type='link'> Zobacz projekty</Button>
            <Button redirect="/website-orders/new" class='button button-yellow' type='link'>Złoż zamówienie</Button>
        </section>
       
    )
}

export default OrderDescription;