'use client';
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from "next/navigation";


import { safeUser } from '@/app/Types';
import useCountry from '@/app/Hooks/useCountry';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLable?: string;
    actionId?: string;
    currentUser?: safeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    actionId = "",
    actionLable,
    currentUser,
    disabled
}) => {
    const router = useRouter();
    const { getByValue } = useCountry();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totlePrice;
        }

        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

    return (
        <div>ListingCard</div>
    )
}

export default ListingCard