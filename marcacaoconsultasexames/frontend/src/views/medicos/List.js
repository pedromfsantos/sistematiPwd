import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function MedicoList(props) {
  const { listagem, setMedicoEmEdicao, carregarMedicos, MdcSrv } = props;
  
  const removeMedico = async (item) => {
    await MdcSrv.remove(item);
    await carregarMedicos();
  }
  
  return (
      <Card>
        <CardContent>
          {
            (listagem.length === 0) ? (
              <p>Nenhum Médico encontrado</p>
            )
            :
            <Grid container spacing={2} columns={8}>
              <Grid size={2}>
                <b>Nome</b>
              </Grid>
              <Grid size={2}>
                <b>CPF</b>
              </Grid>
              <Grid size={2}>
                <b>Especialidade</b>
              </Grid>
              <Grid size={2}>
                <b>Ações</b>
              </Grid>
            {
              (listagem.map((val, key) => (
                <React.Fragment key={key}>
                  <Grid size={2}>
                    <p>{val.nome}</p>
                  </Grid>
                  <Grid size={2}>
                    <p>{val.cpf}</p>
                  </Grid>
                  <Grid size={2}>
                    <p>{val.especialidade}</p>
                  </Grid>
                  <Grid item xs={2} spacing={50}>
                      <Button size="small" variant="contained" onClick={()=>setMedicoEmEdicao({...val, atual:val})} color="warning">Alterar</Button>
                      <Button size="small" variant="contained" onClick={()=>removeMedico(val)} color="error">Excluir</Button>
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

export default MedicoList;