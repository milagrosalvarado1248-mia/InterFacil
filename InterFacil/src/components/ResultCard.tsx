import { StyleSheet, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';
import { ResultadoCalculo } from '@/types/calculation';
import { formatearMoneda, formatearPorcentaje } from '@/utils/calculator';

interface PropsTarjetaResultado {
  resultado: ResultadoCalculo;
}

export function ResultCard({ resultado }: PropsTarjetaResultado) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Inflación acumulada</Text>
      <Text style={styles.percentage}>{formatearPorcentaje(resultado.porcentajeAcumulado)}</Text>

      <Text style={[styles.label, styles.amountLabel]}>Nuevo valor del alquiler</Text>
      <Text style={styles.amount}>{formatearMoneda(resultado.nuevoMonto)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0FDF4',
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.accent,
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
  },
  label: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.accent,
    fontWeight: '600',
  },
  amountLabel: {
    marginTop: Theme.spacing.md,
  },
  percentage: {
    fontSize: Theme.fontSize.xl,
    color: Theme.colors.accent,
    fontWeight: '700',
  },
  amount: {
    fontSize: Theme.fontSize.xxl,
    color: Theme.colors.accent,
    fontWeight: '700',
  },
});