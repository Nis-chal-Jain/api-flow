import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import APIinput from "./APIinput";

const initialNodes = [
  { id: "1", position: { x: 50, y: 400 }, data: { label: "Start" } },
  { id: "2", position: { x: 800, y: 400 }, data: { label: "End" } },
];
const initialEdges = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const getNodeId = () => `randomnode_${+new Date()}`;
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onAdd = useCallback(() => {
    const newNode = {
      type: "APIinput",
      id: getNodeId(),
      data: { label: "GET Request" },
      position: {
        x: 400,
        y: 400,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);
  const nodeTypes = { APIinput };
  return (
    <>
      <button onClick={onAdd}>Add Node</button>
      <button onClick={onAdd}>Run</button>
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
