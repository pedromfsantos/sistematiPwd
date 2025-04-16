import {getEspecialidadesData, getEspecialidadeData, newEspecialidade, removeEspecialidade, editEspecialidade} from '../models/especialidades.js'

export const getEspecialidades = async (req, res) => {
    const especialidades = await getEspecialidadesData();
    console.log(`Especialidade do sistema: ${especialidades}`);
    res.send(especialidades);
}

export const createEspecialidade = async (req, res) => {   
    const especialidade = req.body;
    await newEspecialidade(especialidade);
    const message = `Especialidade [${especialidade.nomeEspecialidade}] incluído no sistema.`
    console.log(message);
    res.status(201).send(message)
};

export const getEspecialidade = async (req, res) => {
    const especialidade = await getEspecialidadeData(req.params.id);
    if (especialidade){
        res.send(especialidade)
    } else {
        res.status(404).send("Especialidade não encontrado")
    }
};

export const deleteEspecialidade = async (req, res) => { 
    await removeEspecialidade(req.params.id);
    const message = `Especialidade id ${req.params.id} foi removido`
    console.log(message);
    res.status(200).send(message)
};

export const updateEspecialidade =  async (req,res) => {
    await editEspecialidade(req.params.id, req.body)
    const message = `Especialidade alterada para ${req.body.nomeEspecialidade}.`
    console.log(message);
    res.status(200).send(message)    
};