
type MyProps={
    message: string
}


export default function GoodToast(props: MyProps) {
    return (

        <div className="toast toast-top toast-end z-10">

            <div className="alert alert-success">
                <span>{props.message}</span>
            </div>
        </div>

    )
}



