using Microsoft.AspNetCore.Mvc;
using projeto_desenvolvimento_software_visual;
using projeto_desenvolvimento_software_visual.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(
    options => options.AddPolicy("Acesso Total",
    configs => configs
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod())
);
var app = builder.Build();

// Lista de Empresas
List<Empresa> empresas = new List<Empresa>
{
    new Empresa
    {
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
        Nome = "João Silva",
        Cargo = "Desenvolvedor",
        Contato = "joao.silva@example.com"
    }
};

// Endpoints para Empresa, Servico (já criados antes)

app.MapGet("/", () => "API Ecommerce");

// Endpoints para Empresa
app.MapGet("/empresa/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Empresas.Any())
    {
        return Results.Ok(ctx.Empresas.ToList());
    }
    return Results.NotFound();
});

app.MapGet("/empresa/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Empresa? empresa = ctx.Empresas.Find(id);

    if (empresa is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(empresa);
});

app.MapPost("/empresa/cadastrar", ([FromBody] Empresa empresa,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Empresas.Add(empresa);
    ctx.SaveChanges();
    return Results.Created("", empresa);
});

app.MapPut("/empresa/alterar/{id}", ([FromRoute] int id, [FromBody] Empresa empresaAlterado, [FromServices] AppDataContext ctx) =>
{
    Empresa? empresaExistente = ctx.Empresas.Find(id);

    if (empresaExistente is null)
    {
        return Results.NotFound($"Empresa com Id {id} não encontrada.");
    }

    empresaExistente.Nome = empresaAlterado.Nome;
    empresaExistente.Cnpj = empresaAlterado.Cnpj;
    empresaExistente.Endereco = empresaAlterado.Endereco;
    ctx.Empresas.Update(empresaExistente);
    ctx.SaveChanges();

    return Results.Ok(new { message = $"Empresa com Id {id} atualizada com sucesso!" });
});

app.MapDelete("/empresa/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Empresa? empresaParaRemover = ctx.Empresas.Find(id);

    if (empresaParaRemover is null)
    {
        return Results.NotFound($"Empresa com Id {id} não encontrada.");
    }
    ctx.Empresas.Remove(empresaParaRemover);
    ctx.SaveChanges();
    return Results.Ok(new { message = $"Empresa com Id {id} removida com sucesso!" });
});

// Endpoints para Funcionario
app.MapGet("/funcionario/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Funcionarios.Any())
    {
        return Results.Ok(ctx.Funcionarios.ToList());
    }
    return Results.NotFound();
});


app.MapGet("/funcionario/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Funcionario? funcionario = ctx.Funcionarios.Find(id);

    if (funcionario is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(funcionario);
});

app.MapPost("/funcionario/cadastrar", ([FromBody] Funcionario funcionario,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Funcionarios.Add(funcionario);
    ctx.SaveChanges();
    return Results.Created("", funcionario);
});

app.MapPut("/funcionario/alterar/{id}", ([FromRoute] int id, [FromBody] Funcionario funcionarioAlterado, [FromServices] AppDataContext ctx) =>
{
    Funcionario? funcionarioExistente = ctx.Funcionarios.Find(id);

    if (funcionarioExistente is null)
    {
        return Results.NotFound($"Funcionário com Id {id} não encontrado.");

    }
    funcionarioExistente.Nome = funcionarioAlterado.Nome;
    funcionarioExistente.Cargo = funcionarioAlterado.Cargo;
    funcionarioExistente.Contato = funcionarioAlterado.Contato;

    ctx.Funcionarios.Update(funcionarioExistente);
    ctx.SaveChanges();

    return Results.Ok(new { message = $"Funcionário com Id {id} atualizado com sucesso!" });

});

app.MapDelete("/funcionario/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Funcionario? funcionarioParaRemover = ctx.Funcionarios.Find(id);

    if (funcionarioParaRemover is null)
    {
        return Results.NotFound($"Funcionário com Id {id} não encontrado.");
    }
    ctx.Funcionarios.Remove(funcionarioParaRemover);
    ctx.SaveChanges();
    return Results.Ok(new { message = $"Funcionário com Id {id} removido com sucesso!" });

});


// Endpoints para Servico
app.MapGet("/servico/listar",
([FromServices] AppDataContext ctx) =>
{
    if (ctx.Servicos.Any())
    {
        return Results.Ok(ctx.Servicos.ToList());
    }
    return Results.NotFound();
});

app.MapGet("/servico/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Servico? servico = ctx.Servicos.Find(id);

    if (servico == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(servico);
});

app.MapPost("/servico/cadastrar", ([FromBody] Servico servico,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Servicos.Add(servico);
    ctx.SaveChanges();
    return Results.Created("", servico);
});

app.MapPut("/servico/alterar/{id}", ([FromRoute] int id, [FromBody] Servico servicoAlterado, [FromServices] AppDataContext ctx) =>
{
    Servico? servicoExistente = ctx.Servicos.Find(id);

    if (servicoExistente is null)
    {
    return Results.NotFound($"Serviço com Id {id} não encontrado.");
    }

        servicoExistente.TipoServico = servicoAlterado.TipoServico;
        servicoExistente.Valor = servicoAlterado.Valor;
        servicoExistente.DataContratacao = servicoAlterado.DataContratacao;

        ctx.Servicos.Update(servicoExistente);
        ctx.SaveChanges();
        return Results.Ok(new { message = $"Serviço com Id {id} atualizado com sucesso!" });
});

app.MapDelete("/servico/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Servico? servicoParaRemover = ctx.Servicos.Find(id);

    if (servicoParaRemover is null)
    {
        return Results.NotFound($"Serviço com Id {id} não encontrado.");
    }
    ctx.Servicos.Remove(servicoParaRemover);
    ctx.SaveChanges();
    return Results.Ok(new { message = $"Serviço com Id {id} removido com sucesso!" });
});

app.UseCors("Acesso Total");
app.Run();
