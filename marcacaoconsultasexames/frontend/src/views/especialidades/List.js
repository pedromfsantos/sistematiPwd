import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function EspecialidadeList(props) {
  const { listagem, setEspecialidadeEmEdicao, carregarEpecialidades, EspcSrv } = props;
  
  const removeEspecialidade = async (item) => {
    await EspcSrv.remove(item);
    await carregarEpecialidades();
  }
  
  return (
      <Card>
        <CardContent>
          {
            (listagem.length === 0) ? (
              <p>Nenhuma Especialidade encontrada</p>
            )
            :
            <Grid container spacing={2} p={3}>
              <Grid size={4}>
                <b>Especialidade</b>
              </Grid>
              <Grid size={3}>
                <b>Ações</b>
              </Grid>
            {
              (listagem.map((val, key) => (
                <React.Fragment key={key}>
                  <Grid size={3}>
                    <p>{val.nome}</p>
                  </Grid>
                  <Grid size={1}>
                    <p>{val.cpf}</p>
                  </Grid>
                  <Grid size={4}>
                    <p>{val.especialidade}</p>
                  </Grid>
                  <Grid item xs={3} spacing={50}>
                      <Button size="small" variant="contained" onClick={()=>setEspecialidadeEmEdicao({...val, atual:val})} color="warning">Alterar</Button>
                      <Button size="small" variant="contained" onClick={()=>removeEspecialidade(val)} color="error">Excluir</Button>
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

export default EspecialidadeList;