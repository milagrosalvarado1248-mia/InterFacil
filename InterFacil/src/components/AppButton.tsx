import { Pressable, StyleSheet, Text } from 'react-native';

import { Theme } from '@/constants/theme';

interface PropsBotón {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function AppButton({ label, onPress, variant = 'primary', disabled = false }: PropsBotón) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === 'secondary' ? styles.secondary : styles.primary,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Theme.colors.primary,
  },
  secondary: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: '600',
  },
  secondaryLabel: {
    color: Theme.colors.primary,
  },
});