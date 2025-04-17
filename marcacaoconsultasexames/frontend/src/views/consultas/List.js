import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ConsultasList(props) {
  const { listagem, setConsultaEmEdicao, carregarConsultas, CnsltSrv } = props;
  
  const removeConsulta = async (item) => {
    await CnsltSrv.remove(item);
    await carregarConsultas();
  }
  
  return (
      <Card>
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