export default function Navbar(){
    return(
<>
    {/* Navbar */}
    <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-lg">
        <h1 className="text-white text-2xl font-semibold">Echos of Life</h1>
        <nav className="flex gap-4">
            <a href="#" className="text-white hover:underline">Link</a>
            <a href="#" className="text-white hover:underline">Link</a>
            <a href="#" className="text-white hover:underline">Link</a>
            <a href="#" className="text-white hover:underline">Link</a>
        </nav>
    </div>
</>
    );
}

