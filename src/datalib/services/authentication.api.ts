import {isNil} from 'lodash-es';
import SInfoTypeEnum from '../../models/common/sInfoType.enum';
import sInfoUtil from '../../utils/sInfo.util';
import BaseApi from '../base.api';
import {Response} from 'datalib/entity/response';
import {
  LoginRequest,
  SedOtpRequest,
  VerifyAuthRequest,
} from '../entity/requests';
import {User} from '../entity/user';

class AuthenticationApi extends BaseApi {
  public async login(requestBody: LoginRequest): Promise<User> {
    try {
      const response: Response = await this.axios.post(
        'user/login',
        requestBody,
      );
      console.log(response);
      if (response.Status === 200) {
        let token = response?.Data?.accessToken;
        await sInfoUtil.save(SInfoTypeEnum.JWT, token);
        return Promise.resolve(response.Data);
      } else {
        return Promise.reject();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public async sendOtp(requestBody: SedOtpRequest) {
    try {
      const response: Response = await this.axios.post(
        'auth/generate-otp',
        requestBody,
      );
      if (response && response.Status) {
        return Promise.resolve(response);
      }
      return Promise.reject();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public async verifyOtp(requestBody: VerifyAuthRequest): Promise<User> {
    try {
      const response: any = await this.axios.post('auth', requestBody);
      if (!isNil(response.data)) {
        let token = (response?.data?.token).split('Bearer ')[1];
        await sInfoUtil.save(SInfoTypeEnum.JWT, token);
        await sInfoUtil.save(
          SInfoTypeEnum.USER_CONTEXT,
          JSON.stringify(response?.data),
        );
        return Promise.resolve(response.data);
      } else {
        return Promise.reject();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public async refreshToken() {
    try {
      const response: any = await this.axios.post('/auth/refresh-token', {});
      if (!isNil(response.data)) {
        await sInfoUtil.save(SInfoTypeEnum.JWT, response.data.authToken);
        await sInfoUtil.save(
          SInfoTypeEnum.USER_CONTEXT,
          JSON.stringify(response.data.user),
        );
        return Promise.resolve(response.data.user);
      }
      return Promise.reject();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default AuthenticationApi;
