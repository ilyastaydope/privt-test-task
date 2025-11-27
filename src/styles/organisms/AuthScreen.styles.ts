import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

export const authScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  linkContainer: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  linkButton: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  passkeyHint: {
    marginTop: SPACING.sm + 4,
    fontSize: 12,
    color: COLORS.text.hint,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: SPACING.md,
  },
});


