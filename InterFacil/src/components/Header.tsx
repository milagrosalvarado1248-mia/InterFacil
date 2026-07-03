import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Theme } from '@/constants/theme';

interface PropsEncabezado {
  titulo: string;
  mostrarVolver?: boolean;
  etiquetaVolver?: string;
}

export function Header({ titulo, mostrarVolver = false, etiquetaVolver }: PropsEncabezado) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {mostrarVolver ? (
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={8}>
          <Text style={styles.backText}>
            {'‹'}
            {etiquetaVolver ? ` ${etiquetaVolver}` : ''}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <Text style={styles.title}>{titulo}</Text>
      <View style={styles.backPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Theme.colors.white,
    fontSize: Theme.fontSize.lg,
    fontWeight: '600',
  },
  backButton: {
    minWidth: 32,
  },
  backPlaceholder: {
    minWidth: 32,
  },
  backText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.lg,
    fontWeight: '500',
  },
});