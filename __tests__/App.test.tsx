import React from 'react';
import { render } from '@testing-library/react-native';
import RootLayout from '../app/_layout';

jest.mock('@privy-io/expo', () => ({
  PrivyProvider: ({ children }: { children: React.ReactNode }) => children,
  usePrivy: jest.fn(() => ({
    ready: true,
    authenticated: false,
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    createPasskey: jest.fn(),
  })),
}));

jest.mock('expo-router', () => ({
  Stack: ({ children, screenOptions }: { children: React.ReactNode; screenOptions?: unknown }) => children,
  'Stack.Screen': ({ name }: { name: string }) => null,
  router: {
    replace: jest.fn(),
  },
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeTruthy();
  });
});

