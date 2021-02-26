// Estado, Propriedade, Componente

import { useState } from "react";

//Propriedades do button
interface ButtonProps {
  color: string;
  children: string;
}

export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(1);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button type="button" style={{ backgroundColor: props.color }} onClick={increment}>
      {props.children + " "}
      {props.color + " " + counter}
    </button>
  );
}
