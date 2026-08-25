import { useEffect, useState } from "react";
import GradientDescent from "./GradientDescent";
import Portfolio from "./portfolio";

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return hash === "#/gradient-descent" ? <GradientDescent /> : <Portfolio />;
}
