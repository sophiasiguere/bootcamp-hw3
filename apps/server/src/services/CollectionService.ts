import { prisma } from "../lib/prismaClient";

export class CollectionService {
    async getAllCollections() {
        return prisma.collection.findMany();
    }

    async getCollectionById(id: number) {
        return prisma.collection.findUnique({
            where: { id },
        });
    }

    async createCollection(data: any) {
        return prisma.collection.create({
            data,
        });
    }

    async updateCollection(id: number, data: any) {
        return prisma.collection.update({
            where: { id },
            data,
        });
    }

    async deleteCollection(id: number) {
        return prisma.collection.delete({
            where: { id },
        });
    }
}
