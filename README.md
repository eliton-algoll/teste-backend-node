# Requisitos
- Criar uma base de dados com nome "teste_backend"
- Renomear o arquivo .env.example para .env
- Editar os valores das variáveis ambiente do arquivo .env com as informações do banco de dados, no teste foi usado o mysql, mas pode ser usado outro de preferência, bastando informar na TYPEORM_CONNECTION
- Rodar o comando yarn install ou npm install para instalar as dependências do projeto
- Executar o comando yarn typeorm migration:run ou npm typeorm migration:run para gerar as tabelas no banco
- Executar os scripts que estão na pasta db sendo primeiro o 'insert_tipos.sql' e em seguida o 'insert_usuarios_iniciais.php'
- Executar no terminal o comando yarn dev ou npm dev para startar o servidor

# Arquiterura Utilizada
Para padronização do código foi configurado algumas regras no eslint junto ao prettier que podem ser conferidas no arquivo .eslintrc.json. 

Na raiz do projeto temos a pasta config onde estará abstraído as configurações que poderão ser usadas em toda a aplicação, neste caso inicial somente os dados para a geração to token JWT para a autenticação e autorização. 

A pasta container possui o container do tsyringe onde será feito o registro das injeções de dependência.

Na pasta database, temos as migrations para versionar o banco de dados e no arquivo index.ts a criação da conexão com o banco de dados, como é utilizado o typeorm, nessa etapa não é preciso passar nenhum parâmetro no createConnection() pois ele identifica as variáveis ambiente inseridas no .env, bastando importar este arquivo no início da execução da aplicação, neste caso no app.ts.

Na pasta erros é implementado uma classe personalizada de erro, onde conforme a aplicação for escalando poderão estar centralizados todos os tipos de erros que a aplicação terá.

Na pasta routes estão segregadas as rotas da aplicação.

No modules é onde a aplicação está de fato implementada utilizado o pattern de módulos ou domínio, neste caso como estamos tratando somente de informações de um usuário, temos apenas um módulo.

A organização dos módulos é a seguinte:

- As controllers são responsáveis por receber as requisições das rotas, enviar para tratamento e devolver a resposta
- Os services são responsáveis por manter as regras de negócio da aplicação e interagir com o repository que é a camada que comunica com o banco de dados
- Os middlewares são responsáveis pelos tratamentos que serão executados antes de cada rota ser de fato executada, e bloquear a execução ou prossguir de acordo com a regra implementada.
- Os dtos são as interfaces para padronizar os dados que estarão sendo tramitados entre as classes
- Os repositories da raiz do módulo, implementam as interfaces que os repositories deverão ter, assim caso seja utilizado outro orm diferente do typeorm, bastará implementar estas interfaces que a aplicação continuará funcionando corretamente
- Na pasta typeorm está a estrutura do orm, entidades, repositories, etc. Aqui é de fato persistido no banco de dados, caso a aplicação for usar outro orm como por exemplo o sequelize, basta criar uma pasta com nome do orm, e seguir esta estrutura
- Os testes estão centralizados na pasta __tests__ e para cada service deverá ter ao menos um arquivo de teste nesta pasta. Na execução dos testes, é feito uma requisição para as rotas da aplicação para facilitar na escrita dos testes, visto que a aplicação usa inversão e injeção de dependências

# Rotas da Aplicação

As rotas existentes são:

### /login
- tipo: post
- body: json contendo os atributos email e senha
- objetivo: realiza o login de um usuário e retorna seus dados e um token JWT

### /tipos
- tipo: get
- objetivo: lista todos os tipos cadastrados

### /usuarios/create
- tipo: post
- body: json contendo os atributos nome, tipoId, senha,email
- objetivo: cadastrar um usuário de acordo com as regras de negócio apresentadas no desafio

### /usuarios/update
- tipo: put
- body: json contendo os atributos id, nome e tipoId
- objetivo: editar um usuário de acordo com as regras de negócio apresentadas no desafio

### /usuarios/delete
- tipo: delete
- body: json contendo o atributo id
- objetivo: deletar um usuário de acordo com as regras de negócio apresentadas no desafio

### /usuarios/alterastatus
- tipo: put
- body: json contendo os atributos id e status
- objetivo: alterar o status de um usuário de acordo com as regras de negócio apresentadas no desafio

### /usuarios/show/:id
- tipo: get
- objetivo: mostra as informações de um usuário de acordo com as regras de negócio apresentadas no desafio






