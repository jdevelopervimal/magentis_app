import GScreen from 'library/wrapper/GScreen';
import React, {useContext, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Stack, TextInput, Text, Button} from '@react-native-material/core';
import AppImages from 'resources/images';
import {useDispatch, useSelector} from 'react-redux';
import {RootDispatch, RootState} from '../../store/app.store';
import {loginUser} from '../../store/slices/actions/UserActions';
import {AuthFunctions, AuthContext} from '../../store/contexts/AuthContext';
import {ThunkStatusEnum} from '../../models/common/thunkStatus.enum';

export default function LoginScreen() {
  const dispatch = useDispatch<RootDispatch>();
  const authContext: AuthFunctions = useContext(AuthContext);
  const {userLoginStatus} = useSelector((state: RootState) => state.user);
  const [userName, setUserName] = useState('kk@gmail.com');
  const [password, setPassword] = useState('12345');
  const handleOnSubmit = async () => {
    const payload = {LOGIN_ID: userName, PASSWORD: password};

    const response = await dispatch(loginUser(payload));
    console.log(response, userLoginStatus);
    if (response && response.meta.requestStatus === 'fulfilled') {
      authContext.signIn();
    }
  };
  return (
    <GScreen
      hasKeyboardAvoidView
      loading={userLoginStatus.status === ThunkStatusEnum.LOADING}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={AppImages.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headingText} variant="h3">
          Login
        </Text>
      </View>
      <Stack spacing={2} style={{margin: 16}}>
        <TextInput
          label="Username"
          onChangeText={setUserName}
          value={userName}
        />
        <TextInput
          label="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <Button
          title="Login"
          disabled={!userName || !password}
          onPress={handleOnSubmit}
        />
      </Stack>
    </GScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 100,
    width: '100%',
    marginLeft: -20,
  },
  imageStyle: {
    height: 120,
    width: Dimensions.get('screen').width + 40,
  },
  headingText: {
    textAlign: 'center',
    marginTop: 50,
  },
});
