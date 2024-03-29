/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import {User} from 'datalib/entity/user';

import {
  defaultThunkFailureState,
  defaultThunkLoadingState,
  defaultThunkSuccessState,
} from '../../models/common/thunk.config';
import {ThunkStatusEnum} from '../../models/common/thunkStatus.enum';
import {ThunkStatus} from '../../models/common/thunkStatus.interface';
import {Nillable} from '../../models/custom.types';
import {RootState} from '../app.store';
import {getLoggedInUser, loginUser} from './actions/UserActions';

interface UserState {
  user: Nillable<User>;
  userLoginStatus: ThunkStatus;
}

const initialThunkState = {status: ThunkStatusEnum.IDLE, error: null};

const initialState: UserState = {
  user: null,
  userLoginStatus: initialThunkState,
};
// TODO: Remove boilerplate?
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    restoreUserStore: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.userLoginStatus = defaultThunkLoadingState;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userLoginStatus = defaultThunkSuccessState;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userLoginStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
    builder.addCase(getLoggedInUser.pending, state => {
      state.userLoginStatus = defaultThunkLoadingState;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.userLoginStatus = defaultThunkSuccessState;
      state.user = action.payload;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.userLoginStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
  },
});

export default userSlice.reducer;
export const {restoreUserStore} = userSlice.actions;
export const currentUserSelector: (state: RootState) => User | null = (
  state: RootState,
) => state.user.user || null;
