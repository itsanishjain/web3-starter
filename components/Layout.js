import Navigation from "./Navigation";

export default function Layout({ children }) {
    return (
        <div className='h-screen w-scren bg-[#242424] overflow-auto text-white'>
            <Navigation /> 
            {children}
        </div>
    )
}
