CREATE TABLE usuarios (
	id SERIAL CONSTRAINT pk_id_usuario PRIMARY KEY,
	nome varchar NOT NULL,
	cpf varchar NOT NULL,
	CONSTRAINT usuario_unique UNIQUE (cpf)
);