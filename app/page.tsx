"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LeafTag, NodeTag } from "./types";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

export const rootTag: NodeTag = {
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
			<Button onClick={() => setRootJson(JSON.stringify(root, null, 2))}>
				Export
			</Button>
			{rootJson && <p>{rootJson}</p>}
		</div>
	);
}

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
						/>
					);
				}

				return (
					<LeafTagComponent
						tag={c as LeafTag}
						{...{ root, setRoot }}
					/>
				);
			})}
		</TagRenderer>
	);
}

function TagRenderer({
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

function Button({
	children,
	...props
}: React.ComponentPropsWithoutRef<"button">) {
	return (
		<button {...props} className="text bg-gray-200 px-2 py-1">
			{children}
		</button>
	);
}

export default Home;
