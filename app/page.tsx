"use client";
import React, { useEffect, useState } from "react";
import { NodeTag } from "./types";
import { NodeTagComponent } from "./_components/NodeTagComponent";
import { Button } from "./_components/Button";

const rootTag: NodeTag = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

function Home() {
  const [root, setRoot] = useState(rootTag);
  const [rootJson, setRootJson] = useState("");
  useEffect(() => {
    if (!rootJson) return;
    setRootJson(JSON.stringify(root, null, 2));
  }, [root]);
  return (
    <div className="px-10">
      <NodeTagComponent tag={root} {...{ root, setRoot }} />
      <div className="ml-4 mt-4">
        <Button onClick={() => setRootJson(JSON.stringify(root, null, 2))}>
          Export
        </Button>
      </div>
      {rootJson && <p>{rootJson}</p>}
    </div>
  );
}

export default Home;
