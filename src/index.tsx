import {createRoot} from "react-dom/client";
import {Root} from "./Root";

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<Root/>);
