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

const App = (): JSX.Element => {

  return (
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
            
              <MainNavigation />
            </KeyboardAvoidingView>
          </SafeAreaView>
        </PersistGate>
      </Provider>
  );
};

export default Sentry.wrap(App);
// export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
