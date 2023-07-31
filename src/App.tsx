import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import Navbar from './components/navbar/NavBar';
import { Profile } from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path='/*' element={<Home />} />
          <Route index path='/home' element={<Home />} />
          <Route index path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
