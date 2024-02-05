import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Produto } from '../DTO/Produto';
import { EndPoint } from "./EndPoint";
import { EmpresasService } from './service/empresas.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  providers: [EmpresasService]
})
export class ModalComponent implements OnInit {
  empresas: any[] = [];
  segmentos: any[] = [];
  categorias: any[] = [];
  @Output() dadosSelecionados = new EventEmitter();
  @Output() dadosEditados = new EventEmitter();
  @ViewChild('modal') modal: PoModalComponent;
  check = false;
  checkboxOn = true;

  dados: Produto;
  constructor(private service: EmpresasService) {
    this.dados = new Produto();
  }
  //Ao iniciar a página as informações do banco de dados são recebidas e mapeadas para o tipo certo
  ngOnInit() {
    this.service.getAll(EndPoint.Empresas).subscribe(res => {
      this.empresas = res.items.map(x => {
        return { label: x.nome, value: x.id };
      })
    });
    this.service.getAll(EndPoint.Segmentos).subscribe(res => {
      this.segmentos = res.items.map(x => {
        return { label: x.nome, value: x.id };
      })
    });
    this.service.getAll(EndPoint.Categorias).subscribe(res => {
      this.categorias = res.items.map(x => {
        return { label: x.nome, value: x.id };
      })
    });
  }

  //verifica se os dados inseridos no modal são novos ou não e os envia para a função onSalvar ou onEditar 
  Salvar() {
    if (this.check === false) {
      this.dadosSelecionados.emit(this.dados);
      // this.dados.value++;
    } else {
      this.dadosEditados.emit(this.dados);
      this.check = false;
    }
    this.modal.close();
  }

//utilizada para bloquear o botão caso os campos não tenham sido preenchido
  isDisabled() {
    return (
      this.dados['idEmpresa'] == null ||
      this.dados['idLojaIFood'] == null ||
      this.dados['idSegmento'] == null ||
      this.dados['idCategoria'] == null
    );
  }

  //recebe o produto a ser editado e insere suas infos no form
  EditarTabela(produto) {
    this.checkboxOn = false;
    this.check = true;
    this.modal.open();
    this.dados['idEmpresa'] = produto.idEmpresa;
    this.dados['idSegmento'] = produto.idSegmento;
    this.dados['idCategoria'] = produto.idCategoria;
    this.dados['ativo'] = produto.ativo;
    this.dados['idLojaIFood'] = produto.idLojaIFood;
    this.dados['id'] = produto.id;
    
  }
  AtivarCheckbox(){
    this.checkboxOn = true;
  }
}
