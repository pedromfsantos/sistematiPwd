CREATE TABLE consultas (
	paciente int NOT NULL,
	medico int NOT NULL,
	especialidade int NOT NULL,
	data_consulta date NOT NULL,
	id SERIAL CONSTRAINT pk_id_consulta PRIMARY KEY,
	CONSTRAINT paciente_fk FOREIGN KEY (paciente) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT medico_fk FOREIGN KEY (medico) REFERENCES medicos(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT especialidade_fk FOREIGN KEY (especialidade) REFERENCES especialidades(id) ON DELETE CASCADE ON UPDATE CASCADE
);