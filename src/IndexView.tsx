import React from "react";
import SectionHeader from './components/common/SectionHeader/SectionHeader';
import Description from './components/common/Description/Description';
import { useSelector} from 'react-redux';
import { selectUserInfo } from './features/user/userSlice';
import { useEffect } from 'react';
import { loadUser } from './features/user/userSlice';
import Achievement from './components/Achievement/Achievement';
import Loading from "./components/common/Loading/Loading";
import { useAppSelector, useAppDispatch } from "./hooks";
import WhatIDoSection from "./features/services/WhatIdoSection/WhatIDoSection";
import TechnologySection from "./features/technologies/TechnologySection/TechnologySection";
import Header from "./components/Header/Header";
import Alert, { ALERT_TYPES } from "./components/common/Alert/Alert";



const IndexView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, errMessage } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]) 
  
  const user = useSelector(selectUserInfo);
  

  if(isLoading && !user!.achievements) {
    return (
      <Loading />
    )
  } 
  if(hasError) {
    return (
      <Alert type={ALERT_TYPES.ERROR} message={errMessage!} />
    )
  }
    return (
       <>
        <Header />
        <main>
              
              <WhatIDoSection services={user && user.services} />
              <section className="about">
                <SectionHeader>Poznaj mnie bliżej</SectionHeader>
                <Description class="description">{user!.about}</Description>
              </section>
              <section className="achievements">
                <SectionHeader>Zobacz moje osiągnięcia</SectionHeader>
                <div className="achievement-div">
                  {user && user.achievements && user.achievements.length > 0 && user.achievements.map((achievement: { title: string; picture: string; }) => 
                    <Achievement title={achievement.title} picture={achievement.picture} key={achievement.title} />
                  )}
                </div>
                
              </section>
              <TechnologySection technologies={user && user.technologies} />
        </main>
       </>
        
    );
}

export default IndexView;