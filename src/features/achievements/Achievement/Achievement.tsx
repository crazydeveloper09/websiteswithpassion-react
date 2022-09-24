import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { Achievement  as IAchievement} from '../../../interfaces';
import LocaleContext from '../../../LocaleContext';
import { selectLoggedInUser } from '../../user/userSlice';
import { deleteAchievement } from '../achievementsSlice';
import './Achievement.scss';



const Achievement: React.FC<{ achievement: IAchievement }> = ({ achievement }) => {

    const dispatch = useAppDispatch();
    const currentUser = useSelector(selectLoggedInUser);
    const { locale } = useContext(LocaleContext);
    
    return (
            <div className="achievement">
                <h3 className='achievement__title'>{ locale === 'pl' ? achievement.title : achievement.titleEn }</h3>
                <img src={achievement.picture} alt={achievement.title} className="achievement__img" />
                {currentUser?.username && 
                    <div className="achievement__editing">
                        <Link to={`/achievements/${achievement._id}/edit`}>Edytuj</Link>
                        <Link to="/" onClick={() => dispatch(deleteAchievement(achievement._id))}>Usuń</Link>
                        <Link to={`/achievements/${achievement._id}/edit/picture`}>Edytuj zdjęcie główne</Link>
                    </div>
                }
            </div>
            
    );
    
    
}

export default Achievement;