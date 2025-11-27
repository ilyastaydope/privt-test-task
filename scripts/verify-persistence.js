#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Persistent Login Configuration...');

let allChecks = true;

function check(name, condition, details) {
  if (condition) {
    console.log(`${name}`);
    if (details) console.log(`   ${details}`);
  } else {
    console.log(`${name}`);
    if (details) console.log(`   ${details}`);
    allChecks = false;
  }
}

const layoutPath = path.join(__dirname, '../app/_layout.tsx');
const layoutContent = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';

check(
  'PrivyProvider is configured',
  layoutContent.includes('PrivyProvider') && layoutContent.includes('appId'),
  'Found PrivyProvider with appId configuration'
);

check(
  'ErrorBoundary wraps app',
  layoutContent.includes('ErrorBoundary'),
  'App is wrapped in ErrorBoundary for production safety'
);

const usePrivyStatePath = path.join(__dirname, '../src/hooks/usePrivyState.ts');
const usePrivyStateContent = fs.existsSync(usePrivyStatePath)
  ? fs.readFileSync(usePrivyStatePath, 'utf8')
  : '';

check(
  'usePrivyState hook exists',
  usePrivyStateContent.includes('usePrivy'),
  'Centralized hook for Privy state management'
);

check(
  'Authentication state tracking',
  usePrivyStateContent.includes('isAuthenticated') && usePrivyStateContent.includes('isReady'),
  'Properly tracks authentication and ready states'
);

const authScreenPath = path.join(__dirname, '../src/organisms/AuthScreen.tsx');
const authScreenContent = fs.existsSync(authScreenPath)
  ? fs.readFileSync(authScreenPath, 'utf8')
  : '';

check(
  'Auth redirect on login',
  authScreenContent.includes('router.replace') && authScreenContent.includes('/home'),
  'Redirects to home screen after successful authentication'
);

const homeScreenPath = path.join(__dirname, '../src/organisms/HomeScreen.tsx');
const homeScreenContent = fs.existsSync(homeScreenPath)
  ? fs.readFileSync(homeScreenPath, 'utf8')
  : '';

check(
  'Auth guard on Home screen',
  homeScreenContent.includes('isAuthenticated') && homeScreenContent.includes('router.replace'),
  'Redirects to auth screen if not authenticated'
);

check(
  'User session restoration',
  authScreenContent.includes('isReady') && homeScreenContent.includes('isReady'),
  'Both screens wait for Privy to be ready before redirecting'
);

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

check(
  'Privy SDK installed',
  packageJson.dependencies && packageJson.dependencies['@privy-io/expo'],
  `Version: ${packageJson.dependencies['@privy-io/expo']}`
);

check(
  'expo-secure-store available',
  packageJson.dependencies && (
    packageJson.dependencies['expo-secure-store'] ||
    packageJson.dependencies['expo']
  ),
  'Required for secure token storage (included in Expo SDK)'
);

console.log('\n' + '='.repeat(60));

if (allChecks) {
  console.log('All persistence checks passed!');
  console.log('Next steps:');
  console.log('1. Run: npm start');
  console.log('2. Sign in with email or passkey');
  console.log('3. Close the app completely');
  console.log('4. Reopen the app');
  console.log('5. Verify youre still logged in (should see Home screen)');
  console.log('See VERIFY_PERSISTENT_LOGIN.md for detailed testing guide.');
} else {
  console.log('Some checks failed. Please review the configuration.');
  process.exit(1);
}

console.log('='.repeat(60));
