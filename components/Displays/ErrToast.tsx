
type MyProps={
    message: string
}


export default function ErrToast(props: MyProps) {
    return (

        <div className="toast toast-top toast-end z-10">

            <div className="alert alert-error">
                <span>{props.message}</span>
            </div>
        </div>

    )
}



