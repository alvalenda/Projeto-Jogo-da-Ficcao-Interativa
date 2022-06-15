console.clear();
const prompt = require('prompt-sync')();
const fs = require('fs');
/*
    VARIÁVEIS GLOBAIS
*/
let monstros = JSON.parse(fs.readFileSync('criaturas.json', 'utf-8'));
/*
    FUNÇÕES
*/
function playerName() {
    while (true) {
        try {
            const nome = prompt(`Qual é o seu nome SOBREVIVENTE...? `)
                .trim()
                .toLowerCase();
            if (nome.length < 3) throw `Seu nome deve é curto demais...`;
            else if (nome.length > 10) throw `Seu nome é longo demais...`;
            return nome[0].toUpperCase() + nome.substring(1);
        } catch (error) {
            console.log(error);
        }
    }
}

function rollaDado(faces = 20) {
    return (roll = Math.floor(Math.random() * faces + 1));
}

function imprimeObjeto(objeto) {
    for (const chave in objeto) {
        if (Object.hasOwnProperty.call(objeto, chave)) {
            const valor = objeto[chave];
            console.log(chave, valor);
        }
    }
}

function criarMonstro(nome) {
    const lista = monstros['Monstros'];
    let _monstro;
    for (let i = 0; i < lista.length; i++) {
        imprimeObjeto(lista[i]);
        if (lista[i].Nome === nome) {
            const [a, b, c, d, e, f, g] = [
                lista[i].Atributos[0],
                lista[i].Atributos[1],
                lista[i].Atributos[2],
                lista[i].Atributos[3],
                lista[i].Atributos[4],
                lista[i].Nivel,
                lista[i].Arte,
            ];
            console.log(lista[i].Nome);
            if (lista[i].Nome === 'Ogro')
                _monstro = new Ogro(a, b, c, d, e, f, g);
            else _monstro = new Monstro(a, b, c, d, e, f, g);
            return _monstro;
        }
    }
}

function criarSala(indexmae) {
    indexmae != 'SalaInicial'
        ? Sala.salas.push(new Sala(indexmae))
        : Sala.salas.push(new Cela(indexmae));
    Sala.num_salas++;
    return Sala.num_salas - 1;
}

function iniciaCombate(jogador, monstro) {
    let turno = 0;
    const primeiro = jogador.defesa >= monstro.defesa ? 0 : 1;
    while (true) {
        function imprimeCombate() {
            console.clear();
            console.log(`\t\tTurno ${turno + 1}\n`);
            console.log(monstro.printPV());
            console.log(monstro.arte);
            console.log(jogador.printPV());
            console.log(
                `\nRaça ${jogador.race}\tNível ${jogador.nivel} \t${jogador.xp} XP`,
            );
            console.log(
                `Força ${jogador.ataque} \tAgilidade ${jogador.defesa}\tRobustez ${jogador.robustez}`,
            );
        }
        function resolveTurno(ataca, defende) {
            prompt(`${ataca.nome} ATACA ${defende.nome}...`);
            if (roll + ataca.ataque >= 10 + defende.defesa) {
                let dano = ataca.rolaDano();
                dano = dano > defende.armadura ? dano - defende.armadura : 1;
                ataca instanceof Player
                    ? prompt(
                          `\t\t\t\tÉ UM ACERTO! \tVocê causou ${dano} de dano no ${defende.nome}.`,
                      )
                    : prompt(`\t\t\t\tOutch! \tVocê sofreu ${dano} de dano.`);
                defende.pv = -dano;
            } else {
                process.stdout.write(`\t\t\t\t\tO ataque ERROU!!!`); // colocar o prompt de baixo aqui
                prompt();
            }
            if (!defende.pv[0]) defende.alive = false;
            return;
        }
        const roll = rollaDado(20);
        imprimeCombate();
        // console.log(roll);

        turno % 2 === primeiro
            ? (console.log('\nÉ seu turno! O que deseja fazer?'),
              prompt(`[ATACAR]\t[FUGIR]\n`),
              resolveTurno(jogador, monstro))
            : (prompt(`\n${monstro.nome} se prepara para agir`),
              resolveTurno(monstro, jogador));

        if (jogador.alive && monstro.alive) turno++;
        else {
            imprimeCombate();
            return jogador.alive;
        }
    }
}

function menuDeSalas(jogador, sala) {
    const acoes = {
        0: false,
        1: false,
        2: false,
        3: false,
        '-99': true,
    };
    if (!isNaN(sala.portas.Mae)) acoes['0'] = true;
    if (sala.portas.Filha[0]) acoes['1'] = true;
    if (sala.portas.Filha[1]) acoes['2'] = true;
    if (sala.portas.Filha[2]) acoes['3'] = true;

    while (true) {
        console.clear();
        console.log('\t\nPORTAS DISPONÍVEIS PARA ABRIR\n');
        if (acoes['0'])
            console.log(
                `Opção para RECUAR: \t[0] - ${
                    sala.portas.Mae
                        ? 'Sala ' + sala.portas.Mae
                        : 'Cela da Prisão'
                }`,
            );
        // // SE A PORTA EXISTE => FECHADA => SE FECHADA || IMPRIME Nº DA OPÇÃO + Nº DA SALA
        console.log(
            `Opções para AVANÇAR: \t${acoes['1'] ? '[1]' : ''} ${
                acoes['1']
                    ? sala.portas.Filha[0] === 'Fechada'
                        ? '- Porta Fechada'
                        : '- Sala ' + sala.portas.Filha[0]
                    : ''
            }  ${acoes['2'] ? '[2]' : ''} ${
                acoes['2']
                    ? sala.portas.Filha[1] === 'Fechada'
                        ? '- Porta Fechada'
                        : '- Sala ' + sala.portas.Filha[1]
                    : ''
            } ${acoes['3'] ? '[3]' : ''} ${
                acoes['3']
                    ? sala.portas.Filha[2] === 'Fechada'
                        ? '- Porta Fechada'
                        : '- Sala ' + sala.portas.Filha[2]
                    : ''
            }\n`,
        );

        try {
            const acao = prompt(`Qual ação deseja realizar? `)
                .trim()
                .toLowerCase();
            if (acoes[acao]) {
                prompt(
                    `\t\t\t\t\t Você decidiu ir para a ${
                        Number(acao)
                            ? sala.portas.Filha[acao - 1] === 'Fechada'
                                ? acao + 'ª Porta Fechada'
                                : 'Porta da Sala ' + sala.portas.Filha[acao - 1]
                            : sala.portas.Mae
                            ? 'Sala ' + sala.portas.Mae
                            : 'Cela da Prisão'
                    }...`,
                );
                return acao;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

function menuDeSelecao(menu, a, b, c) {
    console.log(`[1] - ${a}\n[2] - ${b} \n[3] - ${c}\n`);
    while (true) {
        try {
            let selecao = parseInt(prompt(`Número da ${menu} escolhida: `));
            if (isNaN(selecao) || selecao < 1 || selecao > 3)
                throw `\t\t\t\tOpção inválida! Entre com 1, 2 ou 3.`;
            if (menu === 'RAÇA') {
                selecao =
                    selecao === 1 ? 'Humano' : selecao === 2 ? 'Anão' : 'Elfo';
            }
            return selecao;
        } catch (err) {
            console.log(err);
        }
    }
}

function venceBatalha(jogador, nivel) {
    const xp = 4 * nivel;
    prompt(`\n\tVocê venceu a Batalha!\t ${xp} pts de experiência obtidos`);
    jogador.xp = xp;
}

function perdeBatalha(jogador) {
    prompt(`${jogador.nome} foi derrotado!`);
}
/*
    CLASSES
*/
class Sala {
    static num_salas = 0;
    static salas = [];

    constructor(salamae) {
        this.nome = 'Sala ' + String(Sala.num_salas);
        this._pos = Sala.num_salas;
        this._nivel = Math.floor(Sala.salas.length / 4) + 1;
        this.portas = { Mae: salamae, Filha: [] };
        this.guardiao;

        for (let i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
            this.portas.Filha.push('Fechada');
        }
        for (let i = 0; i < monstros.Monstros.length; i++) {
            if (monstros.Monstros[i].Nivel === this._nivel) {
                const guardiao = monstros.Monstros[i].Nome;
                this.guardiao = criarMonstro(guardiao);
                break;
            }
        }
    }

    static imprimeSalas() {
        for (const sala of Sala.salas) {
            imprimeObjeto(sala);
        }
    }

    get index() {
        return this._pos;
    }

    setFilha(valor, index) {
        this.portas.Filha[index - 1] = Number(valor);
    }

    getFilha(index) {
        try {
            const id_filha = this.portas.Filha[index - 1];
            return id_filha;
        } catch (err) {
            console.log(err);
        }
    }

    static entraSala(jogador, index) {
        this.salas[index].guardiao.alive
            ? this.salas[index].combateSala(jogador)
            : prompt(`Você entrou na ${Sala.salas[index].nome}`);
    }

    combateSala(jogador) {
        iniciaCombate(jogador, this.guardiao)
            ? venceBatalha(jogador, this.guardiao.nivel)
            : perdeBatalha(jogador);
    }

    abrirPorta() {
        entraSala(criarSala(this.index));
    }
}

class Cela extends Sala {
    constructor(salamae) {
        super();
        this.nome = 'Cela de Prisão';
        this._pos = Sala.num_salas;
        this._nivel = 0;
        this.portas = { Mae: salamae, Filha: ['Fechada'] };
        this.guardiao = { alive: false };
    }
}

class Personagem {
    constructor(nome, pv, forca, agilidade, equip = [0, 0], nivel) {
        this._nome = nome;
        this._pv = { Atual: pv, Total: pv };
        this._forca = forca;
        this._agilidade = agilidade;
        this._equip = { Arma: equip[0], Armadura: equip[1] };
        this.nivel = nivel;
    }

    get nome() {
        return this._nome;
    }
    get pv() {
        return [this._pv.Atual, this._pv.Total];
    }
    set pv(num) {
        this._pv.Atual += num;
        if (this._pv.Atual > this._pv.Total) this._pv.Atual = this._pv.Total;
        else if (this._pv.Atual < 0) this._pv.Atual = 0;
    }

    printPV() {
        const vetorPV = this.pv;
        let barraPV = `${this.nome}: [PV] `;
        for (let i = 0; i < vetorPV[1]; i++) {
            i < vetorPV[0] ? (barraPV += '▓') : (barraPV += '░');
        }
        return barraPV;
    }

    get ataque() {
        return this._forca;
    }

    set ataque(num) {
        this._forca += num;
    }

    get defesa() {
        return this._agilidade;
    }

    set defesa(num) {
        this._agilidade += num;
    }

    get arma() {
        return this._equip.Arma;
    }

    set arma(num) {
        this._equip.Arma += num;
    }

    get armadura() {
        return this._equip.Armadura;
    }

    set armadura(num) {
        this._equip.Armadura += num;
    }

    rolaDano() {
        return rollaDado(this.arma) + this.ataque;
    }
}

class Player extends Personagem {
    constructor(nome, race) {
        super(nome);
        this._pv = { Atual: 0, Total: 0 };
        this._forca;
        this._agilidade;
        this._robustez;
        this._equip = { Arma: 0, Armadura: 0 };
        this._xp = 0;
        this.nivel = 1;
        this._race = race;
        this.alive = true;

        this.iniciaAtributos(this._race);
    }
    get race() {
        return this._race;
    }

    get robustez() {
        return this._robustez;
    }
    set robustez(num) {
        this._robustez += num;
        this.maxpv = num * 2;
    }

    get maxpv() {
        return this._pv.Total;
    }

    set maxpv(num) {
        this._pv.Total += num;
        this.pv = num;
    }

    get xp() {
        return this._xp;
    }
    set xp(num) {
        this._xp += num;
        this.subirLVL(this._xp);
    }

    subirLVL(xp) {
        const n = this.nivel;
        const nextLVL = 5 * n * (n + 1);
        console.log(n, nextLVL);
        if (xp >= nextLVL) {
            this.nivel++;
            console.clear();
            prompt(`\n\tVOCE AVANÇOU PARA O NÍVEL ${this.nivel}`);
            console.log(
                'Você tem',
                1,
                'ponto para evoluir um atributo.',
                'Qual atributo você deseja evoluir?\n',
            );
            const atr = menuDeSelecao(
                'opção',
                'Força',
                'Agilidade',
                'Robustez',
            );
            if (atr === 1) {
                this.ataque = 1;
                this.maxpv = 1;
                prompt(
                    `\tSua Força aumentou em 1 pt\n\tSeus Pontos de Vida aumentaram em 1 pt`,
                );
            } else if (atr === 2) {
                this.defesa = 1;
                this.maxpv = 1;
                prompt(
                    `\tSua Agilidade aumentou em 1 pt\n\tSeus Pontos de Vida aumentaram em 1 pt`,
                );
            } else {
                this.robustez = 1;
                this.maxpv = 1;
                prompt(
                    `\tSua Robustez aumentou em 1 pt\n\tSeus Pontos de Vida aumentaram em 3 pts`,
                );
            }
        }
    }

    iniciaAtributos(race) {
        this._equip.Arma = 2;
        if (race === 'Anão') {
            [this._forca, this._agilidade, this._robustez] = [3, 2, 4];
        } else if (race === 'Elfo') {
            [this._forca, this._agilidade, this._robustez] = [2, 4, 3];
        } else if (race === 'Humano') {
            [this._forca, this._agilidade, this._robustez] = [3, 3, 3];
        } else {
            // UTILIZADA PARA TESTAR O JOGO (REMOVER ANTES DA VERSAO FINAL)
            [this._forca, this._agilidade, this._robustez] = [25, 25, 25];
        }
        [this._pv.Atual, this._pv.Total] = [
            this._robustez * 2 + 1,
            this._robustez * 2 + 1,
        ];
    }
}

class Monstro extends Personagem {
    static combates = [];

    constructor(nome, pv, forca, agilidade, equip, nivel, arte) {
        super(nome, pv, forca, agilidade, equip, nivel);
        this.alive = true;
        this._arte = arte;
        Monstro.combates.push(this.nome);
    }
    get arte() {
        return this._arte || 'monstro sem arte!';
    }
}

class Ogro extends Monstro {
    grita() {
        console.log(`${this.nome} forte!!! ${this.nome} esmaga!!!`);
    }
}
/*
    TRAMA
*/

/*
   COMEÇA O JOGO:: MAIN()
*/
function main() {
    const player = new Player(
        playerName(),
        menuDeSelecao('RAÇA', 'Humano', 'Anão', 'Elfo'),
    );
    criarSala('SalaInicial');
    const index_sala = [0, 0];

    loopPrincipal: while (true) {
        Sala.entraSala(player, index_sala[0]);

        if (player.alive) {
            const acao = Number(menuDeSalas(player, Sala.salas[index_sala[0]]));
            if (acao === 0)
                index_sala[1] = Sala.salas[index_sala[0]].portas.Mae;
            else if (acao > 0) {
                if (Sala.salas[index_sala[0]].getFilha(acao) === 'Fechada') {
                    Sala.salas[index_sala[0]].setFilha(Sala.num_salas, acao);
                    index_sala[1] = Sala.num_salas;
                    criarSala(index_sala[0]);
                } else {
                    index_sala[1] = Sala.salas[index_sala[0]].getFilha(acao);
                }
            } else index_sala[1] = acao;
        } else {
            prompt(
                `É uma pena...\t${
                    Sala.salas[index_sala[0]].guardiao.nome
                } era forte demais pra você...`,
            );
            index_sala[1] = -1;
        }

        if (index_sala[1] === -99) break loopPrincipal;
        if (index_sala[1] === -1) break loopPrincipal;
        console.log(index_sala[0], index_sala[1], 147);
        index_sala[0] = index_sala[1];
        prompt(Sala.salas[index_sala[0]]);
    }
}
main();
//const inimigo = criarMonstro('Zumbi');

// imprimeObjeto(rato);
// imprimeObjeto(player);
// imprimeObjeto(ogro);
// imprimeObjeto(cela);
// ogro.grita();

// console.log(Monstro.combates, Sala.num_salas);
// console.log(monstros);

// if (iniciaCombate(player, inimigo))
//     console.log(`\n${player.nome} VENCEU O COMBATE!!!`);
// else console.log(`\n${player.nome} foi DERROTADO por ${inimigo.nome}`);
// console.log();

// n(n + 1)*5 => proximo nível && n(n - 1) => nível anterior
// xp necessário p/ lvlup de (n -> n+1) => 5n² + 5n - (5n² - 5n)
// -> 5n² - 5n² + 5n + 5n -> 10n #
// Por enquanto deixarei o Level up! a cada 2.5 monstros do próprio nível (10*n / 2.5) => 4*n #
