# Página de Agendamento de Consultas e API.

> Sistematização da matéria de Programação e Desenvolvimento Web, do curso de ADS do CEUB. O projeto escolhido foi o 04, o qual consistia em uma aplicação para marcação de consultas/exames. Essa aplicação deve ser composta por frontend e backend e permitir que o usuário selecione a especialidade e o profissional. Serão apresentadas as datas disponíveis para que o usuário selecione a informe seus dados (Nome e CPF) para efetivar o agendamento. Deve ser possível pesquisar agendamento por CPF e eventualmente cancelá-lo. A persistência dos dados deve ser feita por meio do gerenciamento dos dados em banco de dados (PostgreSQL ou MySQL) e cuja infraestrutura seja instanciada por meio de containers
> 
### Ajustes e melhorias

- O projeto ainda não possui uma página que proporcione um bom UX. A visualização em si consiste de tabs em que se pode cadastrar os pacientes, médicos, consultas e especialidades.
  
- Implementar busca por CPF de pacientes e médicos. Já existe busca por CPF de consultas.
  
- Implementar uma lógica de login, e roles, controlando o que cada usuário pode fazer. Atualmente, qualquer um pode manipular os dados da maneira que bem entender.
  
- Implementar validação e sanitização dos campos de input. O sistema está vulnerável a ataques como SQL injection e ainda corre o risco de persitir dados não consistentes, como por exemplos números no lugar do nome e letrar no campo do CPF, o que pode acabar prejudicando as consultas ao banco de dados.

- Remover algumas dependencias genéricas e colocar apenas as necessárias. Isso impacta no primeiro build das imagens principalmente do FrontEnd, o deixando bem mais lento.
  

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- É necessário possuir o docker instalado na máquina. Sugestão: Usar o Docker Desktop : https://www.docker.com/products/docker-desktop/. Torna muito fácil de gerenciar os containers e as imagens em uma interface extremamente amigável.
  
- Clonar este repositório localmente.
  

## :whale2: Realizando setup

- Abra o docker desktop, caso esteja usando ele.

- Vá na pasta /marcacaoconsultasexames e executar o comando ```docker compose watch```. Pode demorar alguns minutos.

- Este comando foi utilizado durante o desenvolvimento, e realiza o build das imagens e executa o container com o watch habilitado. Sendo assim qualquer alteração do código é refletida na aplicação.

- É importante que este comando seja rodado desta maneira pois os volumes não estão configurados no docker-compose.yml.

## ☕ Usando

- Para utilizar, depois que os containers subirem, basta ir aos endereços:
   - Frontend : ```localhost:3000```
   - Backend: ```localhost:5000```

- No Backend, tem-se as seguintes rotas disponíveis para o método GET:
  - ```localhost:5000/usuarios``` : irá mostrar todos os pacientes cadastrados
  - ```localhost:5000/usuarios/cpf/{cpf}```: irá mostrar o paciente por CPF
  - ```localhost:5000/usuarios/{id}```: irá mostrar o paciente por id.
  - ```localhost:5000/especialidades```: irá mostrar todos as especialidades cadastradas
  - ```localhost:5000/especialidades/{id}```: irá mostrar a especialidade por id
  - ```localhost:5000/medicos```:irá mostrar todos os medicos cadastrados
  - ```localhost:5000/medicos/{id}```: irá mostrar o médico por id
  - ```localhost:5000/medicos/especialidade/{idEspecialidade}```: irá mostrar todos os médicos que tem a especialidade dada pelo id.
  - ```localhost:5000/consultas```:irá mostrar todos as consultas cadastradas
  - ```localhost:5000/consultas/paciente/{idPaciente}```:irá mostrar todos as consultas por id de paciente

- Para verificar o banco de dados, você pode tentar se conectar a ele usando seu aplicativo de preferência ou acessando o terminal do container.
    - Basta executar o comando ```docker ps``` para ver quais containers estao em execução e pegar os três primeiros caracteres do id do container pdw-database. Vamos supor que é 9bd
    - Assim basta executar ```docker exec -it 9bd bash```
    - Assim, você terá acesso a linha de comando como ``` root ``` ao container do banco de dados.
    - Porém vocês não pode executar comandos no postgres como root, assim, execute ```su postgres```, e o usuário será trocado para um que possa executar tais comandos.
    - Dessa maneira você pode executar comandos SQL após executar ```psql``` na linha de comando.
  
- No frontend basta acessar as tabs e seguir as instruções.
  - Cada cadastro possui as opções de criar um novo elemento a partir do botão "novo"
  - Quando criado, o elemento será listado na tab especifica com as ações de "Alterar" e "Excluir".
  - A tab de consulta é a única que permite uma pesquisa por CPF.
  - A criação de médicos depende da existência de especialidades, uma vez que usa um autocomplete para exibir as opções existentes para o cadastro.
  - A criação de consultas depende da existência de médicos e especialidades, e os campos também são autocompletes dependentes entre si (selecionar um médico automaticamente seleciona uma especialidade, e selecionar uma especialidade limita os médicos que possuem àquela especialidade no campo de seleção).
  - As datas das consultas ficam indisponíveis aos finais de semana e quando alguem realiza um agendamento naquela data.
  - Salvar os dados necessariamente significa que os dados serão persistidos no banco de dados. 


## :open_file_folder: Estrutura do banco de dados

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
