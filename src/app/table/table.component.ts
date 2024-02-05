import { Component, ViewChild } from '@angular/core';
import {
  PoTableAction,
  PoTableColumn,
  PoTableColumnLabel,
  PoTableComponent,
} from '@po-ui/ng-components';
import { ModalComponent } from '../modal/modal.component';
import { ExpProdIFoodService } from '../modal/service/exp-prod-ifood.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [ExpProdIFoodService],
})
export class TableComponent {
  @ViewChild('tabela', { static: true }) poTable: PoTableComponent;
  @ViewChild(ModalComponent) editor: ModalComponent;
  dadosEditados: any;
 
 //Definindo cor do status de ativo ou inativo do produto na tabela
  CorAtivo: Array<PoTableColumnLabel> = [
    {
      value: 'S',
      color: 'color-10',
      textColor: 'white',
      label: 'Ativo',
    },
    {
      value: 'N',
      color: 'color-07',
      textColor: 'white',
      label: 'Inativo',
    },
  ];

//Colunas da tabela de produtos
  columns: Array<PoTableColumn> = [
    // {
    //   property: 'idEmpresa',
    //   label: 'Cód. Empresa',
    // },
    {
      property: 'empresa',
      label: 'Empresa',
    },
    {
      property: 'idLojaIFood',
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
      property: 'ativo',
      label: 'Status',
      type: 'label',
      color: 'color',
      labels: this.CorAtivo,
    },
  ];

  // Ações para Editar/Ativar/Desativar um produto
  acaoEditar = {
    label: 'Editar',
    action: this.Editar.bind(this),
    icon: 'po-icon-edit',
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
    // this.acaoRemover
  ];
//-------------------------------------------

  produtos: any[] = [];

  constructor(private service: ExpProdIFoodService) {}
  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      this.produtos = res.items.map((x) => {
        return {
          id: x.id,
          empresa: x.empresa.nome,
          idEmpresa: x.idEmpresa,
          idLojaIFood: x.idLojaIFood,
          segmento: x.segmento.nome,
          idSegmento: x.idSegmento,
          categoria: x.categoria.nome,
          idCategoria: x.idCategoria,
          ativo: x.ativo,
        };
      });
    });
  }

  //-------------------------------------  ADICIONAR PRODUTO  --------------------------------------------------

  //Função responsável por receber as informações do form preenchido, validar e adicionar a tabela
  onSalvar(evento) {
    if (evento['ativo'] == undefined || evento['ativo'] == false)
      evento['ativo'] = 'N';
    if (evento['ativo'] == true) evento['ativo'] = 'S';
    if (this.produtos.length > 0) {
      let conta = 0;
      this.produtos.forEach((i) => {
        let compara = i.idLojaIFood !== evento['idLojaIFood'];
        if (conta <= this.produtos.length && compara) {
          conta++;
          if (conta == this.produtos.length) {
            this.preencherProduto(evento);
          }
        } else {
          alert('Loja já adicionada a lista da tabela!');
        }
      });
    } else {
      this.preencherProduto(evento);
    }
  }

  //Auxiliar a função onSalvar aqui a requisição Post é enviada e os são adicionados no 
  //banco de dados, além do produto ser adicionado a tabela
  preencherProduto(evento) {
    this.service.SalvarProduto(evento).subscribe((res) =>
      this.produtos.push({
        id: res.id,
        idEmpresa: res.idEmpresa,
        empresa: res.empresa.nome,
        idLojaIFood: res.idLojaIFood,
        idSegmento: res.idSegmento,
        segmento: res.segmento.nome,
        idCategoria: res.idCategoria,
        categoria: res.categoria.nome,
        ativo: res.ativo,
      })
    );
  }

  //---------------------------------------  EDITAR PRODUTO -------------------------------------------

  Editar(produto) {
    console.log(produto)
    this.editor.EditarTabela(produto);
  }


  onEditar(evento) {
    let idget = this.produtos.find((e) => e.id == evento.id); //localiza o produto na tabela pelo id
    let idCheck = this.produtos.find(
      (e) => e.idLojaIFood == evento.idLojaIFood); //Verifica se há o mesmo idLojaIFood na tabela
    if (idCheck == undefined) { //caso o idLojaIFood não seja igual a um existente as infos do prod serão atualizadas
      if (evento['ativo'] == undefined || evento['ativo'] == false)
        evento['ativo'] = 'N';
      if (evento['ativo'] == true) evento['ativo'] = 'S';
      this.service.AtualizarProduto(evento).subscribe((res) => {
        idget['empresa'] = res.empresa.nome,
          idget['idLojaIFood'] = res['idLojaIFood'],
          idget['segmento'] = res.segmento.nome,
          idget['categoria'] = res.categoria.nome,
          idget['ativo'] = res['ativo'];
      });
    } else {
       //caso o idLojaIFood exista, mas seja do produto sendo editado as infos do prod serão atualizadas
      if (idCheck.idLojaIFood == idget['idLojaIFood']) {
        if (evento['ativo'] == undefined || evento['ativo'] == false)
          evento['ativo'] = 'N';
        if (evento['ativo'] == true) evento['ativo'] = 'S';
        this.service.AtualizarProduto(evento).subscribe((res) => {
          idget['empresa'] = res.empresa.nome,
          idget['idLojaIFood'] = res.idLojaIFood,
          idget['segmento'] = res.segmento.nome,
          idget['categoria'] = res.categoria.nome,
          idget['ativo'] = res['ativo'];
        });
      } else {//caso contrário o usuário será notificado com um erro!
        alert('id já inserido na tabela!');
      }
    }
  }

  Ativar(produto) {
    produto.ativo = 'S';
    this.service.AtualizarProduto(produto).subscribe(res => {
      produto.ativo = 'S'
    });
  }
  Desativar(produto) {
    produto.ativo = 'N';
    this.service.AtualizarProduto(produto).subscribe(produto);
  }
  isAtivo(produto) {
    if (produto.ativo == 'S') {
      return true;
    }
    this.acaoDesativar.disabled == true;
    return false;
  }
  isInativo(produto) {
    if (produto.ativo == 'N') {
      return true;
    }
    this.acaoAtivar.disabled == true;
    return false;
  }

  // acaoRemover = {
  //   label: 'Remover',
  //   action: this.Remover.bind(this),
  //   icon: 'po-icon-delete',
  //   type: 'danger',
  // };

  // Remover(produto) {
  //   this.dialog.confirm({
  //     literals: { cancel: 'Cancelar', confirm: 'Confirmar' },
  //     title: 'Excluir Empresa',
  //     message: 'Deseja Realmente excluir a linha da tabela?',
  //     confirm: () => this.removeProduto(produto),
  //   });
  // }

  // removeProduto(produto) {
  //   let localiza = this.produtos.findIndex((e) => e.value == produto.value);
  //   this.produtos.splice(localiza, 1);
  // }
}
