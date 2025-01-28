"use strict";
var _a, _b;
class Transaccion {
    constructor(id, monto, descripcion, tipo) {
        this.id = id;
        this.monto = monto;
        this.descripcion = descripcion;
        this.tipo = tipo;
    }
}
const historialTransacciones = [];
let balance = 0;
const montoInput = document.getElementById("monto");
const descripcionInput = document.getElementById("descripcion");
const balanceSpan = document.getElementById("balance");
const historialTabla = document.getElementById("historial");
(_a = document.getElementById("agregarIngreso")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => agregarTransaccion("ingreso"));
(_b = document.getElementById("agregarGasto")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => agregarTransaccion("gasto"));
function agregarTransaccion(tipo) {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();
    if (isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número positivo.");
        return;
    }
    if (descripcion === "") {
        alert("La descripción no puede estar vacía.");
        return;
    }
    const nuevaTransaccion = new Transaccion(historialTransacciones.length + 1, monto, descripcion, tipo);
    historialTransacciones.push(nuevaTransaccion);
    actualizarBalance();
    mostrarHistorial();
    montoInput.value = "";
    descripcionInput.value = "";
}
function actualizarBalance() {
    const ingresos = historialTransacciones
        .filter(t => t.tipo === "ingreso")
        .reduce((acc, t) => acc + t.monto, 0);
    const gastos = historialTransacciones
        .filter(t => t.tipo === "gasto")
        .reduce((acc, t) => acc + t.monto, 0);
    balance = ingresos - gastos;
    balanceSpan.textContent = balance.toFixed(2);
}
function mostrarHistorial() {
    historialTabla.innerHTML = "";
    historialTransacciones.forEach(transaccion => {
        const fila = document.createElement("tr");
        const celdaMonto = document.createElement("td");
        celdaMonto.textContent = `$${transaccion.monto.toFixed(2)}`;
        const celdaDescripcion = document.createElement("td");
        celdaDescripcion.textContent = transaccion.descripcion;
        const celdaTipo = document.createElement("td");
        celdaTipo.textContent = transaccion.tipo.toUpperCase();
        celdaTipo.classList.add(transaccion.tipo);
        fila.appendChild(celdaMonto);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaTipo);
        historialTabla.appendChild(fila);
    });
}
