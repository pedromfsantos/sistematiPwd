import { query } from '../dao/database.js'

const buildObject = (res) =>{
    return {
        id: res["id"],
        paciente: res["paciente"],
        medico: res["medico"],
        especialidade: res["especialidade"],
        data: res["data"]
    }
}

export const getAllFromBD = async () => {
    const sql = "select * from consulta";
    const res = await query(sql);
    const lista = []
    for (let i in res.rows){
       lista.push(buildObject(res.rows[i]))
    }
    return lista;
}

export const getOneFromBD = async (id) => {
    const sql = `select * from consulta where id = ${id}`;
    const res = await query(sql);
    return res.rows[0] ? buildObject(res.rows[0]) : false;
}

export const persistIntoDB = async (consulta) => {
    const sql = `insert into consulta ("paciente", "medico", "especialidade", "data") values ('${consulta.paciente}', '${consulta.medico}''${consulta.especialidade}', '${consulta.data}')`;
    const res = await query(sql);
    return true;
}

export const removeFromDB = async (id) => {
    const sql = `delete from consulta where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}

export const updateInDB = async (id, data) => {
    const sql = `update consulta set 
                    "paciente' = '${data.paciente}' 
                    "medico' = '${data.medico}' 
                    "especialidade' = '${data.especialidade}' 
                    "data' = '${data.data}' 
                where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}