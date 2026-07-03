import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { Theme } from '@/constants/theme';

export default function PantallaInicio() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Consultá los índices de inflación publicados por el INDEC y calculá automáticamente
          el nuevo valor de tu alquiler.
        </Text>

        <View style={styles.actions}>
          <AppButton label="Ver índices IPC" onPress={() => router.push('/ipc')} />
          <View style={styles.spacer} />
          <AppButton
            label="Calcular alquiler"
            variant="secondary"
            onPress={() => router.push('/calculator')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.lg,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: Theme.spacing.lg,
  },
  description: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.text,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  actions: {
    width: '100%',
  },
  spacer: {
    height: Theme.spacing.md,
  },
});