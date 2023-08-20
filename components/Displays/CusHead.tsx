
type Myprops = {
    title: string | any
}


export default function CusHead(props: Myprops) {
    return (
        <div
            className="text-specgray lg:text-5xl text-2xl font-bold"
        >
            {props.title}

        </div>
    )
}