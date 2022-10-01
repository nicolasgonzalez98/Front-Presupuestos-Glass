
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import BudgetForm from './components/BudgetForm'
import ViewerPDF from './components/ViewerPDF';

function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/budget' element={<BudgetForm />} />
        <Route path='/example' element={<ViewerPDF />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
