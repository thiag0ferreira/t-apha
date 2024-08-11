import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {};  // Armazena os dados do novo produto
  selectedProduct: Product | null = null;  // Armazena o produto que está sendo editado
  showAddForm = false;
  showEditForm = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Carregar todos os produtos
  loadProducts() {
    this.productsService.getAllProducts().subscribe(response => {
      this.products = response;
    }, error => {
      console.error('Failed to fetch products', error);
    });
  }

  // Adicionar um novo produto
  onAddProduct() {
    this.productsService.addProduct(this.newProduct).subscribe(response => {
      console.log('Produto adicionado com sucesso', response);
      this.newProduct = {};  // Limpar o formulário de adição
      this.showAddForm = false;
      this.loadProducts();  // Recarregar a lista de produtos
    }, error => {
      console.error('Erro ao adicionar produto', error);
    });
  }

  // Selecionar um produto para edição
  onEditProduct(product: Product) {
    this.selectedProduct = { ...product };  // Cria uma cópia do produto para edição
    this.showEditForm = true;
    this.showAddForm = false;
  }

  // Atualizar o produto selecionado
  onUpdateProduct() {
    if (this.selectedProduct) {
      this.productsService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(response => {
        console.log('Produto atualizado com sucesso', response);
        this.selectedProduct = null;  // Limpar o formulário de edição
        this.showEditForm = false;
        this.loadProducts();  // Recarregar a lista de produtos
      }, error => {
        console.error('Erro ao atualizar produto', error);
      });
    }
  }

  // Deletar um produto
  onDeleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(response => {
      console.log('Produto deletado com sucesso', response);
      this.loadProducts();  // Recarregar a lista de produtos
    }, error => {
      console.error('Erro ao deletar produto', error);
    });
  }
}
