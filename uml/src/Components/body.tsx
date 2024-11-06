import { useEffect, useRef } from "react";
import * as joint from "jointjs";

const Body = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = graphRef.current;
    if (!container) return;

    const graph = new joint.dia.Graph();

    const paper = new joint.dia.Paper({
      el: container,
      model: graph,
      width: container.clientWidth,
      height: container.clientHeight,
      gridSize: 10,
      drawGrid: true,
    });

    const rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: "blue",
      },
      label: {
        text: "Classe Exemple",
        fill: "white",
      },
    });
    rect.addTo(graph);

    // Mettre à jour les dimensions du paper lorsque la fenêtre est redimensionnée
    const handleResize = () => {
      paper.setDimensions(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      paper.clearGrid();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={graphRef}
      style={{
        width: "100%",
        height: "100vh", // S'adapte à la hauteur de la colonne
        border: "1px solid black",
        padding: "2px",
        position: "relative",
      }}
    ></div>
  );
};

export default Body;
