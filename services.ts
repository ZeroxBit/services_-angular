import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export enum MethodType {
    Get  = 'GET',
    Post = 'POST',
    Put  = 'PUT',
    Delete = 'DELETE'
}

@Injectable({
    providedIn: 'root'
})
export class ServicesRequest {
    
    TAG: string;

    protected url: string;
    protected token: string;
    protected headers: HttpHeaders;
    
    constructor(private http: HttpClient) {
        this.url = 'you_url_api_services';
        this.TAG = 'ServicesRequest';
    }

    // realiza la peticion al api y retorna el resultado !!
    private conexion(link: string, method: MethodType, body?: object): Observable<Object> {
        this.token = this.tokenService.getToken();
        this.headers = new HttpHeaders({ 'Authorization': `Basic ${btoa(this.token)}` });
        const url = this.url + link;
        const headers = this.headers;

        switch (method) {
            case MethodType.Get:
                return this.http.get(url, { headers });
            case MethodType.Post:
                return this.http.post(url, body, { headers });
            case MethodType.Put:
                return this.http.put(url, body, { headers });
            case MethodType.Delete:
                return this.http.delete(url, { headers });
            default:
                console.log('Error en los métodos, revisar!', this.TAG);
                break;
        }
    }


    getTask(): Observable<Object> {
        return this.conexion('/task', MethodType.Get);
    }

    postTask(id: string, task: any): Observable<Object> {
        return return this.conexion(`/task/${id}`, MethodType.Post, task);
    }

}
