
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import BudgetForm from './components/BudgetForm'
import ViewerPDF from './components/ViewerPDF';
import NavGlassDoor from './components/Navbar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import ArticleCreate from './components/ArticleCreate';
import ClientCreate from './components/ClientCreate';

function App() {

  return (
    <div>
      <NavGlassDoor />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />}/>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/budget' element={<BudgetForm />} />
          <Route path='/example' element={<ViewerPDF />} />
          <Route path='/create_article' element={<ArticleCreate />} />
          <Route path='/create_client' element={<ClientCreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
