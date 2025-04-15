import { query } from '../dao/database.js'

const buildObject = (res) =>{
    return {
        id: res["id"],
        nome: res["nome"],
        cpf: res["cpf"],
    }
}

export const getAllFromBD = async () => {
    const sql = "select * from usuarios";
    const res = await query(sql);
    const lista = []
    for (let i in res.rows){
       lista.push(buildObject(res.rows[i]))
    }
    return lista;
}

export const getOneFromBD = async (id) => {
    const sql = `select * from usuarios where id = ${id}`;
    const res = await query(sql);
    return res.rows[0] ? buildObject(res.rows[0]) : false;
}

export const persistIntoDB = async (user) => {
    const sql = `insert into usuarios ("nome","cpf") values ('${user.nome}','${user.cpf}')`;
    const res = await query(sql);
    return true;
}

export const removeFromDB = async (id) => {
    const sql = `delete from usuarios where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}

export const updateInDB = async (id, data) => {
    const sql = `update usuarios set 
                    "nome" = '${data.nome}', 
                    "cpf" = '${data.cpf}'
                where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}