import {getEspecialidadesData, getEspecialidadeData, newEspecialidade, removeEspecialidade, editEspecialidade} from '../models/especialidades.js'

export const getEspecialidades = (req, res) => {
    const especialidades = getEspecialidadesData();
    console.log(`Especialidade do sistema: ${especialidades}`);
    res.send(especialidades);
}

export const createEspecialidade = (req, res) => {   
    const especialidade = req.body;
    newEspecialidade(especialidade);
    const message = `Especialidade [${especialidade.nomeEspecialidade}] incluído no sistema.`
    console.log(message);
    res.status(201).send(message)
};

export const getEspecialidade = (req, res) => {
    const especialidade = getEspecialidadeData(req.params.id);
    if (especialidade){
        res.send(especialidade)
    } else {
        res.status(404).send("Especialidade não encontrado")
    }
};

export const deleteEspecialidade = (req, res) => { 
    removeEspecialidade(req.params.id);
    const message = `Especialidade id ${req.params.id} foi removido`
    console.log(message);
    res.status(200).send(message)
};

export const updateEspecialidade =  (req,res) => {
    editEspecialidade(req.params.id, req.body)
    const message = `Especialidade alterada para ${req.body.nomeEspecialidade}.`
    console.log(message);
    res.status(200).send(message)    
};