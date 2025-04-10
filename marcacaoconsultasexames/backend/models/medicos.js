import { v4 as uuid } from 'uuid';

let  medicos = [];

export const getMedicosData = () => medicos;
export const getMedicoData = (id) => {
    return medicos.find((medico) => medico.id === id);
};
export const newMedico = (medico) => {
    medicos.push({...medico, id: uuid()});
};
export const removeMedico = (id) => {
    medicos = medicos.filter((medico) => medico.id !== id);
    return
};
export const editMedico = (id, data) => {
    const medico = medicos.find((medico) => medico.id === id);
    medico.nomeMedico = data.nomeMedico;
    medico.especialidade = data.especialidade;
    return
};