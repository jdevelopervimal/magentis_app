/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import _route from '../configs/routes';
import {FontSizeEnum, FontWeightEnum} from 'resources/fonts/fontStyles';
import R from 'resources/R';
import ScreenNameEnum from '../models/routes/screenName.enum';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTab = createMaterialTopTabNavigator();

const inactiveColor = 'grey';

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      initialRouteName="LeadHome"
      tabBarPosition={'bottom'}
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: styles.barStyle,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarPressColor: '#3faefc',
        lazy: true,
      }}>
      {_route.BOTTOM_ROUTE.map(route => (
        <BottomTab.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
            tabBarLabel: ({focused}: any) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  {color: focused ? R.colors.themeCol2 : inactiveColor},
                ]}>
                {route.title}
              </Text>
            ),
            tabBarIcon: ({focused}: any) => (
              <View style={styles.iconBox}>
                <View style={[styles.iconStyle]} />
                <MaterialCommunityIcons
                  name={route.icon}
                  size={25}
                  color={focused ? R.colors.themeCol2 : inactiveColor}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e: any) => {
              // GAlert(e.target || 'No Screen');
              if (e.target?.includes(ScreenNameEnum.SETTINGS_TAB_SCREEN)) {
                e.preventDefault();
                if (navigation && navigation.toggleDrawer) {
                  navigation?.toggleDrawer();
                }
                return;
              } else if (!e.target) {
                e.preventDefault();
                return;
              }
            },
          }}
          component={route.Component}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
  iconStyle: {
    borderColor: R.colors.themeCol2,
  },
  iconBox: {
    justifyContent: 'space-between',
  },
  barStyle: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 60,
    justifyContent: 'center',
  },
  tabBarLabel: {
    ...R.generateFontStyle(FontSizeEnum.XXS, FontWeightEnum.BOLD),
    textTransform: 'capitalize',
    minWidth: '100%',
    textAlign: 'center',
  },
  tabBarIndicatorStyle: {
    height: 5,
    top: 0,
    borderRadius: 10,
    width: 30,
    alignSelf: 'center',
    marginLeft: 25,
    backgroundColor: R.colors.themeCol2,
  },
});
