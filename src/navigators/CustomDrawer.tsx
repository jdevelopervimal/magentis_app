import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../models/routes/screenName.enum';
import R from 'resources/R';
import {FontSizeEnum, FontWeightEnum} from 'resources/fonts/fontStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentUserSelector,
  selectSubcriptionStatus,
  setUserProfile,
} from '../store/slices/user.slice';
import {RootDispatch, RootState} from '../store/app.store';
import {DocumentPickerResponse} from 'react-native-document-picker';
import Helper from '../utils/helper';
import {APP_VERSION, APP_VERSION_DATE} from '../../env';
import {FileRelationEnum} from 'library/common/UploadImage';
import ReportBugModal from 'library/modals/ReportBugModal';
import GImage from 'library/common/GImage';
import SubscriptionTrialModal from 'library/modals/SubscriptionTrialModal';
import {Nillable} from '../models/custom.types';
import {User} from 'datalib/entity/user';
interface DrawerRoute {
  name: string;
  screen: ScreenNameEnum;
  icon: string;
  rightIcon?: string;
  premium: boolean;
  onPress?: () => void;
}
const CustomDrawer = (props: any) => {
  const user: Nillable<User> = useSelector((state: RootState) =>
    currentUserSelector(state),
  );
  const [bugModal, setBugModal] = useState(false);
  const [loadingImage, setLoading] = useState(false);
  const isSubscribed = useSelector(selectSubcriptionStatus);
  const [isSubscriptionModal, setSubscriptionModal] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const routes: Array<DrawerRoute> = [
    {
      name: 'Products',
      screen: ScreenNameEnum.PRODUCT_LIST_SCREEN,
      icon: 'package-variant-closed',
      rightIcon: 'crown',
      premium: true,
    },
    {
      name: 'Quotation',
      screen: ScreenNameEnum.QUOTATION_LIST_SCREEN,
      icon: 'currency-usd',
      rightIcon: 'crown',
      premium: true,
    },
    // {
    //   name: 'Desktop app',
    //   screen: null,
    //   icon: 'monitor',
    //   onPress: () => {
    //     Linking.openURL('https://web.3sigmacrm.com/login').catch(err =>
    //       console.error('Error', err),
    //     );
    //   },
    // },
    // {
    //   name: 'Automation',
    //   screen: ScreenNameEnum.AUTOMATION_LIST_SCREEN,
    //   icon: 'lightning-bolt',
    // },
    {
      name: 'Settings',
      screen: ScreenNameEnum.SETTINGS_HOME_SCREEN,
      icon: 'cog',
      premium: false,
    },
    // {
    //   name: 'Rate us',
    //   screen: null,
    //   icon: 'star',
    //   onPress: () => {
    //     let GOOGLE_PACKAGE_NAME = 'com.threesigma';
    //     Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);
    //   },
    // },
    // {
    //   name: 'Invoices',
    //   screen: ScreenNameEnum.INVOICE_LIST_SCREEN,
    //   icon: 'receipt',
    // },
    // {
    //   name: 'Deals',
    //   screen: ScreenNameEnum.DEALS_LIST_SCREEN,
    //   icon: 'handshake-outline',
    // },
    // {
    //   name: 'Logout',
    //   screen: null,
    //   icon: 'logout',
    //   onPress: handleLogout,
    // },
  ];
  const handleOnPress = async () => {
    let selectedFile: DocumentPickerResponse[] | null = await Helper.pickFile(
      'image/*',
    );
    if (selectedFile && Array.isArray(selectedFile)) {
      setLoading(true);
      const response = await Helper.handleFileUpload(
        dispatch,
        selectedFile,
        FileRelationEnum.user,
        user?._id || '',
      );
      setLoading(false);
      if (response?.meta.requestStatus === 'fulfilled') {
        await dispatch(setUserProfile());
      }
    }
  };
  const handleRateUsPress = () => {
    props.closeDrawer && props.closeDrawer();
    let GOOGLE_PACKAGE_NAME = 'com.threesigma';
    Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);
  };
  const handleContactUsPress = () => {
    props.closeDrawer && props.closeDrawer();
    Linking.openURL('https://wa.me/918814048362').catch(err =>
      console.error('Error', err),
    );
  };
  const handleRecommendPress = async () => {
    try {
      const result = await Share.share({
        message:
          'I strongly recommend 3sigma mobile crm for  business lead management and follow ups management. Try it out today and see the difference it can make in your Business',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {}
  };
  const handleNavigate = (route: DrawerRoute) => {
    if (isSubscribed || !route.premium) {
      props.closeDrawer && props.closeDrawer();
      props.navigation.navigate(route.screen);
    } else {
      setSubscriptionModal(true);
    }
  };
  return (
    <View style={styles.flexOne}>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <View style={styles.profileContainer}>
          <View style={styles.imageBox}>
            <View style={styles.profileImageContainer}>
              <Pressable
                onPress={handleOnPress}
                android_ripple={{color: '#ccc', borderless: false}}
                style={styles.innerCircle}>
                {user?.profile?.filePath ? (
                  <GImage
                    imageName={user?.profile?.filePath}
                    style={styles.imageStyle}
                  />
                ) : !loadingImage ? (
                  <MaterialCommunityIcons
                    name={'account-circle'}
                    size={50}
                    color={'white'}
                  />
                ) : (
                  <ActivityIndicator
                    size={'large'}
                    color={R.colors.themeCol2}
                  />
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText} numberOfLines={2}>
              {user?.firstName} {user?.lastName || ''}
            </Text>
            <View>
              <Text style={styles.roleText}>
                {user?.role ? user?.role?.displayName || 'Admin' : 'Admin'}
              </Text>
              <Text style={styles.companyName} numberOfLines={2}>
                {user?.organization?.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.routeList}>
          {user?.role && user?.role?.name === 'super_admin' ? (
            <View>
              {isSubscribed ? (
                <View style={styles.subscritionBlock}>
                  <Text style={styles.subscriptionMessage}>
                    You are currently on monthly
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(
                        ScreenNameEnum.SUBSCRIPTION_SCREEN,
                      )
                    }>
                    <Text style={styles.upgradeLinkText}>View</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.subscritionBlock}>
                  <Text style={styles.subscriptionMessage}>
                    You are currently on free plan
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(
                        ScreenNameEnum.SUBSCRIPTION_SCREEN,
                      )
                    }>
                    <Text style={styles.upgradeLinkText}>Upgrade Now</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : null}

          {routes.map(route => (
            <View key={route.name.toLowerCase()} style={styles.itemContainer}>
              <Pressable
                style={styles.innerItem}
                onPress={() =>
                  route.screen
                    ? handleNavigate(route)
                    : route.onPress && route.onPress()
                }
                android_ripple={R.darkTheme.grayRipple}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name={route.icon}
                    size={22}
                    color={route.icon === 'star' ? '#FFD700' : 'black'}
                  />
                  <Text style={styles.itemText}>{route.name}</Text>
                </View>
                {route.rightIcon && (
                  <View>
                    <MaterialCommunityIcons
                      name={route.rightIcon}
                      size={25}
                      color={'#FFD700'}
                    />
                  </View>
                )}
              </Pressable>
            </View>
          ))}
        </View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity
            style={styles.bottomLinks}
            onPress={handleRateUsPress}>
            <MaterialCommunityIcons
              name={'bullhorn'}
              size={25}
              color={'#3A4B86E5'}
            />
            <Text style={styles.bottomLinkText}>Rate us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomLinks}
            onPress={handleContactUsPress}>
            <MaterialCommunityIcons
              name={'message-text'}
              size={25}
              color={R.colors.themeCol2}
            />
            <Text style={styles.bottomLinkText}>Contact US</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomLinks}
            onPress={handleRecommendPress}>
            <MaterialCommunityIcons
              name={'thumb-up'}
              size={25}
              color={'#0DA30A80'}
            />
            <Text style={styles.bottomLinkText}>Recommend us</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.bottomLinks}>
            <MaterialCommunityIcons
              name={'youtube'}
              size={25}
              color={'#E11D1D'}
            />
            <Text style={styles.bottomLinkText}>Video Tutorial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomLinks}
            onPress={() => {
              props.navigation.toggleDrawer();
              setBugModal(true);
            }}>
            <MaterialCommunityIcons name={'bug'} size={25} color={'#CF3C45'} />
            <Text style={styles.bottomLinkText}>Report Bug</Text>
          </TouchableOpacity> */}
        </View>
      </DrawerContentScrollView>
      <View style={styles.versionBox}>
        <Text style={styles.versionText}>3Sigma Version : {APP_VERSION}</Text>
        <Text style={styles.versionText}>{APP_VERSION_DATE}</Text>
      </View>
      <ReportBugModal
        isVisible={bugModal}
        onModalHide={() => setBugModal(false)}
      />
      {isSubscriptionModal && (
        <SubscriptionTrialModal
          screenTitle={'This feature'}
          isVisible={isSubscriptionModal}
          onModalHide={setSubscriptionModal}
        />
      )}
    </View>
  );
};

// chart-ppf  lightning-bolt cog receipt-text handshake-outline
export default CustomDrawer;
const styles = StyleSheet.create({
  profileImageContainer: {
    height: 70,
    width: 70,
    backgroundColor: 'lightgray',
    borderRadius: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    overflow: 'hidden',
  },
  innerCircle: {
    height: '100%',
    width: '100%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 70,
    width: 70,
  },
  flexOne: {
    flex: 1,
    backgroundColor: R.colors.bgCol,
  },
  imageBox: {height: 120},
  nameText: {
    ...R.generateFontStyle(FontSizeEnum.BASE, FontWeightEnum.SEMI_BOLD),
    textAlign: 'center',
    color: R.colors.black,
  },
  roleText: {
    ...R.generateFontStyle(FontSizeEnum.SM, FontWeightEnum.SEMI_BOLD),
    marginRight: 5,
    textAlign: 'center',
    color: R.colors.black,
    textTransform: 'capitalize',
  },
  companyName: {
    ...R.generateFontStyle(FontSizeEnum.XS, FontWeightEnum.REGULAR),
    marginRight: 5,
    textAlign: 'center',
    color: R.colors.black,
  },
  routeList: {
    flex: 1,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingTop: 20,
    borderColor: 'gray',
    marginHorizontal: 20,
    paddingBottom: 60,
  },
  innerItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: R.colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemText: {
    ...R.generateFontStyle(FontSizeEnum.LG, FontWeightEnum.EXTRA_BOLD),
    marginLeft: 10,
    color: R.colors.black,
  },
  versionText: {
    ...R.generateFontStyle(FontSizeEnum.XS, FontWeightEnum.REGULAR),
    textAlign: 'center',
    color: '#999999',
  },
  upgradeLinkText: {
    ...R.generateFontStyle(FontSizeEnum.SM, FontWeightEnum.REGULAR),
    color: R.colors.themeCol2,
  },
  subscriptionMessage: {
    ...R.generateFontStyle(FontSizeEnum.SM, FontWeightEnum.SEMI_BOLD),
    color: R.colors.themeCol1,
  },
  bottomLinkText: {
    ...R.generateFontStyle(FontSizeEnum.LG, FontWeightEnum.REGULAR),
    color: R.colors.black,
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'relative',
  },
  nameContainer: {
    justifyContent: 'space-between',
    flex: 1,
    height: 80,
    marginLeft: 10,
  },
  bottomLinks: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 5,
  },
  subscritionBlock: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  versionBox: {
    marginBottom: 20,
  },
});
