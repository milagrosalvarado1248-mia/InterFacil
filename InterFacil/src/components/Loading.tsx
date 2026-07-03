import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Theme.colors.primary} />
      <Text style={styles.text}>Cargando...</Text>
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
  text: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.textSecondary,
    fontSize: Theme.fontSize.md,
  },
});