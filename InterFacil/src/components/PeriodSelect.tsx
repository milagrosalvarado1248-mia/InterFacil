import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';
import { IndiceIpc } from '@/types/ipc';

interface PropsSeleccionPeriodo {
  label: string;
  valor: string;
  opciones: IndiceIpc[];
  alCambiar: (id: string) => void;
  error?: string;
}

export function PeriodSelect({ label, valor, opciones, alCambiar, error }: PropsSeleccionPeriodo) {
  const [abierto, setAbierto] = useState(false);
  const seleccionado = opciones.find((elemento) => elemento.id === valor);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.field, error ? styles.fieldError : undefined]}
        onPress={() => setAbierto(true)}
      >
        <Text style={seleccionado ? styles.fieldText : styles.placeholder}>
          {seleccionado ? `${seleccionado.mes} ${seleccionado.año}` : 'Seleccioná un mes'}
        </Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={abierto} animationType="slide" transparent onRequestClose={() => setAbierto(false)}>
        <Pressable style={styles.backdrop} onPress={() => setAbierto(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={opciones}
              keyExtractor={(elemento) => elemento.id}
              renderItem={({ item: elemento }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    alCambiar(elemento.id);
                    setAbierto(false);
                  }}
                >
                  <Text style={styles.optionText}>{elemento.mes} {elemento.año}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
    fontWeight: '500',
  },
  field: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
  },
  fieldError: {
    borderColor: Theme.colors.error,
  },
  fieldText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.text,
  },
  placeholder: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  error: {
    color: Theme.colors.error,
    fontSize: Theme.fontSize.sm,
    marginTop: Theme.spacing.xs,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: Theme.radius.lg,
    borderTopRightRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    maxHeight: '60%',
  },
  sheetTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  option: {
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  optionText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.text,
  },
});