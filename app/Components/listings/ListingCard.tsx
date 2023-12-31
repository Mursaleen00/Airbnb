'use client';


import { Listing, Reservation, User } from '@prisma/client'
import { useRouter } from "next/navigation";


import { SafeListing, safeUser } from '@/app/Types';
import useCountry from '@/app/Hooks/useCountry';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
    data: SafeListing;
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
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className='col-span-1 cursor-pointer group'
        >
            <div
                className='
                flex 
                flex-col 
                gap-2 
                w-full'
            >
                <div
                    className='
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl'
                >
                    <Image
                        fill
                        alt='Listing'
                        src={data.imageSrc}
                        className='object-cover 
                        h-full 
                        w-full 
                        group-hover:scale-110 
                        transition'
                    />
                    <div
                        className='absolute top-3 right-3'
                    >
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className='font-semibold text-lg'>
                    {location?.region}, {location?.label}
                </div>
                <div className='font-light text-neutral-500'>
                    {reservationDate || data.category}
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <div className='font-semibold'>
                        ${price}
                    </div>
                    {!reservation && (
                        <div className='font-light'>night</div>
                    )}
                </div>
                {onAction && actionLable && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLable}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}


export default ListingCard