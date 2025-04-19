# Página de Agendamento de Consultas e API.

> Sistematização da matéria de Programação e Desenvolvimento Web, do curso de ADS do CEUB. O projeto escolhido foi o 04, o qual consistia em uma aplicação para marcação de consultas/exames. Essa aplicação deve ser composta por frontend e backend e permitir que o usuário selecione a especialidade e o profissional. Serão apresentadas as datas disponíveis para que o usuário selecione a informe seus dados (Nome e CPF) para efetivar o agendamento. Deve ser possível pesquisar agendamento por CPF e eventualmente cancelá-lo. A persistência dos dados deve ser feita por meio do gerenciamento dos dados em banco de dados (PostgreSQL ou MySQL) e cuja infraestrutura seja instanciada por meio de containers
> 
### Ajustes e melhorias

- O projeto ainda não possui uma página que proporcione um bom UX. A visualização em si consiste de tabs em que se pode cadastrar os pacientes, médicos, consultas e especialidades.
  
- Implementar busca por CPF de pacientes e médicos. Já existe busca por CPF de consultas.
  
- Implementar uma lógica de login, e roles, controlando o que cada usuário pode fazer. Atualmente, qualquer um pode manipular os dados da maneira que bem entender.
  
- Implementar validação e sanitização dos campos de input. O sistema está vulnerável a ataques como SQL injection e ainda corre o risco de persitir dados não consistentes, como por exemplos números no lugar do nome e letrar no campo do CPF, o que pode acabar prejudicando as consultas ao banco de dados.
  

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- É necessário possuir o docker instalado na máquina. Sugestão: Usar o Docker Desktop : https://www.docker.com/products/docker-desktop/. Torna muito fácil de gerenciar os containers e as imagens em uma interface extremamente amigável.
  
- Clonar este repositório localmente.
  

## 🚀 Realizando setup

- basta ir na pasta /marcacaoconsultasexames e executar o comando ```docker compose watch```

- Este comando foi utilizado durante o desenvolvimento, e realiza o build das imagens e executa o container com o watch habilitado. Sendo assim qualquer alteração do código é refletida na aplicação.

- É imporntate que este comando seja rodado desta maneira pois os volumes não estão configurados no docker-compose.yml.

## ☕ Usando

Para usar siga estas etapas:

- Execute o projeto no Eclipse. Se a configuração padrão foi utilizado, ele deve estar no endereço local http://localhost:8080
- A página http://localhost:8080/empregados deve mostrar todos os empregados registrados na base de dados
- A página http://localhost:8080/empregados/{id} deve mostrar o empregado, selecionado pelo id, por exemplo http://localhost:8080/empregados/1 deve mostrar os dados do funcionário 1, se ele existir, caso contrário uma mensagem informando a não existência do empregado nos registros será fornecida.
- Utilizando o Postman, ou qualquer outro cliente REST disponível na internet, pode se realizar chamadas:
  - POST ao endereço http://localhost:8080/empregados: Ao passar como argumento o arquivo JSON no seguinte formato:
```json
{
    "empregado": "Nome",
    "email": "Nome@gmail.com",
    "telefone": [{
                    "telefone":"6188888888"
                }
                ],
    "alergia": [
                {
                    "alergia":"amendoim"
                }
                ],
    "problsaude":[
                {
                    "problsaude":"tendinite"
                },
                {
                    "problsaude":"rinite"
                }
                ]
}
```

     - Os campos telefone, alergia e problsaude são listas, portanto, seguindo o mesmo formato, podem variar em número. Poderíamos ter mais um telefone, no exemplo acima, adicionando mais um objeto {"telefone":"1212111"}, por exemplo.
 - PUT no endereço http://localhost:8080/empregados/{id}. Aqui deve-se ter cuidado, uma vez que, do existente registro, não se pode remover nem adicionar valores aos atributos telefone, alergia e problsaude, apenas modificar os que já existem. Se o id não existe, uma mensagem informado isso irá ser retornada.
 - DELETE no endereço http://localhost:8080/empregados/{id}. Basta apenas passar o endereço com o id para o cliente REST. Se o id não existe, uma mensagem informado isso irá ser retornada.
 - GET no endereço http://localhost:8080/empregados/{id}: Irá retornar o empregado, se ele existir.
 - GET no endereço http://localhost:8080/empregados. Irá retornar a lista de todos os empregados que existem.



## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
