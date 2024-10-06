using Microsoft.AspNetCore.Mvc;
using projeto_desenvolvimento_software_visual;
using projeto_desenvolvimento_software_visual.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Lista de Empresas
List<Empresa> empresas = new List<Empresa>
{
    new Empresa
    {
        Id = "1",
        Nome = "Facebook",
        Cnpj = "22222-22",
        Endereco = "armandinho numero 52"
    }
};

// Lista de Serviços
List<Servico> servicos = new List<Servico>
{
    new Servico
    {
        Id = "1",
        TipoServico = "TI",
        Valor = "500",
        DataContratacao = DateTime.Now.ToString("yyyy-MM-dd")
    }
};

// Lista de Funcionários
List<Funcionario> funcionarios = new List<Funcionario>
{
    new Funcionario
    {
        Id = "1",
        Nome = "João Silva",
        Cargo = "Desenvolvedor",
        Contato = "joao.silva@example.com"
    }
};

// Endpoints para Empresa, Servico (já criados antes)

app.MapGet("/", () => "API Ecommerce");

// Endpoints para Empresa
app.MapGet("/empresa/listar", () =>
{
    if (empresas.Count > 0)
    {
        return Results.Ok(empresas);
    }
    return Results.NotFound();
});

app.MapGet("/empresa/buscar/{id}", ([FromRoute] string id) =>
{
    Empresa? empresa = empresas.Find(x => x.Id == id);

    if (empresa == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(empresa);
});

app.MapPost("/empresa/cadastrar", ([FromBody] Empresa empresa) =>
{
    empresas.Add(empresa);
    return Results.Created($"/empresa/buscar/{empresa.Id}", empresa);
});

app.MapPut("/empresa/alterar/{id}", ([FromRoute] string id, [FromBody] Empresa empresaAlterado) =>
{
    Empresa empresaExistente = empresas.FirstOrDefault(p => p.Id == id);

    if (empresaExistente != null)
    {
        empresaExistente.Nome = empresaAlterado.Nome;
        empresaExistente.Cnpj = empresaAlterado.Cnpj;
        empresaExistente.Endereco = empresaAlterado.Endereco;

        return Results.Ok(new { message = $"Empresa com Id {id} atualizada com sucesso!" });
    }

    return Results.NotFound($"Empresa com Id {id} não encontrada.");
});

app.MapDelete("/empresa/deletar/{id}", ([FromRoute] string id) =>
{
    Empresa empresaParaRemover = empresas.FirstOrDefault(p => p.Id == id);

    if (empresaParaRemover != null)
    {
        empresas.Remove(empresaParaRemover);
        return Results.Ok(new { message = $"Empresa com Id {id} removida com sucesso!" });
    }
    return Results.NotFound($"Empresa com Id {id} não encontrada.");
});

// Endpoints para Funcionario
app.MapGet("/funcionario/listar", () =>
{
    if (funcionarios.Count > 0)
    {
        return Results.Ok(funcionarios);
    }
    return Results.NotFound();
});

app.MapGet("/funcionario/buscar/{id}", ([FromRoute] string id) =>
{
    Funcionario? funcionario = funcionarios.Find(x => x.Id == id);

    if (funcionario == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(funcionario);
});

app.MapPost("/funcionario/cadastrar", ([FromBody] Funcionario funcionario) =>
{
    funcionarios.Add(funcionario);
    return Results.Created($"/funcionario/buscar/{funcionario.Id}", funcionario);
});

app.MapPut("/funcionario/alterar/{id}", ([FromRoute] string id, [FromBody] Funcionario funcionarioAlterado) =>
{
    Funcionario funcionarioExistente = funcionarios.FirstOrDefault(p => p.Id == id);

    if (funcionarioExistente != null)
    {
        funcionarioExistente.Nome = funcionarioAlterado.Nome;
        funcionarioExistente.Cargo = funcionarioAlterado.Cargo;
        funcionarioExistente.Contato = funcionarioAlterado.Contato;

        return Results.Ok(new { message = $"Funcionário com Id {id} atualizado com sucesso!" });
    }

    return Results.NotFound($"Funcionário com Id {id} não encontrado.");
});

app.MapDelete("/funcionario/deletar/{id}", ([FromRoute] string id) =>
{
    Funcionario funcionarioParaRemover = funcionarios.FirstOrDefault(p => p.Id == id);

    if (funcionarioParaRemover != null)
    {
        funcionarios.Remove(funcionarioParaRemover);
        return Results.Ok(new { message = $"Funcionário com Id {id} removido com sucesso!" });
    }
    return Results.NotFound($"Funcionário com Id {id} não encontrado.");
});


// Endpoints para Servico
app.MapGet("/servico/listar", () =>
{
    if (servicos.Count > 0)
    {
        return Results.Ok(servicos);
    }
    return Results.NotFound();
});

app.MapGet("/servico/buscar/{id}", ([FromRoute] string id) =>
{
    Servico? servico = servicos.Find(x => x.Id == id);

    if (servico == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(servico);
});

app.MapPost("/servico/cadastrar", ([FromBody] Servico servico) =>
{
    servicos.Add(servico);
    return Results.Created($"/servico/buscar/{servico.Id}", servico);
});

app.MapPut("/servico/alterar/{id}", ([FromRoute] string id, [FromBody] Servico servicoAlterado) =>
{
    Servico servicoExistente = servicos.FirstOrDefault(p => p.Id == id);

    if (servicoExistente != null)
    {
        servicoExistente.TipoServico = servicoAlterado.TipoServico;
        servicoExistente.Valor = servicoAlterado.Valor;
        servicoExistente.DataContratacao = servicoAlterado.DataContratacao;

        return Results.Ok(new { message = $"Serviço com Id {id} atualizado com sucesso!" });
    }

    return Results.NotFound($"Serviço com Id {id} não encontrado.");
});

app.MapDelete("/servico/deletar/{id}", ([FromRoute] string id) =>
{
    Servico servicoParaRemover = servicos.FirstOrDefault(p => p.Id == id);

    if (servicoParaRemover != null)
    {
        servicos.Remove(servicoParaRemover);
        return Results.Ok(new { message = $"Serviço com Id {id} removido com sucesso!" });
    }
    return Results.NotFound($"Serviço com Id {id} não encontrado.");
});
app.Run();
