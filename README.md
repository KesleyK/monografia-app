# Aplicativo Algoritmia

Autores:

* Kesley Kenny Vasques Guimarães
* Pedro Henrique de Brito Agnes

Aplicativo móvel desenvolvido com as tecnologias `react native` e `expo`, fazendo o papel do *Front Office* do projeto de [TCC](https://github.com/Pedenite/Monografia) da dupla. É complementado com o [*Back Office*](https://github.com/KesleyK/monografia-backoffice).

## Rodar local

Para rodar local, é necessário ter o `npm` e o `node.js` instalados. Segue a documentação oficial de instalação do npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Em seguida, deve-se rodar o comando de instalação de dependências no projeto:

```sh
npm install
```

Em caso de erros, pode ser necessário utilizar outra ferramenta de *build* como o `yarn`, bastando executar os comandos abaixo:

```sh
npm install --global yarn
yarn install
```

Desta forma, o projeto estará pronto para executar, mas para que seja possível acessar todas as funcionalidades, é necessário configurar uma instância do firebase. Para isso, deve-se criar um arquivo chamado `.env` na raíz do repositório. O conteúdo deve seguir o exemplo descrito no arquivo `.env.example` adicionando as chaves obtidas da instância criada do firebase em cada campo (após o `=`):

```sh
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKETt=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

Por fim, basta executar o aplicativo com o seguinte comando:

```sh
npm start
```

Deste modo, o expo vai gerar um *QR code* no terminal que pode ser lido com o celular através do aplicativo móvel Expo Go, assim, executando o aplicativo no dispositivo.
