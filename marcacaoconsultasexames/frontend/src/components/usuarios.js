import React, { useState, useEffect } from "react";
import UsuarioService from "../services/usuarios";
import axios from "axios";

import UsuarioList from "../views/usuarios/List"
import UsuarioForm from "../views/usuarios/Form"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const REACT_APP_BACKEND_URL='http://localhost:5000';
const BACKEND_URL = REACT_APP_BACKEND_URL;
const UsrSrv = new UsuarioService(axios, BACKEND_URL);

function Usuarios(){

const [controle, setControle] = useState(0);
const [listagem, setListagem] = useState([]);
const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(false);
const [especialidade, setEspecialidade] = useState('');
const [medico, setMedico] = useState('');

  const carregarUsuarios = async () => {
    const lista = await UsrSrv.get();
    setListagem(lista);
  }

  useEffect(() => {
    carregarUsuarios();
  },[controle])

  const novoUsuario = () => {
    setUsuarioEmEdicao({
      novo: true,
      nome: "",
      cpf: "",
    }) 
  }

return (
        <Card sx={{ minWidth: 275 }}>
<CardContent>
  <Typography variant="h5" component="div">
    Cadastro de Pacientes
  </Typography>
  <Paper>
    <Box p={5} mt={2}>
      <UsuarioList listagem={listagem} setUsuarioEmEdicao={setUsuarioEmEdicao} carregarUsuarios={carregarUsuarios} UsrSrv={UsrSrv} />
    </Box>
  </Paper>
</CardContent>
<CardActions>
  {!usuarioEmEdicao && (<Button size="small" variant="contained" color="secondary" onClick={novoUsuario}>Novo</Button>)}
</CardActions>

{usuarioEmEdicao && (
  <CardContent>
    <Paper elevation={24}>
      <Box p={5}>
        <Typography variant="h6" component="div">
          {usuarioEmEdicao.novo ? "Novo" : "Alterando"} usuário
        </Typography>
        <UsuarioForm usuarioEmEdicao={usuarioEmEdicao} carregarUsuarios={carregarUsuarios} setUsuarioEmEdicao={setUsuarioEmEdicao}
         UsrSrv={UsrSrv} setEspecialidade={setEspecialidade} especialidade={especialidade} setMedico={setMedico} medico={medico} />
      </Box>
    </Paper>
  </CardContent>
)}
</Card>
    )
}

export default Usuarios; 