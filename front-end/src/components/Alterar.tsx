import { useEffect, useState } from "react";
import "./Css/Cadastrar.css";
import { Funcionario } from "../models/Funcionario";
import { Servico } from "../models/Servico";
import { Empresa } from "../models/Empresa";

// Componente principal
function Alterar() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState<string>("");
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<string>("");

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

      setMensagem("Alteração realizada com sucesso!");
      return await response.json();
    } catch (error: any) {
      setErro("Erro ao alterar: " + error.message);
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

  // Função para buscar funcionários da API
  const consultarFuncionarios = async () => {
    try {
      const response = await fetch("http://localhost:5043/funcionario/listar");
      if (!response.ok) {
        throw new Error("Erro na requisição dos funcionários");
      }
      const funcionarios = await response.json();
      setFuncionarios(funcionarios);
    } catch (error: any) {
      setErro("Erro ao carregar funcionários: " + error.message);
    }
  };

  // Função para buscar empresas da API
  const consultarEmpresas = async () => {
    try {
      const response = await fetch("http://localhost:5043/empresa/listar");
      if (!response.ok) {
        throw new Error("Erro na requisição das empresas");
      }
      const empresas = await response.json();
      setEmpresas(empresas);
    } catch (error: any) {
      setErro("Erro ao carregar empresas: " + error.message);
    }
  };

  // Função para buscar um funcionário por ID
  const buscarFuncionarioPorId = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5043/funcionario/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar funcionário");
      }
      const funcionario = await response.json();
      setNomeFuncionario(funcionario.nome);
      setCargoFuncionario(funcionario.cargo);
      setContatoFuncionario(funcionario.contato);
    } catch (error: any) {
      setErro("Erro ao carregar funcionário: " + error.message);
    }
  };

  // Função para buscar uma empresa por ID
  const buscarEmpresaPorId = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5043/empresa/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar empresa");
      }
      const empresa = await response.json();
      setNomeEmpresa(empresa.nome);
      setCnpjEmpresa(empresa.cnpj);
      setEnderecoEmpresa(empresa.endereco);
    } catch (error: any) {
      setErro("Erro ao carregar empresa: " + error.message);
    }
  };

  // Função para buscar um serviço por ID
  const buscarServicoPorId = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5043/servico/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar serviço");
      }
      const servico = await response.json();
      setTipoServico(servico.TipoServico);
      setValorServico(servico.valor);
      setDataContratacao(servico.DataContratacao);
    } catch (error: any) {
      setErro("Erro ao carregar serviço: " + error.message);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    buscarServicos();
    consultarFuncionarios();
    consultarEmpresas();
  }, []);

  useEffect(() => {
    if (funcionarioSelecionado) {
      buscarFuncionarioPorId(funcionarioSelecionado);
    }
  }, [funcionarioSelecionado]);

  useEffect(() => {
    if (empresaSelecionada) {
      buscarEmpresaPorId(empresaSelecionada);
    }
  }, [empresaSelecionada]);

  useEffect(() => {
    if (servicoSelecionado) {
      buscarServicoPorId(servicoSelecionado);
    }
  }, [servicoSelecionado]);

  // Funções de envio para cada tipo
  const handleSubmitFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    const novoFuncionario: Funcionario = { nome: nomeFuncionario, cargo: cargoFuncionario, contato: contatoFuncionario };
    cadastrar("http://localhost:5043/funcionario/alterar/", novoFuncionario).then(() => {
      setNomeFuncionario("");
      setCargoFuncionario("");
      setContatoFuncionario("");
    });
  };

  const handleSubmitEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    const novaEmpresa: Empresa = { nome: nomeEmpresa, cnpj: cnpjEmpresa, endereco: enderecoEmpresa };
    cadastrar("http://localhost:5043/empresa/alterar/", novaEmpresa).then(() => {
      setNomeEmpresa("");
      setCnpjEmpresa("");
      setEnderecoEmpresa("");
    });
  };

  const handleSubmitServico = (e: React.FormEvent) => {
    e.preventDefault();
    const novoServico: Servico = { TipoServico: tipoServico, valor: valorServico, DataContratacao: dataContratacao };
    cadastrar("http://localhost:5043/servico/alterar/", novoServico).then(() => {
      setTipoServico("");
      setValorServico("");
      setDataContratacao("");
    });
  };

  return (
    <div className="form-container">
      <h2>Alterar Funcionário</h2>
      <form onSubmit={handleSubmitFuncionario} className="form">
        <label>
          Funcionário:
          <select
            value={funcionarioSelecionado}
            onChange={(e) => setFuncionarioSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
          </select>
        </label>
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
        <button type="submit" disabled={carregando}>{carregando ? "Alterando..." : "Alterar"}</button>
      </form>

      <h2>Alterar Empresa</h2>
      <form onSubmit={handleSubmitEmpresa} className="form">
        <label>
          Empresa:
          <select
            value={empresaSelecionada}
            onChange={(e) => setEmpresaSelecionada(e.target.value)}
            required
          >
            <option value="">Selecione uma empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nome}
              </option>
            ))}
          </select>
        </label>
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
        <button type="submit" disabled={carregando}>{carregando ? "Alterando..." : "Alterar"}</button>
      </form>

      <h2>Alterar Serviço</h2>
      <form onSubmit={handleSubmitServico} className="form">
        <label>
          Serviço:
          <select
            value={servicoSelecionado}
            onChange={(e) => setServicoSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.TipoServico}
              </option>
            ))}
          </select>
        </label>
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
        <button type="submit" disabled={carregando}>{carregando ? "Alterando..." : "Alterar"}</button>
      </form>

      {mensagem && <div className="sucesso">{mensagem}</div>}
      {erro && <div className="erro">{erro}</div>}
    </div>
  );
}

export default Alterar;
