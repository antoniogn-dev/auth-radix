"use client"

import { Button, DropdownMenu, Heading, Link } from "@radix-ui/themes"
import { signOut, useSession } from "next-auth/react"
import NextLink from "next/link"


const Navbar = () => {

    const { data: session } = useSession()
    console.log(session);



    return (
        <div className="flex justify-between items-center px-10 bg-zinc-950 py-3">
            <Heading>
                <NextLink href="/">RadixNext</NextLink>
            </Heading>

            <ul className="flex gap-4">
                {
                    !session && (
                        <>
                            <li>
                                <Link asChild>
                                    <NextLink href="/auth/login">Login</NextLink>
                                </Link>
                            </li>
                            <li>
                                <Link asChild>
                                    <NextLink href="/auth/register">Register</NextLink>
                                </Link>
                            </li>
                        </>
                    )
                }
                {
                    session && (
                        <>
                            <li>
                                <Link asChild>
                                    <NextLink href="/dashboard">Dashboard</NextLink>
                                </Link>
                            </li>
                            <li>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Button variant="soft">
                                            {session?.user?.name}
                                            <DropdownMenu.TriggerIcon />
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item shortcut="⌘ E">Profile</DropdownMenu.Item>
                                        <DropdownMenu.Item>Settings</DropdownMenu.Item>

                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item onClick={() => signOut()} shortcut="⌘ ⌫" color="red">
                                            Logout
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>

                            </li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}
export default Navbar