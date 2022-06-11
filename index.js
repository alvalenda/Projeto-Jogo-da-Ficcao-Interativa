console.clear();
const prompt = require('prompt-sync')();
// const { resolvePtr } = require('dns');
const fs = require('fs');
// const { stdout } = require('process');

let monstros = JSON.parse(fs.readFileSync('criaturas.json', 'utf-8'));

/*
    Variáveis Globais
*/

/*
    Funções
*/
function playerName() {
    while (true) {
        try {
            const nome = prompt(`Qual é o seu nome SOBREVIVENTE...? `);
            if (nome.length < 3) throw `Seu nome deve é curto demais...`;
            else if (nome.length > 10) throw `Seu nome é longo demais...`;
            return nome;
        } catch (error) {}
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

function barradeHP(objeto) {
    const barra = [objeto.vida[0], objeto.vida[1]];
    let vida = '[ ';
    for (let i = 0; i < barra[1]; i++) {
        i < barra[0] ? (vida += '#') : (vida += ' ');
    }
    vida += ' ]';
    return vida;
}

function iniciaCombate(jogador, monstro) {
    let turno = 0;
    while (true) {
        console.clear();
        console.log(`\t${monstro.nome}\tHP `, barradeHP(monstro));
        console.log(`\n\n\n\n\n\n`);
        console.log(`\t${jogador.nome}\tHP `, barradeHP(jogador));

        const roll = rollaDado(20);
        console.log(roll);
        prompt(`Turno ${turno + 1}`);
        if (turno % 2 === 0) {
            prompt(`${jogador.nome} tenta golpear ${monstro.nome}`);
            if (roll + jogador.ataque >= 10 + monstro.defesa) {
                const dado = rollaDado(jogador.equip[0]);
                const dano =
                    dado + jogador.ataque > monstro.equip[1]
                        ? dado + jogador.ataque - monstro.equip[1]
                        : 0;
                prompt(
                    `\t\t\t\t\tACERTOU!!! Você causou ${dano} pontos de dano!`,
                );
                monstro.mudaVida(-dano);
                if (monstro.vida[0] <= 0) return true;
            } else {
                process.stdout.write(`\t\t\t\t\tERROU...`);
                prompt();
            }
        } else {
            prompt(`${monstro.nome} tenta te acertar um golpe`);
            if (roll + monstro.ataque >= 10 + jogador.defesa) {
                const dado = rollaDado(monstro.equip[0]);
                const dano =
                    dado + monstro.ataque > jogador.equip[1]
                        ? dado + monstro.ataque - jogador.equip[1]
                        : 0;
                prompt(
                    `\t\t\t\t\tACERTOU!!! Você sofreu ${dano} pontos de dano.`,
                );
                jogador.mudaVida(-dano);
                if (player.vida[0] <= 0) return false;
            } else {
                prompt(`\t\t\t\t\tERROU...`);
            }
        }
        turno++;
    }
}
/*
    CLASSES
*/
class Sala {
    static num_salas = 0;
    static salas = [];

    constructor(nome, salamae, inimigo) {
        this.nome = nome;
        this.portas = { Mae: salamae, Filha: [] };
        this.inimigo = inimigo;

        this.criaSalaFilha();
        Sala.salas.push(this);
    }

    criaSalaFilha() {
        for (let i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
            this.portas.Filha.push('Fechada');
            Sala.num_salas += 1;
        }
    }

    static imprimeSalas() {
        for (const sala of Sala.salas) {
            imprimeObjeto(sala);
        }
    }
}
class Personagem {
    constructor(nome, pv, forca, agilidade, equip, nivel) {
        this._nome = nome;
        this._pv = { Atual: pv, Total: pv };
        this._forca = forca;
        this._agilidade = agilidade;
        this._equip = { Arma: equip[0], Armadura: equip[1] };
        this.nivel = nivel;
        this.alive = true;
    }
    get pv() {
        return [this.pv.Atual, this.pv.Total];
    }
    set pv(num) {
        this._pv.Atual += num;
        if (this._pv.Atual > this._pv.Total) this._pv.Atual = this._pv.Total;
        else if (this._pv.Atual < 0) this._pv.Atual = 0;
    }
}

class Player extends Personagem {
    constructor(nome, classe) {
        super(nome, this.alive);
        this._pv = { Atual: 0, Total: 0 };
        this._forca;
        this._agilidade;
        this._equip = { Arma: 2, Armadura: 0 };
        this.xp = 0;
        this.level = 1;

        this.iniciaAtributos(classe);
    }

    iniciaAtributos(classe) {
        this.equip[0] = 3;
        if (classe === 'guarda') {
            [this._pv.Atual, this._pv.Atual, this._forca, this._agilidade] = [
                9, 9, 3, 2,
            ];
        } else if (classe === 'bandido') {
            [this._pv.Atual, this._pv.Atual, this._forca, this._agilidade] = [
                7, 7, 3, 4,
            ];
        } else {
            [this._pv.Atual, this._pv.Atual, this._forca, this._agilidade] = [
                8, 8, 3, 3,
            ];
        }
    }
}

class Monstro extends Personagem {
    static combates = [];

    constructor(nome, pv, forca, agilidade, equip, nivel) {
        super(nome, pv, forca, agilidade, equip, nivel, this.alive);

        Monstro.combates.push(this.nome);
    }
}

class Ogro extends Monstro {
    grita() {
        console.log(
            `${this.nome} forte!!! ${this.nome} esmaga ${player.nome}!!!`,
        );
    }
}
/*
    Trama
*/

/*
    Começa o Jogo
*/

function criarMonstro(nome) {
    const lista = monstros['Monstros'];
    let _monstro;
    for (let i = 0; i < lista.length; i++) {
        imprimeObjeto(lista[i]);
        if (lista[i].Nome === nome) {
            const [a, b, c, d, e] = [
                lista[i].Atributos[0],
                lista[i].Atributos[1],
                lista[i].Atributos[2],
                lista[i].Atributos[3],
                lista[i].Atributos[4],
            ];
            console.log(lista[i].Nome);
            if (lista[i].Nome === 'Ogro') _monstro = new Ogro(a, b, c, d, e);
            else _monstro = new Monstro(a, b, c, d, e);
            return _monstro;
        }
    }
}

const player = new Player(playerName(), 'Normal');
// const cela = new Sala('Cela da Prisão', false, 'Rato Gigante');
const rato = criarMonstro('Rato Gigante');
// const ogro = criarMonstro('Ogro');

// imprimeObjeto(rato);
// imprimeObjeto(ogro);
// imprimeObjeto(cela);
// ogro.grita();
// imprimeObjeto(player);
// Sala.imprimeSalas();

// console.log(Monstro.combates, Sala.num_salas);
// console.log(monstros);

if (iniciaCombate(player, rato))
    console.log(`${player.nome} VENCEU O COMBATE!!!`);
else
    console.log(
        `${player.nome} foi DERROTADO por ${
            Monstro.combates[Monstro.combates.length - 1]
        }`,
    );
console.log();
