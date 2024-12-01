using System;

namespace projeto_desenvolvimento_software_visual.Models
{
    public class Servico
    {
        public int Id { get; set; }
        public string? TipoServico { get; set; }
        public string? Valor { get; set; }
        public string? DataContratacao { get; set; }

        public Funcionario? FuncionarioResponsavel { get; set; }
        public Empresa? EmpresaCliente { get; set; }
    }
}
