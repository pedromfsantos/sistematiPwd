import { query } from '../dao/database.js'

const buildObject = (res) =>{
    return {
        id: res["id"],
        nome: res["nome"],
        cpf: res["cpf"],
        especialidade: res["especialidade"]
    }
}

export const getAllFromBD = async () => {
    const sql = "select mdc.id, mdc.cpf, espc.especialidade from medicos mdc left outer join especialidades espc on mdc.especialidade = espc.id ";
    const res = await query(sql);
    const lista = []
    for (let i in res.rows){
       lista.push(buildObject(res.rows[i]))
    }
    
    return lista;
}

export const getOneFromBD = async (id) => {
    const sql = `select * from medicos where id = ${id}`;
    const res = await query(sql);
    return res.rows[0] ? buildObject(res.rows[0]) : false;
}

export const persistIntoDB = async (medico) => {
    const sql = `insert into medicos ("nome","cpf", "especialidade") values ('${medico.nome}','${medico.cpf}', '${medico.especialidade}')`;
    const res = await query(sql);
    return true;
}

export const removeFromDB = async (id) => {
    const sql = `delete from medicos where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}

export const updateInDB = async (id, data) => {
    const sql = `update medicos set 
                    "nome" = '${data.nome}', 
                    "cpf" = '${data.cpf}',
                    "especialidade' = '${data.especialidade}' 
                where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}