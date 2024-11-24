import { prisma } from "../lib/prismaClient";

export class VariantService {
    async getAllVariants() {
        return prisma.variant.findMany();
    }

    async getVariantById(id: number) {
        return prisma.variant.findUnique({
            where: { id },
        });
    }

    async createVariant(data: any) {
        return prisma.variant.create({
            data,
        });
    }

    async updateVariant(id: number, data: any) {
        return prisma.variant.update({
            where: { id },
            data,
        });
    }

    async deleteVariant(id: number) {
        return prisma.variant.delete({
            where: { id },
        });
    }
}
