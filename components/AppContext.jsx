/** @file App context used by multiple different components. */
import { createContext } from "react";

/** Contains current selected task. @type {string} */
const AppContext = createContext(null);

export default AppContext;
