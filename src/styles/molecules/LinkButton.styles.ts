import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

export const linkButtonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  text: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});
