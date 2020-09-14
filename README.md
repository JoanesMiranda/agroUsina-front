<h1 align="center">
    AgroUsina
</h1>

<p align="center">
  <a href="#bookmark-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-utilizar">Como utilizar</a>
</p>

<br>


## :bookmark: Tecnologias

Esse projeto foi desenvolvido utilizando:

- [React](https://reactjs.org)
- [Node JS](https://nodejs.org/en/)
- [Express JS](https://expressjs.com/pt-br/)
- [Sequelize JS](https://sequelize.org/master/manual/getting-started.html)
- [Postgre](https://www.postgresql.org/)
- [docker](https://hub.docker.com/_/postgres)
- [Google Maps Platform](https://cloud.google.com/maps-platform?hl=pt-br)

## :Projeto

Desafio Fullstack:

O objetivo deste desafio é criar um projeto web para cadastrar unidades de uma usina de cana-de-açúcar em um banco de dados. Esperamos que com este desafio você também conheça um pouco sobre nosso mercado: agricultura digital 4.0.

Requisitos:

Crie um projeto web em um serviço de nuvem de sua escolha (AWS, Heroku, etc) que permite aos usuários cadastrar Moinhos (usinas), Colheitas (safras), Fazendas (fazendas) e Campos (talhoes), e mostrar todos os campos de acordo com um filtro.

Regras:

1. O Moinho deve ter um nome e deve poder ter várias Colheitas;
2. A Colheita deve ter um código, data de início e término, e deve poder ter várias Fazendas;
3. As fazendas devem ter um código, nome e podem ter vários campos;
4. Os campos devem conter um código e coordenadas GPS (latitude e longitude).
* Você deve criar opções para registrar Moinhos, Colheitas, Fazendas e Campos.

* Ao inserir um novo Moinho, Colheita, Fazenda ou Talhão no banco de dados, deve-se enviar um alerta a todos os usuários e mostrar os dados da respectiva nova entidade salvos no banco de dados. Você deve usar o WEB SOCKET para esta tarefa.

* Você deve criar um filtro por nome da fábrica, data de início e término da colheita, código da colheita, nome e código da fazenda e código do campo.

* Você deve mostrar no mapa as imagens que representam os campos (Use uma imagem de sua escolha) de acordo com o filtro feito pelo usuário.

* Você deve criar uma interface simples com uma boa experiência do usuário.

* Você deve criar testes unitários e integrados.

* Você deve usar um deste grupo de tecnologias:

* NODE JS, Express JS, Sequelize JS, Postgre com Postgis, React js;
* Java, boot Spring, dados Spring, Postgre com Postgis, React js.
Você deve publicar este projeto em https://github.com/.

* Você deve publicar este projeto em uma nuvem de sua escolha (AWS, HEROKU, etc) e nos enviar um link para inserir e testar seu projeto como um usuário.


## :rocket: Como utilizar

> 1º - Clonando o repositório:
```
git clone https://github.com/JoanesMiranda/agroUsina-front
```

> 2º - Instalando as dependências:
```
yarn

// or

npm install
```

>3º Iniciando o projeto:

```
yarn start

// or

npm start
```

> 4º - clonando o back-end da aplicação
```
https://github.com/JoanesMiranda/agroUsina-back

```

> 5º - Instalando o docker 
```
* Instalando o docker no linux ubuntu: https://docs.docker.com/engine/install/ubuntu/
* Adicionando uma imagem do postgre ao docker: https://hub.docker.com/_/postgres
```
> 6º - Criar um banco de dados no postgres
```
* - Opcional: instalar o Dbeaver - https://dbeaver.com/download/
* - Conectar-se ao postgres usando o Dbeaver e criar um banco de dados com o nome: db_usina.
```
> 7º - Migrações
```
* - Rodar o comando para criar as migrações do projeto:
    yarn sequelize db:migrate
```

> 8º Iniciando o projeto:

```
yarn dev

// or

npm dev
```

OBs: Projeto ainda em desenvolvimento.

* Faltando utilizar websocket para enviar um alerta a todos os usuários ao mostrar os dados da respectiva nova entidade salvos no banco de dados.

* Faltando cadastrar os campos das fazendas utilizando o mapa da api do google maps.

* Faltando criar testes unitários e integrados.

* Faltando criar um filtro por nome da fábrica, data de início e término da colheita, código da colheita, nome e código da fazenda e código do campo.
