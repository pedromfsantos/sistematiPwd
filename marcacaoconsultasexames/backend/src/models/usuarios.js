import { getAllFromBD, getOneFromBD, persistIntoDB, removeFromDB, updateInDB, getOneFromBDUsingCPF, getOneFromBDUsingCPFEInsereSeNaoExiste } from '../dao/usuarios.js'

export const getUsersData = async () => {
    return await getAllFromBD()
};
export const getUserData = async (id) => {
    return await getOneFromBD(id);
};
export const getUserDataPorCpf = async (cpf) => {
    return await getOneFromBDUsingCPF(cpf);
}

export const getOrPostUsingCPF = async (user) =>{
    return await getOneFromBDUsingCPFEInsereSeNaoExiste (user)
}

export const newUser = async (user) => {
    return await persistIntoDB(user)
};
export const removeUser = async (id) => {
    return await removeFromDB(id)
};
export const editUser = async (id, data) => {
    return await updateInDB(id, data)
};
    