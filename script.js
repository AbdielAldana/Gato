let Turno = 0
const lineasGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6] // Diagonales
];

let x = []
let o = []

let win1 = 0
let win2 = 0

let xplayer = 1

function clickcasilla(index) {
    const ganador = verificarGanador2(x, o, lineasGanadoras);
    var casilla = document.getElementById('p' + (index + 1));
    var xElement = casilla.querySelector('.x');
    var oElement = casilla.querySelector('.o');
    if(!x.includes(index) || !o.includes(index)){
        if(!ganador && Turno === 0 && oElement.classList.contains('hidden')){
            xElement.classList.remove('hidden');
            Turno = 1
            document.getElementById("turno").textContent = "TURNO: O";
            x.push(index)
            verificarGanador(x, o, lineasGanadoras);
            // movimientoIA(index)
        } else if(!ganador && Turno === 1 && xElement.classList.contains('hidden')){
            oElement.classList.remove('hidden');
            Turno = 0
            document.getElementById("turno").textContent = "TURNO: X";
            o.push(index)
            verificarGanador(x, o, lineasGanadoras);
        }
    }
    // console.log(Turno);
}

function cambiarJugador() {
    if(xplayer === 1) {
        xplayer = 2
        document.getElementById("xplayer").textContent = 2;
    } else if (xplayer === 2) {
        xplayer = 1
        document.getElementById("xplayer").textContent = 1;
    }
}


function verificarGanador() {
    for (let i = 0; i < lineasGanadoras.length; i++) {
        const linea = lineasGanadoras[i];
        const xEnLinea = linea.every(posicion => x.includes(posicion));
        const oEnLinea = linea.every(posicion => o.includes(posicion));

        if (xEnLinea) {
            marcarGanador(linea, 'x');
            return 'X'; // 'X' ha ganado
        } else if (oEnLinea) {
            marcarGanador(linea, 'o');
            return 'O'; // 'O' ha ganado
        } else if(x.length === 5 && o.length === 4) {
            marcarGanador(linea, 'empate');
            return "empate"
        }
    }
    return null; // No hay ganador todavía
}

function verificarGanador2() {
    for (let i = 0; i < lineasGanadoras.length; i++) {
        const linea = lineasGanadoras[i];
        const xEnLinea = linea.every(posicion => x.includes(posicion));
        const oEnLinea = linea.every(posicion => o.includes(posicion));

        if (xEnLinea) {
            return 'X'; // 'X' ha ganado
        } else if (oEnLinea) {
            return 'O'; // 'O' ha ganado
        } else if(x.length === 5 && o.length === 4) {
            return "empate"
        }
    }
    return null; // No hay ganador todavía
}

function marcarGanador(linea, Figure) {
    if(Figure === "o"){
        document.getElementById("turno").textContent = "GANO: O";
        if(xplayer === 1) {
            win2 = win2 + 1
            document.getElementById("win2").textContent = win2;
        } else if(xplayer === 2) {
            win1 = win1 + 1
            document.getElementById("win1").textContent = win1;
        }
    } else if(Figure === "x") {
        document.getElementById("turno").textContent = "GANO: X";
        if(xplayer === 1) {
            win1 = win1 + 1
            document.getElementById("win1").textContent = win1;
        } else if(xplayer === 2) {
            win2 = win2 + 1
            document.getElementById("win2").textContent = win2;
        }
    } else if(Figure === "empate") {
        document.getElementById("turno").textContent = "EMPATE";
    }
    if(Figure !== "empate"){
        linea.forEach(posicion => {
            const casilla = document.getElementById('p' + (posicion + 1));
            casilla.querySelector('.' + Figure).classList.add('win');
        });
    }
}

function limpiar() {
    const ganador = verificarGanador2(x, o, lineasGanadoras);
    if(ganador){
        cambiarJugador()
        // Reiniciar variables
        Turno = 0;
        x = [];
        o = [];

        // Ocultar todas las X y O en el tablero
        const todasCasillas = document.querySelectorAll('.box');
        todasCasillas.forEach(casilla => {
            casilla.querySelector('.x').classList.remove('win'); // Remover clase 'win'
            casilla.querySelector('.x').classList.add('hidden');
            casilla.querySelector('.o').classList.remove('win'); // Remover clase 'win'
            casilla.querySelector('.o').classList.add('hidden');
        });

        // Actualizar texto de turno
        document.getElementById("turno").textContent = "TURNO: X";
    }
}

function reiniciar() {
        Turno = 0;
        x = [];
        o = [];

        win1 = 0
        document.getElementById("win1").textContent = 0;
        win2 = 0
        document.getElementById("win2").textContent = 0;

        // Ocultar todas las X y O en el tablero
        const todasCasillas = document.querySelectorAll('.box');
        todasCasillas.forEach(casilla => {
            casilla.querySelector('.x').classList.remove('win'); // Remover clase 'win'
            casilla.querySelector('.x').classList.add('hidden');
            casilla.querySelector('.o').classList.remove('win'); // Remover clase 'win'
            casilla.querySelector('.o').classList.add('hidden');
        });

        // Actualizar texto de turno
        document.getElementById("turno").textContent = "TURNO: X";
}

// function movimientoIA(index) {
//     let mejorMovimiento;
//     let mejorPuntaje = -Infinity;

//     const ganador = verificarGanador(x, o, lineasGanadoras);
//     // alert()
//     // Obtener casillas disponibles
//     if (!ganador) {
//         let casillasDisponibles = [];
//         // casillasDisponibles = casillasDisponibles.filter(elemento => !x.includes(elemento) && !o.includes(elemento));
//         // console.log(casillasDisponibles);
//         for (let i = 0; i < 9; i++) {
//             if (!x.includes(i) && !o.includes(i)) {
//                 casillasDisponibles.push(i);
//             }
//         }
//         // console.log(casillasDisponibles);

//         // Probar cada movimiento posible y obtener el mejor puntaje
//         for (let i = 0; i < casillasDisponibles.length; i++) {
//             let casilla = casillasDisponibles[i];
//             if ([0, 2, 6, 8].includes(x[0]) && x.length <= 1) {
//                 mejorMovimiento = 4
//                 break;
//             }
//             o.push(casilla);
//             let puntaje = minimax(0, true);
//             o.pop();

//             if (puntaje > mejorPuntaje) {
//                 mejorPuntaje = puntaje;
//                 mejorMovimiento = casilla;
//             }
//         }

//         console.log(mejorMovimiento);

//         // const index = Math.floor(Math.random() * casillasDisponibles.length)
//         // console.log(index);
//         // // console.log(index);
//         // const casilla = casillasDisponibles[index] - 1;

//         // var casillac = document.getElementById('p' + (casillasDisponibles[index]+1));
//         var casillac = document.getElementById('p' + (mejorMovimiento + 1));
//         var oElement = casillac.querySelector('.o');
//         var xElement = casillac.querySelector('.x');
//         if(Turno === 1 && xElement.classList.contains('hidden')) {
//             oElement.classList.remove('hidden');
//             Turno = 0
//             // o.push(casillasDisponibles[index])
//             o.push(mejorMovimiento)
            
//             verificarGanador(x, o, lineasGanadoras);
//         }
//     }
//     console.log(o, "O");
//     console.log(x, "X");
//     // console.log(o);
//     // Turno = 0
//     // o.push(casilla);

//     // // Devolver la casilla elegida
//     // return casilla;
// }

// const PROFUNDIDAD_MAXIMA = 9999;
// function minimax(profundidad, esMaximizando, primerMovimientoHumano) {
//     let tx = x
//     let to = o
//     let resultado = verificarGanador2(tx, to);
//     if (resultado !== null) {
//         return resultado === 'O' ? 1 : resultado === 'X' ? -1 : 0;
//     }

//     let mejorPuntaje = esMaximizando ? -Infinity : Infinity;
//     let movimientosPosibles = obtenerMovimientosPosibles(tx, to);

//     for (let i = 0; i < movimientosPosibles.length; i++) {
//         let movimiento = movimientosPosibles[i];
//         if (!tx.includes(movimiento) && !to.includes(movimiento)) {
//             if (esMaximizando) {
//                 tx.push(movimiento);
//                 let puntaje = minimax(profundidad + 1, false, tx, to, primerMovimientoHumano);
//                 tx.pop();
//                 mejorPuntaje = Math.max(puntaje, mejorPuntaje);
//             } else {
//                 to.push(movimiento);
//                 let puntaje = minimax(profundidad + 1, true, tx, to, primerMovimientoHumano);
//                 if (puntaje === 1 && profundidad === 0 && [0, 2, 6, 8].includes(primerMovimientoHumano)) {
//                     return movimiento === 4 ? 1 : -1; // Bloquear la casilla central si el humano eligió una esquina
//                 }
//                 to.pop();
//                 mejorPuntaje = Math.min(puntaje, mejorPuntaje);
//             }
//         }
//     }

//     return mejorPuntaje;
// }

// function minimax(profundidad, esMaximizando) {
//     let resultado = verificarGanador2();
//     if (resultado !== null || profundidad === PROFUNDIDAD_MAXIMA) {
//         return resultado === 'O' ? 1 : resultado === 'X' ? -1 : 0;
//     }

//     let mejorPuntaje = esMaximizando ? -Infinity : Infinity;
//     let movimientosPosibles = obtenerMovimientosPosibles();

//     for (let i = 0; i < movimientosPosibles.length; i++) {
//         let movimiento = movimientosPosibles[i];
//         if (!x.includes(movimiento) && !o.includes(movimiento)) {
//             if (esMaximizando) {
//                 x.push(movimiento);
//                 let puntaje = minimax(profundidad + 1, false);
//                 x.pop();
//                 mejorPuntaje = Math.max(puntaje, mejorPuntaje);
//                 // console.log(mejorPuntaje);
//             } else {
//                 o.push(movimiento);
//                 let puntaje = minimax(profundidad + 1, true);
//                 o.pop();
//                 mejorPuntaje = Math.min(puntaje, mejorPuntaje);
//                 // console.log(mejorPuntaje);
//             }
//         }
//     }

//     return mejorPuntaje;
// }

// function obtenerMovimientosPosibles() {
//     let movimientos = [];
//     for (let i = 0; i < 9; i++) {
//         if (!x.includes(i) && !o.includes(i)) {
//             movimientos.push(i);
//         }
//     }
//     return movimientos;
// }






// function verificarGanador2() {
//     for (let i = 0; i < lineasGanadoras.length; i++) {
//         const linea = lineasGanadoras[i];
//         const xEnLinea = linea.every(posicion => x.includes(posicion));
//         const oEnLinea = linea.every(posicion => o.includes(posicion));

//         if (xEnLinea) {
//             return 'X';
//         } else if (oEnLinea) {
//             return 'O';
//         }
//     }

//     return null;
// }