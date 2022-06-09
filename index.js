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
    constructor(nome, salamae, inimigo) {
        this.name = nome;
        this.portas = { Mae: salamae, Filhas: [] };
        this.inimigo = inimigo;

        this.criaFilhas();
    }

    criaFilhas() {
        for (let i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
            this.portas.Filhas.push('Fechada');
        }
    }
}

cela = new Sala('Cela da Prisão', false, "Rato Gigante");
salas.push(cela);

for (const sala of salas) {
    for (const key in sala) {
        if (Object.hasOwnProperty.call(sala, key)) {
            const value = sala[key];
            console.log(key, value);
        }
    }
}
