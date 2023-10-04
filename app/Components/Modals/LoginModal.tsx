"use client";
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import useRegisterModal from '@/app/Hooks/useRegisterModal';
import useLoginModal from '@/app/Hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const router = useRouter()

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoding, setIsLoding] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',

        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoding(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {

                setIsLoding(false);


                if (callback?.ok) {
                    toast.success('Logged in')
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }

            })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back'
                subtitle='Login to your account!'
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
                        First time using Airbnb?
                    </div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoding}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLable='Login'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContant}
        />
    )
}

export default LoginModal;