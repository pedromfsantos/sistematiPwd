import { getAllFromBD, getOneFromBD, persistIntoDB, removeFromDB, updateInDB, getAllConsultasParaPacienteInDB } from '../dao/consultas.js'

export const getConsultasData = async () => {
    return await getAllFromBD()
};
export const getConsultaData = async (id) => {
    return await getOneFromBD(id);
};
export const newConsulta = async (user) => {
    return await persistIntoDB(user)
};
export const removeConsulta = async (id) => {
    return await removeFromDB(id)
};
export const editConsulta = async (id, data) => {
    return await updateInDB(id, data)
};
export const getConsultasPorIdPaciente = async (idPaciente) =>{
    return await getAllConsultasParaPacienteInDB(idPaciente)
}    