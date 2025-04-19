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
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const REACT_APP_BACKEND_URL='http://localhost:5000';
const BACKEND_URL = REACT_APP_BACKEND_URL;

const CnsltSrv = new ConsultaService(axios, BACKEND_URL);
const EspcSrv = new EspecialidadeService(axios, BACKEND_URL);
const MdcSrv = new MedicoService(axios, BACKEND_URL);
const UsrSrv = new UsuarioService(axios, BACKEND_URL);

function Consultas(){

const [controle, setControle] = useState(0);
const [listagem, setListagem] = useState([]);
const [listagemTotalParaBuscaPorCPF, setListagemTotalParaBuscaPorCPF] = useState([]);
const [consultaEmEdicao, setConsultaEmEdicao] = useState(false);

const [listaEspecialidade, setListaEspecialidades] = useState([]);
const [listaMedicos, setListaMedicos] = useState([]);

const[cpfPesquisa, setCpfPesquisa] = useState("");

  const carregarConsultas = async () => {
    const lista = await CnsltSrv.get();
    setListagem(lista);
  }

  useEffect(() => {
    carregarConsultas();
    consultaPorCPF();
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

  const autoCompleteEspecilidades = async (medico) => {
    var listaEspc = []
    var lista = []
    if (medico == ""){
       listaEspc  = await EspcSrv.get();
      
      if (listaEspc.length === 0){
      
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
    }
    else {
       listaEspc = await MdcSrv.getById(medico)
       if (listaEspc == false){

       }
       else {
        lista = [{
          label : listaEspc.especialidade,
          id: listaEspc.id
        }]
       }
    }
    
    
    return lista;
  };

  const autoCompleteMedicos = async (especialidade) => {
    var listaMdc  = []
    var lista = []
    console.log("especialidade no autocomplette dos medicos "+ especialidade)
    if (especialidade == ""){
      listaMdc  = await MdcSrv.get();
     
      if (listaMdc.length === 0){
     
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
   }
   else {
    listaMdc = await MdcSrv.getMedicosByEspecialidade(especialidade)
    if (listaMdc.length === 0){
      
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
   }
    return lista;
  };


  const consultaPorCPF = async () => {
    console.log(cpfPesquisa)
    if (cpfPesquisa==""){
      carregarConsultas()
    }else{
      const user = await UsrSrv.getPorCpf(cpfPesquisa)
      if (user == false){
       setListagem([]);
      }
      else {
       const consulta = await CnsltSrv.getPorIdPaciente(user.id)
      setListagem(consulta)
      const listagemTotal = await CnsltSrv.get();
      setListagemTotalParaBuscaPorCPF(listagemTotal)
      }
    }               
  }


return (
<Card sx={{ minWidth: 275 }}>
<CardContent>
  <Typography variant="h5" component="div">
    Cadastro de Consultas
  </Typography>
  <Paper>
    <Box p={5} mt={2}>
      <ConsultaList listagem={listagem} setConsultaEmEdicao={setConsultaEmEdicao} carregarConsultas={carregarConsultas} CnsltSrv={CnsltSrv} consultaPorCPF={consultaPorCPF} setCpfPesquisa={setCpfPesquisa}/>
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
         CnsltSrv={CnsltSrv} UsrSrv={UsrSrv} listagem={listagem} listagemTotalParaBuscaPorCPF={listagemTotalParaBuscaPorCPF}/>
      </Box>
    </Paper>
  </CardContent>
)}
</Card>
    )
}

export default Consultas; 