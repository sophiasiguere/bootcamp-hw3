import {Request,Response} from 'express'
import { ProductService } from '../services/ProductService'

const productService = new ProductService()

export class ProductController {
    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            const err = error as Error; 
            res.status(500).json({ message: "Failed to fetch products", error: err.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        try {
            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: "Failed to fetch product", error: err.message });
        }
    }

    async createProduct(req: Request, res: Response) {
        const data = req.body;
        try {
            const newProduct = await productService.createProduct(data);
            res.status(201).json(newProduct);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to create product", error: err.message });
        }
    }

    async updateProduct(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        try {
            const updatedProduct = await productService.updateProduct(id, data);
            res.status(200).json(updatedProduct);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to update product", error: err.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        try {
            const deletedProduct = await productService.deleteProduct(id);
            res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
        } catch (error) {
            const err = error as Error; 
            res.status(400).json({ message: "Failed to delete product", error: err.message });
        }
    }
}