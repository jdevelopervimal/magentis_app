import {EnvironmentEnum} from './src/models/consts/environment.enum';

export const ENVIRONMENT: EnvironmentEnum = EnvironmentEnum.STAGING;
export const S3_URL = {
  [EnvironmentEnum.PRODUCTION]: '',
  [EnvironmentEnum.STAGING]: '',
  [EnvironmentEnum.DEVELOPMENT]: '',
};

export const WEBPAGE_URL = {
  [EnvironmentEnum.PRODUCTION]: '',
  [EnvironmentEnum.STAGING]: '',
  [EnvironmentEnum.DEVELOPMENT]: '',
};
export const SERVER_URL = {
  [EnvironmentEnum.PRODUCTION]: 'https://magentis2.joterp.online/api/',
  [EnvironmentEnum.STAGING]: 'https://seawave.magensea.online/api/',
  [EnvironmentEnum.DEVELOPMENT]: 'https://seawave.magensea.online/api/',
};

export const APP_VERSION = '1.0.0';
export const APP_VERSION_DATE = '13th June 2023';
