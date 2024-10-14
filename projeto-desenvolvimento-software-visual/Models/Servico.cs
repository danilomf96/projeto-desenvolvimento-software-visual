using System;

namespace projeto_desenvolvimento_software_visual.Models
{
    public class Servico
    {
        public Servico()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string? Id { get; set; }
        public string? TipoServico { get; set; }
        public string? Valor { get; set; }
        public string? DataContratacao { get; set; }

        public Funcionario? FuncionarioResponsavel { get; set; }

        public Empresa? EmpresaCliente { get; set; }
    }
}
