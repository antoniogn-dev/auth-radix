import { Container } from "@radix-ui/themes"
import { Metadata } from "next"
import Link from "next/link"



export const metadata: Metadata = {
    title: "Home Page",
    description: "Home Page description"
}

const page = () => {
  return (
    <Container className="px-5 md:px-0">
        <header className="my-4 bg-slate-800 p-10 rounded-lg">
            <h1 className="text-7xl my-10">NextAuth Radix</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae provident assumenda voluptates maxime recusandae excepturi possimus repellat quis incidunt nemo vero, autem cumque voluptatibus vitae quasi veritatis tenetur eaque architecto ipsa aliquid consequatur atque. Cum, facilis soluta quae culpa delectus dolorum, distinctio alias dolorem, provident temporibus qui rem eum porro.</p>

            <div className="mt-5">
                <Link href="/auth/login" className="text-xl text-white bg-blue-500 py-1 px-4 rounded-md mt-10" >Ingresa</Link>
            </div>

        </header>
    </Container>
  )
}
export default page