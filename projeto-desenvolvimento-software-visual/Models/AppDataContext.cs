using System;
using Microsoft.EntityFrameworkCore;

namespace projeto_desenvolvimento_software_visual.Models;

public class AppDataContext : DbContext
{
    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<Funcionario> Funcionarios { get; set; }
    public DbSet<Servico> Servicos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Danilo_Gabriel.db");
    }
}
