/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {styles} from './styles';
import R from 'resources/R';
interface SplashProps {
  hasNoInternet?: boolean;
  message?: string;
}
const SplashScreen: FunctionComponent<SplashProps> = ({
  hasNoInternet,
  message,
}: SplashProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingBlock}>
        <ActivityIndicator size={'small'} color={R.colors.themeCol2} />
        <Text style={styles.loadingText}>
          {hasNoInternet ? 'No internet' : message || 'Initializing...'}
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;
