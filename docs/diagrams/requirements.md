# Levantamento de Requisitos (Poker)

## Requisitos Funcionais
1 - O sistema deve permitir a criação de salas
2 - O sistema deve realizar o encerramento de salas
3 - O sistema deve permitir a entrada de um jogador em uma sala
4 - O sistema deve permitir a saída de um jogador de uma sala
5 - O sistema deve realizar o gerenciamento da ordem dos jogadores dentro da sala
6 - O sistema deve realizar o gerenciamento de status de um jogador
7 - O sistema deve realizar o início de partidas
8 - O sistema deve realizar o encerramento de partidas
9 - O sistema deve escolher um jogador para ser o Dealer
10 - O sistema deve escolher os jogadores para serem os Blinds
11 - O sistema deve realizar o início de rodadas
12 - O sistema deve realizar o encerramento de rodadas
13 - O sistema deve realizar a distribuição de cartas para os jogadores
14 - O sistema deve realizar o "vira" das cartas na mesa
15 - O sistema deve permitir que o jogador realize ações durante a rodada
16 - O sistema deve gerenciar a ordem de turnos dos jogadores para apostar
17 - O sistema deve validar a ação do jogador
18 - O sistema deve obrigar que os jogadores paguem o blind da partida
19 - O sistema deve calcular o ranking de pontos das cartas dos jogadores
20 - O sistema deve classificar os ganhadores
21 - O sistema deve recopensar os ganhadores da partida
22 - O sistema deve gerenciar o fluxo da partida

## Requisitos Não Funcionais


## Regras de Negócio
1
    A criação de uma sala deve conter um identificador único e o valor da aposta inicial
2
    A sala deve se encerrar quando a mesma não possui mais jogadores
3
    A criação de um jogador deve conter nome, dinheiro inicial, o identificador da sala, a ordem em que se encontra na mesa, se é o Dealer, se for o Blind, qual o Blind
4
    A saída de um jogador pode ser realizada em qualquer momento
5
    A ordem do jogador deve ser única dentre os jogadores da mesma sala
    Não é permitido a alteração da ordem do jogador uma vez que ela é definida
    Quando um jogador sair da sala, a sua ordem pode ser reutilizada
6
    O status do jogador consiste em: Pronto, Jogando, Fora, Aguardando
    O jogador fica com o status de Pronto antes de começar a partida, apenas se ele possui dinheiro
    O jogador fica com o status de Jogando quando ele está em jogo
    O jogador fica com o status de Fora quando ele desiste a partida
    O jogador fica com o status de Aguardando quando: ele entra na sala e a mesma já está em andamento; não possui dinheiro para iniciar a nova partida
7
    A sala tem uma quantidade infinita de partidas
    O ínicio de uma nova partida só ocorre quando há no mínimo 2 jogadores com o status Pronto
9
    A escolha do Dealer acontece em todo ínicio de partida
    A escolha do Dealer será com base na ordem do último jogador que foi o Dealer. Se não houver, será a primeira ordem
10
    Os Blinds consistem em: Small Blind, Big Blind
    Após a escolha Dealer, será escolhido os Blinds
    Os Blinds são os próximos 2 jogadores depois do Dealer, com base na ordem
11
    Cada partida pode ter até 5 rodadas de aposta
12
    A rodada de aposta se encerra quando o último jogador realize a ação
13
    A distribuição de cartas para os jogadores acontece no início da partida
    Cada jogador irá receber 2 cartas, chamados de "Hole Cards" (Cartas Fechadas)
14
    Além das cartas 2 cartas da mão, a mesa possui 5 cartas que valem para todos jogadores
    O fluxo da revelação das cartas resumi-se em: Flop (revela três), Turn (revela a 4ª carta) e River (revela a última carta)
    Após os jogadores pagarem os Blinds, é realizado o Pré-Flop. A partir da segunda rodada, o sistema revela uma carta da mesa antes do ínicio de cada rodada de apostas
15
    Durante a rodada de apostas, cada jogador pode fazer uma das 5 ações: Bet (apostar), Check (passar a vez), Call (pagar a aposta), All In (apostar tudo), Raise (aumentar a aposta), Fold (disistir)
    Durante a rodada, quando ninguém fez nenhuma aposta, o jogador pode: Bet, Check, All In ou Fold
    Durante a rodada, quando já foi feito uma aposta, o jogador pode: Call, Raise, All In ou Fold
16
    A rodada de aposta começa no Small Blind
