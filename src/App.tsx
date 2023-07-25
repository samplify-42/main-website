import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import Navbar from './components/navbar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route>
          <Route index path='/*' element={<Home />} />
          <Route index path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
