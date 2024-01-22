import { Component, ViewChild } from '@angular/core';
import {
  PoDialogService,
  PoTableAction,
  PoTableColumn,
  PoTableColumnLabel,
  PoTableComponent,
} from '@po-ui/ng-components';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @ViewChild('tabela', { static: true }) poTable: PoTableComponent;
  @ViewChild(ModalComponent) editor: ModalComponent;
  dadosEditados: any;
  CorAtivo: Array<PoTableColumnLabel> = [
    {
      value: 'true',
      color: 'color-10',
      textColor: 'white',
      label: 'Ativo',
    },
    {
      value: 'false',
      color: 'color-07',
      textColor: 'white',
      label: 'Inativo',
    },
  ];
  columns: Array<PoTableColumn> = [
    {
      property: 'empresa',
      label: 'Empresa',
    },
    {
      property: 'id',
      label: 'ID Loja IFood',
    },
    {
      property: 'segmento',
      label: 'Segmento',
    },
    {
      property: 'categoria',
      label: 'Categoria',
    },
    {
      property: 'status',
      label: 'Status',
      type: 'label',
      color: 'color',
      labels: this.CorAtivo,
    },
  ];
  acaoEditar = {
    label: 'Editar',
    action: this.Editar.bind(this),
    icon: 'po-icon-edit',
  };

  acaoRemover = {
    label: 'Remover',
    action: this.Remover.bind(this),
    icon: 'po-icon-delete',
    type: 'danger',
  };
  acaoAtivar = {
    label: 'Ativar',
    action: this.Ativar.bind(this),
    icon: 'po-icon-plus',
    disabled: this.isAtivo.bind(this),
  };
  acaoDesativar = {
    label: 'Desativar',
    action: this.Desativar.bind(this),
    icon: 'po-icon-minus',
    disabled: this.isInativo.bind(this),
  };
  acoes: PoTableAction[] = [
    this.acaoAtivar,
    this.acaoDesativar,
    this.acaoEditar,
    this.acaoRemover,
  ];
  itens: any[] = [];
  idItem: number = 0;
  checkboxString: string;

  constructor(private dialog: PoDialogService) {}

  onSalvar(evento) {
    if (evento['checkbox'] == undefined) evento['checkbox'] = false;
    this.checkboxString = evento['checkbox'].toString();
    if (this.itens.length > 0) {
      let conta = 0;
      this.itens.forEach((i) => {
        let compara = i.id !== evento['idLoja'];
        if (conta <= this.itens.length && compara) {
          conta++;
          if (conta == this.itens.length) {
            this.preencherItem(evento);
            this.idItem++;
          }
        } else {
          alert('Loja já adicionada a lista da tabela!');
        }
      });
    } else {
      this.preencherItem(evento);
      this.idItem++;
    }
  }

  preencherItem(evento) {
    return this.itens.push({
      empresa: evento['empresasAtivo'],
      id: evento['idLoja'],
      segmento: evento['segmentosAtivo'],
      categoria: evento['categoriasAtivo'],
      status: this.checkboxString,
      value: this.idItem,
    });
  }
  Editar(item) {
    this.editor.EditarTabela(item);
  }

  onEditar(evento) {
    // this.itens.forEach((i) => {
    //     let idCheck = i.value != evento.idLoja
    //     if (i.value == evento.value && idCheck) {
    //       i.empresa = evento.empresasAtivo;
    //       i.segmento = evento.segmentosAtivo;
    //       i.id = evento.idLoja;
    //       i.status = evento.checkbox;
    //       i.categoria = evento.categoriasAtivo;
    //     }
    //     else{
    //       alert("ID já inserido na tabela!")

    //     }

    // });
    let idCheck = this.itens.find((e) => e.id == evento.idLoja);
    let localiza = this.itens.findIndex((e) => e.value == evento.value); //idx do item
    let idxItem = this.itens[localiza];
    if (idCheck == undefined) {
      idxItem['empresa'] = evento.empresasAtivo;
      idxItem['segmento'] = evento.segmentosAtivo;
      idxItem['id'] = evento.idLoja;
      idxItem['status'] = evento.checkbox;
      idxItem['categoria'] = evento.categoriasAtivo;
    } else {
      if (idCheck.id == idxItem['id']) {
        idxItem['empresa'] = evento.empresasAtivo;
        idxItem['segmento'] = evento.segmentosAtivo;
        idxItem['idLoja'] = evento.idLoja;
        idxItem['status'] = evento.checkbox;
        idxItem['categoria'] = evento.categoriasAtivo;
      } else {
        alert('id já inserido na tabela!');
      }
    } //id na lista
  }

  Remover(item) {
    this.dialog.confirm({
      literals: { cancel: 'Cancelar', confirm: 'Confirmar' },
      title: 'Excluir Empresa',
      message: 'Deseja Realmente excluir a linha da tabela?',
      confirm: () => this.removeItem(item),
    });
  }

  removeItem(item) {
    let localiza = this.itens.findIndex((e) => e.value == item.value);
    this.itens.splice(localiza, 1);
  }

  Ativar(item) {
    item.status = 'true';
  }
  Desativar(item) {
    item.status = 'false';
  }
  isAtivo(item) {
    if (item.status == 'true') {
      return true;
    }
    this.acaoDesativar.disabled == true;
    return false;
  }
  isInativo(item) {
    if (item.status == 'false') {
      return true;
    }
    this.acaoAtivar.disabled == true;
    return false;
  }
}
