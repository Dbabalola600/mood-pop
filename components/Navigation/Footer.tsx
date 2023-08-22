
export default function Footer (){
    return (
        <footer className="bg-black border  border-black tracking-wide text-center font-medium w-screen ">
        <div className="text-gray-500 p-4">
           
                <div className="cursor-pointer text-gray-500">Mood&copy; {new Date().getFullYear()}</div>
          
        </div>
    </footer>
    )
}