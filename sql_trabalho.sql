create database receitas;
use receitas;

create table usuarios(
id int primary key auto_increment,
usuario varchar(80) not null unique,
senha varchar(80) not null);

create table receitas(
id int primary key auto_increment,
id_usuario int,
nome varchar(30),
categoria varchar(80),
modo_preparo varchar(5000), 
tempo int,
likes int,
dislikes int,
foreign key (id_usuario) references usuarios(id),
check (categoria = 'Doce' or categoria = 'Salgado'));

create table ingredientes(
id int primary key auto_increment,
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


insert into ingredientes(nome, lactose, glutem, origem_animal) values ("leite condensado", "sim", "nao", "sim");
insert into ingredientes(nome, lactose, glutem, origem_animal) values ("chocolate em pó", "sim", "sim", "sim");
insert into ingredientes(nome, lactose, glutem, origem_animal) values ("leite condensado", "sim", "sim", "nao");
insert into ingredientes(nome, lactose, glutem, origem_animal) values ("manteiga", "sim", "nao", "sim");
