import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button/Button";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { useAppDispatch } from "../../hooks";
import { selectLoggedInUser } from "../user/userSlice";
import Achievement from "./Achievement/Achievement";
import './AchievementSection.scss';
import { loadAchievements, selectAllAchievements } from "./achievementsSlice";

const AchievementsSection: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAchievements());
    }, [dispatch])

    const achievements = useSelector(selectAllAchievements);
    const currentUser = useSelector(selectLoggedInUser)
    return (
        <section className="achievements">
            <SectionHeader>Zobacz moje osiągnięcia</SectionHeader>
            {currentUser?.username && <Button type="link" class="button button-grey" redirect="/achievements/new">Dodaj osiągnięcie</Button>}
            <div className="achievement-div">
                {achievements && achievements.length && achievements.map((achievement) => 
                    <Achievement achievement={achievement} />
                )}
            </div>
        
        </section>
    )
}

export default AchievementsSection;

