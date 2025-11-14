import { useState } from "react";
import SIPCalculator from "./components/Calculator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SIPCalculator />
    </>
  );
}

export default App;
