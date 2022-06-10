const prompt = require('prompt-sync')();
/*
    Variáveis Globais
*/

let playerName;

/*
    Funções
*/

/*
    Trama
*/

/*
    Começa o Jogo
*/
let salas = [];

class Sala {
    static num_salas = 0;

    constructor(nome, salamae, inimigo) {
        this.name = nome;
        this.portas = { Mae: salamae, Filha: [] };
        this.inimigo = inimigo;

        this.criaSalaFilha();
    }

    criaSalaFilha() {
        for (let i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
            this.portas.Filha.push('Fechada');
            Sala.num_salas += 1;
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

const cela = new Sala('Cela da Prisão', false, 'Rato Gigante');
let inimigo = new Monstro(`Rato Gigante`, 6, 3, 0);

salas.push(cela);

function imprimeObjeto(objeto) {
    for (const chave in objeto) {
        if (Object.hasOwnProperty.call(objeto, chave)) {
            const valor = objeto[chave];
            console.log(chave, valor);
        }
    }
}

for (const sala of salas) {
    imprimeObjeto(sala);
}
imprimeObjeto(inimigo);

console.log(Monstro.combates, Sala.num_salas);
