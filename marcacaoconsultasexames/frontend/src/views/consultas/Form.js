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
    const { carregarConsultas, consultaEmEdicao, CnsltSrv, setConsultaEmEdicao, autoCompleteEspecilidades, listaEspecialidade, autoCompleteMedicos, listaMedicos, UsrSrv, listagem, listagemTotalParaBuscaPorCPF} = props;

    const [openEspecialidade, setOpenEspecialidade] = React.useState(false);
    const [openMedico, setOpenMedico] = React.useState(false);
    // const [open, setOpen] = React.useState(false);
    const [optionsEspecialidade, setOptionsEspecialidade] = React.useState([]);
    const [optionsMedico, setOptionsMedico] = React.useState([]);
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
         
          
        })();
      };

    const handleOpenMedico = async () => {
        setOpenMedico(true);
        (async () => {
          setLoading(true);
          await medicos()
         
          setLoading(false);
      
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
        const lista = await autoCompleteEspecilidades(consultaEmEdicao.medico)
        setOptionsEspecialidade([...lista]) 
        console.log(listaEspecialidade)
    }  

    
    const medicos = async () => {
      const lista = await autoCompleteMedicos(consultaEmEdicao.especialidade)
      setOptionsMedico([...lista]) 
      console.log(listaEspecialidade)
  }  

  const handleChange = (date) => {
    console.log(consultaEmEdicao.data_consulta.toString())
    const d = new Date(date)
    console.log(d)
    setConsultaEmEdicao({...consultaEmEdicao,data_consulta:d})
    // console.log(valueOfInput)
    console.log(consultaEmEdicao)
    ///...
  };

  const dataJaAgendada = (date) => {
    const day = date.day();
    const d = new Date(date)
    if (listagem.length === 0){
      return day === 0 || day === 6;
    }
    else {
      var data = []
      if(listagemTotalParaBuscaPorCPF.length === 0){
        data= listagem.map((val, key) => (
          new Date(val.data_consulta)
        ))
      }else {
        data= listagemTotalParaBuscaPorCPF.map((val, key) => (
          new Date(val.data_consulta)
        ))
      }

      var dataIndisponivel = false
      data.forEach((ConsultaDate)=> {

        
        var consultaDateReal = new Date();
        consultaDateReal.setDate(ConsultaDate.getDate() + 1)
        
         if(consultaDateReal.toDateString() == d.toDateString()){
          console.log("date: "+ consultaDateReal.toDateString())
          console.log("d:" + d.toDateString())
          dataIndisponivel = true
         }
      })
      return day === 0 || day === 6 || dataIndisponivel;
    } 
  };
   
  const onChangeEspecialidade = (e, value) => {
    const set = value==null ? "" : value.id
    setConsultaEmEdicao({...consultaEmEdicao, especialidade:set });
  }
  
  const onChangeMedico = (e, value) => {
    const set = (value==null ? "" : value.id)
    setConsultaEmEdicao({...consultaEmEdicao, medico:set });
  }

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
                    defaultValue={consultaEmEdicao.especialidadenome}
                    onChange={(e,value) => {
                      onChangeEspecialidade(e,value);
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
                     defaultValue={consultaEmEdicao.mediconome}
                    sx={{ width: 300 }}
                    onChange={(e,value) => {
                      onChangeMedico(e,value);
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
                              shouldDisableDate={dataJaAgendada} 
                              required={true}
                              onChange={handleChange}
                              defaultValue={dayjs(consultaEmEdicao.data_consulta.toString().replace('T00:00:00.000Z','T16:00:00.000Z'))}
                              
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