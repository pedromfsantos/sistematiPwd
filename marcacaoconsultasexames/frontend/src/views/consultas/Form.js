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


function ConsultasForm(props) {
    const { carregarConsultas, consultaEmEdicao, CnsltSrv, setConsultaEmEdicao,autoCompleteEspecilidades, listaEspecialidade, autoCompleteMedicos, listaMedicos} = props;

    // const [openEspecialidade, setOpenEspecialidade] = React.useState(false);
    // const [openMedico, setOpenMedico] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    // const [optionsEspecialidade, setOptionsEspecialidade] = React.useState([]);
    // const [optionsMedico, setOptionsMedico] = React.useState([]);
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
        if (consultaEmEdicao.novo){
            delete consultaEmEdicao.novo;
            await CnsltSrv.add(consultaEmEdicao);
        } else {
            await CnsltSrv.update(consultaEmEdicao.atual, consultaEmEdicao);
        }
        await carregarConsultas();
        setConsultaEmEdicao(false)
    }

    const handleOpen = (asyncFunction, list) => {
        setOpen(true);
        (async () => {
          setLoading(true);
          await asyncFunction() 
          setLoading(false);
    
          setOptions([...list]);
        })();
    }

    // const handleOpenEspecialidade = () => {
    //     setOpen(true);
    //     (async () => {
    //       setLoading(true);
    //       await especialidades() 
    //       setLoading(false);
    
    //       setOptionsEspecialidade([...listaEspecialidade]);
    //     })();
    //   };

    // const handleOpenMedico = () => {
    //     setOpen(true);
    //     (async () => {
    //       setLoading(true);
    //       await especialidades() 
    //       setLoading(false);
    
    //       setOptionsMedico([...listaEspecialidade]);
    //     })();
    //   };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    }

    // const handleCloseEspecialidade = () => {
    //     setOpen(false);
    //     setOptions([]);
    //   };

    // const handleCloseMedico = () => {
    //     setOpen(false);
    //     setOptions([]);
    //   };

    // const especialidades = async () => {
    //     await autoCompleteEspecilidades()
    //     console.log(listaEspecialidade)
    // }  
    

    return (
        consultaEmEdicao && (
            <Grid>
                    <TextField 
                        required={true}
                        fullWidth={true}
                        id="outlined-nome" 
                        label="Nome" 
                        variant="outlined" 
                        onChange={(event) => {
                            setConsultaEmEdicao({...consultaEmEdicao,nome:event.target.value});
                        }}
                        value={consultaEmEdicao.nome}
                    />

                    <TextField 
                        required={true}
                        fullWidth={true}
                        id="outlined-cpf" 
                        label="CPF" 

                        variant="outlined" 
                        onChange={(event) => {
                            setConsultaEmEdicao({...consultaEmEdicao,cpf:event.target.value});
                        }}
                        value={consultaEmEdicao.cpf}
                    />

                    <Autocomplete
                     disablePortal
                     open={open}
                     onOpen={handleOpen(autoCompleteEspecilidades,listaEspecialidade)}
                     onClose={handleClose}
                     options={options}
                     loading={loading}
                     defaultValue={especialidadeDependeMedico}
                    sx={{ width: 300 }}
                    onChange={(event, value) => {
                        setConsultaEmEdicao({...consultaEmEdicao,especialidade:value.id});
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
                    
                    <Autocomplete
                     disablePortal
                     open={open}
                     onOpen={handleOpen(autoCompleteMedicos,listaMedicos)}
                     onClose={handleClose}
                     options={options}
                     loading={loading}
                    sx={{ width: 300 }}
                    onChange={(event, value) => {
                        setConsultaEmEdicao({...consultaEmEdicao,medico:value.id});
                    }}
                    defaultValue={medicoDependeEspecialidade}
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

export default ConsultasForm;