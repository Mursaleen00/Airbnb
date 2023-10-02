import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { safeUser } from "../Types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: safeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const route = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])


    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        try {

            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }
            await request();
            route.refresh();
            toast.success("Success")
        } catch {
            toast.error('Something went wrong')
        }

    }, [currentUser, hasFavorited, listingId, loginModal, route])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;