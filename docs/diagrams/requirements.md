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
11 - O sistema deve realizar o início de rounds
12 - O sistema deve realizar o encerramento de rounds
12 - O sistema deve realizar a distribuição de cartas para os jogadores
12 - O sistema deve realizar o "vira" das cartas
13 - O sistema deve permitir que o jogador faça uma aposta
14 - O sistema deve permitir que o jogador passe a vez
15 - O sistema deve permitir que o jogador desista da partida
16 - O sistema deve obrigar que os jogadores paguem o blind da partida
17 - O sistema deve calcular o ranking de pontos das cartas dos jogadores
18 - O sistema deve classificar os ganhadores

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
    O jogador fica com o status de Fora quando ele abandona a partida
    O jogador fica com o status de Aguardando quando: ele entra na sala e a mesma já está em andamento; não possui dinheiro para iniciar a nova partida
7
    O ínicio de uma nova partida só ocorre quando há no mínimo 2 jogadores com o status Pronto
9
    A escolha do Dealer acontece em todo ínicio de partida
    A escolha do Dealer será com base na ordem do último jogador que foi o Dealer. Se não houver, será a primeira ordem
10
    Os Blinds consistem em: Small Blind, Big Blind
    Após a escolha Dealer, será escolhido os Blinds
    Os Blinds são os próximos 2 jogadores depois do Dealer, com base na ordem


A sala tem uma quantidade infinita de partidas
A partida só deve iniciar quando houver 2 jogadores com o status de ativo
Quando um jogador entra em uma sala e a mesma já estiver em andamento, ele deve aguardar a finalização da partida, ficando com o status de inativo
O jogador fica inativo quando ele desiste da partida ou quando ficar sem dinheiro para iniciar uma nova partida
No início da partida, cada jogador recebe 2 cartas, chamados de "Hole Cards" (Cartas Fechadas)
Cada partida, contém até 3 rounds para virar as cartas, o Flop, Turn e o River
