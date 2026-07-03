import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Header } from '@/components/Header';
import { PeriodSelect } from '@/components/PeriodSelect';
import { ResultCard } from '@/components/ResultCard';
import { Theme } from '@/constants/theme';
import { useCalculator } from '@/hooks/useCalculator';
import { getAll } from '@/services/ipc.service';
import { IndiceIpc } from '@/types/ipc';

export default function PantallaCalculadora() {
  const { formulario, errores, resultado, calculando, setCampo, calcular, reiniciar } = useCalculator();
  const [periodos, setPeriodos] = useState<IndiceIpc[]>([]);

  useEffect(() => {
    getAll().then(setPeriodos);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Calcular alquiler" mostrarVolver />
      <ScrollView contentContainerStyle={styles.content}>
        <AppInput
          label="Monto actual del alquiler"
          placeholder="$ 150.000"
          keyboardType="numeric"
          value={formulario.montoActual}
          onChangeText={(texto) => setCampo('montoActual', texto)}
          error={errores.montoActual}
        />

        <PeriodSelect
          label="Mes inicial"
          valor={formulario.idPeriodoInicio}
          opciones={periodos}
          alCambiar={(id) => setCampo('idPeriodoInicio', id)}
          error={errores.idPeriodoInicio}
        />

        <PeriodSelect
          label="Mes final"
          valor={formulario.idPeriodoFin}
          opciones={periodos}
          alCambiar={(id) => setCampo('idPeriodoFin', id)}
          error={errores.idPeriodoFin}
        />

        <AppButton
          label={calculando ? 'Calculando...' : 'Calcular'}
          onPress={calcular}
          disabled={calculando}
        />
        <View style={styles.spacer} />
        <AppButton label="Limpiar" variant="secondary" onPress={reiniciar} />

        {resultado && <ResultCard resultado={resultado} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  spacer: {
    height: Theme.spacing.sm,
  },
});