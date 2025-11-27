#!/bin/bash

echo "🔄 Complete Passkey Reset Script"
echo "================================="
echo ""

# Stop any running Metro bundler
echo "1. Stopping Metro bundler..."
pkill -f "react-native" || true
pkill -f "metro" || true
sleep 1

# Delete the app from simulator
echo "2. Deleting app from simulator..."
xcrun simctl uninstall booted com.ilya.privytest2 2>/dev/null || echo "   App not installed (that's ok)"
sleep 1

# Clear caches
echo "3. Clearing caches..."
rm -rf node_modules/.cache 2>/dev/null
rm -rf .expo 2>/dev/null
rm -rf /tmp/metro-* 2>/dev/null
rm -rf /tmp/haste-* 2>/dev/null
echo "   Caches cleared"

# Reset iOS simulator (this clears all passkeys)
echo "4. Erasing simulator (this clears ALL passkeys)..."
echo "   This will take ~10 seconds..."
BOOTED_DEVICE=$(xcrun simctl list devices | grep "Booted" | head -1 | grep -o '([A-F0-9-]*)' | tr -d '()')
if [ -z "$BOOTED_DEVICE" ]; then
    echo "   No booted simulator found. Boot one first."
    echo "   Run: open -a Simulator"
    exit 1
fi

xcrun simctl shutdown "$BOOTED_DEVICE"
sleep 2
xcrun simctl erase "$BOOTED_DEVICE"
sleep 2
xcrun simctl boot "$BOOTED_DEVICE"
sleep 3

echo ""
echo "✅ Reset complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm start"
echo "2. Press 'i' to open in iOS simulator"
echo "3. Try EMAIL authentication first (not passkey):"
echo "   - Enter your email"
echo "   - Click 'Continue with Email'"
echo "   - Enter the 6-digit code"
echo ""
echo "This will let you test the wallet functionality."
echo "We can debug passkeys separately."
echo ""
