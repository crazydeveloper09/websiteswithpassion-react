import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button/Button";
import { Announcement as IAnnouncement } from "../../../interfaces";
import { selectLoggedInUser } from "../../user/userSlice";
import './AnnouncementsSection.scss';
import Announcement from "./Announcemment/Announcemment";

const AnnouncementSection: React.FC<{lastAnnouncement: IAnnouncement}> = ({ lastAnnouncement }) => {
    const currentUser = useSelector(selectLoggedInUser);
    return (
        <section className="announcements">
            <Announcement announcement={lastAnnouncement} currentUser={currentUser!} />
            {currentUser?.username && <Button type="link" class="button button-grey" redirect="/announcements/new">Dodaj ogłoszenie</Button>}
        </section>
    )
}

export default AnnouncementSection;