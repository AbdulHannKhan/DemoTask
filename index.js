/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import crashlytics from '@react-native-firebase/crashlytics';

// Log app start to Crashlytics
crashlytics().log('App started');

// Set up global error handler for JS errors
const defaultHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error, isFatal) => {
  // Log the error to Crashlytics
  crashlytics().recordError(error);
  crashlytics().log(isFatal ? 'Fatal JS error' : 'Non-fatal JS error');

  // Optional: Allow time for Crashlytics to send data before crashing (not guaranteed in global handler)
  setTimeout(() => {
    defaultHandler(error, isFatal); // call the original error handler
  }, 100);
});

// Handle unhandled promise rejections
if (typeof globalThis.addEventListener === 'function') {
  globalThis.addEventListener('unhandledrejection', event => {
    const error =
      event?.reason instanceof Error
        ? event.reason
        : new Error(JSON.stringify(event?.reason));

    crashlytics().recordError(error);
    crashlytics().log('Unhandled Promise Rejection');
  });
}

// Optional: Add a manual crash test (you can remove this later)
// Example: Add this to a debug screen or button for testing
// crashlytics().crash(); // Uncomment to test native crash

AppRegistry.registerComponent(appName, () => App);
