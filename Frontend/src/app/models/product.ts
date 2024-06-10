import { Category } from './category';
import { District } from './district';
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  district: District;
  imageUrl: string;
}
