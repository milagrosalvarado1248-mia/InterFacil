import { Colors } from './colors';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const FontSize = {
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  fontSize: FontSize,
  radius: Radius,
} as const;