import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PizzaForm from '../components/PizzaForm';
import PizzaOrderStatus from '../components/PizzaOrderStatus';
import '../../styles/App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/pizza-order-form" replace />} />
          <Route exact path="/pizza-order-form" element={<PizzaForm />} />
          <Route exact path="/order-status" element={<PizzaOrderStatus />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
