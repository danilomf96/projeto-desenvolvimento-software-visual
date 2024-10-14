using System;
using projeto_desenvolvimento_software_visual.Models;

namespace projeto_desenvolvimento_software_visual;

public class Empresa
{
    
    public Empresa()
    {
        Id = Guid.NewGuid().ToString();
    }

    public string? Id { get; set; }

    public string? Nome { get; set; }

    public string? Cnpj { get; set;}

    public string? Endereco { get; set;}

    public List<Servico>? ServicosContratados { get; set; }
}
