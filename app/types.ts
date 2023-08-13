export type LeafTag = {
    name: string;
    data: string
}

export type NodeTag = {
    name: string;
    children: (NodeTag | LeafTag)[]
}






