import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { Theme } from '@/constants/theme';
import { getById } from '@/services/ipc.service';
import { IndiceIpc } from '@/types/ipc';
import { formatearPorcentaje } from '@/utils/calculator';

type EstadoPantalla = 'cargando' | 'vacio' | 'error' | 'exito';

export default function PantallaDetalleIpc() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [elemento, setElemento] = useState<IndiceIpc | null>(null);
  const [estado, setEstado] = useState<EstadoPantalla>('cargando');

  async function cargarElemento() {
    setEstado('cargando');
    try {
      const datos = await getById(id);
      if (!datos) {
        setEstado('vacio');
        return;
      }
      setElemento(datos);
      setEstado('exito');
    } catch {
      setEstado('error');
    }
  }

  useEffect(() => {
    cargarElemento();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        titulo={elemento ? `${elemento.mes} ${elemento.año}` : 'Detalle del índice'}
        mostrarVolver
        etiquetaVolver="Volver"
      />

      {estado === 'cargando' && <Loading />}
      {estado === 'error' && <ErrorState alReintentar={cargarElemento} />}
      {estado === 'vacio' && <EmptyState mensaje="No se encontró el índice solicitado" />}
      {estado === 'exito' && elemento && (
        <View style={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.heroLabel}>IPC del mes</Text>
            <Text style={styles.heroValue}>{formatearPorcentaje(elemento.porcentaje)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Inflación acumulada anual</Text>
            <Text style={styles.value}>{formatearPorcentaje(elemento.acumulado)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fuente</Text>
            <Text style={styles.value}>{elemento.fuente}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Publicado</Text>
            <Text style={styles.value}>{elemento.publicadoEl}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Categoría</Text>
            <Text style={styles.value}>{elemento.categoria}</Text>
          </View>
        </View>
      )}
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
  hero: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radius.lg,
    paddingVertical: Theme.spacing.xl,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  heroLabel: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.white,
    opacity: 0.85,
    marginBottom: Theme.spacing.xs,
  },
  heroValue: {
    fontSize: 40,
    fontWeight: '700',
    color: Theme.colors.white,
  },
  row: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  label: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  value: {
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
});