import { Product } from "@prisma/client";

export interface ICartProduct extends Product {
  quantity: number;
}

export interface ICart {
  items: ICartProduct[] | [];
}
