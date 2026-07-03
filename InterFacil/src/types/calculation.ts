export interface EntradaCalculadora {
  montoActual: string;
  idPeriodoInicio: string;
  idPeriodoFin: string;
}

export interface ResultadoCalculo {
  montoAnterior: number;
  nuevoMonto: number;
  porcentajeAcumulado: number;
}