import express,{ Express } from "express";
import { prisma } from "../../lib/prismaClient";
import { ProductService } from "../../services/ProductService";
import { ProductController } from "../../controllers/productController";

export function productsRoute(app: Express): void {
    const router = express.Router();
    const productController = new ProductController();

    app.use('/api/products', router);

    router.get('/', (req, res) => productController.getAllProducts(req, res)); 
    router.get('/:id', (req, res) => productController.getProductById(req, res)); 
    router.post('/', (req, res) => productController.createProduct(req, res)); 
    router.put('/:id', (req, res) => productController.updateProduct(req, res)); 
    router.delete('/:id', (req, res) => productController.deleteProduct(req, res)); 
}