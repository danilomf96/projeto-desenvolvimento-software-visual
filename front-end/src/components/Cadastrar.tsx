import { useState } from "react";
import "./Css/Cadastrar.css";

// Interfaces
export interface Funcionario {
  id?: string;
  nome: string;
  cargo: string;
  contato: string;
}

export interface Empresa {
  id?: string;
  nome: string;
  cnpj: string;
  endereco: string;
}

export interface Servico {
  id?: string;
  TipoServico: string;
  valor: string;
  DataContratacao: string;
}

// Componente principal
function Cadastrar() {
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

  // Funções de envio para cada tipo
  const handleSubmitFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    const novoFuncionario: Funcionario = { nome: nomeFuncionario, cargo: cargoFuncionario, contato: contatoFuncionario };
    cadastrar("http://localhost:5043/funcionario/cadastrar/", novoFuncionario).then(() => {
      setNomeFuncionario("");
      setCargoFuncionario("");
      setContatoFuncionario("");
    });
  };

  const handleSubmitEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    const novaEmpresa: Empresa = { nome: nomeEmpresa, cnpj: cnpjEmpresa, endereco: enderecoEmpresa };
    cadastrar("http://localhost:5043/empresa/cadastrar/", novaEmpresa).then(() => {
      setNomeEmpresa("");
      setCnpjEmpresa("");
      setEnderecoEmpresa("");
    });
  };

  const handleSubmitServico = (e: React.FormEvent) => {
    e.preventDefault();
    const novoServico: Servico = { TipoServico: tipoServico, valor: valorServico, DataContratacao: dataContratacao };
    cadastrar("http://localhost:5043/servico/cadastrar/", novoServico).then(() => {
      setTipoServico("");
      setValorServico("");
      setDataContratacao("");
    });
  };

  return (
    <div>
      <h2>Cadastrar Funcionário</h2>
      <form onSubmit={handleSubmitFuncionario}>
        <label>
          Nome:
          <input type="text" value={nomeFuncionario} onChange={(e) => setNomeFuncionario(e.target.value)} required />
        </label>
        <label>
          Cargo:
          <input type="text" value={cargoFuncionario} onChange={(e) => setCargoFuncionario(e.target.value)} required />
        </label>
        <label>
          Contato:
          <input type="text" value={contatoFuncionario} onChange={(e) => setContatoFuncionario(e.target.value)} required />
        </label>
        <button type="submit" disabled={carregando}>{carregando ? "Cadastrando..." : "Cadastrar"}</button>
      </form>

      <h2>Cadastrar Empresa</h2>
      <form onSubmit={handleSubmitEmpresa}>
        <label>
          Nome:
          <input type="text" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} required />
        </label>
        <label>
          CNPJ:
          <input type="text" value={cnpjEmpresa} onChange={(e) => setCnpjEmpresa(e.target.value)} required />
        </label>
        <label>
          Endereço:
          <input type="text" value={enderecoEmpresa} onChange={(e) => setEnderecoEmpresa(e.target.value)} required />
        </label>
        <button type="submit" disabled={carregando}>{carregando ? "Cadastrando..." : "Cadastrar"}</button>
      </form>

      <h2>Cadastrar Serviço</h2>
      <form onSubmit={handleSubmitServico}>
        <label>
          Tipo de Serviço:
          <input type="text" value={tipoServico} onChange={(e) => setTipoServico(e.target.value)} required />
        </label>
        <label>
          Valor:
          <input type="text" value={valorServico} onChange={(e) => setValorServico(e.target.value)} required />
        </label>
        <label>
          Data de Contratação:
          <input type="date" value={dataContratacao} onChange={(e) => setDataContratacao(e.target.value)} required />
        </label>
        <button type="submit" disabled={carregando}>{carregando ? "Cadastrando..." : "Cadastrar"}</button>
      </form>

      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

export default Cadastrar;
