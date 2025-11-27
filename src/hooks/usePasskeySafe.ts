import { useState, useEffect } from 'react';

let passkeysModule: { isSupported: () => boolean } | null = null;
try {
  passkeysModule = require('react-native-passkeys');
} catch (error) {
}

export function usePasskeySafe() {
  const [isPasskeyAvailable, setIsPasskeyAvailable] = useState(false);
  
  useEffect(() => {
    if (passkeysModule) {
      try {
        const supported = passkeysModule.isSupported();
        setIsPasskeyAvailable(supported);
        if (supported) {
        } else {
        }
      } catch (error) {
        setIsPasskeyAvailable(false);
      }
    } else {
    }
  }, []);
  
  return { isPasskeyAvailable };
}


