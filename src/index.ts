type TipoTransaccion = "ingreso" | "gasto";

class Transaccion {
    constructor(
        public id: number,
        public monto: number,
        public descripcion: string,
        public tipo: TipoTransaccion
    ) {}
}

const historialTransacciones: Transaccion[] = [];
let balance = 0;

const montoInput = document.getElementById("monto") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const balanceSpan = document.getElementById("balance") as HTMLElement;
const historialTabla = document.getElementById("historial") as HTMLTableElement;

document.getElementById("agregarIngreso")?.addEventListener("click", () => agregarTransaccion("ingreso"));
document.getElementById("agregarGasto")?.addEventListener("click", () => agregarTransaccion("gasto"));

function agregarTransaccion(tipo: TipoTransaccion) {
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

    const nuevaTransaccion = new Transaccion(
        historialTransacciones.length + 1,
        monto,
        descripcion,
        tipo
    );

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
        celdaTipo.textContent = transaccion.tipo === "ingreso" ? "Ingreso" : "Gasto";
        celdaTipo.classList.add(transaccion.tipo);

        fila.appendChild(celdaMonto);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaTipo);

        historialTabla.appendChild(fila);
    });
}
