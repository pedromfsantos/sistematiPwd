import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function ConsultasList(props) {
  const { listagem, setConsultaEmEdicao, carregarConsultas, CnsltSrv, consultaPorCPF, setCpfPesquisa } = props;
  
  const removeConsulta = async (item) => {
    await CnsltSrv.remove(item);
    await carregarConsultas();
  }

  const busca = async () => {
    await consultaPorCPF();
  }
  
  return (
      <Card>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar por CPF"
        defaultValue=""
        inputProps={{ 'aria-label': 'Buscar por CPF' }}
        onChange={(event) => {
          setCpfPesquisa(event.target.value);
      }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search"  onClick={busca}>
        <SearchIcon />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
        <CardContent>
          {
            (listagem.length === 0) ? (
              <p>Nenhuma Consulta encontrada</p>
            )
            :
            <Grid container spacing={2} columns={12}>
              <Grid size={2}>
                <b>Nome Paciente</b>
              </Grid>
              <Grid size={2}>
                <b>CPF</b>
              </Grid>
              <Grid size={2}>
                <b>Especialidade</b>
              </Grid>
              <Grid size={2}>
                <b>Medico</b>
              </Grid>
              <Grid size={2}>
                <b>Data da Consulta</b>
              </Grid>
              <Grid size={2}>
                <b>Ações</b>
              </Grid>
            {
              (listagem.map((val, key) => (
                <React.Fragment key={key}>
                  <Grid size={2}>
                    <p>{val.pacientenome}</p>
                  </Grid>
                  <Grid size={2}>
                    <p>{val.cpf}</p>
                  </Grid>
                  <Grid size={2}>
                    <p>{val.especialidadenome}</p>
                  </Grid>
                  <Grid size={2}>
                    <p>{val.mediconome}</p>
                  </Grid>
                  <Grid size={2}>
                    <p>{val.data_consulta}</p>
                  </Grid>
                  <Grid item xs={3} spacing={50}>
                      <Button size="small" variant="contained" onClick={()=>setConsultaEmEdicao({...val, atual:val})} color="warning">Alterar</Button>
                      <Button size="small" variant="contained" onClick={()=>removeConsulta(val)} color="error">Excluir</Button>
                  </Grid>
                </React.Fragment>
              )))
            }
            </Grid>
          }
        </CardContent>
      </Card>
  )
}

export default ConsultasList;