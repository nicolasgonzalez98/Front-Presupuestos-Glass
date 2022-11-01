
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import BudgetForm from './components/BudgetForm'
import ViewerPDF from './components/ViewerPDF';
import NavGlassDoor from './components/Navbar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import ArticleCreate from './components/ArticleCreate';
import ClientCreate from './components/ClientCreate';
import MyArticles from './components/MyArticles';
import MyClients from './components/MyClients';
import MyBudgets from './components/MyBudgets';

function App() {

  return (
    <div>
      <NavGlassDoor />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />}/>
          <Route path='/sign-up' element={<SignUp />} />
          {/*PRESUPUESTOS*/}
          <Route path='/budget' element={<BudgetForm />} />
          <Route path='/my_budgets' element={<MyBudgets />} />
          <Route path='/example' element={<ViewerPDF />} />
          {/*ARTICULOS*/}
          <Route path='/create_article' element={<ArticleCreate />} />
          <Route path='/my_articles' element={<MyArticles />} />
          {/*Clientes*/}
          <Route path='/create_client' element={<ClientCreate />} />
          <Route path='/my_clients' element={<MyClients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
