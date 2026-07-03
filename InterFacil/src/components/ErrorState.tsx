import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from './AppButton';
import { Theme } from '@/constants/theme';

interface PropsError {
  mensaje?: string;
  alReintentar?: () => void;
}

export function ErrorState({ mensaje = 'Ocurrió un error al cargar los datos', alReintentar }: PropsError) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.text}>{mensaje}</Text>
      {alReintentar ? (
        <View style={styles.button}>
          <AppButton label="Reintentar" onPress={alReintentar} />
        </View>
      ) : null}
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
    color: Theme.colors.error,
    fontSize: Theme.fontSize.md,
    textAlign: 'center',
  },
  button: {
    marginTop: Theme.spacing.md,
    width: '100%',
  },
});