'use client';

import useRentModal from "@/app/Hooks/useRectModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import CounterySelect from "../Inputs/CounterySelect";
import Map from "../Map";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {

    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCout: 1,
            roomCount: 1,
            bathRoomCout: 1,
            imageSrc: '',
            price: 1,
            title: '',
            discription: ''
        }
    })

    const category = watch('category');
    const location = watch('location');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLable = useMemo(() => {
        if (step == STEPS.PRICE) {
            return "Create";
        }

        return 'Next'
    }, [step])

    const secondaryActionLable = useMemo(() => {
        if (step == STEPS.CATEGORY) {
            return "undefined"
        }

        return "Back"
    }, [step])

    let bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />
            <div
                className="grid 
            grid-cols-1
            md:grid-cols-2
            gap-3
            mac-h-[50vh]
            overflow-y-auto
            "
            >
                {categories.map((items) => (
                    <div
                        key={items.label}
                        className="col-span-1"
                    >
                        <CategoryInput
                            onClick={(category) => setCustomValue("category", category)}
                            selected={category == items.label}
                            label={items.label}
                            icon={items.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step == STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located"
                    subtitle="Help guests find you!"
                />
                <CounterySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLable={actionLable}
            secondaryActionLabel={secondaryActionLable}
            secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    )
}

export default RentModal