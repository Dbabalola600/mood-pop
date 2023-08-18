
export default function Footer (){
    return (
        <footer className="bg-black border-t  border-black tracking-wide text-center font-medium w-full ">
        <div className="text-gray-500 p-4">
           
                <div className="cursor-pointer text-gray-500">Mood&copy; {new Date().getFullYear()}</div>
          
        </div>
    </footer>
    )
}