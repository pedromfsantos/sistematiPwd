CREATE TABLE medicos (
	id SERIAL CONSTRAINT pk_id_medico PRIMARY KEY,
	cpf varchar NOT NULL,
	nome varchar NOT NULL,
	especialidade int NOT NULL,
	CONSTRAINT medico_unique UNIQUE (cpf),
	CONSTRAINT especialidade_fk FOREIGN KEY (especialidade) REFERENCES especialidades(id) ON DELETE CASCADE ON UPDATE CASCADE
);
