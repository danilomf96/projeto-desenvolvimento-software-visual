import { useEffect, useState } from "react";
import { Funcionario } from "../models/Funcionario";
import "./Css/Listar.css";
import { Empresa } from "../models/Empresa";
import { Servico } from "../models/Servico";

function Listar() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

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
          throw new Error("Erro na requisição dos funcionários");
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
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.contato}</td>
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
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nome}</td>
                <td>{empresa.cnpj}</td>
                <td>{empresa.endereco}</td>
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
              <th>Data de Contratação</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.TipoServico}</td>
                <td>{servico.valor}</td>
                <td>{servico.DataContratacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Listar;
