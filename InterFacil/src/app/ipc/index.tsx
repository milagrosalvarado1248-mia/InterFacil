import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Header } from '@/components/Header';
import { IpcCard } from '@/components/IpcCard';
import { Loading } from '@/components/Loading';
import { Theme } from '@/constants/theme';
import { getAll } from '@/services/ipc.service';
import { IndiceIpc } from '@/types/ipc';

type EstadoPantalla = 'cargando' | 'vacio' | 'error' | 'exito';

export default function PantallaListaIpc() {
  const router = useRouter();
  const [elementos, setElementos] = useState<IndiceIpc[]>([]);
  const [estado, setEstado] = useState<EstadoPantalla>('cargando');
  const [añoSeleccionado, setAñoSeleccionado] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  async function cargarElementos() {
    setEstado('cargando');
    try {
      const datos = await getAll();
      setElementos(datos);
      setAñoSeleccionado(datos.length > 0 ? datos[datos.length - 1].año : null);
      setEstado(datos.length === 0 ? 'vacio' : 'exito');
    } catch {
      setEstado('error');
    }
  }

  useEffect(() => {
    cargarElementos();
  }, []);

  const años = useMemo(
    () => Array.from(new Set(elementos.map((elemento) => elemento.año))).sort((a, b) => b - a),
    [elementos],
  );

  const elementosFiltrados = useMemo(() => {
    return elementos
      .filter((elemento) => (añoSeleccionado ? elemento.año === añoSeleccionado : true))
      .filter((elemento) => elemento.mes.toLowerCase().includes(busqueda.trim().toLowerCase()))
      .sort((a, b) => (a.id < b.id ? 1 : -1));
  }, [elementos, añoSeleccionado, busqueda]);

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Índices IPC" mostrarVolver />

      {estado === 'cargando' && <Loading />}
      {estado === 'error' && <ErrorState alReintentar={cargarElementos} />}
      {estado === 'vacio' && <EmptyState mensaje="No hay índices disponibles" />}
      {estado === 'exito' && (
        <>
          {años.length > 1 && (
            <View style={styles.yearRow}>
              {años.map((año) => (
                <Pressable
                  key={año}
                  onPress={() => setAñoSeleccionado(año)}
                  style={[styles.yearChip, añoSeleccionado === año && styles.yearChipSelected]}
                >
                  <Text
                    style={[
                      styles.yearChipText,
                      añoSeleccionado === año && styles.yearChipTextSelected,
                    ]}
                  >
                    {año}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <TextInput
            style={styles.search}
            placeholder="Buscar mes..."
            placeholderTextColor={Theme.colors.textSecondary}
            value={busqueda}
            onChangeText={setBusqueda}
          />

          {elementosFiltrados.length === 0 ? (
            <EmptyState mensaje="No hay índices para ese mes o año" />
          ) : (
            <FlatList
              data={elementosFiltrados}
              keyExtractor={(elemento) => elemento.id}
              contentContainerStyle={styles.list}
              renderItem={({ item: elemento }) => (
                <IpcCard elemento={elemento} alPresionar={() => router.push(`/ipc/${elemento.id}`)} />
              )}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  yearRow: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
  },
  yearChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  yearChipSelected: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  yearChipText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.text,
    fontWeight: '600',
  },
  yearChipTextSelected: {
    color: Theme.colors.white,
  },
  search: {
    marginHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
    fontSize: Theme.fontSize.md,
  },
  list: {
    padding: Theme.spacing.md,
  },
});