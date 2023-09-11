import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/Home';
import { Profile } from "./pages/Profile";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Login } from "./pages/Login";
import { getCookie } from "./utils/Cookies";
import { Register } from "./pages/Register";
import jwt from 'jwt-decode'

function App() {
  const token = getCookie('token');
  console.log(token)
  const user = token ? jwt(token) : null
  
  if (!token) {
    return (
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Notifications />
      </MantineProvider>
    );
  }
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile user={user} />} />
        </Routes>
      </BrowserRouter>
      <Notifications />
    </MantineProvider>
  );
}

export default App;
