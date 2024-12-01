import { useEffect, useState } from "react";
import "./Css/Cadastrar.css";
import { Funcionario } from "../models/Funcionario";
import { Servico } from "../models/Servico";
import { Empresa } from "../models/Empresa";

// Componente principal
function Cadastrar() {
	const [servicos, setServicos] = useState<Servico[]>([]);
	const [servicoSelecionado, setServicoSelecionado] = useState<string>("");

	// Estados para Funcionario
	const [nomeFuncionario, setNomeFuncionario] = useState<string>("");
	const [cargoFuncionario, setCargoFuncionario] = useState<string>("");
	const [contatoFuncionario, setContatoFuncionario] = useState<string>("");

	// Estados para Empresa
	const [nomeEmpresa, setNomeEmpresa] = useState<string>("");
	const [cnpjEmpresa, setCnpjEmpresa] = useState<string>("");
	const [enderecoEmpresa, setEnderecoEmpresa] = useState<string>("");

	// Estados para Servico
	const [tipoServico, setTipoServico] = useState<string>("");
	const [valorServico, setValorServico] = useState<string>("");
	const [dataContratacao, setDataContratacao] = useState<string>("");

	// Estado de mensagens
	const [mensagem, setMensagem] = useState<string | null>(null);
	const [erro, setErro] = useState<string | null>(null);
	const [carregando, setCarregando] = useState<boolean>(false);

	// Função genérica para enviar dados para uma URL específica
	const cadastrar = async (url: string, dados: any) => {
		setCarregando(true);
		setMensagem(null);
		setErro(null);

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dados),
			});

			if (!response.ok) {
				throw new Error("Erro na requisição: " + response.statusText);
			}

			setMensagem("Cadastro realizado com sucesso!");
			return await response.json();
		} catch (error: any) {
			setErro("Erro ao cadastrar: " + error.message);
		} finally {
			setCarregando(false);
		}
	};

	// Função para buscar serviços da API
	const buscarServicos = async () => {
		try {
			const response = await fetch("http://localhost:5043/servico/listar");
			if (!response.ok) {
				throw new Error("Erro ao buscar serviços: " + response.statusText);
			}
			const data = await response.json();
			setServicos(data);
		} catch (error: any) {
			setErro("Erro ao carregar serviços: " + error.message);
		}
	};

	// Carregar serviços ao montar o componente
	useEffect(() => {
		buscarServicos();
	}, []);

	// Funções de envio para cada tipo
	const handleSubmitFuncionario = (e: React.FormEvent) => {
		e.preventDefault();
		const novoFuncionario: Funcionario = {
			nome: nomeFuncionario,
			cargo: cargoFuncionario,
			contato: contatoFuncionario,
		};
		cadastrar(
			"http://localhost:5043/funcionario/cadastrar/",
			novoFuncionario
		).then(() => {
			setNomeFuncionario(nomeFuncionario);
			setCargoFuncionario(cargoFuncionario);
			setContatoFuncionario(contatoFuncionario);
		});
	};

	const handleSubmitEmpresa = (e: React.FormEvent) => {
		e.preventDefault();
		const novaEmpresa: Empresa = {
			nome: nomeEmpresa,
			cnpj: cnpjEmpresa,
			endereco: enderecoEmpresa,
		};
		cadastrar("http://localhost:5043/empresa/cadastrar/", novaEmpresa).then(
			() => {
				setNomeEmpresa(nomeEmpresa);
				setCnpjEmpresa(cnpjEmpresa);
				setEnderecoEmpresa(enderecoEmpresa);
			}
		);
	};

	const handleSubmitServico = (e: React.FormEvent) => {
		e.preventDefault();
		const novoServico: Servico = {
			TipoServico: tipoServico,
			valor: valorServico,
			DataContratacao: dataContratacao,
		};
		cadastrar("http://localhost:5043/servico/cadastrar/", novoServico).then(
			() => {
				setTipoServico(tipoServico);
				setValorServico(valorServico);
				setDataContratacao(dataContratacao);
			}
		);
	};
	return (
		<div>
			<h2>Cadastrar Funcionário</h2>
			<form onSubmit={handleSubmitFuncionario}>
				<label>
					Nome:
					<input
						type="text"
						value={nomeFuncionario}
						onChange={(e) => setNomeFuncionario(e.target.value)}
						required
					/>
				</label>
				<label>
					Cargo:
					<input
						type="text"
						value={cargoFuncionario}
						onChange={(e) => setCargoFuncionario(e.target.value)}
						required
					/>
				</label>
				<label>
					Contato:
					<input
						type="text"
						value={contatoFuncionario}
						onChange={(e) => setContatoFuncionario(e.target.value)}
						required
					/>
				</label>
				<button type="submit" disabled={carregando}>
					{carregando ? "Cadastrando..." : "Cadastrar"}
				</button>
			</form>

			<div>
				<h2>Cadastrar Empresa</h2>
				<form onSubmit={handleSubmitEmpresa}>
					<label>
						Nome:
						<input
							type="text"
							value={nomeEmpresa}
							onChange={(e) => setNomeEmpresa(e.target.value)}
							required
						/>
					</label>
					<label>
						CNPJ:
						<input
							type="text"
							value={cnpjEmpresa}
							onChange={(e) => setCnpjEmpresa(e.target.value)}
							required
						/>
					</label>
					<label>
						Endereço:
						<input
							type="text"
							value={enderecoEmpresa}
							onChange={(e) => setEnderecoEmpresa(e.target.value)}
							required
						/>
					</label>
					<label>
						Serviço:
						<select
							value={servicoSelecionado}
							onChange={(e) => setServicoSelecionado(e.target.value)}
							required>
							<option value="">Selecione um serviço</option>
							{servicos.map((servico) => (
								<option key={servico.id} value={servico.id}>
									{servico.TipoServico}
								</option>
							))}
						</select>
					</label>
					<button type="submit" disabled={carregando}>
						{carregando ? "Cadastrando..." : "Cadastrar"}
					</button>
				</form>
				{mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
				{erro && <p style={{ color: "red" }}>{erro}</p>}
			</div>

			<h2>Cadastrar Serviço</h2>
			<form onSubmit={handleSubmitServico}>
				<label>
					Tipo de Serviço:
					<input
						type="text"
						value={tipoServico}
						onChange={(e) => setTipoServico(e.target.value)}
						required
					/>
				</label>
				<label>
					Valor:
					<input
						type="text"
						value={valorServico}
						onChange={(e) => setValorServico(e.target.value)}
						required
					/>
				</label>
				<label>
					Data de Contratação:
					<input
						type="date"
						value={dataContratacao}
						onChange={(e) => setDataContratacao(e.target.value)}
						required
					/>
				</label>
				<button type="submit" disabled={carregando}>
					{carregando ? "Cadastrando..." : "Cadastrar"}
				</button>
			</form>

			{mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
			{erro && <p style={{ color: "red" }}>{erro}</p>}
		</div>
	);
}

export default Cadastrar;
