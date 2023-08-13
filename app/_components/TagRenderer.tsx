"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { LeafTag, NodeTag } from "../types";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { Button } from "./Button";

export function TagRenderer({
  tag,
  root,
  setRoot,
  children,
}: {
  tag: NodeTag | LeafTag;
  root: NodeTag;
  setRoot: Dispatch<SetStateAction<NodeTag>>;

  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [editTag, setEditTag] = useState(false);
  const [tagName, setTagName] = useState(tag.name);

  const onAddChild = () => {
    if (Object.hasOwn(tag, "children")) {
      (tag as NodeTag).children.push({ name: "New Child", data: "Data" });
      const newRoot = structuredClone(root);
      setRoot(newRoot);
      return;
    }
    (tag as any).children = [{ name: "New Child", data: "Data" }];
    const newRoot = structuredClone(root);
    setRoot(newRoot);
  };

  return (
    <div className={` flex flex-col border-2 border-blue-400 my-2 ml-4`}>
      <div className="flex justify-between p-2 bg-blue-400">
        <div className="flex gap-2 items-center">
          <Button onClick={() => setOpen((p) => !p)}>
            {open ? <AiOutlineDown /> : <AiOutlineRight />}
          </Button>
          {editTag ? (
            <input
              type="text"
              value={tagName}
              className="text-black border-[1px] border-black p-1"
              onChange={(e) => {
                setTagName(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  tag.name = tagName;
                  setRoot(structuredClone(root));
                  setEditTag(false);
                }
              }}
            />
          ) : (
            <span onClick={() => setEditTag(true)}>{tag.name}</span>
          )}
        </div>
        <Button onClick={onAddChild}>Add Child</Button>
      </div>

      <div className={`${open ? "" : "hidden"}`}>{children}</div>
    </div>
  );
}
