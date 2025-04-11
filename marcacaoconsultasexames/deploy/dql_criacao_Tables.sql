-- CREATE TABLE usuario (
--  id SERIAL CONSTRAINT pk_id_usuario PRIMARY KEY,
--  nome varchar(150) NOT NULL, 
--  CPF varchar(30) NOT NULL,
-- );

CREATE TABLE clinica.usuario (
	pk_id_usuario int8 NOT NULL,
	nome varchar NOT NULL,
	cpf varchar NOT NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (pk_id_usuario),
	CONSTRAINT usuario_unique UNIQUE (cpf)
);
COMMENT ON TABLE clinica.usuario IS 'tabela de usuarios que sao os paciente da clinica';


-- CREATE TABLE medico (
--  id SERIAL CONSTRAINT pk_id_usuario PRIMARY KEY,
--  nome varchar(150) NOT NULL, 
--  CPF varchar(30) NOT NULL,
--  especialidade varchar(30) NOT NULL,
-- );

CREATE TABLE clinica.medico (
	pk_id_medico int8 NOT NULL,
	cpf varchar NOT NULL,
	nome varchar NOT NULL,
	especialidade int8 NULL,
	CONSTRAINT medico_pk PRIMARY KEY (pk_id_medico),
	CONSTRAINT medico_unique UNIQUE (cpf),
	CONSTRAINT especialidade_fk FOREIGN KEY (especialidade) REFERENCES clinica.especialidades(pk_id_especialidade) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE TABLE especialidade (
--  id SERIAL CONSTRAINT pk_id_usuario PRIMARY KEY,
--  nome varchar(150) NOT NULL, 
--  CPF varchar(30) NOT NULL,
--  especialidade varchar(30) NOT NULL,
-- );

CREATE TABLE clinica.especialidades (
	pk_id_especialidade int8 NOT NULL,
	especialidade varchar NOT NULL,
	CONSTRAINT especialidades_pk PRIMARY KEY (pk_id_especialidade),
	CONSTRAINT especialidades_unique UNIQUE (especialidade)
);

CREATE TABLE clinica.consulta (
	paciente int8 NOT NULL,
	medico int8 NOT NULL,
	especialidade int8 NOT NULL,
	"data" date NOT NULL,
	pk_id_consulta int8 NOT NULL,
	CONSTRAINT consulta_pk PRIMARY KEY (pk_id_consulta),
	CONSTRAINT paciente_fk FOREIGN KEY (paciente) REFERENCES clinica.usuario(pk_id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT medico_fk FOREIGN KEY (medico) REFERENCES clinica.medico(pk_id_medico) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT especialidade_fk FOREIGN KEY (especialidade) REFERENCES clinica.especialidades(pk_id_especialidade) ON DELETE CASCADE ON UPDATE CASCADE
);
