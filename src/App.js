import './App.css';
import Form from './component/Form';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductManagement from './component/ProductManagement';


function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/form" element={<Form/>} />
        <Route path="/productmanagement" element={<ProductManagement />} />
      </Routes>
    </div>
  );
}

export default App;
