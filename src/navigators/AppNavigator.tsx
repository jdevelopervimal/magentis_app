/* eslint-disable react-hooks/exhaustive-deps */
import NetInfo from '@react-native-community/netinfo';
import {navigationRef} from './NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {isFunction, isNull} from 'lodash-es';
import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import SInfoTypeEnum from '../models/common/sInfoType.enum';
import {
  AuthContextProvider,
  AuthFunctions,
} from '../store/contexts/AuthContext';

import jwtUtil from '../utils/jwt.util';
import sInfoUtil from '../utils/sInfo.util';
import SplashScreen from '../screens/WelcomeScreen/SplashScreen';
import RegistrationRoutes from './RegistrationRoutes';
import FeatureRoutes from './FeatureRoutes';
import {RootDispatch, RootState} from '../store/app.store';
import {useDispatch, useSelector} from 'react-redux';
import {currentUserSelector} from '../store/slices/user.slice';
import GAlert from 'library/common/GAlert';
import AsyncStorage from '@react-native-community/async-storage';
import InAppUpdate from '../utils/InAppUpdate';
import {enableScreens} from 'react-native-screens';

import {DevSettings} from 'react-native';
import ScreenNameEnum from '../models/routes/screenName.enum';
import {getLoggedInUser} from '../store/slices/actions/UserActions';

enableScreens(false);
const AppNavigator: FunctionComponent<any> = () => {
  const dispatch = useDispatch<RootDispatch>();
  const [language, setLanguage] = useState<string | null>('en');
  const [hasNoInternet, setHasNoInternet] = useState<boolean>(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('Loading App');
  const currentUser = useSelector((state: RootState) =>
    currentUserSelector(state),
  );
  const rootAuthContext: AuthFunctions = useMemo(
    () => ({
      signIn: async (_pStatus: boolean = true) => {
        setAuthenticated(true);
      },
      signOut: async () => {
        setAuthenticated(false);
        await sInfoUtil.remove(SInfoTypeEnum.JWT);
        await AsyncStorage.removeItem('ACTIVITIES_SYNC_TIME');
      },
    }),
    [],
  );
  useEffect(() => {
    try {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      InAppUpdate.checkUpdate(); // this is how you check for update
    } catch (error) {
      console.log('Error in  checking updated');
    }
  }, []);

  useEffect(() => {
    const netInfoSubscriber = NetInfo.addEventListener(state => {
      setHasNoInternet(!state.isConnected);
      loadLanguage();
      if (state.isConnected) {
        bootstrapApp();
        isFunction(netInfoSubscriber) ? netInfoSubscriber() : undefined;
      }
    });
    return () =>
      isFunction(netInfoSubscriber) ? netInfoSubscriber() : undefined;
  }, []);
  const loadLanguage = async () => {
    const value = await AsyncStorage.getItem('@language');
    setLanguage(value ? value : null);
  };

  const bootstrapApp = async () => {
    setMessage('Bootstrap App');
    if (!currentUser || isNull(currentUser)) {
      setMessage('Checking user login');
      try {
        const storedJwt = await sInfoUtil.fetch(SInfoTypeEnum.JWT);
        console.log('storedJwt', storedJwt);
        if (storedJwt) {
          let decodedJwt = jwtUtil.parseJwt(storedJwt);
          setMessage('Token found! loading user data...');
          decodedJwt && handleJwt();
        } else {
          setAuthenticated(false);
          setInitializing(false);
        }
      } catch (error) {
        GAlert('Error!!');
      }
    } else {
      setInitializing(false);
    }
  };

  const handleJwt = () => {
    dispatch(getLoggedInUser())
      .then((_response: any) => {
        if (_response.payload && _response.payload) {
          console.log(_response.payload);
          setMessage('User data loaded in redux...');
          setInitializing(false);
          setAuthenticated(true);
        }
      })
      .catch(async _error => {
        setMessage('Error in loading user data from JWT, retrying...');
        await sInfoUtil.remove(SInfoTypeEnum.JWT);
        await sInfoUtil.remove(SInfoTypeEnum.USER_CONTEXT);
        GAlert('Token expired, logging out...');
        DevSettings.reload();
      });
  };

  if (initializing || language === '') {
    return <SplashScreen hasNoInternet={hasNoInternet} message={message} />;
  }
  const config = {
    screens: {
      Splash: {
        path: 'plan/:screen/:id',
        parse: {
          id: (id: string) => `${id}`,
          screen: (screen: string) => `${screen}`,
        },
      },
    },
  };
  const linking = {
    prefixes: ['https://www.example.com', 'example://'],
    config,
  };
  return (
    <AuthContextProvider value={rootAuthContext}>
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        fallback={
          <SplashScreen
            hasNoInternet={hasNoInternet}
            message={'Loading app data...'}
          />
        }>
        {isAuthenticated ? (
          <FeatureRoutes SceenName={ScreenNameEnum.HOME_TAB_SCREEN} />
        ) : (
          <RegistrationRoutes />
        )}
      </NavigationContainer>
    </AuthContextProvider>
  );
};
export default AppNavigator;
