import React, { useState, useEffect } from "react";
import MedicoService from "../services/medico.js";
import axios from "axios";

import MedicoList from "../views/medicos/List"
import MedicosForm from "../views/medicos/Form"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const REACT_APP_BACKEND_URL='http://localhost:5000';
const BACKEND_URL = REACT_APP_BACKEND_URL;
const MdcSrv = new MedicoService(axios, BACKEND_URL);

function Medicos(){

const [controle, setControle] = useState(0);
const [listagem, setListagem] = useState([]);
const [medicoEmEdicao, setMedicoEmEdicao] = useState(false);

  const carregarMedicos = async () => {
    const lista = await MdcSrv.get();
    setListagem(lista);
  }

  useEffect(() => {
    carregarMedicos();
  },[controle])

  const novoMedico = () => {
    setMedicoEmEdicao({
      novo: true,
      nome: "",
      cpf: "",
      especialidade:""
    }) 
  }

return (
<Card sx={{ minWidth: 275 }}>
<CardContent>
  <Typography variant="h5" component="div">
    Cadastro de Médicos
  </Typography>
  <Paper>
    <Box p={5} mt={2}>
      <MedicoList listagem={listagem} setMedicoEmEdicao={setMedicoEmEdicao} carregarMedicos={carregarMedicos} MdcSrv={MdcSrv} />
    </Box>
  </Paper>
</CardContent>
<CardActions>
  {!medicoEmEdicao && (<Button size="small" variant="contained" color="secondary" onClick={novoMedico}>Novo</Button>)}
</CardActions>

{medicoEmEdicao && (
  <CardContent>
    <Paper elevation={24}>
      <Box p={5}>
        <Typography variant="h6" component="div">
          {medicoEmEdicao.novo ? "Novo" : "Alterando"} usuário
        </Typography>
        <MedicosForm medicoEmEdicao={medicoEmEdicao} carregarMedicos={carregarMedicos} setMedicoEmEdicao={setMedicoEmEdicao}
         MdcSrv={MdcSrv} />
      </Box>
    </Paper>
  </CardContent>
)}
</Card>
    )
}

export default Medicos; 