console.clear();
const prompt = require('prompt-sync')();
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

async function exibirComPausa(listadeMsg, dt = 0.03) {
    for (const msg of listadeMsg) {
        process.stdout.write(await retornaMsgComIntervalo(msg, dt));
    }
}

async function imprimeComPausa(msg, dt = 0.02) {
    for (const element of msg) {
        process.stdout.write(
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve(element);
                }, dt * 1000);
            }),
        );
    }
}

// const sleep = require('util').promisify(setTimeout);
// console.log('Mensagem 1');
// exibirComPausa(['Mensagem 2']);
// console.log('Mensagem 3');
// console.log('Mensagem 4');
// imprimeComPausa('Mensagem 5\n');
// const dia = 0;

// imprimeComPausa(`\t\t    Você procura um canto e se cobre com escombros, você dorme.
//                     Horas depois você desperta sem saber se é noite ou dia, mas não importa...
//                     O dia ${
//                         dia + 1
//                     } da sua fuga começa e você tem inimigos te separando da liberdade...\n`);

// let msg = `\t\t    Você procura um canto e se cobre com escombros, você dorme.
//             Horas depois você desperta sem saber se é noite ou dia, mas não importa...
//             O dia ${
//                 dia + 1
//             } da sua fuga começa e você tem inimigos te separando da liberdade...\n`;

// function pause(msg, miliseconds) {
//     for (const element of msg) {
//         const dt = new Date();
//         while (new Date() - dt <= miliseconds) {
//             // Não faz nada
//         }
//         process.stdout.write(element);
//     }
// }

// (async () => {
//     console.time('Dormi por');
//     await sleep(3000);
//     console.timeEnd('Dormi por');
// })();
/*
function imprimedoido(msg, dt = 0.2) {
    for (const element of msg) {
        (async () => {
            await sleep(dt * 1000);
            process.stdout.write(element);
        })();
    }
}
imprimedoido(msg);
*/
// console.log('Mensagem 1');
// console.log('Mensagem 2');
// pause(msg, 20);
// console.log('Mensagem 5');

// const num = parseInt(+prompt('num: '));

// console.log(num);
// console.log(1 > 0 && (1 > 0 || 0 > 1));

// const inicio = +prompt(
//     '[1] Levantar\n[2] Continuar dormindo \nDigite a opção desejada:',
// );

// if (inicio === 1) {
//     console.log('Olá!');
// }

const gato =
    '\n\u3000\u3000     \u2591            \u2591    \r\n\u3000\u3000    \u2592\u2592\u2591          \u2591\u2592\u2592  \r\n\u3000\u3000   \u2591\u2592\u2592\u2592\u2591        \u2591\u2592\u2592\u2592\u2591  \r\n\u3000\u3000  \u2591\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2591 \r\n\u3000\u3000\u2591\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2591\r\n\u3000 \u2588\u2588\u2588\u2580\u2580\u2580\u2588\u2588\u2584\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2584\u2588\u2588\u2580\u2580\u2580\u2588\u2588\r\n\u3000 \u2588\u2588\u2591\u2591\u2591\u2590\u2588\u2591\u2580\u2588\u2592\u2592\u2592\u2592\u2592\u2588\u2580\u2591\u2588\u258C\u2591\u2591\u2591\u2588\r\n\u3000 \u2590\u258C\u2591\u2591\u2591\u2590\u2584\u258C\u2591\u2590\u258C\u2592\u2592\u2592\u2590\u258C\u2591\u2590\u2584\u258C\u2591\u2591\u2590\u258C\r\n\u3000\u3000\u2588\u2591\u2591\u2591\u2590\u2588\u258C\u2591\u2591\u258C\u2592\u2592\u2592\u2590\u2591\u2591\u2590\u2588\u258C\u2591\u2591\u2588\r\n\u3000\u3000\u2592\u2580\u2584\u2584\u2584\u2588\u2584\u2584\u2584\u258C\u2591\u2584\u2591\u2590\u2584\u2584\u2584\u2588\u2584\u2584\u2580\u2592\r\n\u3000\u3000\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2514\u2534\u2518\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\r\n\u3000\u3000    \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591          \r\n\u3000\u3000        \u2592\u2592\u2592\u2592\u2592\u2592                   \r\n \u2591\u2591        \u2592\u2592\u2591\u2591\u2592\u2591\u2591\u2592                  \r\n \u2592\u2591        \u2592\u2592\u2556\u2591\u2591\u2565\u2591\u2591\u2553\u2592               \r\n  \u2592\u2591       \u2591\u2591\u2551\u2591\u2591\u2551\u2591\u2591\u2551\u2591\u2591             \r\n  \u2588\u2588\u2584\u2584\u2584\u2584\u2580\u2580\u2534\u2534\u255A\u2567\u2567\u255D\u2567\u2567\u255D\u2534\u2534      \r\n \r\n';

const gatinho =
    '\n                \u3000\u3000     \u2591            \u2591    \r\n                \u3000\u3000    \u2592\u2592\u2591          \u2591\u2592\u2592  \r\n                \u3000\u3000   \u2591\u2592\u2592\u2592\u2591        \u2591\u2592\u2592\u2592\u2591  \r\n                \u3000\u3000  \u2591\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2591 \r\n                \u3000\u3000\u2591\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2591\r\n                \u3000 \u2588\u2588\u2588\u2580\u2580\u2580\u2588\u2588\u2584\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2584\u2588\u2588\u2580\u2580\u2580\u2588\u2588\r\n                \u3000 \u2588\u2588\u2591\u2591\u2591\u2590\u2588\u2591\u2580\u2588\u2592\u2592\u2592\u2592\u2592\u2588\u2580\u2591\u2588\u258C\u2591\u2591\u2591\u2588\r\n                \u3000 \u2590\u258C\u2591\u2591\u2591\u2590\u2584\u258C\u2591\u2590\u258C\u2592\u2592\u2592\u2590\u258C\u2591\u2590\u2584\u258C\u2591\u2591\u2590\u258C\r\n                \u3000\u3000\u2588\u2591\u2591\u2591\u2590\u2588\u258C\u2591\u2591\u258C\u2592\u2592\u2592\u2590\u2591\u2591\u2590\u2588\u258C\u2591\u2591\u2588\r\n                \u3000\u3000\u2592\u2580\u2584\u2584\u2584\u2588\u2584\u2584\u2584\u258C\u2591\u2584\u2591\u2590\u2584\u2584\u2584\u2588\u2584\u2584\u2580\u2592\r\n                \u3000\u3000\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2514\u2534\u2518\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\r\n                \u3000\u3000    \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591          \r\n                \u3000\u3000        \u2592\u2592\u2592\u2592\u2592\u2592                   \r\n                 \u2591\u2591        \u2592\u2592\u2591\u2591\u2592\u2591\u2591\u2592                  \r\n                 \u2592\u2591        \u2592\u2592\u2556\u2591\u2591\u2565\u2591\u2591\u2553\u2592               \r\n                  \u2592\u2591       \u2591\u2591\u2551\u2591\u2591\u2551\u2591\u2591\u2551\u2591\u2591             \r\n                  \u2588\u2588\u2584\u2584\u2584\u2584\u2580\u2580\u2534\u2534\u255A\u2567\u2567\u255D\u2567\u2567\u255D\u2534\u2534      \r\n \r\n';
const meaw =
    '\n                \u3000\u3000     \u2591            \u2591    \r\n                \u3000\u3000    \u2592\u2592\u2591          \u2591\u2592\u2592  \r\n                \u3000\u3000   \u2591\u2592\u2592\u2592\u2591        \u2591\u2592\u2592\u2592\u2591  \r\n                \u3000\u3000  \u2591\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2591 \r\n                \u3000\u3000\u2591\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2591\r\n                \u3000 \u2588\u2588\u2588\u2580\u2580\u2580\u2588\u2588\u2584\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2584\u2588\u2588\u2580\u2580\u2580\u2588\u2588\r\n                \u3000 \u2588\u2588\u2591\u2591\u2591\u2590\u2588\u2591\u2580\u2588\u2592\u2592\u2592\u2592\u2592\u2588\u2580\u2591\u2588\u258C\u2591\u2591\u2591\u2588\r\n                \u3000 \u2590\u258C\u2591\u2591\u2591\u2590\u2584\u258C\u2591\u2590\u258C\u2592\u2592\u2592\u2590\u258C\u2591\u2590\u2584\u258C\u2591\u2591\u2590\u258C\r\n                \u3000\u3000\u2588\u2591\u2591\u2591\u2590\u2588\u258C\u2591\u2591\u258C\u2592\u2592\u2592\u2590\u2591\u2591\u2590\u2588\u258C\u2591\u2591\u2588\r\n                \u3000\u3000\u2592\u2580\u2584\u2584\u2584\u2588\u2584\u2584\u2584\u258C\u2591\u2584\u2591\u2590\u2584\u2584\u2584\u2588\u2584\u2584\u2580\u2592     . . : miau\r\n                \u3000\u3000\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2514\u2534\u2518\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\r\n                \u3000\u3000    \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591          \r\n                \u3000\u3000        \u2592\u2592\u2592\u2592\u2592\u2592                   \r\n                 \u2591\u2591        \u2592\u2592\u2591\u2591\u2592\u2591\u2591\u2592                  \r\n                 \u2592\u2591        \u2592\u2592\u2556\u2591\u2591\u2565\u2591\u2591\u2553\u2592               \r\n                  \u2592\u2591       \u2591\u2591\u2551\u2591\u2591\u2551\u2591\u2591\u2551\u2591\u2591             \r\n                  \u2588\u2588\u2584\u2584\u2584\u2584\u2580\u2580\u2534\u2534\u255A\u2567\u2567\u255D\u2567\u2567\u255D\u2534\u2534      \r\n \r\n';
console.log(gato);
console.log(gatinho);
console.log(meaw);
