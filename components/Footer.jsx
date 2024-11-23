import { Link } from "react-router-dom"

function Footer() {
    return (
        <>
            <nav id="footer">
                <ul>
                    <Link to={"/"}>timer</Link>
                    <Link to={"/stats"}>stats</Link>
                    <Link to={"/settings"}>settings</Link>                </ul>
            </nav>
        </>
    )
}

export default Footer;