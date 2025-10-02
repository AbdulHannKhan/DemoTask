import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './src/config/theme';
import MainNavigation from './src/navigation';
import { persister, store } from './src/store/store';
import i18n from './src/config/i18n';
import * as Sentry from '@sentry/react-native';
import { environment } from './src/config/constants';
import { EnvironmentEnum } from './src/helper/enums';
// import { SafeAreaView } from 'react-native-safe-area-context';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

// if (!__DEV__) {
Sentry.init({
  dsn: 'https://70cbc5f595728c21b51a58b11c0e1107@o4505262753775616.ingest.us.sentry.io/4509396109819904',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: environment === EnvironmentEnum.Staging ? 0 : 0.1,
  replaysOnErrorSampleRate: environment === EnvironmentEnum.Staging ? 0 : 1,
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllImages: false,
      maskAllVectors: false,
    }),
    navigationIntegration,
    Sentry.reactNativeTracingIntegration(),
  ],
  tracesSampleRate: environment === EnvironmentEnum.Staging ? 0 : 0.5,
  profilesSampleRate: environment === EnvironmentEnum.Staging ? 0 : 0.5,
  environment: environment,
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
// }

const App = (): JSX.Element => {
  useEffect(() => {
    const setupLanguage = async () => {
      i18n.changeLanguage('en');
    };
    setupLanguage();
  }, []);

  return (
    <Sentry.TouchEventBoundary>
      <Provider store={store}>
        <PersistGate persistor={persister} loading={null}>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <StatusBar
              backgroundColor={theme.colors.surface}
              barStyle="dark-content"
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              {/* <Text>hi</Text> */}
              <MainNavigation navigationIntegration={navigationIntegration} />
            </KeyboardAvoidingView>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </Sentry.TouchEventBoundary>
  );
};

export default Sentry.wrap(App);
// export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
