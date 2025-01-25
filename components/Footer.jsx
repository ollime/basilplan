/** @file Navigation bar. */
import { NavLink } from "react-router-dom";

/**
 * Navigation bar with links to each subpage at the bottom of the current page. */
function Footer() {
  return (
    <>
      <nav
        id="footer"
        className="sticky bottom-0 w-full border-t-1 border-gray-500 bg-zinc-800"
      >
        <ul className="mx-auto flex h-12 flex-row items-center justify-center font-bold">
          <NavLink className="grow-1 text-center" to={"/"}>
            timer
          </NavLink>
          <NavLink className="grow-1 text-center" to={"/tasks"}>
            manage tasks
          </NavLink>
          <NavLink className="grow-1 text-center" to={"/stats"}>
            stats
          </NavLink>
          <NavLink className="grow-1 text-center" to={"/settings"}>
            settings
          </NavLink>
        </ul>
      </nav>
    </>
  );
}

export default Footer;
