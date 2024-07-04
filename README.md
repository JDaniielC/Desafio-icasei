# Desafio iCasei

## Motivação

O desafio consiste em criar duas aplicações micro-frontend e uma aplicação BFF (Backend For Frontend) que se comunicam entre si.
As aplicações micro-frontend são responsáveis por exibir uma lista de vídeos do Youtube e não poderia utilizar frameworks como Angular, React ou Vue.
Foi estipulado um prazo de 7 dias para a entrega do desafio e solicitado testes unitários para entrega.

[Veja a descrição completa do desafio](https://github.com/icasei/teste-front-end-2024)

## Solução

### Arquitetura

A solução foi dividida em 3 aplicações:

- `web_backend`: BFF que se comunica com a API do Youtube e disponibiliza os vídeos para as aplicações micro-frontend.

- `mf_drawer`: Aplicação micro-frontend que exibe os links para roteamento.

- `mf_videos`: Aplicação micro-frontend que exibe a lista de vídeos do Youtube.

### Tecnologias

- `web_backend`: Python, FastAPI, Poetry, taskipy, Pytest, Youtube API.

- `mf_drawer`: Vite, Sass e typescript.

- `mf_videos`: Vite, Sass e typescript.

Todos utilizaram Docker para facilitar a execução e isolamento das dependências e durante o desenvolvimento utilizei git flow para organizar as branches.

## Experiência

O desafio foi muito interessante, pois tive a oportunidade de aprender e aplicar conceitos como:

- micro-frontend.

- BFF e todas as tecnologias envolvidas.

- SEO (Search Engine Optimization).

- Nx (Monorepo).

### Dificuldades

Iniciei o projeto com 3 dias de atraso e infelizmente não consegui finalizar o desafio no prazo estipulado, mas foi uma experiência muito enriquecedora e aprendi muito durante o desenvolvimento.

### Próximos passos

[] Melhorar responsividade das aplicações micro-frontend.

[] Adicionar testes unitários das aplicações micro-frontend.

[] Utilizar nx para unir as aplicações micro-frontend.

[] Adicionar cache para as requisições.

[] Adicionar paginação para os vídeos.

[] Adicionar arquivo docker-compose para facilitar a execução.

[] Implementar SEO.

[] Adicionar controle de sessão no BFF.

[] Melhorar documentação das tecnologias aprendidas.

[] Implementar roteamento.