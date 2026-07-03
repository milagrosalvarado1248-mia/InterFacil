export function formatearMoneda(valor: number): string {
  return valor.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 2,
  });
}

export function formatearPorcentaje(valor: number): string {
  return `${valor.toFixed(2)}%`;
}

export function parsearMonto(valor: string): number | null {
  const normalizado = valor.replace(',', '.').trim();
  const parseado = Number(normalizado);
  if (Number.isNaN(parseado) || parseado <= 0) {
    return null;
  }
  return parseado;
}