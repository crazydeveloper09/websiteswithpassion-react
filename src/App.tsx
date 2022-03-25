import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import IndexView from './IndexView';
import OrderDescription from './features/orders/OrderDescription/OrderDescription';
import ProjectsIndex from './features/projects/ProjectsIndex/ProjectsIndex';
import ProjectsShow from './features/projects/ProjectsShow/ProjectsShow';
import Footer from './components/Footer/Footer';
import OrdersSection from './features/orders/OrdersSection/OrdersSection';
import Login from './components/Login/Login';
import NewOrder from './features/orders/NewOrder/NewOrder';
import CategoryShow from './features/categories/CategoryShow';
import NewTechnology from './features/technologies/NewTechnology';
import EditOrder from './features/orders/EditOrder';
import SendOffer from './features/orders/SendOffer';
import EditTechnology from './features/technologies/EditTechnology';
import NewService from './features/services/NewService';
import EditService from './features/services/EditService';
import NewProject from './features/projects/NewProject';



const App: React.FC = () => {
  
  
    return (
      <Router>
          <Navigation />
      
          <main>  
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path="/" element={<IndexView />} />
              <Route path="/projects" element={<ProjectsIndex />} />
              <Route path="/projects/new" element={<NewProject />} />
              <Route path="/projects/:projectLink" element={<ProjectsShow />} />
              <Route path='/projects/category/:category_link' element={<CategoryShow />} />
              <Route path="/website-orders/description" element={<OrderDescription />} />
              <Route path="/website-orders" element={<OrdersSection />} />
              <Route path='/website-orders/new' element={<NewOrder />} />
              <Route path="/website-orders/:order_id/edit" element={<EditOrder />} />
              <Route path="/website-orders/:order_id/send" element={<SendOffer />} />
              <Route path='/about/:user_id/technologies/new' element={<NewTechnology />} />
              <Route path='/about/:user_id/technologies/:technology_id/edit' element={<EditTechnology />} />
              <Route path='/about/:user_id/services/new' element={<NewService />} />
              <Route path='/about/:user_id/services/:service_id/edit' element={<EditService />} />
            </Routes>
          </main>
         <Footer />
         
        
      </Router>
      
    );
  
    
  

    
  
}

export default App;
