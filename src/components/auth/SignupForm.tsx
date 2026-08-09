import { Button, Flex, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons"

const SignupForm = () => {
    return (
        <Flex direction="column" gap="2">

            <label htmlFor="email">Name</label>
            <TextField.Root type="text" placeholder="Username" autoFocus>
                <TextField.Slot>
                    <PersonIcon width="16" height="16" />
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="email">Email</label>
            <TextField.Root type="email" placeholder="email@domain.com">
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

            <Button>Sign Up</Button>

        </Flex>
    )
}
export default SignupForm