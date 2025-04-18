import {getMedicosData, getMedicoData, newMedico, removeMedico, editMedico, getMedicosPorEspecialidade} from '../models/medicos.js'

export const getMedicos = async (req, res) => {
    const medicos = await getMedicosData();
    console.log(`Médico do sistema: ${medicos}`);
    res.send(medicos);
}

export const createMedico = async (req, res) => {   
    const medico = req.body;
    await newMedico(medico);
    const message = `Médico [${medico.nomeMedico}] incluído no sistema.`
    console.log(message);
    res.status(201).send(message)
};

export const getMedico = async (req, res) => {
    const medico = await getMedicoData(req.params.id);
    if (medico){
        res.send(medico)
    } else {
        res.status(404).send("Médico não encontrado")
    }
};

export const deleteMedico = async (req, res) => { 
    await removeMedico(req.params.id);
    const message = `Médico id ${req.params.id} foi removido`
    console.log(message);
    res.status(200).send(message)
};

export const updateMedico =  async (req,res) => {
    await editMedico(req.params.id, req.body)
    const message = `Médico alterado para ${req.body.nomeMedico}. Especialidade alterada para ${req.body.especialidade}`
    console.log(message);
    res.status(200).send(message)    
};

export const getMedicosPorIdEspecialidade = async (req,res) => {
    const medicosPorEspecialidade = await getMedicosPorEspecialidade(req.params.idEspecialidade);
    res.send(medicosPorEspecialidade)
}