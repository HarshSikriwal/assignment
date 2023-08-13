"use client";
import React from "react";
import { LeafTag, NodeTag } from "../types";
import { LeafTagComponent } from "../page";

export function NodeTagComponent({ tag }: { tag: NodeTag }) {
	return (
		<details className="relative w-40 ">
			<summary className="">{tag.name}</summary>
			{tag.children.map((c) => {
				if (Object.hasOwn(c, "data")) {
					return <LeafTagComponent tag={c as LeafTag} />;
				}

				return <NodeTagComponent tag={c as NodeTag} />;
			})}
			<button
				className="absolute top-0 right-0"
				onClick={() => {
					tag.children.push({
						name: "New Child",
						data: "Data",
					} as LeafTag);
				}}
			>
				Add
			</button>
		</details>
	);
}
