
import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IKeyValue } from '../interfaces/generic.interface';
export class ApiServiceHttpParameterCodec implements HttpParameterCodec {
    public readonly encodeKey = (key: string | number | boolean) => encodeURIComponent(key);
    public readonly encodeValue = (key: string | number | boolean) => encodeURIComponent(key);
    public readonly decodeKey = (key: string) => decodeURIComponent(key);
    public readonly decodeValue = (key: string) => decodeURIComponent(key);
}

export abstract class DemoAppRestApiService {
    protected appServiceUrl = `${environment.serviceUrl}`;
    protected baseUrl: string = '';
    protected urlRoot: string = `${environment.serviceUrl}`;

    constructor(protected httpClient: HttpClient) {
    }

    public getItem(params: IKeyValue = {}, url: string = ''): Observable<any> {
        return this.httpClient.get(`${this.getRequestUrl(url)}`, { params: this.encodeGetParams(params) });
    }

    protected getUrlBase(): string {
        return this.baseUrl === '' ? `${this.urlRoot}` : `${this.urlRoot}/${this.baseUrl}`;
    }

    protected getRequestUrl(url: string): string {
        return url === '' ? `${this.getUrlBase()}` : `${this.getUrlBase()}/${url}`;
    }

    private encodeGetParams = (params: IKeyValue) =>
        Object.getOwnPropertyNames(params)
            .reduce(
                (acc, paramKey) => acc.set(paramKey, params[paramKey]),
                new HttpParams({ encoder: new ApiServiceHttpParameterCodec() }),
            );
}
