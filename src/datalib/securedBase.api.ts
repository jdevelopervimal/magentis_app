import {AxiosInstance} from 'axios';
import securedApi from './axiosSecured.api';

class SecuredBaseApi {
  public securedAxios: AxiosInstance = securedApi;
  public bindQueryParams: Function = (obj: Object) => {
    let str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  };
}

export default SecuredBaseApi;
