import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button/Button";
import Description from "../../../components/common/Description/Description";
import Error from "../../../components/common/Error/Error";
import Loading from "../../../components/common/Loading/Loading";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import LocaleContext from "../../../LocaleContext";
import { loadUser, selectLoggedInUser, selectUserInfo } from "../userSlice";
import "./AboutSection.scss";

const AboutSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, errMessage } = useAppSelector(
    (state) => state.user
  );
  const { locale } = useContext(LocaleContext);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const user = useSelector(selectUserInfo);
  const currentUser = useSelector(selectLoggedInUser);

  if (isLoading) {
    return <Loading />;
  }
  if (hasError) {
    return <Error message={errMessage!} />;
  }
  return (
    <section className="about">
      <SectionHeader>Poznaj mnie bliżej</SectionHeader>
      <Description class="description">
        {locale === "pl" ? user.about : user.en}
      </Description>
      {currentUser?.username && (
        <Button
          class="button button-grey"
          type="link"
          redirect={`/about/${currentUser._id}/edit`}
        >
          Edytuj informacje
        </Button>
      )}
    </section>
  );
};

export default AboutSection;
