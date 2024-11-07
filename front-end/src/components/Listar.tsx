import { useEffect, useState } from "react";
import { Funcionario } from "../models/Funcionario";
import "./ListarFuncionarios.css";
import { Empresa } from "../models/Empresa";
import { Servico } from "../models/Servico";

function ListarFuncionarios() {
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
      .then((resposta) => resposta.json())
      .then((funcionarios) => {
        setFuncionarios(funcionarios);
        console.table(funcionarios);
      });
  }

  function consultarEmpresas() {
    fetch("http://localhost:5043/empresa/listar")
      .then((resposta) => resposta.json())
      .then((empresas) => {
        setEmpresas(empresas);
        console.table(empresas);
      });
  }

  function consultarServicos() {
    fetch("http://localhost:5043/servico/listar")
      .then((resposta) => resposta.json())
      .then((servicos) => {
        setServicos(servicos);
        console.table(servicos);
      });
  }

  return (
    <>
      <div id="listar-funcionarios">
        <h1>Fúncionarios</h1>
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
              <tr>
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
              <tr>
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
              <tr>
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

export default ListarFuncionarios;
