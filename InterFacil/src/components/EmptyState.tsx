import { StyleSheet, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';

interface PropsSinDatos {
  mensaje?: string;
}

export function EmptyState({ mensaje = 'No hay datos disponibles' }: PropsSinDatos) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.text}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  icon: {
    fontSize: 40,
    marginBottom: Theme.spacing.sm,
  },
  text: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.fontSize.md,
    textAlign: 'center',
  },
});