import React from "react";
import Icon from "../../../../components/common/Icon/Icon";
import Description from "../../../../components/common/Description/Description";
import { Technology as ITechnology, User } from "../../../../interfaces";
import './Technology.scss';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { deleteTechnology } from "../../technologySlice";

interface TechnologyProps {
    technology: ITechnology,
    currentUser: User
}

const Technology: React.FC<TechnologyProps> = ({ technology, currentUser }) => {
        const dispatch = useAppDispatch();
        return (
            <div className="technology-div">
                <Icon class={technology.icon} />
                <Description class="description">{technology.name}</Description>
                { currentUser && <>
                    <Link to={`/about/${currentUser._id}/technologies/${technology._id}/edit`}>Edytuj</Link>
                    <Link to="/" onClick={() => dispatch(deleteTechnology(technology._id))}>Usuń</Link>
                </> }
            </div>
        )
    
}

export default Technology;