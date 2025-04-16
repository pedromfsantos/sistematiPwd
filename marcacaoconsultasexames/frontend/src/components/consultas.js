import React, { useState, useEffect } from "react";
import ConsultaService from "../services/consultas.js";
import axios from "axios";

import ConsultaList from "../views/consultas/List"
import ConsultasForm from "../views/consultas/Form"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const REACT_APP_BACKEND_URL='http://localhost:5000';
const BACKEND_URL = REACT_APP_BACKEND_URL;
const CnsltSrv = new ConsultaService(axios, BACKEND_URL);

function Consultas(){

const [controle, setControle] = useState(0);
const [listagem, setListagem] = useState([]);
const [consultaEmEdicao, setConsultaEmEdicao] = useState(false);

  const carregarConsultas = async () => {
    const lista = await CnsltSrv.get();
    setListagem(lista);
  }

  useEffect(() => {
    carregarConsultas();
  },[controle])

  const novoConsulta = () => {
    setConsultaEmEdicao({
      novo: true,
      paciente:"",
      medico:"",
      especialidade:"",
      data_consulta:""
    }) 
  }

return (
<Card sx={{ minWidth: 275 }}>
<CardContent>
  <Typography variant="h5" component="div">
    Cadastro de Consultas
  </Typography>
  <Paper>
    <Box p={5} mt={2}>
      <ConsultaList listagem={listagem} setConsultaEmEdicao={setConsultaEmEdicao} carregarConsultas={carregarConsultas} CnsltSrv={CnsltSrv} />
    </Box>
  </Paper>
</CardContent>
<CardActions>
  {!consultaEmEdicao && (<Button size="small" variant="contained" color="secondary" onClick={novoConsulta}>Novo</Button>)}
</CardActions>

{consultaEmEdicao && (
  <CardContent>
    <Paper elevation={24}>
      <Box p={5}>
        <Typography variant="h6" component="div">
          {consultaEmEdicao.novo ? "Novo" : "Alterando"} usuário
        </Typography>
        <ConsultasForm consultaEmEdicao={consultaEmEdicao} carregarConsultas={carregarConsultas} setConsultaEmEdicao={setConsultaEmEdicao}
         CnsltSrv={CnsltSrv} />
      </Box>
    </Paper>
  </CardContent>
)}
</Card>
    )
}

export default Consultas; 