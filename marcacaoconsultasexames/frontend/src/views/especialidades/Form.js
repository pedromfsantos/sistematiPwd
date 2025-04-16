import React from "react";
import dayjs from 'dayjs';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';



function EspecialidadesForm(props) {
    const { carregarEspecialidades, especialidadeEmEdicao, EspcSrv, setEspecialidadeEmEdicao} = props;
    const salvar = async () => {
        if (especialidadeEmEdicao.novo){
            delete especialidadeEmEdicao.novo;
            await EspcSrv.add(especialidadeEmEdicao);
        } else {
            await EspcSrv.update(especialidadeEmEdicao.atual, especialidadeEmEdicao);
        }
        await carregarEspecialidades();
        setEspecialidadeEmEdicao(false)
    }


    // const handleChangeMedico = (event) => {
    //     setMedico(event.target.value);
    //   };

      const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
      ];


    return (
        especialidadeEmEdicao && (
            <Grid>
                    <TextField 
                        required={true}
                        fullWidth={true}
                        id="outlined-especialidade" 
                        label="Especialidade" 
                        variant="outlined" 
                        onChange={(event) => {
                            setEspecialidadeEmEdicao({...especialidadeEmEdicao,especialidade:event.target.value});
                        }}
                        value={especialidadeEmEdicao.nome}
                    />

                    {/* <TextField 
                        required={true}
                        fullWidth={true}
                        id="outlined-cpf" 
                        label="CPF" 

                        variant="outlined" 
                        onChange={(event) => {
                            setEspecialidadeEmEdicao({...especialidadeEmEdicao,cpf:event.target.value});
                        }}
                        value={especialidadeEmEdicao.cpf}
                    />
 

                    <Autocomplete
                     disablePortal
                     options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Especialidade" />}
                    /> */}

                    {/* <Autocomplete
                     disablePortal
                     options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Médico" />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                     components={[
                        'DatePicker'
                     ]}
                    > 
                        <DemoItem label="Selecione a data da consulta">
                            <DatePicker defaultValue={dayjs('2022-04-17')} />
                        </DemoItem>
                    </DemoContainer>
                    </LocalizationProvider>              */}
                <Button variant="contained" color="success" onClick={salvar}>Salvar</Button>
            </Grid>
        )
  )
}

export default EspecialidadesForm;