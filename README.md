# Jogo da Ficção Interativa
Um jogo de aventura simples utilizando Javascript prompt. 

## Classes
* `Sala`: Classe que contém todos os `atributos` e `métodos` de uma Sala que será explorada durante o jogo.
* `Cela`: Subclasse de `Sala` usada para criar uma sala especial, a Cela da Prisão.
* `Personagem`: Classe que contém todos os `atributos` e `métodos` de um personagem do jogo. O jogador e os monstros são dois exemplos de personagens deste jogo. 
* `Player`: Subclasse de `Personagem`, contém os `atributos` e `métodos` exclusivos para o personagem do `jogador`.
* `Monstro`: Subclasse de `Personagem`, contém os `atributos` e `métodos` exclusivos para os personagem dos `monstros`.

## Principais Funções
* `rolaDado()`: Gera um número pseudo-aleatório para simular o resultado gerado de um dado. O número de faces do dado é passado como argumento `faces`. Retorna um número aleatório entre 1 e `faces`. 
* `exibirComPausa()`: Escreve na tela os elementos do argumento `msg` com um intervalo de tempo igual ao argumento `miliseconds`.
* `exibirCena()`: Limpa a tela, chama a função `callback`(projetada para ser `exibirComPausa`) passando uma longa `string` contendo os elementos de uma cena da história. Exibirá a string pausadamente e depois esperará 5 segundos antes de mudar de tela.  
* `iniciaJogo()`: Coloca as variáveis de controle do jogo para seu estado inicial, serve para começar o jogo e para recomeçar a partida no caso de uma eventual derota.
* `cenaInicial()`: Controla as escolhas e os elementos da cena inicial do jogo, a cena na Cela da Prisão.
* `cenaFinal()`: Ao quinto dia de exploração, a cena final é invocada para definir o destino do nosso herói. Uma interação inocente é fundamental para definir o resultado final. 
* `criarMonstro()`: Cria um novo `objeto` da `classe` `Monstro` e retorna este objeto. 
* `criarSala()`: Cria um novo `objeto` da `classe` `Sala`, guarda este objeto numa `Array` que controla as salas e retorna o número total de salas criadas. 
* `iniciaCombate()`: Inicia e controla o combate envolvendo o `jogador` e um `monstro`. Determina se `jogador`e `monstros` estão vivos e se o jogador fugiu do combate. Retorna `true`, `false` ou `fugiu`.
* `iniciaDormir()`: Inicia e controla as ações que o `jogador` pode realizar antes de dormir. Administra variáveis de acordo com as decisões do `jogador`.
* `menuDeSalas()`: Cria um `menu` com as portas existentes dentro do objeto `Sala` que o jogador se encontra.
* `menuDeSeleção()`: Uma função que cria um `menu` entre 3 escolhas genéricas determinadas pelos argumentos `a`, `b` e `c`. Retorna o valor correspondente a escolha. 
* `venceBatalha()`: Exibe mensagens e gerencia variáveis do objeto `jogador` referentes a vitória em um combate. Concede `xp`, `sucata` e `suprimentos` do inimigo derrotado. 
* `perdeBatalha()`: Exibe uma mensagem quando o `jogador` é derrotado em batalha.

## Principais Variáveis
* `dados`: Variável que carrega e faz `parse` nos dados do arquivo `./data.json`, convertendo-o para um objeto. 
* `index_sala`: Uma `Array(2)` responsável por controlar o armazenar o `índice` da Sala que o `jogador` se encontra e a sala com o destino escolhido pelo jogador. 
* `player`: Variável de controle do `objeto` do personagem do `jogador`.
* `data`: Dicionário com as chaves `Dia` e `Acoes`. Responsável por controlar a passagem de `tempo` dentro jogo. Um novo `dia` começa quando o `jogador` abre a porta de `3` Salas inexploradas. No dia `5` a função `cenaFinal` é invocada. 
* `fugiu`: Controla o resultado da fuga do `personagem`. 
---
* Linguagem: JavaScript
* Tecnologias: Node.JS, JavaScript Vanilla
* Carga horária: 40 horas
