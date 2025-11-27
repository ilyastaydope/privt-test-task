# NeoBank - React Native Application

A modern neobank application built with React Native, Expo, and Privy authentication.

## Features

- Email + OTP authentication
- Passkey authentication support
- Embedded EVM wallet integration
- Persistent login with secure token storage
- Type-safe codebase (TypeScript strict mode)
- Comprehensive error handling
- Production-ready code quality

## Tech Stack

- **React Native** 0.81.5
- **Expo** SDK ~54.0.25
- **Expo Router** ~4.1.5 - File-based navigation
- **Privy** (@privy-io/expo 0.60.3) - Web3 authentication
- **Viem** 2.39.3 - EVM wallet interactions
- **TypeScript** 5.9.2
- **Jest** - Testing framework

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test
```

## Project Structure

```
app/
  _layout.tsx           # Root layout with PrivyProvider
  index.tsx            # Authentication screen
  home.tsx             # Home screen

src/
  atoms/               # Atomic components (Button, Input, LoadingScreen)
  molecules/           # Composite components (InfoRow, Divider, LinkButton)
  organisms/           # Page components (AuthScreen, HomeScreen)
  hooks/               # Custom hooks (useAuth, usePrivyState, useWalletAddress)
  components/          # Utility components (ErrorBoundary)
  utils/               # Constants and validation
  config/              # Configuration files
  types/               # TypeScript type definitions
  styles/              # StyleSheet definitions
```

## Configuration

### Environment Variables

Configure in `app.json` → `extra`:

```json
{
  "extra": {
    "privyAppId": "your-privy-app-id",
    "privyClientId": "your-privy-client-id",
    "passkeyAssociatedDomain": "https://your-domain.com"
  }
}
```

### iOS Configuration

In `app.json` → `ios`:

```json
{
  "ios": {
    "bundleIdentifier": "com.your.app",
    "developmentTeam": "YOUR_TEAM_ID",
    "associatedDomains": ["webcredentials:your-domain.com"],
    "infoPlist": {
      "NSFaceIDUsageDescription": "We use Face ID or Touch ID to authenticate you securely with passkeys."
    }
  }
}
```

### Android Configuration

In `app.json` → `android`:

```json
{
  "android": {
    "package": "com.your.app",
    "permissions": ["USE_BIOMETRIC", "USE_FINGERPRINT"]
  }
}
```

## Authentication

### Email + OTP

1. Enter email address
2. Receive 6-digit code via email
3. Enter code to authenticate
4. Session persists across app restarts

### Passkey Authentication

1. **Signup:** Create account with passkey using Face ID/Touch ID
2. **Link Passkey:** Add passkey to existing email account
3. **Signin:** Authenticate with passkey

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Code Quality

- Zero TypeScript errors (strict mode)
- Consistent code style
- Centralized constants and styling
- Comprehensive error handling
- Input validation
- Loading states for async operations

## Security

- Secure token storage (iOS Keychain / Android KeyStore)
- Input validation and sanitization
- Error boundary for crash prevention
- Type-safe codebase

## Performance

- Memoized computations (useMemo, useCallback)
- Optimized re-renders
- Efficient component updates
- Keyboard animation optimizations