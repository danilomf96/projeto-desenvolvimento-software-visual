using System;

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
}
