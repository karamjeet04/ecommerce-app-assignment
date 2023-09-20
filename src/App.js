
import './App.css';
import ProductLayout from './products/ProductLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeatailPage from './products/DeatailPage';
import NotFound from './products/NotFound';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<ProductLayout/>} />
        <Route path="/product-url" element={<DeatailPage/>} />
        {/* Add a catch-all route for 404 */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
