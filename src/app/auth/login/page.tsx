import SigninForm from "@/components/auth/SigninForm"
import { Card, Container, Flex, Heading, Link, Text } from "@radix-ui/themes"
import NavLink from "next/link"

const LoginPage = () => {
    return (
        <>
            <Container size="1" height="100%" className="p-3 md:p-0">
                <Flex className="h-screen w-full items-center">
                    <Card className="w-full p-7">
                        <Heading mb="4">Sign In</Heading>

                        <SigninForm />

                        <Flex justify="between" my="4">
                            <Text>
                                Don´t have an account?
                            </Text>
                            <Link asChild >
                                <NavLink href="/auth/register">
                                    Register
                                </NavLink>
                            </Link>
                        </Flex>
                    </Card>
                </Flex>

            </Container>

        </>
    )
}
export default LoginPage