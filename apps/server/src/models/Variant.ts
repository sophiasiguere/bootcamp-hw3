import { Product } from "./Product";
export type Variant = {
    id: number; 
    name: string; 
    description?: string; 
    image?: string; 
    sku: string; 
    price: number; 
    stock: number; 
    productId: number; 
    product?: Product; 
    createdAt: Date; 
    updatedAt: Date; 
};
