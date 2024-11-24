import express, { Express } from "express";
import { VariantController } from "../../controllers/variantController";

export function variantsRoute(app: Express): void {
    const router = express.Router();
    const variantController = new VariantController();

    app.use('/api/variants', router);

    router.get('/', (req, res) => variantController.getAllVariants(req, res)); // Get all variants
    router.get('/:id', (req, res) => variantController.getVariantById(req, res)); // Get variant by ID
    router.post('/', (req, res) => variantController.createVariant(req, res)); // Create a variant
    router.put('/:id', (req, res) => variantController.updateVariant(req, res)); // Update a variant
    router.delete('/:id', (req, res) => variantController.deleteVariant(req, res)); // Delete a variant
}
