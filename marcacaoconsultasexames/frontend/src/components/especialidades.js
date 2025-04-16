import React, { useState, useEffect } from "react";
import EspecialidadeService from "../services/especialidade.js";
import axios from "axios";

import EspecialidadeList from "../views/especialidades/List"
import EspecialidadesForm from "../views/especialidades/Form"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const REACT_APP_BACKEND_URL='http://localhost:5000';
const BACKEND_URL = REACT_APP_BACKEND_URL;
const EspcSrv = new EspecialidadeService(axios, BACKEND_URL);

function Especialidades(){

const [controle, setControle] = useState(0);
const [listagem, setListagem] = useState([]);
const [especialidadeEmEdicao, setEspecialidadeEmEdicao] = useState(false);

  const carregarEspecialidades = async () => {
    const lista = await EspcSrv.get();
    setListagem(lista);
  }

  useEffect(() => {
    carregarEspecialidades();
  },[controle])

  const novoEspecialidade = () => {
    setEspecialidadeEmEdicao({
      novo: true,
      especialidade:""
    }) 
  }

return (
<Card sx={{ minWidth: 275 }}>
<CardContent>
  <Typography variant="h5" component="div">
    Cadastro de Especialidades
  </Typography>
  <Paper>
    <Box p={5} mt={2}>
      <EspecialidadeList listagem={listagem} setEspecialidadeEmEdicao={setEspecialidadeEmEdicao} carregarEspecialidades={carregarEspecialidades} EspcSrv={EspcSrv} />
    </Box>
  </Paper>
</CardContent>
<CardActions>
  {!especialidadeEmEdicao && (<Button size="small" variant="contained" color="secondary" onClick={novoEspecialidade}>Novo</Button>)}
</CardActions>

{especialidadeEmEdicao && (
  <CardContent>
    <Paper elevation={24}>
      <Box p={5}>
        <Typography variant="h6" component="div">
          {especialidadeEmEdicao.novo ? "Novo" : "Alterando"} usuário
        </Typography>
        <EspecialidadesForm especialidadeEmEdicao={especialidadeEmEdicao} carregarEspecialidades={carregarEspecialidades} setEspecialidadeEmEdicao={setEspecialidadeEmEdicao}
         EspcSrv={EspcSrv} />
      </Box>
    </Paper>
  </CardContent>
)}
</Card>
    )
}

export default Especialidades; 