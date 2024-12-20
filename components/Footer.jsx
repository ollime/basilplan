import { NavLink } from "react-router-dom"

function Footer() {
    return (
        <>
            <nav id="footer">
                <ul>
                    <NavLink to={"/"}>timer</NavLink>
                    <NavLink to={"/stats"}>stats</NavLink>
                    <NavLink to={"/settings"}>settings</NavLink>
                </ul>
            </nav>
        </>
    )
}

export default Footer;