1 Ao abrir o projeto pela primeira vez instale as dependências do projeto com o comando:
  - npm install

2 Para rodar o programa execute o comando:
  - npm run start

3 As urls de acesso são:
     -Gets
         - http://localhost:7030/movies  retorna toda a lista em formato json
           - Formato de retorno:
            [
                {
                    "id": 1,
                    "year": "year",
                    "title": "title",
                    "studios": "studios",
                    "producers": "producers",
                    "winner": "winner"
                }
            ]
           

         - http://localhost:7030/movies/id substituir o valor id pelo numero do id do filme que deseja buscar em formato json
           - Formato de retorno
                {
                    "id": 30,
                    "year": "1984",
                    "title": "Sheena",
                    "studios": "Columbia Pictures",
                    "producers": "Paul Aratow",
                    "winner": ""
                }
         - http://localhost:7030/movies/interval carrega o produtor com maior intervalo entre dois prêmios, e o que obteve dois prêmios mais rápido em formato json
         - Formato de retorno
            {
                "min": [
                    {
                        "producer": "Wyck Godfrey, Stephenie Meyer and Karen Rosenfelt",
                        "interval": 1,
                        "followingWin": 2012,
                        "previousWin": 2011
                    }
                ],
                "max": [
                    {
                        "producer": "Bo Derek",
                        "interval": 6,
                        "followingWin": 1990,
                        "previousWin": 1984
                    }
                ]
            }

     -Sets
         - Post http://localhost:7030/movies     insere um filme
           - exemplo de dados enviados no body 
                    {
                        "year": 2020,
                        "title": "teste",
                        "studios": "waldisney",
                        "producers": "teste",
                        "winner": ""
                    }


         - Put  http://localhost:7030/movies/id  trocar o id do filme que deseja atualizar 
           - exemplo de dados enviados no body 
                    {
                        "year": 2023,
                        "title": "xxleee",
                        "studios": "waldisney",
                        "producers": "teste",
                        "winner": "yes"
                    }
         - Delete http://localhost:7030/movies/id trocar o id do filme que deseja atualizar


4 Testes
  Para rodar os teste utilize o comando:
    - npm test
         
         
