import { v4 as uuid } from 'uuid';

let  especialidades = [];

export const getEspecialidadesData = () => especialidades;
export const getEspecialidadeData = (id) => {
    return especialidades.find((especialidades) => especialidades.id === id);
};
export const newEspecialidade = (especialidade) => {
    especialidades.push({...especialidade, id: uuid()});
};
export const removeEspecialidade = (id) => {
    especialidades = especialidades.filter((especialidade) => especialidade.id !== id);
    return
};
export const editEspecialidade = (id, data) => {
    const medico = especialidades.find((especialidade) => especialidade.id === id);
    medico.nomeEspecialidade = data.nomeEspecilidade;
    //Descobrir como fazer uma one to many aqui 
    // medico.especialidade = data.especialidade;
    return
};