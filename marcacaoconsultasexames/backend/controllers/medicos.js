import {getMedicosData, getMedicoData, newMedico, removeMedico, editMedico} from '../models/medicos.js'

export const getMedicos = (req, res) => {
    const medicos = getMedicosData();
    console.log(`Médico do sistema: ${medicos}`);
    res.send(medicos);
}

export const createMedico = (req, res) => {   
    const medico = req.body;
    newMedico(medico);
    const message = `Médico [${medico.nomeMedico}] incluído no sistema.`
    console.log(message);
    res.status(201).send(message)
};

export const getMedico = (req, res) => {
    const medico = getMedicoData(req.params.id);
    if (medico){
        res.send(medico)
    } else {
        res.status(404).send("Médico não encontrado")
    }
};

export const deleteMedico = (req, res) => { 
    removeMedico(req.params.id);
    const message = `Médico id ${req.params.id} foi removido`
    console.log(message);
    res.status(200).send(message)
};

export const updateMedico =  (req,res) => {
    editMedico(req.params.id, req.body)
    const message = `Médico alterado para ${req.body.nomeMedico}. Especialidade alterada para ${req.body.especialidade}`
    console.log(message);
    res.status(200).send(message)    
};