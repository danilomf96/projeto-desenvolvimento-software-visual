import { useEffect, useState } from "react";
import { Funcionario } from "../models/Funcionario";
import "./Css/Listar.css";
import { Empresa } from "../models/Empresa";
import { Servico } from "../models/Servico";
import { useParams } from "react-router-dom";

function Excluir() {
	const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	const [servicos, setServicos] = useState<Servico[]>([]);

	// Função para calcular o valor total dos serviços contratados por uma empresa
	function calcularTotalServicos(empresa: Empresa): number {
		return (
			empresa.ServicosContratados?.reduce((total, servico) => {
				return total + parseFloat(servico.valor || "0");
			}, 0) || 0
		);
	}

	useEffect(() => {
		consultarFuncionarios();
		consultarEmpresas();
		consultarServicos();
	}, []);

	function consultarFuncionarios() {
		fetch("http://localhost:5043/funcionario/listar")
			.then((resposta) => {
				if (!resposta.ok) {
					throw new Error("Erro na requisição dos funcionários");
				}
				return resposta.json();
			})
			.then((funcionarios) => {
				setFuncionarios(funcionarios);
				console.table(funcionarios);
			})
			.catch((erro) => {
				console.error(erro);
			});
	}

	function consultarEmpresas() {
		fetch("http://localhost:5043/empresa/listar")
			.then((resposta) => {
				if (!resposta.ok) {
					throw new Error("Erro na requisição das empresas");
				}
				return resposta.json();
			})
			.then((empresas) => {
				setEmpresas(empresas);
				console.table(empresas);
			})
			.catch((erro) => {
				console.error(erro);
			});
	}

	function consultarServicos() {
		fetch("http://localhost:5043/servico/listar")
			.then((resposta) => {
				if (!resposta.ok) {
					throw new Error("Erro na requisição dos serviços");
				}
				return resposta.json();
			})
			.then((servicos) => {
				setServicos(servicos);
				console.table(servicos);
			})
			.catch((erro) => {
				console.error(erro);
			});
	}

	// Função para excluir um funcionário
	function excluirFuncionario(id: number | undefined) {
		if (id !== undefined) {
			fetch(`http://localhost:5043/funcionario/excluir/${id}`, {
				method: "DELETE",
			})
				.then((resposta) => {
					if (!resposta.ok) {
						throw new Error("Erro ao excluir funcionário");
					}
					setFuncionarios((prevFuncionarios) =>
						prevFuncionarios.filter((funcionario) => funcionario.id !== id)
					);
					console.log("Funcionário excluído com sucesso");
				})
				.catch((erro) => {
					console.error(erro);
				});
		}
	}

	// Função para excluir uma empresa
	function excluirEmpresa(id: number | undefined) {
		if (id !== undefined) {
			fetch(`http://localhost:5043/empresa/excluir/${id}`, {
				method: "DELETE",
			})
				.then((resposta) => {
					if (!resposta.ok) {
						throw new Error("Erro ao excluir empresa");
					}
					setEmpresas((prevEmpresas) =>
						prevEmpresas.filter((empresa) => empresa.id !== id)
					);
					console.log("Empresa excluída com sucesso");
				})
				.catch((erro) => {
					console.error(erro);
				});
		}
	}

	// Função para excluir um serviço
	function excluirServico(id: number | undefined) {
		if (id !== undefined) {
			fetch(`http://localhost:5043/servico/excluir/${id}`, {
				method: "DELETE",
			})
				.then((resposta) => {
					if (!resposta.ok) {
						throw new Error("Erro ao excluir serviço");
					}
					setServicos((prevServicos) =>
						prevServicos.filter((servico) => servico.id !== id)
					);
					console.log("Serviço excluído com sucesso");
				})
				.catch((erro) => {
					console.error(erro);
				});
		}
	}

	return (
		<>
			<div id="listar-funcionarios">
				<h1>Funcionários</h1>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Nome</th>
							<th>Cargo</th>
							<th>Contato</th>
							<th>Excluir</th>
						</tr>
					</thead>
					<tbody>
						{funcionarios.map((funcionario) => (
							<tr key={funcionario.id}>
								<td>{funcionario.id}</td>
								<td>{funcionario.nome}</td>
								<td>{funcionario.cargo}</td>
								<td>{funcionario.contato}</td>
								<td>
									<button
										type="button"
										onClick={() => excluirFuncionario(funcionario.id)}>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div id="listar-empresa">
				<h1>Empresas</h1>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Nome</th>
							<th>Cnpj</th>
							<th>Endereço</th>
							<th>Valor Total</th>
							<th>Excluir</th>
						</tr>
					</thead>
					<tbody>
						{empresas.map((empresa) => (
							<tr key={empresa.id}>
								<td>{empresa.id}</td>
								<td>{empresa.nome}</td>
								<td>{empresa.cnpj}</td>
								<td>{empresa.endereco}</td>
								<td>R$ {calcularTotalServicos(empresa).toFixed(2)}</td>
								<td>
									<button
										type="button"
										onClick={() => excluirEmpresa(empresa.id)}>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div id="listar-servico">
				<h1>Serviços</h1>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Tipo</th>
							<th>Valor</th>
							<th>Excluir</th>
						</tr>
					</thead>
					<tbody>
						{servicos.map((servico) => (
							<tr key={servico.id}>
								<td>{servico.id}</td>
								<td>{servico.TipoServico}</td>
								<td>{servico.valor}</td>
								<td>
									<button
										type="button"
										onClick={() => excluirServico(servico.id)}>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Excluir;
