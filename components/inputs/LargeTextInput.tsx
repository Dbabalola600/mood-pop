type MyProps = {
    title: string
    placholder?: string
}

export default function LargeTextInput(props: MyProps) {


    return (
        <div className="">

            <label className="label">
                <span className="label-text text-black md:text-2xl ">{props.title}</span>

            </label>


            <textarea
                className=" text-black w-full h-[300px] p-2 resize-y border rounded-md input input-bordered input-primary  "
                placeholder={props.placholder}
            />







        </div>
    )
}