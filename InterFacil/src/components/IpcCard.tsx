import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';
import { IndiceIpc } from '@/types/ipc';
import { formatearPorcentaje } from '@/utils/calculator';

interface PropsTarjetaIpc {
  elemento: IndiceIpc;
  alPresionar: () => void;
}

export function IpcCard({ elemento, alPresionar }: PropsTarjetaIpc) {
  return (
    <Pressable onPress={alPresionar} style={styles.card}>
      <View>
        <Text style={styles.month}>{elemento.mes} {elemento.año}</Text>
        <Text style={styles.source}>{elemento.fuente}</Text>
      </View>
      <Text style={styles.percentage}>{formatearPorcentaje(elemento.porcentaje)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  month: {
    fontSize: Theme.fontSize.md,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  source: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  percentage: {
    fontSize: Theme.fontSize.lg,
    fontWeight: '700',
    color: Theme.colors.accent,
  },
});