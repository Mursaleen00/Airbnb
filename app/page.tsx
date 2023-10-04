import getCurrentUser from "./Actions/getCurrentUser";
import getListing from "./Actions/getListings";
import ClientOnly from "./Components/ClientOnly";
import Container from "./Components/Container";
import EmptyState from "./Components/EmptyState";
import ListingCard from "./Components/listings/ListingCard";

export default async function Home() {
  const listings = await getListing();
  const currentUser = await getCurrentUser();

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
        pt-10 
        grid 
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        ">
          {listings.map((listings) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listings.id}
                data={listings}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
