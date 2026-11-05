// Obtener la pantalla de la calculadora
const pantalla = document.getElementById("pantalla");

// Inicializar el valor de la pantalla
pantalla.value = "0";

// Variables para controlar las operaciones
let numeroActual = "";
let numeroAnterior = "";
let operador = null;
let reiniciarPantalla = false;

// Seleccionar todos los botones numéricos
const botonesNumeros = document.querySelectorAll("[data-number]");

// Recorrer cada botón numérico
botonesNumeros.forEach(boton => {

    boton.addEventListener("click", () => {

        const numero = boton.dataset.number;

        if (reiniciarPantalla) {
            pantalla.value = numero;
            reiniciarPantalla = false;
        } else if (pantalla.value === "0") {
            pantalla.value = numero;
        } else {
            pantalla.value += numero;
        }

        numeroActual = pantalla.value;

    });

});

// Seleccionar los botones de operaciones
const botonesOperadores = document.querySelectorAll(
    '[data-action="operator"]'
);

// Detectar cuando se presiona un operador
botonesOperadores.forEach(boton => {

    boton.addEventListener("click", () => {

        numeroAnterior = pantalla.value;
        operador = boton.dataset.value;

        reiniciarPantalla = true;

    });

});

// Seleccionar el botón de resultado
const botonIgual = document.querySelector(
    '[data-action="equals"]'
);

// Detectar cuando se presiona el botón igual
botonIgual.addEventListener("click", () => {

    if (operador === null || numeroAnterior === "") {
        return;
    }

    const segundoNumero = pantalla.value;

    let resultado;

    switch (operador) {

        case "+":
            resultado = Number(numeroAnterior) + Number(segundoNumero);
            break;

        case "-":
            resultado = Number(numeroAnterior) - Number(segundoNumero);
            break;

        case "*":
            resultado = Number(numeroAnterior) * Number(segundoNumero);
            break;

        case "/":
            if (Number(segundoNumero) === 0) {
                pantalla.value = "Error";
                operador = null;
                numeroAnterior = "";
                reiniciarPantalla = true;
                return;
            }

            resultado = Number(numeroAnterior) / Number(segundoNumero);
            break;
    }

    pantalla.value = resultado;

    numeroActual = String(resultado);
    numeroAnterior = "";
    operador = null;
    reiniciarPantalla = true;

});

// Seleccionar el botón de limpiar
const botonLimpiar = document.querySelector(
    '[data-action="clear"]'
);

// Detectar cuando se presiona C
botonLimpiar.addEventListener("click", () => {

    pantalla.value = "0";

    numeroActual = "";
    numeroAnterior = "";
    operador = null;
    reiniciarPantalla = false;

});

// Seleccionar el botón de retroceso
const botonRetroceso = document.querySelector(
    '[data-action="backspace"]'
);

// Detectar cuando se presiona retroceso
botonRetroceso.addEventListener("click", () => {

    if (reiniciarPantalla) {
        return;
    }

    pantalla.value = pantalla.value.slice(0, -1);

    if (pantalla.value === "" || pantalla.value === "-") {
        pantalla.value = "0";
    }

    numeroActual = pantalla.value;

});

// Seleccionar el botón decimal
const botonDecimal = document.querySelector(
    '[data-action="decimal"]'
);

// Detectar cuando se presiona el punto decimal
botonDecimal.addEventListener("click", () => {

    if (reiniciarPantalla) {
        pantalla.value = "0.";
        reiniciarPantalla = false;
        numeroActual = pantalla.value;
        return;
    }

    if (!pantalla.value.includes(".")) {
        pantalla.value += ".";
    }

    numeroActual = pantalla.value;

});