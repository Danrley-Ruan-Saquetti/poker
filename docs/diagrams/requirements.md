# Levantamento de Requisitos (Poker)

## Requisitos Funcionais
O sistema deve permitir a criação de salas
O sistema deve permitir a encerramento de salas
O sistema deve permitir o gerenciamento de partidas
O sistema deve permitir o gerenciamento de rounds
O sistema deve permitir a entrada de um jogador em uma sala
O sistema deve permitir o gerenciamento de um jogador dentro da sala
O sistema deve permitir a saída de um jogador de uma sala
O sistema deve permitir que o jogador faça uma aposta
O sistema deve permitir que o jogador desista da partida
O sistema deve obrigar que o jogador pague o blind da partida
O sistema deve calcular o ranking de pontos das cartas dos jogadores

## Requisitos Não Funcionais


## Regras de Negócio
A criação de uma sala deve conter um identificador único
A sala deve se encerrar quando a mesma não possui mais jogadores
A sala tem uma quantidade infinita de partidas
A partida só deve iniciar quando houver 2 jogadores com o status de ativo
A criação de um jogador deve conter nome, dinheiro inicial, o identificador da sala e a ordem em que se encontra na mesa
Não é permitido a alteração da ordem do jogador uma vez que ela é definida e ela deve ser única dentre os jogadores da mesma sala
Quando um jogador entra em uma sala e a mesma já estiver em andamento, ele deve aguardar a finalização da partida, ficando com o status de inativo
O jogador fica inativo quando ele desiste da partida ou quando ficar sem dinheiro para iniciar uma nova partida
No início da partida, cada jogador recebe 2 cartas, chamados de "Hole Cards" (Cartas Fechadas)
Cada partida, contém até 3 rounds para virar as cartas, o Flop, Turn e o River
