import {Response} from '../entity/response';
import {User} from '../entity/user';
import SecuredBaseApi from '../securedBase.api';

class UserApi extends SecuredBaseApi {
  public async updateProfile(payload: object): Promise<string> {
    try {
      const response: any = await this.securedAxios.put(
        '/user/update-profile',
        payload,
      );
      if (response && response.status) {
        return Promise.resolve(response);
      }
      return Promise.reject();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUser(): Promise<User> {
    const response: Response = await this.securedAxios.get('reset/token');
    return Promise.resolve(response.Data);
  }

  public async updteUserProfile(user: any): Promise<boolean> {
    const response: Response = await this.securedAxios.put(
      '/user/profile',
      user,
    );
    return Promise.resolve(response.status);
  }
  public async setFcmToken(token: string): Promise<void> {
    const response: Response = await this.securedAxios.post(
      '/user/add-fcm-token',
      {token},
    );
    return Promise.resolve(response.data);
  }
  public async removeFcmToken(): Promise<void> {
    const response: Response = await this.securedAxios.post(
      '/user/remove-fcm-token',
      {},
    );
    return Promise.resolve(response.data);
  }
}

export default UserApi;
