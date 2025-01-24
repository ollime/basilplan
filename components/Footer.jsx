import { NavLink } from "react-router-dom"

/**
 * Navigation bar at the bottom of the page.
 * 
 * @returns {JSX} Footer component
 */
function Footer() {
    return (
        <>
            <nav id="footer" className="w-full sticky bottom-0 bg-zinc-800 border-t-1 border-gray-500">
                <ul className="font-bold flex flex-row mx-auto items-center justify-center h-12">
                    <NavLink className="grow-1 text-center" to={"/"}>timer</NavLink>
                    <NavLink className="grow-1 text-center" to={"/tasks"}>manage tasks</NavLink>
                    <NavLink className="grow-1 text-center" to={"/stats"}>stats</NavLink>
                    <NavLink className="grow-1 text-center" to={"/settings"}>settings</NavLink>
                </ul>
            </nav>
        </>
    )
}

export default Footer;