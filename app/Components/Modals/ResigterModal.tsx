"use client";
import axios from 'axios';
import { useCallback, useState } from 'react'
import useRegisterModal from '@/app/Hooks/useRegisterModal';
import useLoginModal from '@/app/Hooks/useLoginModal';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from "next-auth/react"


const ResigterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()

    const [isLoding, setIsLoding] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',

        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoding(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoding(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Airbnb'
                subtitle='Creat an account!'
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoding}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoding}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoding}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContant = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='
            text-neutral-500
            text-center
            mt-4
            font-light
            '>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoding}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLable='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContant}
        />
    )
}

export default ResigterModal