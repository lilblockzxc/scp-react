import { FC } from "react";
import { Area, ElementType, K, RSPElement } from "./core";

export const RSPElementComponent: FC<{ item: RSPElement }> = ({ item }) => {
  const { x, y } = item.Coord;
  const src =
    item.type == ElementType.rock
      ? "/rock.png"
      : item.type == ElementType.paper
      ? "/paper.png"
      : "/scissors.png";
  return (
    <img
      src={src}
      style={{
        height: K,
        width: K,
        position: "absolute",
        left: (x - 1) * K,
        top: (y - 1) * K,
      }}
    />
  );
};
export const AreaComponent: FC<{ area: Area }> = ({ area }) => {
  if (area == null) {
    return null;
  }
  return (
    <div
      style={{
        height: area.height * K,
        width: area.width * K,
        backgroundColor: "yellow",
      }}
    >
      {area.elements.map((element, index) => (
        <RSPElementComponent key={index} item={element} />
      ))}
    </div>
  );
};
