import { Analytics } from "@vercel/analytics/react";
import Routing from "./routes";

function App() {
  return (
    <>
      <Routing />
      <Analytics />
    </>
  );
}

export default App;
