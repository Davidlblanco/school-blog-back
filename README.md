# School blog back

Esta é uma aplicação feita para fins de estudo como trabalho de pós graduação na faculdade FIAP.
A api e banco de dados criados aqui deverão implementar a parte de backend de um blog em que os professores postam materias para os alunos.

Este projeto consiste em uma aplicação nest.js que utiliza o prisma como ORM e se conecta a um banco de dados postgres.
Os endpoints do projeto são todos testados usando a tecnologia jest
junto ao repositório está contido o postman e seus enviroments para testar a aplicação local e produção.
junto ao repositório tambem foram fornecidos enviroments de exemplo para rodar a aplicaçnao local com um banco numa maquina em docker.

## Maneiras de rodar o projeto:

### Quick run:

Caso os professores queiram rodar localmente a aplicação sem preocupação de instalação de dependencias foi criado um docker compose:

```bash
$ docker compose up
```

Assim que rodar o comando o app estara disponível em: `http://localhost:3000/`.
O enviroment necessário para rodar o docker compose up está no repositório `.env.docker`.

### Dev run:

Para rodar o app em ambiente de desenvolvimento são necessárias 3 passos:

1 - Criar um banco docker:

- Está diponível neste repositório um script que cria popula e conecta a um banco que roda no docker:

```bash
$ sh create-local-db.sh
```

2 - Abrir outro terminal e instalar pacotes node:

```bash
$ npm i
```

3 - Rodar npm em modo de desenvolvimento:

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

# desafios

Os maiores desafios durante o desenvolvimento foram:

1 - Docker, eu não tinha quase nehuma experiencia com docker e queria entregar algo que rodasse na maquina dos professores com apenas 1 comando. Acabou que estou aplicando o docker algumas situações diferentes neste repositorio.

A primeira foi rodando os bancos em containers locais

A segunda é o docker file que é utilizado no comando `docker compose up`.

A terceira é o Dockerfile-git que é utilizado na git action. Por não conter o enviroment de produção no repositorio git tive que fazer um docker file especial que pegasse os github secrets.

2 - Banco de dados, essa é uma das primeiras vezes que trabalhei com banco. Por ter escolhido o postgrees, não sabia muito bem como faria o deploy do banco. Sempre vi bastaante o pessoal trabalhando com mongo que já te oferece uma hospedagem, mas nao sabia como fazer isso com postgrees.
Cheguei pensar em colocar no rds da aws pois fiz isso a pouco tempo no trabalho mas por sorte, vi que a render.com tambem hospedava banco e acabei hospedando meu banco de produção la.
Tive alguns problemas também para entender os comandos do prisma e o que eles faziam e como modelar e semear dados. Escolhi usar o prisma por ser uma recomendação da documentacnao do nest.js.

3 - A parte de testes nunca tinha trabalhado com isso, usei bastante a documentação do nest que ja recomenda o uso do jest, então parece que o nest.js casou bem com a proposta da faculdade.
