import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginRequest} from 'datalib/entity/requests';
import {User} from 'datalib/entity/user';
import AuthenticationApi from 'datalib/services/authentication.api';
import UserApi from 'datalib/services/user.api';

export const loginUser = createAsyncThunk<
  User,
  LoginRequest,
  {rejectValue: string}
>('user/login', async (payload: LoginRequest, {rejectWithValue}) => {
  try {
    return await new AuthenticationApi().login(payload);
  } catch (error: any) {
    return rejectWithValue(error.code);
  }
});
export const getLoggedInUser = createAsyncThunk<
  User,
  void,
  {rejectValue: string}
>('user/profile', async (oid, {rejectWithValue}) => {
  try {
    return await new UserApi().getUser();
  } catch (error: any) {
    return rejectWithValue(error.code);
  }
});
