import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';
import React, {FunctionComponent} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {defaultTheme} from 'resources/palette/gTheme.interface';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './navigators/AppNavigator';
import store from './store/app.store';
import {ThemeContextProvider} from './store/contexts/ThemeContext';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import * as Sentry from '@sentry/react-native';
import enJson from './language/en.json';
import hiJson from './language/hi.json';
import {Provider as PaperProvider} from 'react-native-paper';
import R from 'resources/R';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: enJson,
    },
    hi: {
      translation: hiJson,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(duration);

LogBox.ignoreAllLogs();

// Sentry.init({
//   dsn: 'https://d0cbe7aea25047168ee8e21a774bd9f7@o473352.ingest.sentry.io/5508192',
//   tracesSampleRate: 0.8,
//   sampleRate: 1.0,
//   enableAutoPerformanceTracking: true,
//   integrations: [
//     new Sentry.ReactNativeTracing({
//       tracingOrigins: [
//         'https://threesigma-backend-production.herokuapp.com/',
//         /^\//,
//       ],
//     }),
//   ],
// });

const App: FunctionComponent<any> = () => (
  <PaperProvider>
    <StoreProvider store={store}>
      <ThemeContextProvider value={defaultTheme}>
        <StatusBar
          backgroundColor={R.colors.bgCol}
          barStyle={'dark-content'}
          animated={true}
        />
        <AppNavigator />
      </ThemeContextProvider>
      <FlashMessage position="top" animated={true} />
    </StoreProvider>
  </PaperProvider>
);

export default App;
// export default Sentry.wrap(App);
