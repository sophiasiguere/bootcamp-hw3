import { Request, Response } from 'express';
import { VariantService } from '../services/VariantService';

const variantService = new VariantService();

export class VariantController {
    async getAllVariants(req: Request, res: Response) {
        try {
            const variants = await variantService.getAllVariants();
            res.status(200).json(variants);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: "Failed to fetch variants", error: err.message });
        }
    }

    async getVariantById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid variant ID" });
        }
        try {
            const variant = await variantService.getVariantById(id);
            if (!variant) {
                return res.status(404).json({ message: "Variant not found" });
            }
            res.status(200).json(variant);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: "Failed to fetch variant", error: err.message });
        }
    }

    async createVariant(req: Request, res: Response) {
        const data = req.body;
        try {
            const newVariant = await variantService.createVariant(data);
            res.status(201).json(newVariant);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to create variant", error: err.message });
        }
    }

    async updateVariant(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid variant ID" });
        }
        try {
            const updatedVariant = await variantService.updateVariant(id, data);
            res.status(200).json(updatedVariant);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to update variant", error: err.message });
        }
    }

    async deleteVariant(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid variant ID" });
        }
        try {
            const deletedVariant = await variantService.deleteVariant(id);
            res.status(200).json({ message: "Variant deleted successfully", variant: deletedVariant });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to delete variant", error: err.message });
        }
    }
}
