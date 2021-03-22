# Base-api
## Api modular com o intuito de ser altamente escalavel

### STATUS
🚧  Base-api 🚀 Em construção...  🚧


### Conteudo
   * [Como usar](#como-usar)
      * [Pre Requisitos](#pre-requisitos)
      * [Gerando o build](#Gerando o build)
      * [Rodando o Back End](#Rodando o Back End)




### Features
- [x] Cadastro de usuários


### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/),[Nodemon](https://www.npmjs.com/package/nodemon), [Typescript](https://www.npmjs.com/package/typescript) . 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Geranddo o build

```bash
# Execute a aplicação para gerar o build de desenvolvimento
$ tsc -w

```

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://gitlab.com/fiscal-isa/fiscalisa-api>

# Acesse a pasta do projeto no terminal/cmd
$ cd fiscalisa-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ nodemon dist/index.js
# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```


