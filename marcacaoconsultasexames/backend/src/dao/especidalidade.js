import { query } from '../dao/database.js'

const buildObject = (res) =>{
    return {
        id: res["id"],
        especialidade: res["especialidade"]
    }
}

export const getAllFromBD = async () => {
    const sql = "select * from especialidades";
    const res = await query(sql);
    const lista = []
    for (let i in res.rows){
       lista.push(buildObject(res.rows[i]))
    }
    return lista;
}

export const getOneFromBD = async (id) => {
    const sql = `select * from especialidades where id = ${id}`;
    const res = await query(sql);
    return res.rows[0] ? buildObject(res.rows[0]) : false;
}

export const persistIntoDB = async (espec) => {
    const sql = `insert into especialidades ("especialidade") values ('${espec.especialidade}')`;
    const res = await query(sql);
    return true;
}

export const removeFromDB = async (id) => {
    const sql = `delete from especialidades where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}

export const updateInDB = async (id, data) => {
    const sql = `update medico set 
                    "especialidade' = '${data.especialidade}' 
                where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}