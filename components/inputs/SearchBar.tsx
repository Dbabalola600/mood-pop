import { useRouter } from "next/router"
import { FormEventHandler } from "react"
import searchbutton from "../../public/searchbutton.svg"
import Image from "next/image"


export default function SearchBar() {
    const router = useRouter()

    const search: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const form = e.currentTarget.elements as any



        const body = {
            find: form.item(0).value

        }

        router.push(`/Search/${form.item(0).value}`)
    }





    return (
        <form
            onSubmit={search}

        >
            

            <div className="flex justify-center">
                <div className="mb- mt-3 w-full">
                    <div

                        // className="relative mb-4 flex w-full flex-wrap items-stretch"
                        className="relative mb-4 flex w-full flex-wrap items-stretc m-0 -mr-px min-w-0 flex-auto rounded-full shadow-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 font-normal  outline-none transition duration-300 ease-in-out focus:border-primary-600  focus:shadow-te-primary focus:outline-none dark:border-neutral-600  "

                    >
                        <input
                            type="search"
                            className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l  border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-gray-500 dark:placeholder:text-gray-500"
                            placeholder="Search User"
                            aria-label="Search"
                            aria-describedby="button-addon3"


                        />
                        <button


                            className="relative z-[2]   px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                            type="submit"
                            id="button-addon3"
                            data-te-ripple-init>

                            <Image
                                src={searchbutton}
                            />

                        </button>
                    </div>
                </div>
            </div>


        </form>
    )
}