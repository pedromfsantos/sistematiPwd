CREATE TABLE especialidades (
	id SERIAL CONSTRAINT pk_id_especialidade PRIMARY KEY,
	especialidade varchar NOT NULL,
	CONSTRAINT especialidades_unique UNIQUE (especialidade)
);