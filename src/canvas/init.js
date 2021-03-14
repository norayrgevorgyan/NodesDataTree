import {GRID_HORIZONTAL, GRID_VERTICAL, NODE_HEIGHT, NODE_WIDTH} from "../configs/configurations";
import {data} from "../configs/data";

export default function initNodesPositions() {
    let levelNodesCounter = {};
    const flatedNodes = [];
    data.forEach(node => {
        node.draw = true;
        initNode(node, 1);
    });

    return flatedNodes;

    function initNode(node, level, parentId) {
        const levelStr = level.toString();
        levelNodesCounter[levelStr] = levelNodesCounter[levelStr] ? (levelNodesCounter[levelStr] + 1) : 1;
        node.x = GRID_HORIZONTAL + (level - 1) * (GRID_HORIZONTAL + NODE_WIDTH);
        node.y = GRID_VERTICAL + (levelNodesCounter[levelStr] - 1) * (GRID_VERTICAL + NODE_HEIGHT);
        node.parentId = parentId;
        if (node.children) {
            for (const child of node.children) {
                initNode(child, level + 1, node.id)
            }
            node.children = node.children.map(({id}) => id);
        }
        flatedNodes.push(node);
    }
}
