import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Profile } from "./pages/Profile";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Login } from "./pages/Login";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index path='/*' element={<Home />} />
            <Route index path='/home' element={<Home />} />
            <Route index path='/profile' element={<Profile />} />
            <Route index path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Notifications />
    </MantineProvider>
  );
}

export default App;
