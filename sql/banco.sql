create database tower;

go

use tower;

go

create table usuario(
    cpf numeric not null,
    nome varchar(30) not null,
    email varchar(45) not null,
    senha varchar(150) not null,
    usrAdm boolean

    primary key (cpf)
)

go

create table endereco(
    idEndereco int not null,
    cep numeric not null,
    nmCidade varchar(45) not null,
    nmRua varchar(45) not null,
    nmrEndereco int not null,
    nmEstacao varchar not null 

    primary key (idEndereco)
)

go 

create table totem(
    idTotem int not null,
    nmTotem varchar(30),
    estado int not null,
    idEndereco int not null

    primary key (idTotem),
    
    constraint FK_idEndereco foreign key (idEndereco) references endereco(idEndereco)
)

go

create table monitorar(
    idMonitorar int not null,
    idUsr numeric not null,
    idTotem int not null
    


    primary key (idMonitorar),
    constraint FK_idUsr foreign key (idUsr) references usuario(cpf),
    constraint FK_idTotem foreign key (idTotem) references totem(idTotem)
)

go 

create table registros(
    idRegistros int not null,
    disco float(3,2) not null, 
    processos varchar(150) not null,
    ram float(3,2) not null,
    cpu float(3,2) not null,
    idTotem int not null,
    idEndereco int not null

    primary key(idRegistros),
    constraint FK_idTotem foreign key (idTotem) references totem(idTotem),
    constraint FK_idEndereco foreign key (idEndereco) references endereco(idEndereco)

)