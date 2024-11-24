import { Variant } from "./Variant";
import { Collection } from "./Collection";
export type Product = {
    id: number; 
    name: string; 
    description?: string; 
    image?: string;
    variants?: Variant[]; 
    collections?: Collection[]; 
    createdAt: Date;
    updatedAt: Date; 
};
