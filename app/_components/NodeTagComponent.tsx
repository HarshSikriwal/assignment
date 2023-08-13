"use client";
import React, { Dispatch, SetStateAction } from "react";
import { LeafTag, NodeTag } from "../types";
import { TagRenderer } from "./TagRenderer";
import { LeafTagComponent } from "./LeafTagComponent";

export function NodeTagComponent({
  tag,
  root,
  setRoot,
}: {
  tag: NodeTag;
  root: NodeTag;
  setRoot: Dispatch<SetStateAction<NodeTag>>;
}) {
  return (
    <TagRenderer {...{ tag, root, setRoot }}>
      {tag.children.map((c) => {
        if (Object.hasOwn(c, "children")) {
          return (
            <NodeTagComponent
              tag={c as NodeTag}
              {...{ root, setRoot }}
              key={tag.name}
            />
          );
        }

        return (
          <LeafTagComponent
            key={tag.name}
            tag={c as LeafTag}
            {...{ root, setRoot }}
          />
        );
      })}
    </TagRenderer>
  );
}
