import React, { useEffect } from "react";
import WhatIDoSection from "./features/services/WhatIdoSection/WhatIDoSection";
import TechnologySection from "./features/technologies/TechnologySection/TechnologySection";
import Header from "./components/Header/Header";
import AchievementsSection from "./features/achievements/AchievementsSection";
import AboutSection from "./features/user/AboutSection/AboutSection";
import { useAppDispatch } from "./hooks";
import { loadAnnouncements, selectLastAnnouncement } from "./features/announcements/announcementsSlice";
import { useSelector } from "react-redux";
import AnnouncementSection from "./features/announcements/AnnouncemmentsSection/AnnouncemmentsSection";

const IndexView: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadAnnouncements());
  })

  const lastAnnouncement = useSelector(selectLastAnnouncement);
  return (
    <>
      <Header />
      <main>
        {lastAnnouncement && <AnnouncementSection lastAnnouncement={lastAnnouncement}/>}
        <WhatIDoSection />
        <AboutSection />
        <AchievementsSection />
        <TechnologySection />
      </main>
    </>
  );
};

export default IndexView;
