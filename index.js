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
    const roll = Math.floor(Math.random() * faces + 1);
    return roll;
}

function exibirComPausa(msg, miliseconds = 1500) {
    for (const element of msg) {
        const dt = new Date();
        while (new Date() - dt <= miliseconds) {
            // Não faz nada
        }
        process.stdout.write(element);
    }
}

function imprimeObjeto(objeto) {
    for (const chave in objeto) {
        if (Object.hasOwnProperty.call(objeto, chave)) {
            const valor = objeto[chave];
            console.log(chave, valor);
        }
    }
}

function criarMonstro(monstro) {
    let _monstro;
    const [a, b, c, d, e, f, g] = [
        monstro.Atributos[0],
        monstro.Atributos[1],
        monstro.Atributos[2],
        monstro.Atributos[3],
        monstro.Atributos[4],
        monstro.Nivel,
        monstro.Arte,
    ];
    _monstro =
        monstro.Nome === 'Ogro'
            ? new Ogro(a, b, c, d, e, f, g)
            : new Monstro(a, b, c, d, e, f, g);
    return _monstro;
}

function criarSala(indexmae) {
    indexmae != 'SalaInicial'
        ? Sala.salas.push(new Sala(indexmae))
        : Sala.salas.push(new Cela(indexmae));
    Sala.num_salas++;
    return Sala.num_salas - 1;
}

function iniciaCombate(jogador, monstro, tempo) {
    let turno = 0;
    const primeiro = jogador.defesa >= monstro.defesa ? 0 : 1;
    loopCombate: while (true) {
        function imprimeCombate() {
            console.clear();
            console.log(
                `\t\t\tDIA ${tempo}\n\t\t   Combate Turno ${turno + 1}`,
            );
            console.log(monstro.printPV());
            console.log(monstro.arte);
            console.log(jogador.printPV());
            console.log(
                `\nRaça ${jogador.race}\tNível ${jogador.nivel} \tXP Total ${jogador.xp}`,
            );
            console.log(
                `Força     ${jogador.forca}\tVida Máx ${jogador.maxpv}\tSucatas  ${jogador.sucata}`,
            );
            console.log(
                `Agilidade ${jogador.agilidade}\tArma     ${
                    jogador.arma - 2
                }\tBandagem ${jogador.bandagem}`,
            );
            console.log(
                `Robustez  ${jogador.robustez}\tArmadura ${jogador.armadura}\tPoção    ${jogador.pocao}\n`,
            );
        }
        function resolveTurno(ataca, defende) {
            exibirComPausa(
                [`\t\t⤷ ${ataca.nome} ATACA ${defende.nome}  `],
                800,
            );
            if (roll + ataca.ataque >= 10 + defende.defesa) {
                let dano = ataca.rolaDano();
                dano = dano > defende.armadura ? dano - defende.armadura : 1;
                // altera texto se o atacante pertence a classe Player
                ataca instanceof Player
                    ? exibirComPausa(
                          [
                              `→  É UM ACERTO!  `,
                              `→  Você causou ${dano} de dano no ${defende.nome}`,
                          ],
                          1250,
                      )
                    : exibirComPausa(
                          [`  →  Outch!  `, `→  Você sofreu ${dano} de dano`],
                          1800,
                      );
                exibirComPausa(' ', 2000);
                defende.pv = -dano;
            } else {
                exibirComPausa([`→\tERROU o ataque`], 1000);
                exibirComPausa(' ', 2000);
            }
            if (!defende.pv[0]) defende.alive = false;
            return;
        }
        function resolveFuga(jogador, monstro) {
            exibirComPausa([`   ⤷ Você tenta fugir do combate\t`], 800);
            if (
                roll + jogador.nivel + jogador.agilidade >
                10 + monstro.nivel + monstro.agilidade
            ) {
                exibirComPausa(
                    [`→\tSUCESSO! Você fogiu para a sala anterior`],
                    2000,
                );
                exibirComPausa('\n', 2000);
                return true;
            } else {
                exibirComPausa(
                    [`→\tFALHOU! ${monstro.nome} foi mais rápido do que você`],
                    2000,
                );
                exibirComPausa('\n', 2000);
                return false;
            }
        }
        function usarInventario(jogador) {
            jogador.usarItem('Bandagem');
        }

        const roll = rollaDado(20);
        imprimeCombate();

        if (turno % 2 === primeiro) {
            const acao = menuDeSelecao(
                'Ação de Combate',
                'ATACAR',
                'INVENTÁRIO',
                'FUGIR',
            );
            if (acao === 1) resolveTurno(jogador, monstro);
            else if (acao === 2) usarInventario(jogador, monstro);
            else if (resolveFuga(jogador, monstro)) {
                return 'fugiu';
            }
        } else {
            exibirComPausa([`${monstro.nome} se prepara para agir\n`], 800);
            resolveTurno(monstro, jogador);
        }

        if (jogador.alive && monstro.alive) turno++;
        else {
            imprimeCombate();
            return jogador.alive;
        }
    }
}

function iniciaDormir(jogador, dia) {
    console.clear();
    const introSono = `\n\tÉ muito difícil perceber a passagem do tempo dentro das montanhas, 
        mas seu corpo esta gritando alto em seus ouvidos que este dia acabou.\n
        O dia ${dia} da sua fuga foi longo e cansativo, está na hora de parar e dar um descanso pro seu corpo...\n\n\n
        Antes de dormir você pode converter suas sucatas para aperfeiçoar sua arma, armadura, 
        fazer bandagens e curativos. Quando terminar basta ir na Opção Dormir.\n\n`;
    exibirComPausa(introSono, 20);
    while (true) {
        console.clear();
        console.log(introSono);
        console.log(jogador.printPV());
        console.log(`\nTotal de Sucatas ${jogador.sucata}`);
        console.log(`\n\nAções Disponíveis:`);
        console.log(`[1] Melhorar Arma     \t\tcusta ${jogador.arma + 5 - 2}`);
        console.log(`[2] Melhorar Armadura \t\tcusta ${jogador.armadura + 5}`);
        console.log(`[3] Criar Bandagem    \t\tcusta ${2} sucatas`);
        console.log(`[4] Aplicar Bandagem  \t\t${jogador.bandagem} bandagens`);
        console.log(`[5] Comer os Inimigos \t\t${jogador.inimigos} inimigos`);
        console.log(`[6] DORMIR!\n`);
        try {
            const opcao = parseInt(prompt(`Realizar qual Ação? `));
            if (isNaN(opcao) || opcao < 1 || opcao > 6)
                throw `\t\t\t\topção inválida! digite o número da opção escolhida`;

            switch (opcao) {
                case 1:
                    jogador.usarSucata('Arma');
                    break;

                case 2:
                    jogador.usarSucata('Armadura');
                    break;

                case 3:
                    jogador.usarSucata('Bandagem');
                    break;

                case 4:
                    jogador.usarItem('Bandagem');
                    break;

                case 5:
                    jogador.comerInimigos();
                    break;

                case 6:
                    jogador.inimigos = -jogador.inimigos;
                    exibirComPausa(
                        `\t\t    Você procura um canto e se cobre com escombros, você dorme. 
                    Horas depois você desperta sem saber se é noite ou dia, mas não importa... 
                    O dia ${
                        dia + 1
                    } da sua fuga começa e você tem inimigos te separando da liberdade...\n`,
                        20,
                    );
                    prompt('');
                    return;

                default:
                    throw `Opção Inválida linha 192`;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

function menuDeSalas(sala, tempo, actions) {
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
        console.log(
            `\t\t\tDIA ${tempo}\n\t\tSalas Percorridas Hoje ${actions}\n\n\n\n`,
        );
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
    console.log(`[1] - ${a}\n[2] - ${b} \n[3] - ${c}`);
    while (true) {
        try {
            let selecao = parseInt(+prompt(` ⤷ Número da ${menu} escolhida: `));

            if (isNaN(selecao)) throw `\t\t\t\t\tentre com um número...`;
            if (menu === 'Ação de Combate') {
                if (selecao < 0 || selecao > 3)
                    throw `\t\t\t\t\tOpção inválida! Entre com 1, 2, 3 ou vazio para ATACAR`;
            } else if (selecao < 1 || selecao > 3)
                throw `\t\t\t\t\tOpção inválida! Entre com 1, 2 ou 3`;
            if (menu === 'RAÇA') {
                selecao =
                    selecao == 1 ? 'Humano' : selecao === 2 ? 'Anão' : 'Elfo';
            }
            // Se selecao == 0 -> retorna 1 -> é 0 se não digitar nada -> ataca sem ter que digitar ;)
            return selecao ? selecao : 1;
        } catch (err) {
            console.log(err, menu);
        }
    }
}

function venceBatalha(jogador, nivel) {
    const xp = 4 * nivel;
    const su = rollaDado(2) + rollaDado(2) + nivel;
    prompt(
        `\n\tVocê venceu a Batalha!\t ${xp} pontos de experiência obtidos\n\t\t\t\t ${su} sucatas encontradas na sala`,
    );
    jogador.xp = xp;
    jogador.sucata = su;
    jogador.inimigos = nivel;
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
        this.portas = { Mae: salamae, Filha: [] };
        this._nivel;
        this.guardiao;

        this.setNivel(Math.floor(Sala.salas.length / 4) + 1);
        this.setGuardiao(this._nivel);

        for (let i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
            this.portas.Filha.push('Fechada');
        }

        // for (let i = 0; i < monstros.Monstros.length; i++) {
        //     if (monstros.Monstros[i].Nivel === this._nivel) {
        //         const guardiao = monstros.Monstros[i].Nome;
        //         this.guardiao = criarMonstro(guardiao);
        //         break;
        //     }
        // }
    }

    static imprimeSalas() {
        for (const sala of Sala.salas) {
            imprimeObjeto(sala);
        }
    }

    setNivel(num) {
        /* Toda sala tem 10% de ser nível - 1 e 10% de ser de um nível + 1 
           Salas de nível 1 não podem retornar nível 0                    */
        const roll = rollaDado(20);
        const level = roll > 6 ? num : roll > 2 ? num - 1 : num + 1;
        this._nivel = level ? level : 1;
    }

    setGuardiao(nivel) {
        const guardiaoes = monstros.Monstros[nivel - 1];
        const guardiao = Math.floor(Math.random() * guardiaoes.length);
        this.guardiao = criarMonstro(guardiaoes[guardiao]);
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

    static entraSala(index, jogador, tempo, acoes) {
        let fuga = false;
        this.salas[index].guardiao.alive
            ? (fuga = this.salas[index].combateSala(jogador, tempo))
            : prompt(`Você entrou na ${Sala.salas[index].nome}`);

        if (fuga === 'fugiu') return fuga;
        if (index && acoes < 3 && jogador.alive) {
            console.log(
                `\n\nComo o monstro foi derrotado, você pode fazer algo antes de prosseguir...\n`,
            );
            console.clear();
            loopMenuSala: while (true) {
                console.log(
                    `\t\t\t\t\t${
                        Sala.salas[index].nome
                    }\n\n${jogador.printPV()}\nSucatas:  ${
                        jogador.sucata
                    }\nBandagens: ${jogador.bandagem}\n`,
                );
                const menu = menuDeSelecao(
                    'Ação de Sala',
                    'Criar Bandagem\t\tCusta 2 sucatas',
                    'Usar Bandagem',
                    'Continuar Explorando',
                );
                if (menu === 1) {
                    jogador.usarSucata('Bandagem');
                } else if (menu === 2) {
                    jogador.usarItem('Bandagem');
                } else if (menu === 3) {
                    prompt(
                        '\t\t\t\t\tok... você oberva as Portas desta sala...',
                    );
                    break loopMenuSala;
                }
                console.clear();
            }
        }
    }

    combateSala(jogador, tempo) {
        const combate = iniciaCombate(jogador, this.guardiao, tempo);
        if (combate && combate != 'fugiu')
            venceBatalha(jogador, this.guardiao.nivel);
        else if (combate != 'fugiu') perdeBatalha(jogador);
        else return combate;
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
        this._race = 'Monstro';
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

    get forca() {
        return this._forca;
    }
    set forca(num) {
        this._forca += num;
    }

    get agilidade() {
        return this._agilidade;
    }
    set agilidade(num) {
        this._agilidade += num;
    }

    get ataque() {
        const ataque = this.race != 'Elfo' ? this._forca : this._agilidade;
        return ataque;
    }
    get defesa() {
        const defesa =
            this.race != 'Anão'
                ? this._agilidade
                : Math.round(this._agilidade + this._forca * 0.25);
        return defesa;
    }

    get arma() {
        const arma = this._equip.Arma;
        return arma;
    }
    set arma(num) {
        this._equip.Arma += num;
    }

    get armadura() {
        const armadura = this._equip.Armadura;
        return armadura;
    }
    set armadura(num) {
        this._equip.Armadura += num;
    }

    get race() {
        return this._race;
    }
    set race(race) {
        this._race = race;
    }

    rolaDano() {
        const dano = rollaDado(this.arma * 2) + this.forca;
        return dano;
    }
}

class Player extends Personagem {
    constructor(nome, race) {
        super(nome);
        this._pv = { Atual: 0, Total: 0 };
        this._forca;
        this._agilidade;
        this._robustez;
        this._equip = { Arma: 2, Armadura: 0 };
        this._item = { Bandagem: 0, Pocao: 0 };
        this._xp = 0;
        this.nivel = 1;
        this._race = race;
        this._sucata = 0;
        this._inimigos = 0;
        this.alive = true;

        this.iniciaAtributos(this._race);
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
    get sucata() {
        return this._sucata;
    }
    set sucata(num) {
        this._sucata += num;
    }
    get bandagem() {
        return this._item.Bandagem;
    }
    set bandagem(num) {
        this._item.Bandagem += num;
    }
    get pocao() {
        return this._item.Pocao;
    }
    set pocao(num) {
        this._item.Pocao += num;
    }
    get inimigos() {
        return this._inimigos;
    }
    set inimigos(num) {
        this._inimigos += num;
    }
    get xp() {
        return this._xp;
    }
    set xp(num) {
        this._xp += num;
        this.subirLVL(this._xp);
    }

    usarSucata(item) {
        if (item === 'Arma') {
            this.sucata >= this.arma + 3
                ? ((this.sucata = -(this.arma + 3)),
                  (this.arma = 1),
                  prompt(`\t\t\t\t\tSua Arma foi Aprimorada!`))
                : prompt(`\t\t\t\t\tSucatas insuficientes!`);
        } else if (item === 'Armadura') {
            this.sucata >= this.armadura + 5
                ? ((this.sucata = -(this.armadura + 5)),
                  (this.armadura = 1),
                  prompt(`\t\t\t\t\tSua Armadura foi Aprimorada!`))
                : prompt(`\t\t\t\t\tSucatas insuficientes!`);
        } else if (item === 'Bandagem') {
            this.sucata >= 2
                ? ((this.sucata = -2),
                  (this.bandagem = 1),
                  prompt(`\t\t\t\t\tUma Bandagem foi criada!`))
                : prompt(`\t\t\t\t\tSucatas insuficientes!`);
        }
    }

    usarItem(item) {
        if (item === 'Bandagem') {
            const cura = rollaDado(3) + this.nivel;
            this.bandagem
                ? ((this.bandagem = -1),
                  (this.pv = cura),
                  prompt(`\t\t\t\t\tVocê recupera ${cura} pontos de vida`))
                : prompt(`\t\t\t\t\tVocê não tem Bandagem!`);
        } else if (item === 'Poção') {
            const cura = rollaDado(4) + rollaDado(4) + this.nivel * 2;
            this.pocao
                ? ((this.pocao = -1),
                  (this.pv = cura),
                  prompt(`\t\t\t\t\tVocê recupera ${cura} pontos de vida`))
                : prompt(`\t\t\t\t\tVocê não tem Poção!`);
        }
    }

    comerInimigos() {
        if (this.inimigos) {
            const cura = this.inimigos;
            prompt(
                `Você se prepara para cozinhar os inimigos derrotados hoje.`,
            );
            prompt(`\t\t\t\t\tVocê recuperou ${cura} pontos de vida!`);
            this.pv = cura;
            this.inimigos = -this.inimigos;
        } else {
            prompt(`Você não derrotou nenhum inimigo hoje...`);
        }
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
                'Força     🏋️‍♂️',
                'Agilidade 🤸‍♀️',
                'Robustez  🧗‍♀️',
            );
            if (atr === 1) {
                this.forca = 1;
                this.maxpv = 1;
                prompt(
                    `\tSua Força aumentou em 1 pt\n\tSeus Pontos de Vida aumentaram em 1 pt`,
                );
            } else if (atr === 2) {
                this.agilidade = 1;
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
            [this._forca, this._agilidade, this._robustez] = [3, 2, 5];
            this.armadura = 1;
        } else if (race === 'Elfo') {
            [this._forca, this._agilidade, this._robustez] = [2, 4, 4];
            this.arma = 1;
        } else if (race === 'Humano') {
            [this._forca, this._agilidade, this._robustez] = [3, 4, 4];
        } else {
            // UTILIZADA PARA TESTAR O JOGO (REMOVER ANTES DA VERSAO FINAL)
            [this._forca, this._agilidade, this._robustez] = [3, 3, 25];
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
        menuDeSelecao('RAÇA', 'Humano   👨‍🌾', 'Anão \t👳', 'Elfo \t🧝'),
    );
    // const player = new Player(playerName(), 'DEUS');
    criarSala('SalaInicial');
    const index_sala = [0, 0];
    let [dia, acoes, fugiu] = [0, 0, 'não'];

    loopPrincipal: while (true) {
        fugiu = Sala.entraSala(index_sala[0], player, dia, acoes);

        if (fugiu === 'fugiu') {
            index_sala[1] = Sala.salas[index_sala[0]].portas.Mae;
            fugiu = 0;
        } else if (player.alive) {
            // SE VIVO DORME
            if (acoes === 3) {
                iniciaDormir(player, dia);
                dia++;
                acoes = 0;
            }
            const acao = Number(
                menuDeSalas(Sala.salas[index_sala[0]], dia, acoes),
            );
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
                `\t\t⤷É uma pena...\t${
                    Sala.salas[index_sala[0]].guardiao.nome
                } era forte demais pra você...`,
            );
            index_sala[1] = -1;
        }

        if (index_sala[1] === -99) break loopPrincipal;
        if (index_sala[1] === -1) break loopPrincipal;
        console.log(index_sala[0], index_sala[1], 147);
        index_sala[0] = index_sala[1];
        acoes += 1;
    }
}
main();

// n(n + 1)*5 => proximo nível && n(n - 1) => nível anterior
// xp necessário p/ lvlup de (n -> n+1) => 5n² + 5n - (5n² - 5n)
// -> 5n² - 5n² + 5n + 5n -> 10n #
// Por enquanto deixarei o Level up! a cada 2.5 monstros do próprio nível (10*n / 2.5) => 4*n #
