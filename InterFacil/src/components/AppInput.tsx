import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { Theme } from '@/constants/theme';

interface PropsEntrada extends TextInputProps {
  label: string;
  error?: string;
}

export function AppInput({ label, error, style, ...rest }: PropsEntrada) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : undefined, style]}
        placeholderTextColor={Theme.colors.textSecondary}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.fontSize.md,
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  error: {
    color: Theme.colors.error,
    fontSize: Theme.fontSize.sm,
    marginTop: Theme.spacing.xs,
  },
});