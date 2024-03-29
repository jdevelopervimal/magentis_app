import ScreenNameEnum from '../models/routes/screenName.enum';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import PlannerListScreen from '../screens/PlannerScreens/PlannerListScreen';
import AddPlannerScreen from '../screens/PlannerScreens/AddPlannerScreen';
import PlannerDetailScreen from '../screens/PlannerScreens/PlannerDetailScreen';
import AddServiceScreen from '../screens/PlannerServiceScreen/AddServiceScreen';
import BottomTabNavigator from '../navigators/BottomNavigation';

const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component: LoginScreen,
    },
  ],
  FEATURE_ROUTE: [
    {name: ScreenNameEnum.HOME_TAB_SCREEN, Component: BottomTabNavigator},
    {name: ScreenNameEnum.ADD_PLANNER_SCREEN, Component: AddPlannerScreen},
    {
      name: ScreenNameEnum.PLANNER_DETAIL_SCREEN,
      Component: PlannerDetailScreen,
    },
    {name: ScreenNameEnum.ADD_SERVICE_SCREEN, Component: AddServiceScreen},
  ],
  BOTTOM_ROUTE: [
    {
      name: ScreenNameEnum.PLANNER_LIST_SCREEN,
      Component: PlannerListScreen,
      icon: 'home',
      title: 'Planner List',
    },
    {
      name: ScreenNameEnum.ADD_SERVICE_SCREEN,
      Component: PlannerListScreen,
      icon: 'note-plus',
      title: 'Add Service',
    },
    {
      name: ScreenNameEnum.LOGISTIC_SCREEN,
      Component: PlannerListScreen,
      icon: 'archive',
      title: 'Logistic',
    },
    {
      name: ScreenNameEnum.REPORTS_SCREEN,
      Component: PlannerListScreen,
      icon: 'chart-box',
      title: 'Reports',
    },
    {
      name: ScreenNameEnum.USER_PROFILE_SCREEN,
      Component: PlannerListScreen,
      icon: 'cog',
      title: 'Administrator',
    },
  ],
};

export default _routes;
