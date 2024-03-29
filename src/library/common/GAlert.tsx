import React from 'react';
import {ActivityIndicator} from 'react-native';
import {showMessage} from 'react-native-flash-message';
export enum MessageType {
  NONE = 'none',
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
}

const GAlert = (
  message: string,
  type: MessageType = MessageType.DANGER,
  loading: boolean = false,
) =>
  showMessage({
    message: message,
    type: type,
    icon: (props: any) =>
      loading && (
        <ActivityIndicator size={'large'} color={'white'} {...props} />
      ),
  });
export default GAlert;
