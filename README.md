# School blog back

Esta é uma aplicação feita para fins de estudo como trabalho de pós graduação na faculdade FIAP.
A api e banco de dados creados aqui deverão implementar a parte de backend de um blog em que os professores postam materias para os alunos.

Este projeto consiste em uma aplicação nest.js que utiliza o prisma como ORM e se conecta a um banco de dados postgres.
Os endpoints do projeto são todos testados usando a tecnologia jest
junto ao repositório está contido o postman e seus enviroments para testar a aplicação local e produção

## Maneiras de rodar o projeto:

### Quick run:

Caso os professores queiram rodar localmente a aplicação sem preocupação de instalação de dependencias foi criado um docker compose:

```bash
$ docker compose-up
```

Assim que rodar o comando o app estara disponível em: `http://localhost:3000/`.
O enviroment necessário para rodar o docker compose up está no repositório `.env.docker`.

### Dev run:

Para rodar o app em ambiente de desenvolvimento são necessárias 3 passos:

1 - Criar um banco docker:

- está diponível neste repositório um script que cria popula e conecta a um banco docker:

```bash
$ sh create-local-db.sh
```

2 - abrir outro terminal e instalar pacotes:

```bash
$ npm i
```

3 - rodar npm em modo de desenvolvimento:

```bash
$ npm run dev
```

Assim que rodar os comandos o app estara disponível em: `http://localhost:3000/`.
O enviroment necessário para rodar o docker compose up está no repositório `.env.local`.

## Comandos de teste

```bash
# teste único
$ npm run test

# teste modo de desenvolvimento
$ npm run test:watch
```

# deploy

Esta aplicação conta com um sistema automatizado de deploy para a parte da api.

- Existe um banco de produção que foi hospedado no render.com
- O github.secrets contem o endereço pra este banco e o jwt_secret
- A action cria uma imagem docker de produção com essas informações
- A action sobe uma imagem para o repositorio no docker hub image:latest
- A render.com le image:latest no docker hub e disponibiliza na seguinte url:

```bash
https://school-blog-back-1727553447.onrender.com/
```
