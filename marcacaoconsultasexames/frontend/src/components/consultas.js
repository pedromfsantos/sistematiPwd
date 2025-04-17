import React, { useState, useEffect } from "react";

import ConsultaService from "../services/consultas.js";
import EspecialidadeService from "../services/especialidade.js"
import MedicoService from "../services/medico.js"
import UsuarioService from "../services/usuarios.js"

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
const EspcSrv = new EspecialidadeService(axios, BACKEND_URL);
const MdcSrv = new MedicoService(axios, BACKEND_URL);
const UsrSrv = new UsuarioService(axios, BACKEND_URL);

function Consultas(){

const [controle, setControle] = useState(0);
const [listagem, setListagem] = useState([]);
const [consultaEmEdicao, setConsultaEmEdicao] = useState(false);

const [listaEspecialidade, setListaEspecialidades] = useState([]);
const [listaMedicos, setListaMedicos] = useState([]);

  const carregarConsultas = async () => {
    const lista = await CnsltSrv.get();
    setListagem(lista);
    console.log (listagem);
  }

  useEffect(() => {
    carregarConsultas();
  },[controle])

  const novoConsulta = () => {
    setConsultaEmEdicao({
      novo: true,
      nome:"",
      cpf:"",
      paciente:"",
      medico:"",
      especialidade:"",
      data_consulta:""
    }) 
  }

  const autoCompleteEspecilidades = async () => {
    const listaEspc  = await EspcSrv.get();
    var lista = []
    if (listaEspc === 0){
      
    }
    else 
    {
       lista = listaEspc.map((val, key) => (
        {
          label : val.especialidade,
          id: val.id
        }
      ))
    } 
    setListaEspecialidades(lista);
    console.log(listaEspecialidade);
  };

  const autoCompleteMedicos = async () => {
    const listaMdc  = await MdcSrv.get();
    var lista = []
    if (listaMdc === 0){
      
    }
    else 
    {
       lista = listaMdc.map((val, key) => (
        {
          label : val.nome,
          especialidade: val.especialidade,
          id: val.id
        }
      ))
    } 
    setListaMedicos(lista);
  
  };


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
          autoCompleteEspecilidades={autoCompleteEspecilidades} listaEspecialidade={listaEspecialidade} autoCompleteMedicos={autoCompleteMedicos} listaMedicos={listaMedicos}
         CnsltSrv={CnsltSrv} UsrSrv={UsrSrv} />
      </Box>
    </Paper>
  </CardContent>
)}
</Card>
    )
}

export default Consultas; 