export interface ProductAddUpdateDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  provinceCityId: number;
  districtId: number;
  imageUrl: string;
}
