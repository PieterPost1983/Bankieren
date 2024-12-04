"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import CustomInput from '@/components/CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();

    const [user, setUser] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setisLoading(true)
        try {
            // Sign up with Appwrite & create plain link token

            if (type === 'registreren') {
                const newUser = await signUp(data);

                setUser(newUser);
            } else if (type === 'inloggen') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })

                if (response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Graphix Development"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Graphix
                    </h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Verbind Account' : type === 'inloggen' ? 'Inloggen' : 'Registreren'}
                    </h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Verbind je account om te beginnen' : 'Vul de onderstaande velden in om te beginnen'}
                    </p>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'registreren' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name='firstName' label="Voornaam" placeholder='Vul je voornaam in' />
                                        <CustomInput control={form.control} name='lastName' label="Achternaam" placeholder='Vul je achternaam in' />
                                    </div>
                                    <CustomInput control={form.control} name='address1' label="Straat + Huisnummer" placeholder='Vul je straat in' />
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name='city' label="Plaats" placeholder='Vul je plaats in' />
                                        <CustomInput control={form.control} name='postalCode' label="Postcode" placeholder='Postcode' />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name='dateOfBirth' label="Geboortedatum" placeholder='DD-MM-JJJJ' />
                                        <CustomInput control={form.control} name='bsn' label="BSN Nummer" placeholder='Vul je bsn nummer in' />
                                    </div>
                                </>
                            )}
                            <CustomInput control={form.control} name='email' label="Email" placeholder='Vul je emailadres in' />
                            <CustomInput control={form.control} name='password' label="Wachtwoord" placeholder='Vul je wachtwoord in' />

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn' disabled={isLoading}>{isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin'
                                        /> &nbsp; Laden...</>
                                ) : type === 'inloggen' ? 'Inloggen' : 'Registreren'}
                                </Button>
                            </div>

                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'inloggen' ? 'Nog geen account?' : 'Heb je al een account?'}
                        </p>
                        <Link href={type === 'inloggen' ? '/registreren' : '/inloggen'} className='form-link' >
                            {type === 'inloggen' ? 'Registreren' : 'Inloggen'}
                        </Link>
                    </footer>
                </>
            )
            }
        </section >
    )
}

export default AuthForm