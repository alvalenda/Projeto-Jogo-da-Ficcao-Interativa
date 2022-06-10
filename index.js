console.clear();
const prompt = require('prompt-sync')();
const fs = require('fs');

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
            const nome = prompt(`Qual é o seu nome sobrevivente 013? `);
            if (nome.length < 3)
                throw `Seu nome deve ter 3 ou mais caracteres...`;
            return nome;
        } catch (error) {}
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
/*
    Trama
*/

/*
    Começa o Jogo
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

class Player {
    constructor(nome, classe) {
        this.nome = nome;
        this.vida;
        this.ataque;
        this.defesa;
        this.level = 1;

        this.iniciaAtributos(classe);
    }

    iniciaAtributos(classe) {
        if (classe === 'Fordo') {
            [this.vida, this.ataque, this.defesa] = [8, 4, 3];
        } else if (classe === 'Magro') {
            [this.vida, this.ataque, this.defesa] = [6, 3, 5];
        } else {
            [this.vida, this.ataque, this.defesa] = [7, 4, 4];
        }
    }
}

class Monstro {
    static combates = [];

    constructor(nome, vida, ataque, defesa) {
        this.nome = nome;
        this.vida = vida;
        this.ataque = ataque;
        this.defesa = defesa;

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

function criarMonstro(nome) {
    const lista = monstros['Monstros'];
    let _monstro;
    for (let i = 0; i < lista.length; i++) {
        imprimeObjeto(lista[i]);
        if (lista[i].Nome === nome) {
            const [a, b, c, d] = [
                lista[i].Atributos[0],
                lista[i].Atributos[1],
                lista[i].Atributos[2],
                lista[i].Atributos[3],
            ];
            console.log(lista[i].Nome);
            if (lista[i].Nome === 'Ogro') _monstro = new Ogro(a, b, c, d);
            else _monstro = new Monstro(a, b, c, d);
            return _monstro;
        }
    }
}

const player = new Player(playerName(), 'Magro');
const cela = new Sala('Cela da Prisão', false, 'Rato Gigante');
const rato = criarMonstro('Rato Gigante');
const ogro = criarMonstro('Ogro');

imprimeObjeto(rato);
imprimeObjeto(ogro);
imprimeObjeto(cela);
ogro.grita();
imprimeObjeto(player);
Sala.imprimeSalas();

console.log(Monstro.combates, Sala.num_salas);
console.log(monstros);
