import { Button, Flex, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons"

const SigninForm = () => {
    return (
        <Flex direction="column" gap="2">
            <label htmlFor="email">Email</label>
            <TextField.Root type="email" placeholder="email@domain.com" autoFocus>
                <TextField.Slot>
                    <EnvelopeClosedIcon width="16" height="16" />
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="password">Password</label>
            <TextField.Root type="password" placeholder="...." >
                <TextField.Slot>
                    <LockClosedIcon width="16" height="16" />
                </TextField.Slot>
            </TextField.Root>

            <Button>Sign In</Button>

        </Flex>
    )
}
export default SigninForm