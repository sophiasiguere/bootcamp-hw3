import { Request, Response } from 'express';
import { CollectionService } from '../services/CollectionService.ts';

const collectionService = new CollectionService();

export class CollectionController {
    async getAllCollections(req: Request, res: Response) {
        try {
            const collections = await collectionService.getAllCollections();
            res.status(200).json(collections);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: "Failed to fetch collections", error: err.message });
        }
    }

    async getCollectionById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid collection ID" });
        }
        try {
            const collection = await collectionService.getCollectionById(id);
            if (!collection) {
                return res.status(404).json({ message: "Collection not found" });
            }
            res.status(200).json(collection);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: "Failed to fetch collection", error: err.message });
        }
    }

    async createCollection(req: Request, res: Response) {
        const data = req.body;
        try {
            const newCollection = await collectionService.createCollection(data);
            res.status(201).json(newCollection);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to create collection", error: err.message });
        }
    }

    async updateCollection(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid collection ID" });
        }
        try {
            const updatedCollection = await collectionService.updateCollection(id, data);
            res.status(200).json(updatedCollection);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to update collection", error: err.message });
        }
    }

    async deleteCollection(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid collection ID" });
        }
        try {
            const deletedCollection = await collectionService.deleteCollection(id);
            res.status(200).json({ message: "Collection deleted successfully", collection: deletedCollection });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: "Failed to delete collection", error: err.message });
        }
    }
}
