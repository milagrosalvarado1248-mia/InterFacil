import { IndiceIpc } from '@/types/ipc';

const URL_API = 'https://api.argentinadatos.com/v1/finanzas/indices/inflacion';

const VISUALIZACION_MESES = 24;

const NOMBRES_DE_MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

interface RegistroInflacion {
  fecha: string;
  valor: number;
}

let cache: IndiceIpc[] | null = null;

function mapearAIndiceIpc(registros: RegistroInflacion[]): IndiceIpc[] {
  const resultado: IndiceIpc[] = [];
  let factorAnual = 1;
  let añoActual = -1;

  for (const registro of registros) {
    const [añoStr, mesStr] = registro.fecha.split('-');
    const año = Number(añoStr);
    const indiceMes = Number(mesStr) - 1;

    if (año !== añoActual) {
      añoActual = año;
      factorAnual = 1;
    }
    factorAnual *= 1 + registro.valor / 100;

    resultado.push({
      id: `${añoStr}-${mesStr}`,
      mes: NOMBRES_DE_MESES[indiceMes],
      año,
      porcentaje: registro.valor,
      acumulado: (factorAnual - 1) * 100,
      fuente: 'INDEC',
      publicadoEl: registro.fecha,
      categoria: 'Nivel general',
    });
  }

  return resultado;
}

async function obtenerTodos(): Promise<IndiceIpc[]> {
  if (cache) {
    return cache;
  }

  const respuesta = await fetch(URL_API);
  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los datos del IPC');
  }

  const datos: RegistroInflacion[] = await respuesta.json();
  const recientes = datos.slice(-VISUALIZACION_MESES);
  cache = mapearAIndiceIpc(recientes);
  return cache;
}

export async function getAll(): Promise<IndiceIpc[]> {
  return obtenerTodos();
}

export async function getById(id: string): Promise<IndiceIpc | null> {
  const elementos = await obtenerTodos();
  return elementos.find((elemento) => elemento.id === id) ?? null;
}

export async function getYears(): Promise<number[]> {
  const elementos = await obtenerTodos();
  const años = Array.from(new Set(elementos.map((elemento) => elemento.año)));
  return años.sort((a, b) => b - a);
}

export async function calculateIncrease(
  monto: number,
  idInicio: string,
  idFin: string,
): Promise<{ newAmount: number; accumulatedPercentage: number }> {
  const elementos = await obtenerTodos();
  const indiceInicio = elementos.findIndex((elemento) => elemento.id === idInicio);
  const indiceFin = elementos.findIndex((elemento) => elemento.id === idFin);

  if (indiceInicio === -1 || indiceFin === -1 || indiceFin < indiceInicio) {
    throw new Error('Período inválido');
  }

  const factor = elementos.slice(indiceInicio + 1, indiceFin + 1).reduce(
    (acum, elemento) => acum * (1 + elemento.porcentaje / 100),
    1,
  );

  const porcentajeAcumulado = (factor - 1) * 100;
  const nuevoMonto = monto * factor;

  return { newAmount: nuevoMonto, accumulatedPercentage: porcentajeAcumulado };
}