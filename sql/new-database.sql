use tower;

go;

create table usuario(
    cpf numeric not null,
    nome varchar(45) not null,
    email varchar(45) not null,
    senha varchar(150) not null,
    usrAdm binary

    primary key(cpf)
);

go;

create table endereco(
    idEndereco int not null auto_increment,
    apelido varchar(30) not null,
    cep numeric not null,
    nmCidade varchar(45) not null,
    nmRua varchar(50) not null,
    nmrEndereco int

    primary key(idEndereço)
);

create table totem(
    idTotem int not null auto_increment,
    nmTotem varchar(30) not null,
    idEndereco int not null

    primary key(idTotem),

    constraint FK_idEndereco foreign key (idEndereco) references endereco(idEndereco)
);

go;

create table registros(
    idRegistros int not null auto_increment,
    disco numeric not null,
    processos varchar(150),
    ram numeric not null,
    cpu numeric not null,
    idTotem int not null,
    idEndereco int not null

    primary key(idRegistros),
    constraint FK_idTotem foreign key(idTotem) references totem(idTotem),
    constraint FK_idEnder foreign key(idEndereco) references endereco(idEndereco)
);