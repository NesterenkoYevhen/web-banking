import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { useThunk } from "./hooks/use-thunk";
import { fetchUser, IRootState } from "./store";

import Loader from "./common/Loader/Loader";
import Home from "./components/Home/Home";
import AuthLayout from "./components/hoc/Layout/AuthLayout/AuthLayout";
import MainLayout from "./components/hoc/Layout/MainLayout/MainLayout";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import RequireAuth from "./components/hoc/RequireAuth/RequireAuth";
import Start from "./components/Start/Start";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import NotFound from "./components/NotFound/NotFound";
import CreateCard from "./components/CreateCard/CreateCard";
import Transfer from "./components/Transfer/Transfer";
import History from "./components/History/History";
import Chat from "./components/Chat/Chat";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import AdminLayout from "./components/hoc/Layout/AdminLayout/AdminLayout";
import AdminRequests from "./components/Admin/AdminRequests/AdminRequests";
import AdminUsers from "./components/Admin/AdminUsers/AdminUsers";
import AdminMessages from "./components/Admin/AdminMessages/AdminMessages";
import AdminChat from "./components/Admin/AdminChat/AdminChat";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";


const ROLES = {
  'User': 'USER',
  'Admin': 'ADMIN'
}

const App = () => {
  const [doFetchUser, isFetchingUser] = useThunk(fetchUser);
  const userFromState = useSelector((state: IRootState) => {
		return state.user;
	});

  useEffect(() => {
    doFetchUser()
  }, [doFetchUser]);

  return (	
    <>	
      {isFetchingUser && <Loader />}	
      <Routes>	
        <Route	
          index	
          element={	
            userFromState.isAuth ? (	
              userFromState.role === ROLES.User ? <Navigate to='/home' /> : <Navigate to='/admin/home' />	
            ) : (	
              <Start />	
            )	
          }	
        />
        <Route element={<AuthLayout />}>	
          <Route path='/registration' element={<Registration />} />	
          <Route path='/login' element={<Login />} />
          <Route path='/password' element={<ForgotPassword />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>	
          <Route element={<MainLayout />}>	
            <Route path='/home' element={<Home />} />	
            <Route path='/createcard' element={<CreateCard />} />	
            <Route path='/transfer' element={<Transfer />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/history' element={<History />} />
          </Route>	
        </Route>	
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>	
          <Route element={<AdminLayout />} path='/admin'>	
            <Route path='home' element={<AdminHome />} />	
            <Route path='requests' element={<AdminRequests />} />
            <Route path='users' element={<AdminUsers />} />	
            <Route path='messages' element={<AdminMessages />} />
            <Route path='chat' element={<AdminChat />} />
          </Route>	
        </Route>	
        <Route element={<AuthLayout />}>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>	
    </>	
  );	
};

export default App;
