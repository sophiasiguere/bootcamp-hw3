import express, { Express } from "express";
import { CollectionController } from "../../controllers/collectionController";

export function collectionsRoute(app: Express): void {
    const router = express.Router();
    const collectionController = new CollectionController();

    app.use('/api/collections', router);

    router.get('/', (req, res) => collectionController.getAllCollections(req, res)); // Get all collections
    router.get('/:id', (req, res) => collectionController.getCollectionById(req, res)); // Get collection by ID
    router.post('/', (req, res) => collectionController.createCollection(req, res)); // Create a collection
    router.put('/:id', (req, res) => collectionController.updateCollection(req, res)); // Update a collection
    router.delete('/:id', (req, res) => collectionController.deleteCollection(req, res)); // Delete a collection
}
