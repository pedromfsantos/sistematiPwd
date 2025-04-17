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
    const { carregarConsultas, consultaEmEdicao, CnsltSrv, setConsultaEmEdicao, autoCompleteEspecilidades, listaEspecialidade, autoCompleteMedicos, listaMedicos, UsrSrv} = props;

    const [openEspecialidade, setOpenEspecialidade] = React.useState(false);
    const [openMedico, setOpenMedico] = React.useState(false);
    // const [open, setOpen] = React.useState(false);
    const [optionsEspecialidade, setOptionsEspecialidade] = React.useState([]);
    const [optionsMedico, setOptionsMedico] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [cpfJaCadastradado, setCpfJaCadastradado] = React.useState(false)



    function sleep(duration) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, duration);
        });
      }
      

    const salvar = async () => {
        if (consultaEmEdicao.novo){
            console.log(consultaEmEdicao.cpf);
            const user = await UsrSrv.InsereOuPostPorCPF({nome:consultaEmEdicao.nome, cpf:consultaEmEdicao.cpf})
            delete consultaEmEdicao.novo;
            delete consultaEmEdicao.nome;
            delete consultaEmEdicao.cpf;
            console.log("usuario")
            console.log(user.id)
            consultaEmEdicao.paciente = user.id
            await CnsltSrv.add(consultaEmEdicao); 
        } else {
            delete consultaEmEdicao.pacientenome;
            delete consultaEmEdicao.cpf;
            delete consultaEmEdicao.especialidadenome;
            delete consultaEmEdicao.mediconome;
            console.log(consultaEmEdicao);
            await CnsltSrv.update(consultaEmEdicao.atual, consultaEmEdicao);
        }
        await carregarConsultas();
        setConsultaEmEdicao(false)
    }

    const especialidadeDependeMedico = async (id) => {
      await CnsltSrv.get(id)
    }

    const medicoDependeEspecialidade = async (id) => {
      await CnsltSrv.get(id)
    }

    const handleOpenEspecialidade = () => {
        setOpenEspecialidade(true);
        (async () => {
          setLoading(true);
          await especialidades() 
          setLoading(false);
    
          setOptionsEspecialidade([...listaEspecialidade]);
        })();
      };

    const handleOpenMedico = () => {
        setOpenMedico(true);
        (async () => {
          setLoading(true);
          await medicos() 
          setLoading(false);
    
          setOptionsMedico([...listaMedicos]);
        })();
      };


    const handleCloseEspecialidade = () => {
        setOpenEspecialidade(false);
        setOptionsEspecialidade([]);
      };

    const handleCloseMedico = () => {
        setOpenMedico(false);
        setOptionsMedico([]);
      };

    const especialidades = async () => {
        await autoCompleteEspecilidades()
        console.log(listaEspecialidade)
    }  

    
    const medicos = async () => {
      await autoCompleteMedicos()
      console.log(listaEspecialidade)
  }  

  const handleChange = (date) => {
    const d = new Date(date)
    console.log(d)
    setConsultaEmEdicao({...consultaEmEdicao,data_consulta:d})
    // console.log(valueOfInput)
    console.log(consultaEmEdicao)
    ///...
  };
    

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
                        value={consultaEmEdicao.pacientenome}
                    />

                    <TextField
                        error = {cpfJaCadastradado}
                        helperText = "Este CPF ja esta Cadastrado" 
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
                     required={true}
                     open={openEspecialidade}
                     onOpen={handleOpenEspecialidade}
                     onClose={handleCloseEspecialidade}
                     options={optionsEspecialidade}
                     loading={loading}
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
                     required={true}
                     open={openMedico}
                     onOpen={handleOpenMedico}
                     onClose={handleCloseMedico}
                     options={optionsMedico}
                     loading={loading}
                    sx={{ width: 300 }}
                    onChange={(event, value) => {
                        setConsultaEmEdicao({...consultaEmEdicao,medico:value.id});
                    }}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Médicos"
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

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                     components={[
                        'DatePicker'
                     ]}
                    > 
                        <DemoItem label="Selecione a data da consulta">
                            <DatePicker 
                              required={true}
                              onChange={handleChange}
                              />
                        </DemoItem>
                    </DemoContainer>
                    </LocalizationProvider>             
                <Button variant="contained" color="success" onClick={salvar}>Salvar</Button>
            </Grid>
        )
  )
}

export default ConsultasForm;