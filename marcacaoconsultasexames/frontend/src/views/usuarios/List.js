import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function UsuarioList(props) {
  const { listagem, setUsuarioEmEdicao, carregarUsuarios, UsrSrv } = props;
  
  const removeUsuario = async (item) => {
    await UsrSrv.remove(item);
    await carregarUsuarios();
  }
  
  return (
      <Card>
        <CardContent>
          {
            (listagem.length === 0) ? (
              <p>Nenhum Paciente encontrado</p>
            )
            :
            <Grid container spacing={2} columns={9}>
              <Grid size={3}>
                <b>Nome</b>
              </Grid>
              <Grid size={3}>
                <b>CPF</b>
              </Grid>
              <Grid size={1}>
                <b>Ações</b>
              </Grid>
            {
              (listagem.map((val, key) => (
                <React.Fragment key={key}>
                  <Grid size={3}>
                    <p>{val.nome}</p>
                  </Grid>
                  <Grid size={3}>
                    <p>{val.cpf}</p>
                  </Grid>
                  <Grid spacing={30}>
                      <Button size="small" variant="contained" onClick={()=>setUsuarioEmEdicao({...val, atual:val})} color="warning">Alterar</Button>
                      <Button size="small" variant="contained" onClick={()=>removeUsuario(val)} color="error">Excluir</Button>
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

export default UsuarioList;