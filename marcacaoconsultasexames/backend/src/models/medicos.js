import { getAllFromBD, getOneFromBD, persistIntoDB, removeFromDB, updateInDB } from '../dao/medicos.js'

export const getMedicosData = async () => {
    return await getAllFromBD()
};
export const getMedicoData = async (id) => {
    return await getOneFromBD(id);
};
export const newMedico = async (user) => {
    return await persistIntoDB(user)
};
export const removeMedico = async (id) => {
    return await removeFromDB(id)
};
export const editMedico = async (id, data) => {
    return await updateInDB(id, data)
};
    