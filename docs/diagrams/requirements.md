## Requisitos Funcionais
O sistema deve permitir a criação de salas
O sistema deve realizar o encerramento de salas
O sistema deve permitir a entrada de um jogador em uma sala
O sistema deve permitir a saída de um jogador de uma sala
O sistema deve realizar o gerenciamento da ordem dos jogadores dentro da sala
O sistema deve realizar o gerenciamento de status de um jogador
O sistema deve gerenciar o fluxo da partida
O sistema deve escolher o Dealer
O sistema deve escolher dos Blinds
O sistema deve fazer os Blinds pagarem o valor mínimo da aposta
O sistema deve realizar a distribuição de cartas
O sistema deve permitir que o jogador realize lances durante a rodada
O sistema deve validar o lance do jogador
O sistema deve gerenciar o tempo em que cada jogador possui para realizar o lance
O sistema deve gerenciar as rodadas de apostas
O sistema deve gerenciar o fluxo de giros da rodada de apostas
O sistema deve realizar a classificação da mão dos jogadores
O sistema deve realizar o desempate de classificação entre os jogadores
O sistema deve recompensar o(s) ganhador(es) da partida

## Regras de Negócio

A criação de uma sala deve conter um identificador único, o valor da aposta mínimo, o valor da aposta atual da rodada, o valor do pote, o atual Dealer (sua ordem na mesa), o atual Small Blind (sua ordem na mesa), o atual Big Blind (sua ordem na mesa), o atual jogador a fazer o lance (sua ordem na mesa), o tempo limite para cada jogador realizar o lance e o baralho de cartas

A criação de um jogador deve conter um identificador único, o nome, seu dinheiro, identificador da sala, sua ordem na mesa da sala, se é o Dealer, se é o Blind, qual o Blind, se é o atual apostador, as cartas (Hole Cards)

A ordem do jogador deve ser única dentre os jogadores da mesma sala

Não é permitido a alteração da ordem do jogador uma vez que ela é definida

Quando um jogador sair da sala, a sua ordem pode ser reutilizada

O status do jogador consiste em: Aguardando, Pronto, Jogando e Fora

Antes de iniciar a partida, todos os jogadores ficam com o status de Aguardando

Quando um jogador entra em uma sala, ele fica com o status de Aguardando

Caso ele tenha dinheiro para jogar, então ele fica com o status de Pronto

Quando a partida começa, os jogadores que estiverem com o status Pronto, passam a ficar com o status de Jogando

Quando um jogador que estiver com o status Jogando desiste da partida, ele fica com o status Fora

No início de cada partida, o pote começa com o valor zero

O fluxo da partida se da pela seguinte forma: Escolher o Dealer; Escolher os Blinds; Blinds Pagam a Aposta; Distribuir as Cartas para os Jogadores; Pré-Flop - 1ª Rodada de Apostas; Flop; 2ª Rodada de Apostas; Turn; 3ª Rodada de Apostas; River; 4ª Rodada de Apostas; Showdown

A escolha do Dealer é feita no início da partida

O Dealer será sempre o próximo àquele que foi o Dealer na partida anterior - com base na ordem, do menor para o maior.

Caso seja a primeira partida da sala, então o Dealer começa com o primeiro jogador - com base na ordem, do menor para o maior

A escolha do Blind é feito com base na ordem do Dealer

Os Dealer são: Small Blind e Big Blind

Os próximos 2 jogadores depois do Dealer - com base na ordem, do menor para o maior - serão, respectivamente, o Small Blind e Big Blind

Os Blinds devem pagar o valor mínimo da aposta

O Small Blind deve pagar a metade do valor mínimo da aposta

O Big Blind deve pagar o valor mínimo da aposta

A distribuição das cartas é feita usando a ordem do Dealer, que será entregue 2 cartas para cada jogador, uma de cada vez

A ordem de distribuição começa no Small Blind até o Dealer, onde ele será o último a receber

O Pré-Flop é a primeira rodada de Apostas

Cada rodada de apostas possui no mínimo 1 "giro"

No início de cada rodada, o valor da aposta começa com zero

Por turnos, cada jogador deve dar um lance, que consiste em: Bet (apostar), Check (passar a vez), Call (pagar a aposta), All-In (apostar tudo), Raise (aumentar a aposta), Fold (desistir)

O lance do jogador deve ser feita em menos de 15 segundos

Caso o jogador não tenha feito o lance no tempo limite e o valor da aposta seja superior a zero, ou seja, um jogador já fez uma aposta, o jogador automaticamente da Fold e fica com o status de Fora

Caso o jogador não tenha feito o lance no tempo limite e não foi feito nenhuma a posta, então ele passa a vez (Bet)

Quando o valor de aposta atual da rodada for zero, ou seja, ninguém fez nenhuma aposta, o Jogador pode dar Check - passar a vez, dar Bet - pagar o valor mínimo da aposta - ou dar Fold - desistir

Caso um jogador já tenha feito uma aposta, o Jogador pode dar Bet - pagar o valor da aposta, dar Fold - desistir - ou dar Raise - aumentar o valor da aposta

O jogador pode dar All-In em qualquer lance

O jogador pode dar Fold em qualquer lance

Todo o valor da aposta realizada, seja ela um Bet, Call ou All-In, seu valor é acumulado no pote

Na primeira rodada de apostas, o giro começa no próximo jogador depois do Big Blind - com base na ordem, do menor para o maior, e o último será o Big Blind (Específico para o Pré-Flop)

Caso algum jogador, durante o giro, aumentar o valor da aposta, é feito um novo giro, onde o último jogador passa a ser o anterior daquele que aumentou a aposta

Caso o jogador já tenha pagado o valor da aposta e outro jogador deu Raise, quando chegar a vez dele de dar o lance, ele deve apenas pagar o restante do valor que foi aumentado, se ele optar em dar Bet

A rodada se encerra quando se completa o giro e todos derem Check ou Call, ou seja, ninguém deu Raise ou All-In

Para as próximas rodadas, o giro começa no Small Blind e termina no Dealer

Caso todos os jogadores derem Fold durante a rodada de apostas, deve-se encerrar a partida e o último jogador que restar será o ganhador e ficará com todo o dinheiro do pote

Após a primeira rodada de apostas, é feito o "vira" das cartas na mesa, revelando as 3 primeiras cartas (Flop)

Após a segunda rodada de apostas, é revelado a quarta carta (Turn)

Após a terceira rodada de apostas, é revelado a quinta e última carta (River)

Após a quarta e última rodada de apostas, é feito o Showdown

O Showdown é quando os jogadores remanescentes revelam suas cartas para ver qual a maior mão

Todo jogador possui um total de 7 cartas: as 2 cartas da mão (Hole Cards) + 5 cartas da mesa

Das 7 cartas, apenas é considerado 5 cartas, que devem ser a de maior classificação possível

A classificação das cartas se dá pela seguinte forma: Royal Flush (Sequência Real), Straight Flush (Sequência de Mesmo Naipe), Four of a Kind (Quadra), Full House (Full House ou Casa Cheia), Flush (Cores), Straight (Sequência), Three of a Kind (Trinca), Two Pair (Dois Pares), One Pair (Um Par) e High Card (Carta Mais Alta)

Royal Flush: A, K, Q, J, 10, todos do mesmo naipe. Esta é a mão mais forte possível no poker

Straight Flush: Cinco cartas em sequência, todas do mesmo naipe

Four of a Kind: Quatro cartas do mesmo valor

Full House: Três cartas do mesmo valor + um par de cartas de outro valor

Flush: Cinco cartas do mesmo naipe, não em sequência. Se as cartas forem colocadas em ordem, o valor da carta mais alta determina a força da mão em caso de empate

Straight: Cinco cartas em sequência, não do mesmo naipe. Assim como no flush, a carta mais alta determina a força da mão em caso de empate

Three of a Kind: Três cartas do mesmo valor

Two Pair: 2x Duas cartas do mesmo valor

One Pair: 1x Duas cartas do mesmo valor

High Card: Se nenhuma das mãos acima for formada, a mão é classificada pelo valor da carta mais alta. Se os jogadores tiverem a mesma carta alta, as cartas subsequentes decidem a mão vencedora

O jogador com a mão de maior classificação ganha o valor do pote

Critério de desempate:

Royal Flush: divide o pote

Straight Flush: O straight flush com a carta mais alta vence; Se mais jogadores tiverem straight flushes do mesmo valor, o pote é dividido.

Four of a Kind: A quadra mais alta vence; Se mais jogadores tiverem quadras do mesmo valor, a carta mais alta fora do par (conhecida como "kicker") decide o vencedor

Full House: O full house com a trinca mais alta vence; Se dois jogadores tiverem full houses com a mesma trinca mais alta, a dupla decide; Se nao o pote é dividido

Flush: A cor com a carta mais alta vence; Se mais jogadores tiverem cores com a mesma carta mais alta, a segunda carta mais alta decide; Se necessário, todas as cinco cartas são usadas para desempatar; Se não, o pote é dividido

Straight: A sequência com a carta mais alta vence; Se mais jogadores tiverem sequências do mesmo valor, o pote é dividido.

Three of a Kind: A trinca mais alta ganha; Se mais jogadores tiverem trincas do mesmo valor, o kicker decide.

Two Pair: Se mais os jogadores tiverem dois pares, o par mais alto ganha; Se ambos os jogadores tiverem os mesmos dois pares, o kicker decide.

One Pair: Se mais jogadores têm um par, o par mais alto ganha. Se os jogadores tiverem pares do mesmo valor, o kicker decide.

High Card: Se nenhum jogador tem uma combinação, a mão é determinada pela carta mais alta. Se mais jogadores têm a mesma carta mais alta, a segunda carta mais alta é usada para desempatar e assim por diante.

Toda carta deve ser escolhida aleatoriamente

Ao final de cada partida, as cartas são devolvidas ao baralho
