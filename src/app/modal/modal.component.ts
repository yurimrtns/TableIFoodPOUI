import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Item } from '../DTO/Item';

import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  providers: [ServiceService],
})
export class ModalComponent implements OnInit {
  empresas: any[] = [];
  segmentos: any[] = [];
  categorias: any[] = [];
  @Output() dadosSelecionados = new EventEmitter();
  @Output() dadosEditados = new EventEmitter();
  @ViewChild('modal') modal: PoModalComponent;
  check = false;

  dados: Item;
  constructor(private service: ServiceService) {
    this.dados = new Item();
  }

  ngOnInit() {
    this.empresas = this.service.getEmpresas();
    this.segmentos = this.service.getSegmentos();
    this.categorias = this.service.getCategorias();
  }

  Salvar() {
    if (this.check === false) {
      this.dadosSelecionados.emit(this.dados);
      this.dados.value++;
    } else {
      this.dadosEditados.emit(this.dados);
      this.check = false;
    }
    this.modal.close();
  }

  isDisabled() {
    return (
      this.dados['empresasAtivo'] == '' ||
      this.dados['idLoja'] == null ||
      this.dados['segmentosAtivo'] == '' ||
      this.dados['categoriasAtivo'] == ''
    );
  }

  EditarTabela(item) {
    this.modal.open();
    this.dados['empresasAtivo'] = item['empresa'];
    this.dados['segmentosAtivo'] = item['segmento'];
    this.dados['categoriasAtivo'] = item['categoria'];
    this.dados['checkbox'] = item['status'];
    this.dados['idLoja'] = item['id'];
    this.dados['value'] = item['value'];
    this.check = true;
  }
}
