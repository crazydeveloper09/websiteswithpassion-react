import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import IndexView from "./IndexView";
import OrderDescription from "./features/orders/OrderDescription/OrderDescription";
import ProjectsIndex from "./features/projects/ProjectsIndex/ProjectsIndex";
import ProjectsShow from "./features/projects/ProjectsShow/ProjectsShow";
import Footer from "./components/Footer/Footer";
import OrdersSection from "./features/orders/OrdersSection/OrdersSection";
import Login from "./features/user/Login/Login";
import NewOrder from "./features/orders/NewOrder/NewOrder";
import CategoryShow from "./features/categories/CategoryShow";
import NewTechnology from "./features/technologies/NewTechnology";
import EditOrder from "./features/orders/EditOrder";
import SendOffer from "./features/orders/SendOffer";
import EditTechnology from "./features/technologies/EditTechnology";
import NewService from "./features/services/NewService";
import EditService from "./features/services/EditService";
import NewProject from "./features/projects/NewProject";
import EditProjectMainPhoto from "./features/projects/EditProjectMainPhoto";
import EditProject from "./features/projects/EditProject";
import EditUser from "./features/user/EditUser";
import AddPictureToProjectGallery from "./features/projects/AddPToProjectGallery";
import NewAnnouncement from "./features/announcements/NewAnnouncement";
import EditAnnouncement from "./features/announcements/EditAnnouncement";
import NewAchievement from "./features/achievements/NewAchievement";
import EditAchievement from "./features/achievements/EditAchievement";
import EditachievementMainPhoto from "./features/achievements/EditAchievementMainPicture";
import NewCategory from "./features/categories/NewCategory";
import EditCategory from "./features/categories/EditCategory";
import AddReview from "./features/projects/AddProjectReview";
import Loading from "./components/common/Loading/Loading";
import LocaleContext from "./LocaleContext";
import i18n from "./i18n";
import CheckStatus from "./features/orders/CheckStatus/CheckStatus";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  const [locale, setLocale] = useState<string>(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Navigation />

          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<IndexView />} />
              <Route
                path="/announcements/new"
                element={
                  <ProtectedRoute>
                    <NewAnnouncement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/announcements/:announcement_id/edit"
                element={
                  <ProtectedRoute>
                    <EditAnnouncement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/achievements/new"
                element={
                  <ProtectedRoute>
                    <NewAchievement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/achievements/:achievement_id/edit"
                element={
                  <ProtectedRoute>
                    <EditAchievement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/achievements/:achievement_id/edit/picture"
                element={
                  <ProtectedRoute>
                    <EditachievementMainPhoto />
                  </ProtectedRoute>
                }
              />
              <Route path="/projects" element={<ProjectsIndex />} />
              <Route
                path="/projects/new"
                element={
                  <ProtectedRoute>
                    <NewProject />
                  </ProtectedRoute>
                }
              />
              <Route path="/projects/:projectLink" element={<ProjectsShow />} />
              <Route
                path="/projects/:project_id/edit"
                element={
                  <ProtectedRoute>
                    <EditProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/:project_id/edit/mainPhoto"
                element={
                  <ProtectedRoute>
                    <EditProjectMainPhoto />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/:project_id/add/picture"
                element={
                  <ProtectedRoute>
                    <AddPictureToProjectGallery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/:project_id/reviews/new"
                element={<AddReview />}
              />
              <Route
                path="/projects/category/:category_link"
                element={<CategoryShow />}
              />
              <Route
                path="/projects/category/new"
                element={
                  <ProtectedRoute>
                    <NewCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/category/:category_id/edit"
                element={
                  <ProtectedRoute>
                    <EditCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/website-orders/description"
                element={<OrderDescription />}
              />
              <Route
                path="/website-orders"
                element={
                  <ProtectedRoute>
                    <OrdersSection />
                  </ProtectedRoute>
                }
              />
              <Route path="/website-orders/new" element={<NewOrder />} />
              <Route
                path="/website-orders/check-status"
                element={<CheckStatus />}
              />
              <Route
                path="/website-orders/:order_id/edit"
                element={
                  <ProtectedRoute>
                    <EditOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/website-orders/:order_id/send"
                element={
                  <ProtectedRoute>
                    <SendOffer />
                  </ProtectedRoute>
                }
              />
              <Route path="/about/:user_id/edit" element={<EditUser />} />
              <Route
                path="/about/:user_id/technologies/new"
                element={
                  <ProtectedRoute>
                    <NewTechnology />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about/:user_id/technologies/:technology_id/edit"
                element={
                  <ProtectedRoute>
                    <EditTechnology />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about/:user_id/services/new"
                element={
                  <ProtectedRoute>
                    <NewService />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about/:user_id/services/:service_id/edit"
                element={
                  <ProtectedRoute>
                    <EditService />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </Suspense>
    </LocaleContext.Provider>
  );
};

export default App;
