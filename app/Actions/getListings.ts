import prisma from '@/app/libs/prismadb'


export default async function getListing() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListing = listings.map((listings) => ({
            ...listings,
            creatAt: listings.createdAt.toISOString(),
        }));

        return safeListing
    }
    catch (error: any) {
        throw new Error(error)
    }
}