import { getAllFromBD, getOneFromBD, persistIntoDB, removeFromDB, updateInDB } from '../dao/especidalidade.js'

export const getEspecialidadesData = async () => {
    return await getAllFromBD()
};
export const getEspecialidadeData = async (id) => {
    return await getOneFromBD(id);
};
export const newEspecialidade = async (user) => {
    return await persistIntoDB(user)
};
export const removeEspecialidade = async (id) => {
    return await removeFromDB(id)
};
export const editEspecialidade = async (id, data) => {
    return await updateInDB(id, data)
};
    