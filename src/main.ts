import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Anitab Chrome Extension</h1>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
