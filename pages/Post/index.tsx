import { FormEventHandler, useState } from "react";
import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import TextInput from "../../components/inputs/TextInput";
import LargeTextInput from "../../components/inputs/LargeTextInput";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";


type User = {

    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string

}


export default function Post() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("USER")
    const [user, setUser] = useState<User | null>(null)

    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            userId: token,
            category: form.item(0).value,
            post: form.item(1).value
        }


        const body2 = {
            id: token
        }

        const response = await fetch("/api/Post/NewPost", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 200) {
                    // router.push("/DashBoard")


                    const response = await fetch("/api/Follow/GetFollowers", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => res.json()) as User[]
                    // console.log("fod", response)
                    const UserRes = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => res.json()) as User
                    setUser(UserRes)


                    // console.log(UserRes)
                    // const AllFollwoers =[]
                    for (let i = 0; i < response.length; i++) {
                        const body3 = {
                            mail: response[i].email,
                            user: UserRes?.UserName
                        }

                        const MailRes = await fetch("/api/mail/NewPost", { method: "POST", body: JSON.stringify(body3) })

                    }

                    router.push("/DashBoard")



                } else {
                    //display error
                }
            }).catch(err => {
                console.log(err)
            })




        setLoading(false)

    }




    return (
        <DefaultLayout>
            <>
                <div>

                    <CusHead
                        title="New Post"
                    />

                    <div>
                        Note: posts only last for 24hours
                    </div>

                    <form
                        className=" "
                        onSubmit={newadd}
                    >

                        <div
                            className="pb-5 space-y-5"
                        >

                            <TextInput
                                name="Mood"
                                placeholder="How are you feeling?"
                                type="text"

                            />

                            <LargeTextInput
                                title="Content"
                                placholder="Express yourself..."
                            />

                        </div>




                        <div className=" w-full  space-y-2">

                            <button className="w-full btn-primary btn  text-white"
                                type="submit">
                                {isLoading ? "Loading..." : "Post"}


                            </button>


                        </div>



                    </form>
                </div>

            </>
        </DefaultLayout>
    )
}