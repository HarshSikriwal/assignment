"use client";
import React, { Dispatch, SetStateAction } from "react";
import { LeafTag, NodeTag } from "../types";
import { TagRenderer } from "./TagRenderer";

export function LeafTagComponent({
  tag,
  root,
  setRoot,
}: {
  tag: LeafTag;
  root: NodeTag;
  setRoot: Dispatch<SetStateAction<NodeTag>>;
}) {
  return (
    <TagRenderer {...{ tag, root, setRoot }}>
      <div className="flex bg-gray-200 items-center gap-2 p-2">
        <span>Data</span>
        <input
          type="text"
          value={tag.data}
          className="text-black border-[1px] border-black p-1"
          onChange={(e) => {
            tag.data = e.currentTarget.value;
            let newRoot = structuredClone(root);
            setRoot(newRoot);
          }}
        />
      </div>
    </TagRenderer>
  );
}
