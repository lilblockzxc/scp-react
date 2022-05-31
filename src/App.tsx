import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { AreaComponent, RSPElementComponent } from "./rspElement";
import { Area, ElementType, RSPElement } from "./core";

function App() {
  const [height, setH] = useState(5);
  const [width, setW] = useState(5);
  const [eCount, setE] = useState(5);
  const [area, setArea] = useState<Area>(null);

  return (
    <div>
      {/* <RSPElementComponent item={new RSPElement(ElementType.scis, null)} /> */}
      <AreaComponent area={area} />
      width:{" "}
      <input
        value={width}
        onChange={(e) => {
          setW(parseInt(e.target.value));
        }}
      />
      height:{" "}
      <input
        value={height}
        onChange={(e) => {
          setH(parseInt(e.target.value));
        }}
      />
      Count:{" "}
      <input
        value={eCount}
        onChange={(e) => {
          setE(parseInt(e.target.value));
        }}
      />
      <button
        onClick={() => {
          const area = new Area();
          area.generateArea(width, height, eCount);
          setArea(area);
          area.run();
        }}
      >
        Start
      </button>
    </div>
  );
}

export default App;
