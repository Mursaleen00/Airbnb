import getCurrentUser from "@/app/Actions/getCurrentUser";
import getListiogById from "@/app/Actions/getListingById";
import ClientOnly from "@/app/Components/ClientOnly";
import EmptyState from "@/app/Components/EmptyState";
import ListingClient from "./ListingClient";
interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListiogById(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            {/* <ListingClient
                listing={}
                currentUser={currentUser}
            /> */}
        </ClientOnly>
    )
}

export default ListingPage