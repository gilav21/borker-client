import { IPeeAndPoo } from './../models/IPeeAndPoo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeeAndPooService {

  constructor(private env: EnviromentService, private http: HttpClient) { }

  getPetPeeAndPoo(petId: string, sortBy: string = "createdAt", direction: number = -1) {
    let params = new HttpParams();
    if (sortBy) {
      params = params.append('sortBy', sortBy);
    }
    if (direction) {
      params = params.append('direction', direction);
    }
    return this.http.get(this.env.PEE_AND_POO_API + petId, {params});
  }

  createPeeAndPoo(peeAndPoo: IPeeAndPoo) {
    return this.http.post(this.env.CREATE_PEE_AND_POO, peeAndPoo);
  }
}
