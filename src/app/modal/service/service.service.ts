import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { Item } from 'src/app/DTO/Item';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  empresas: Array<any> = [
    { label: 'empresa 1', value: 'empresa 1' },
    { label: 'empresa 2', value: 'empresa 2' },
    { label: 'empresa 3', value: 'empresa 3' },
    { label: 'empresa 4', value: 'empresa 4' },
    { label: 'empresa 5', value: 'empresa 5' },
  ];

  segmentos: Array<any> = [
    { label: 'segmento 1', value: 'segmento 1' },
    { label: 'segmento 2', value: 'segmento 2' },
    { label: 'segmento 3', value: 'segmento 3' },
    { label: 'segmento 4', value: 'segmento 4' },
    { label: 'segmento 5', value: 'segmento 5' },
  ];

  categorias: Array<any> = [
    { label: 'categoria 1', value: 'categoria 1' },
    { label: 'categoria 2', value: 'categoria 2' },
    { label: 'categoria 3', value: 'categoria 3' },
  ];

  getEmpresas() {
    return this.empresas;
  }
  getSegmentos() {
    return this.segmentos;
  }
  getCategorias() {
    return this.categorias;
  }
}
