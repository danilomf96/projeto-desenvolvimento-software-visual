import { Servico } from "./Servico";

export interface Empresa {
  id?: number;
  nome: string;
  cnpj: string;
  endereco: string;
  ServicosContratados?: Servico[]; // Relacionamento com serviços
}
