import {getConsultasData, getConsultaData, newConsulta, removeConsulta, editConsulta} from '../models/consultas.js'

export const getConsultas = async (req, res) => {
    const consultas = await getConsultasData();
    console.log(`Consulta do sistema: ${consultas}`);
    res.send(consultas);
}

export const createConsulta = async (req, res) => {   
    const consulta = req.body;
    await newConsulta(consulta);
    const message = `Consulta [${consulta.nomeConsulta}] incluído no sistema.`
    console.log(message);
    res.status(201).send(message)
};

export const getConsulta = async (req, res) => {
    const consulta = await getConsultaData(req.params.id);
    if (consulta){
        res.send(consulta)
    } else {
        res.status(404).send("Consulta não encontrado")
    }
};

export const deleteConsulta = async (req, res) => { 
    await removeConsulta(req.params.id);
    const message = `Consulta id ${req.params.id} foi removido`
    console.log(message);
    res.status(200).send(message)
};

export const updateConsulta =  async (req,res) => {
    await editConsulta(req.params.id, req.body)
    const message = `Consulta alterada para ${req.body.nomeConsulta}.`
    console.log(message);
    res.status(200).send(message)    
};