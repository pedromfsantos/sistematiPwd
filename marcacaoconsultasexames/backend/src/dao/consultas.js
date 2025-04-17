import { query } from '../dao/database.js'

const buildObject = (res) =>{
    return {
        id: res["id"],
        paciente: res["paciente"],
        medico: res["medico"],
        especialidade: res["especialidade"],
        data_consulta: res["data_consulta"]
    }
}

const buildObjectParaView = (res) =>{
    return {
        id: res["id"],
        nomeUsr: res["nomeusr"],
        cpfUsr: res["cpfusr"],
        mdcNome: res["mdcnome"],
        especialidade: res["especialidade"],
        data_consulta: res["data_consulta"]
    }
}

export const getAllFromBD = async () => {
    const sql = "select cnslt.id as id, usr.nome as nomeusr, usr.cpf as cpfusr, espc.especialidade, mdc.nome as mdcnome, cnslt.data_consulta from consultas cnslt left outer join usuarios usr ON usr.id = cnslt.paciente left outer join medicos mdc ON mdc.id = cnslt.medico left outer join especialidades espc ON espc.id = cnslt.especialidade";
    const res = await query(sql);
    const lista = []
    for (let i in res.rows){
        console.log(res.rows[i]);
       lista.push(buildObjectParaView(res.rows[i]))
    }
    console.log(lista);
    return lista;
}

export const getOneFromBD = async (id) => {
    const sql = `select * from consultas where id = ${id}`;
    const res = await query(sql);
    return res.rows[0] ? buildObject(res.rows[0]) : false;
}

export const persistIntoDB = async (consulta) => {
    const sql = `insert into consultas ("paciente", "medico", "especialidade", "data_consulta") values ('${consulta.paciente}', '${consulta.medico}','${consulta.especialidade}', '${consulta.data_consulta}')`;
    const res = await query(sql);
    return true;
}

export const removeFromDB = async (id) => {
    const sql = `delete from consultas where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}

export const updateInDB = async (id, data) => {
    const sql = `update consultas set 
                    "paciente' = ${data.paciente},
                    "medico' = ${data.medico},
                    "especialidade' = ${data.especialidade},
                    "data_consulta' = '${data.data_consulta}' 
                where id = ${id}`;
    const res = await query(sql);
    return res.rowCount ? true : false;
}