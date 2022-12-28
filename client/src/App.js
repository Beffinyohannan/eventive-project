import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/User/LoginPage';
import UserSignupPage from './Pages/User/UserSignupPage';
import LandingPage from './Pages/User/LandingPage';
import CompanySignupPage from './Pages/Company/CompanySignupPage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import HomePage from './Pages/User/HomePage';
import DashbaordPage from './Pages/Admin/DashbaordPage';
import Userspage from './Pages/Admin/Userspage';
import CompaniesPage from './Pages/Admin/CompaniesPage';
import PostsPage from './Pages/Admin/PostsPage';
import User from './Store/UserContext'
import Company from './Store/CompanyContext';
import CompanyLoginPage from './Pages/Company/CompanyLoginPage';
import CompaniesListPage from './Pages/User/CompaniesListPage';
import CompanyHomePage from './Pages/Company/CompanyHomePage';

import ProtectedRoutes from './Auth/ProtectedRoutes';
import LoginProtect from './Auth/LoginProtect';
import CompanyRouteProtect from './Auth/CompanyRouteProtect';
import CompanyLoginProtect from './Auth/CompanyLoginProtect';
import AdminRouteProtect from './Auth/AdminRouteProtect';
import AdminLoginProtect from './Auth/AdminLoginProtect';

import ProfilePage from './Pages/User/ProfilePage';
import EnquireFormPage from './Pages/User/EnquireFormPage';
import InboxPage from './Pages/User/InboxPage';
import InboxCompanyPage from './Pages/Company/InboxCompanyPage';
import ProfileCompanyPage from './Pages/Company/ProfileCompanyPage';
import ChatPage from './Pages/Chat/ChatPage';
import ChatCompanyPage from './Pages/Chat/ChatCompanyPage';
import CompanyProfilePage from './Pages/User/CompanyProfilePage';
import EventPage from './Pages/User/EventPage';
import EventsCompanyPage from './Pages/Company/EventsCompanyPage';
import SingleEventCompanyPage from './Pages/Company/SingleEventCompanyPage';
import SingleEventPage from './Pages/User/SingleEventPage';
import PageNotFound from './Pages/PageNotFound';



function App() {


  return (



    <User>
      <Company>

        <Router>
          <Routes>

            <Route path='/' element={<LandingPage />} />
            <Route element={<LoginProtect />}>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<UserSignupPage />} />
            </Route>
            <Route element={<ProtectedRoutes />} >
              <Route path='/homepage' element={<HomePage />} />
              <Route path='/companies' element={<CompaniesListPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/enquire-form' element={<EnquireFormPage />} />
              <Route path='/inbox' element={<InboxPage />} />
              <Route path='/profile/company/:id' element={<CompanyProfilePage />} />
              <Route path='/events' element={<EventPage />} />
              <Route path='/chat' element={<ChatPage />} />
              <Route path='/SingleEvents/:id' element={<SingleEventPage />} />
            </Route>

            {/* </Routes> */}


            {/* <Routes> */}
            <Route element={<CompanyLoginProtect />}>
              <Route path='/company/signup' element={<CompanySignupPage />} />
              <Route path='/company/login' element={<CompanyLoginPage />} />
            </Route>
            <Route path='/company' element={<CompanyRouteProtect />} >
              <Route path='homepage' element={<CompanyHomePage />} />
              <Route path='inbox' element={<InboxCompanyPage />} />
              <Route path='profile/:id' element={<ProfileCompanyPage />} />
              <Route path='chat' element={<ChatCompanyPage />} />
              <Route path='events' element={<EventsCompanyPage />} />
              <Route path='SingleEvents/:id' element={<SingleEventCompanyPage />} />
            </Route>
            {/* </Routes> */}


            {/* <Routes> */}
            <Route element={<AdminLoginProtect />} >
              <Route path='/admin-login' element={<AdminLoginPage />} />
            </Route>
            <Route path='/admin' element={<AdminRouteProtect />} >
              <Route path='dashboard' element={<DashbaordPage />} />
              <Route path='users' element={<Userspage />} />
              <Route path='companies' element={<CompaniesPage />} />
              <Route path='posts' element={<PostsPage />} />
            </Route>
            <Route path='/*' element={<PageNotFound />} />
          </Routes>

          <Routes>
            {/* <Route path='/*' element={<PageNotFound/>}/> */}
          </Routes>



        </Router>
      </Company>
    </User>

  );
}

export default App;
