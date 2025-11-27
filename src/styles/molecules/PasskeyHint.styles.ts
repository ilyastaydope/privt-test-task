import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

export const passkeyHintStyles = StyleSheet.create({
  hint: {
    marginTop: SPACING.sm + 4,
    fontSize: 12,
    color: COLORS.text.hint,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: SPACING.md,
  },
});
