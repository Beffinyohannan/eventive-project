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
import ProfileViewCompanyPage from './Pages/Company/ProfileViewCompanyPage';



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

            </Routes>


            <Routes>
              <Route element={<CompanyLoginProtect />}>
                <Route path='/company/signup' element={<CompanySignupPage />} />
                <Route path='/company/login' element={<CompanyLoginPage />} />
              </Route>
              <Route element={<CompanyRouteProtect />} >
                <Route path='/company/homepage' element={<CompanyHomePage />} />
                <Route path='/company/inbox' element={<InboxCompanyPage />} />
                <Route path='/company/profile/:id' element={<ProfileCompanyPage />} />
                <Route path='/company/profile/view/:id' element={<ProfileViewCompanyPage/> } />
                <Route path='/company/chat' element={<ChatCompanyPage />} />
                <Route path='/company/events' element={<EventsCompanyPage />} />
                <Route path='/company/SingleEvents/:id' element={<SingleEventCompanyPage />} />
              </Route>
            </Routes>


            <Routes>
              <Route element={<AdminLoginProtect />} >
                <Route path='/admin/login' element={<AdminLoginPage />} />
              </Route>
              <Route element={<AdminRouteProtect />} >
                <Route path='/admin/dashboard' element={<DashbaordPage />} />
                <Route path='/admin/users' element={<Userspage />} />
                <Route path='/admin/companies' element={<CompaniesPage />} />
                <Route path='/admin/posts' element={<PostsPage />} />
              </Route>
            </Routes>

          </Router>
        </Company>
      </User>

  );
}

export default App;
