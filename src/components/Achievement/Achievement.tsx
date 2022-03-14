import React from 'react';
import './Achievement.scss';

interface AchievementProps {
    title: string,
    picture: string
}

const Achievement: React.FC<AchievementProps> = props => {
    
    return (
            <div className="achievement">
                <h3 className='achievement__title'>{props.title }</h3>
                <img src={props.picture} alt={props.title} className="achievement__img" />
            </div>
            
    );
    
    
}

export default Achievement;