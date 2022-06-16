console.clear();
// const prompt = require('prompt-sync')();
// function rollaDado(num) {
//     const roll = Math.floor(Math.random() * num + 1);
//     return roll;
// }

// class Player {
//     constructor(bandagem, nivel, pocao) {
//         this.bandagem = bandagem;
//         this.nivel = nivel;
//         this.pocao = pocao;
//         this._pv = 0;
//     }
//     get pv() {
//         return this._pv;
//     }
//     set pv(num) {
//         this._pv += num;
//     }
//     usarItem(item) {
//         if (item === 'Bandagem') {
//             const cura = rollaDado(4) + this.nivel;
//             this.bandagem
//                 ? ((this.bandagem = -1),
//                   (this.pv = cura),
//                   prompt(`\t\t\t\tVocê recupera ${cura} pontos de vida`))
//                 : prompt(`\t\t\t\tVocê não tem Bandagem!`);
//         } else if (item === 'Poção') {
//             const cura = rollaDado(4) + rollaDado(4) + this.nivel * 2;
//             this.pocao
//                 ? ((this.pocao = -1),
//                   (this.pv = rollaDado(4) + rollaDado(4) + this.nivel * 2),
//                   prompt(`\t\t\t\tVocê recupera ${cura} pontos de vida`))
//                 : prompt(`\t\t\t\tVocê não tem Poção!`);
//         }
//     }
// }

// const jogador = new Player(5, 1, 1);

// console.log(jogador);

// jogador.usarItem('Bandagem');
// console.log(jogador);

function retornaMsgComIntervalo(msg, intervalo) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(msg);
        }, intervalo * 1000);
    });
}

async function exibirComPausa(listadeMsg, dt = 1.5) {
    for (const msg of listadeMsg) {
        console.log(await retornaMsgComIntervalo(msg, dt));
    }
}

async function imprimeComPausa(msg, dt = 2) {
    console.log(
        await new Promise(resolve => {
            setTimeout(() => {
                resolve(msg);
            }, dt * 1000);
        }),
    );
}

console.log('Mensagem 1');
exibirComPausa(['Mensagem 2']);
console.log('Mensagem 3');
console.log('Mensagem 4');
imprimeComPausa('Mensagem 5');
