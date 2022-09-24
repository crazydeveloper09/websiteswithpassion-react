import React, { useContext, useState } from "react";
import Description from "../../../../components/common/Description/Description";
import { Announcement as IAnnouncement, User } from "../../../../interfaces";
import { FaTimes } from 'react-icons/fa';
import './Announcement.scss';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { deleteAnnouncement } from "../../announcementsSlice";
import LocaleContext from "../../../../LocaleContext";

const Announcement: React.FC<{announcement: IAnnouncement, currentUser: User}> = ({ announcement, currentUser }) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const { locale } = useContext(LocaleContext)

    const onClose = () => {
        setIsOpen(!isOpen);
    }
    if(isOpen) {
        return (
            <div className="announcement">
                <Description class="description">{locale === 'pl' ? announcement.pl : announcement.en}</Description>
                <FaTimes onClick={onClose} />
                {currentUser?.username && 
                    <div className="announcement__editing">
                        <Link to={`/announcements/${announcement._id}/edit`}>Edytuj</Link>
                        <Link to="/" onClick={() => dispatch(deleteAnnouncement(announcement._id))}>Usuń</Link>
                    </div>
                }
            </div>
        )
    }
    return (
        <p></p>
    )
}

export default Announcement;