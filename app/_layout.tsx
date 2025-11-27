import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { PrivyProvider } from '@privy-io/expo';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getPrivyConfig } from '../src/config/privy';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

export default function RootLayout() {
  const privyConfig = useMemo(() => getPrivyConfig(), []);

  if (!privyConfig.appId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
          Configuration Error
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: '#666' }}>
          Privy App ID is missing.{'\n\n'}
          Please set it in app.json → extra.privyAppId
        </Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <PrivyProvider
        appId={privyConfig.appId}
        {...(privyConfig.clientId && { clientId: privyConfig.clientId })}
      >
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
        </Stack>
      </PrivyProvider>
    </ErrorBoundary>
  );
}
