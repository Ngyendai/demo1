import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import "./index.css";

import { MdOutlineStarRate } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const flow = JSON.parse(localStorage.getItem(flowKey));
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onSave = useCallback(() => {
    if (nodes) {
      const flow = rfInstance.toObject();
      const data = nodes;
      localStorage.setItem(flowKey, JSON.stringify(data));
    }
  }, [nodes]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const data = [
    {
      id: 1,
      title: " Journey Event",
      category: "Start Conditions",
    },
    {
      id: 2,
      title: " CDP Segment",
      category: "Start Conditions",
    },
    {
      id: 3,
      title: " Journey Event",
      category: "Start Conditions",
    },
    {
      id: 4,
      title: " Birthday Event",
      category: "Start Conditions",
    },
    {
      id: 5,
      title: " Contact add to List",
      category: "Start Conditions",
    },
    {
      id: 6,
      title: "Contact add to Segment",
      category: "Start Conditions",
    },
    {
      id: 7,
      title: "Contact Segment",
      category: "Start Conditions",
    },
    {
      id: 8,
      title: "Contact List",
      category: "Start Conditions",
    },
    {
      id: 9,
      title: "Email Link Clicked?",
      category: "If /Else Conditions",
    },
    {
      id: 10,
      title: "Email Opened?",
      category: "If /Else Conditions",
    },
    {
      id: 11,
      title: "Check Journey Event",
      category: "If /Else Conditions",
    },
    {
      id: 12,
      title: "Check Email/SMS Event?",
      category: "If /Else Conditions",
    },
    {
      id: 13,
      title: "Filter by Segment",
      category: "If /Else Conditions",
    },
    {
      id: 14,
      title: "Check Contact",
      category: "If /Else Conditions",
    },
    {
      id: 15,
      title: "Wait Until",
      category: "Take Actions",
    },
    {
      id: 16,
      title: "Send Email",
      category: "Take Actions",
    },
    {
      id: 17,
      title: "Send Message",
      category: "Take Actions",
    },
    {
      id: 18,
      title: "Update Tags",
      category: "Take Actions",
    },
    {
      id: 19,
      title: " Update Score",
      category: "Take Actions",
    },
    {
      id: 20,
      title: "Move Contact to Segment",
      category: "Take Actions",
    },
    {
      id: 21,
      title: "Create Journey Event",
      category: "Take Actions",
    },
    {
      id: 22,
      title: "Webhook",
      category: "Take Actions",
    },
    {
      id: 23,
      title: "Facebook Audience",
      category: "Take Actions",
    },
    {
      id: 24,
      title: "Google Ads Audience",
      category: "Take Actions",
    },
  ];
  const onAdd = useCallback(
    (value) => {
      const newNode = {
        id: getNodeId(),
        data: {
          label: value,
        },
        style: { backgroundColor: "#6ede87", color: "white" },
        position: {
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * window.innerHeight,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );
  useEffect(() => {
    if (flow) {
      setNodes(flow);
    }
  }, []);
  return (
    <div className="wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        preventScrolling={false}
        style={{overflow: "scroll"}}
      >
        <div className="save__controls">
          <div className="start ">
            <div className="title">
              <RiArrowDropDownLine className="icon-title" />
              <h1 className="">Start Conditions</h1>
            </div>
            <div className="d_flex">
              {data
                .filter((item) => item.category === "Start Conditions")
                .map((item, index) => (
                  <button onClick={() => onAdd(item.title)} className="btn">
                    <MdOutlineStarRate className="btn-icon" />
                    {item.title}
                  </button>
                ))}
            </div>
          </div>
          <div className="ifElse">
            <div className="title">
              <RiArrowDropDownLine className="icon-title" />
              <h1 className=""> If /Else Conditions</h1>
            </div>

            <div className="d_flex">
              {data
                .filter((item) => item.category === "If /Else Conditions")
                .map((item, index) => (
                  <button
                    onClick={() => onAdd(item.title)}
                    className="btn bg-pink"
                  >
                    <MdOutlineStarRate className="btn-icon bg-icon-pink" />
                    {item.title}
                  </button>
                ))}
            </div>
          </div>
          <div className="tack">
            <div className="title">
              <RiArrowDropDownLine className="icon-title" />
              <h1 className="">Take Actions</h1>
            </div>

            <div className="d_flex">
              {data
                .filter((item) => item.category === "Take Actions")
                .map((item, index) => (
                  <button
                    onClick={() => onAdd(item.title)}
                    className="btn bg-green"
                  >
                    <MdOutlineStarRate className="btn-icon bg-icon-green" />
                    {item.title}
                  </button>
                ))}
            </div>
          </div>
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
          <button onClick={onAdd}>add node</button>
        </div>
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
