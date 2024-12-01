import Home from "./components/Home";
import Cadastrar from "./components/Cadastrar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Listar from "./components/Listar";
import "./App.css";
import Alterar from "./components/Alterar";
import Excluir from "./components/Excluir";

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
						<li>
							<Link to="/alterar">Alterar</Link>
						</li>
						<li>
							<Link to="/excluir">Excluir</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/listar" element={<Listar />} />
					<Route path="/cadastro" element={<Cadastrar />} />
					<Route path="/alterar" element={<Alterar />} />
					<Route path="/excluir" element={<Excluir />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
