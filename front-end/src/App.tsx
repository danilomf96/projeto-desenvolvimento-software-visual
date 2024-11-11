import Home from './components/Home';
import Cadastrar from './components/Cadastrar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Listar from './components/Listar';
import "./App.css";

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div className="App">
              <nav>
                  <ul>
                    <li>
                      <Link to="/">Inicio</Link>
                    </li>
                      <li>
                          <Link to="/listar">Lista</Link>
                      </li>
                      <li>
                          <Link to="/cadastro">Cadastro</Link>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path='/' element={<Home/>}></Route>
                  <Route path="/listar" element={<Listar/>} />
                  <Route path="/cadastro" element={<Cadastrar/>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
};

export default App;
