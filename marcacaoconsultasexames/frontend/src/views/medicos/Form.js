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
import CircularProgress from '@mui/material/CircularProgress';


function MedicosForm(props) {
    const { carregarMedicos, medicoEmEdicao, MdcSrv, setMedicoEmEdicao,autoCompleteEspecilidades, listaEspecialidade} = props;

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    function sleep(duration) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, duration);
        });
      }
      

    const salvar = async () => {
        if (medicoEmEdicao.novo){
            delete medicoEmEdicao.novo;
            await MdcSrv.add(medicoEmEdicao);
        } else {
            await MdcSrv.update(medicoEmEdicao.atual, medicoEmEdicao);
        }
        await carregarMedicos();
        setMedicoEmEdicao(false)
    }

    const handleOpen = () => {
        setOpen(true);
        (async () => {
          setLoading(true);
          await especialidades() 
          setLoading(false);
    
          setOptions([...listaEspecialidade]);
        })();
      };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
      };

    const especialidades = async () => {
        await autoCompleteEspecilidades()
        console.log(listaEspecialidade)
    }  
    

    return (
        medicoEmEdicao && (
            <Grid>
                    <TextField 
                        required={true}
                        fullWidth={true}
                        id="outlined-nome" 
                        label="Nome" 
                        variant="outlined" 
                        onChange={(event) => {
                            setMedicoEmEdicao({...medicoEmEdicao,nome:event.target.value});
                        }}
                        value={medicoEmEdicao.nome}
                    />

                    <TextField 
                        required={true}
                        fullWidth={true}
                        id="outlined-cpf" 
                        label="CPF" 

                        variant="outlined" 
                        onChange={(event) => {
                            setMedicoEmEdicao({...medicoEmEdicao,cpf:event.target.value});
                        }}
                        value={medicoEmEdicao.cpf}
                    />
 

                    <Autocomplete
                     disablePortal
                     open={open}
                     onOpen={handleOpen}
                     onClose={handleClose}
                     options={options}
                     loading={loading}
                    sx={{ width: 300 }}
                    onChange={(event, value) => {
                        setMedicoEmEdicao({...medicoEmEdicao,especialidade:value.id});
                    }}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Especialidades"
                          slotProps={{
                            input: {
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            },
                          }}
                        />
                      )}
                    />

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

export default MedicosForm;