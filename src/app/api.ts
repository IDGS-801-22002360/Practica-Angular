import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DatosApi {
    //* Define aqui la estructura de los datos que esperas recibir de la API
    message: string;
    timestamp: string;
}

@Injectable({
    providedIn: 'root',
})
export class Api {

    private apiurl = 'http://localhost:3000';

    // primero se inyecta el HttpClient, esto para poder hacer las peticiones a la Api
    constructor(private http: HttpClient) { }

    /*
    *  Despues, se hace el metodo para obtener los datos de la Api
    */
    getDatos(): Observable<DatosApi> {
        //* le indicamos el metodo get del HttpClient, y le pasamos la url de la Api
        return this.http.get<DatosApi>(this.apiurl);
    }
}
