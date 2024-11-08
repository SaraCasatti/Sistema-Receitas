create database receitas;
use receitas;

create table usuarios(
id int primary key,
usuario varchar(80) not null,
senha varchar(80));

create table receitas(
id int primary key,
id_usuario int,
categoria varchar(80),
modo_preparo varchar(5000), 
tempo int,
likes int,
dislikes int,
foreign key (id_usuario) references usuarios(id),
check (categoria = 'Doce' or categoria = 'Salgado'));

create table ingredientes(
id int primary key,
nome varchar(80),
lactose varchar(3) check (lactose = 'sim' or lactose = 'nao'),
glutem varchar(3) check (glutem = 'sim' or glutem = 'nao'),
origem_animal varchar(3) check (origem_animal = 'sim' or origem_animal = 'nao'));

create table receita_ingredientes(
id_receitas int,
id_ingredientes int,
quantidade decimal(10,2),
unidade varchar(20),
check (unidade in ('ml','g', 'colher de sopa', 'colher de sobremesa')),
foreign key (id_receitas) references receitas(id),
foreign key (id_ingredientes) references ingredientes(id),
primary key (id_receitas, id_ingredientes));
