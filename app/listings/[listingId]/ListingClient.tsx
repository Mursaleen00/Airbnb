import { Reservation } from '@prisma/client'

import { SafeListing, safeUser } from '@/app/Types';
import { useMemo } from 'react';
import { categories } from '@/app/Components/Navbar/Categories';
import Container from '@/app/Components/Container';



interface ListingClientProps {
    reservation?: Reservation[];
    listing: SafeListing & {
        user: safeUser,
    };
    currentUser?: safeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
}) => {
    const category = useMemo(() => {
        return categories.find((item) =>
            item.label == listing.category);
    }, [listing.category])



    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    
                </div>
            </div>
        </Container>
    );
}

export default ListingClient