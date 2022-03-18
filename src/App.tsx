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



const App: React.FC = () => {
  
  
    return (
      <Router>
          <Navigation />
      
          <main>  
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path="/" element={<IndexView />} />
              <Route path="/projects" element={<ProjectsIndex />} />
              <Route path="/projects/:projectLink" element={<ProjectsShow />} />
              <Route path='/projects/category/:category_link' element={<CategoryShow />} />
              <Route path="/website-orders/description" element={<OrderDescription />} />
              <Route path="/website-orders" element={<OrdersSection />} />
              <Route path='/website-orders/new' element={<NewOrder />} />
            </Routes>
          </main>
         <Footer />
         
        
      </Router>
      
    );
  
    
  

    
  
}

export default App;
