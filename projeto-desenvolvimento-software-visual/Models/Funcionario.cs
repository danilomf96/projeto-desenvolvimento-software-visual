using System;

namespace projeto_desenvolvimento_software_visual.Models
{
    public class Funcionario
    {
        public Funcionario()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string? Id { get; set; }
        public string? Nome { get; set; }
        public string? Cargo { get; set; }
        public string? Contato { get; set; }

    }
}
