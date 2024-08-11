import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://interview.t-alpha.com.br/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obter os headers de autenticação
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Obter todos os produtos
  getAllProducts(): Observable<any> {  // Deixe como `any` para facilitar o acesso aos dados
    return this.http.get<any>(`${this.baseUrl}/products/get-all-products`, { headers: this.getAuthHeaders() });
  }


  // Adicionar um novo produto
  addProduct(productData: Partial<Product>): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/create-product`, productData, { headers: this.getAuthHeaders() });
  }

  // Atualizar um produto existente
  updateProduct(id: number, productData: Partial<Product>): Observable<any> {
    return this.http.patch(`${this.baseUrl}/products/update-product/${id}`, productData, { headers: this.getAuthHeaders() });
  }

  // Deletar um produto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/delete-product/${id}`, { headers: this.getAuthHeaders() });
  }
}
