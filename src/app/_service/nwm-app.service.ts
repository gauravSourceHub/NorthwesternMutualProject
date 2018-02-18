import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { UserInformation } from '../_models/user-information';

@Injectable()
export class NwmAppService {

  private httpOptions = { withCredentials: !environment.production };

  constructor(private http: HttpClient) { }

  getUserInformation(): Observable<UserInformation[]> {
    const url = `${environment.userApiUrl}users`;

    return this.http.get<UserInformation[]>(url, this.httpOptions)
      .map(r => r)
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }
}
