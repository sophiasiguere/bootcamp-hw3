import { prisma } from "../lib/prismaClient";

export class ProductService {
    async getAllProducts() {
        return prisma.product.findMany();
    }

    async getProductById(id: number) {
        return prisma.product.findUnique({ where: { id } });
    }

    async createProduct(data: any) {
        return prisma.product.create({
            data,
        });
    }

    async updateProduct(id: number, data: any) {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    async deleteProduct(id: number) {
        return prisma.product.delete({
            where: { id },
        });
    }
}