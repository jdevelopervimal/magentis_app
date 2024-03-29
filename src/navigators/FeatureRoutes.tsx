import React, {FunctionComponent} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import _routes from '../configs/routes';
import ScreenNameEnum from '../models/routes/screenName.enum';

const Stack = createStackNavigator();

const FeatureRoutes: FunctionComponent<any> = ({
  SceenName,
}: {
  SceenName: ScreenNameEnum;
}) => {
  return (
    <Stack.Navigator
      initialRouteName={SceenName}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {_routes.FEATURE_ROUTE.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
        />
      ))}
    </Stack.Navigator>
  );
};
export default FeatureRoutes;
