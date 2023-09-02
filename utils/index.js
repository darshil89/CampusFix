import prisma from "../prisma/index.js"

export const connectToDb = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        return new Error(error.message);
    }
}