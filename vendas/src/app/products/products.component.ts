import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];  // Lista de produtos
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };  // Novo produto a ser adicionado
  selectedProduct: Product | null = null;  // Produto a ser editado
  showAddForm: boolean = false;
  showProductsList: boolean = false;  // Controla a visibilidade da lista de produtos

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // Não carregue produtos no início, o carregamento ocorrerá ao clicar no botão
  }

  // Alternar a visibilidade da lista de produtos
  toggleProductsList() {
    this.showProductsList = !this.showProductsList;
    if (this.showProductsList) {
      this.loadProducts();  // Carrega os produtos quando a lista é mostrada
    }
  }

  // Carregar todos os produtos da API
  loadProducts() {
    this.productsService.getAllProducts().subscribe(
      (response) => {
        if (response && response.data && response.data.products) {
          this.products = response.data.products;  // Acesse os produtos corretamente
        }
      },
      (error) => {
        console.error('Erro ao carregar produtos', error);
      }
    );
  }



  // Método para adicionar um produto usando a API
  onAddProduct() {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.price && this.newProduct.stock) {
      this.productsService.addProduct(this.newProduct).subscribe(
        (response) => {
          console.log('Produto adicionado com sucesso', response);
          this.loadProducts();  // Recarregar a lista de produtos
          this.newProduct = {};  // Limpar o formulário
          this.showAddForm = false;  // Ocultar o formulário de adição
        },
        (error) => {
          console.error('Erro ao adicionar produto', error);
        }
      );
    }
  }

  // Método para selecionar um produto para edição
  onEditProduct(product: Product) {
    this.selectedProduct = { ...product };
  }

  // Método para atualizar um produto existente usando a API
  onUpdateProduct() {
    if (this.selectedProduct) {
      // Crie uma cópia do objeto sem a propriedade 'id'
      const { id, ...updateData } = this.selectedProduct;

      this.productsService.updateProduct(id, updateData).subscribe(
        (response) => {
          console.log('Produto atualizado com sucesso', response);
          this.loadProducts();  // Recarrega a lista de produtos para mostrar a atualização
          this.selectedProduct = null;  // Limpa a seleção e oculta o formulário de edição
        },
        (error) => {
          console.error('Erro ao atualizar produto', error);
        }
      );
    }
  }





  // Método para deletar um produto usando a API
  onDeleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Produto deletado com sucesso', response);
        this.loadProducts();  // Recarregar a lista de produtos
      },
      (error) => {
        console.error('Erro ao deletar produto', error);
      }
    );
  }

  onCancelEdit() {
    this.selectedProduct = null;
  }
}
