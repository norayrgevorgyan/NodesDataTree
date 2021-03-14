import React, {useState, useEffect} from "react";
import {Stage, Layer, Line} from 'react-konva';

import {GRID_VERTICAL, NODE_WIDTH} from "../configs/configurations";
import Node from "./Node";
import initNodesPositions from "./init";

const Canvas = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        setNodes(initNodesPositions())
    }, []);

    function handleClick(node) {
        if (!node.children) {
            alert("This node does not have child notes");
            return;
        }
        if (node.active) {
            setNodes(nodes => nodes.map(_node => node.id === _node.id ? {...node, active: false} : _node));
            if (node.children) {
                hideChildren(node.children)
            }
        } else {
            setNodes(nodes => nodes.map(_node => {
                if (_node.id === node.id) {
                    return {..._node, active: true}
                } else if (_node.parentId === node.id) {
                    return {..._node, draw: true, active: false}
                }
                return _node;
            }))
        }
    }

    function hideChildren(ids) {
        ids.forEach(_id => {
            const node = nodes.find(({id}) => id === _id);
            if (node.children && node.active) {
                hideChildren(node.children)
            }
        });
        setNodes(nodes => nodes.map(_node => {
            if (ids.includes(_node.id)) {
                return {..._node, draw: false, active: false}
            }
            return _node
        }));
    }

    function getLinePoints(node, parentNode) {
        const startPoint = [parentNode.x + NODE_WIDTH, parentNode.y + GRID_VERTICAL / 2];
        const endPoint = [node.x, node.y + GRID_VERTICAL / 2];
        const middlePoint = [(startPoint[0] + endPoint[0]) / 2, 2 * startPoint[1] / 3 + endPoint[1] / 3];
        return [...startPoint, ...middlePoint, ...endPoint];
    }

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {nodes.map(node => node.draw && <React.Fragment key={node.id}>
                        <Node node={node} key={node.id} onClickCallback={handleClick}/>
                        {node.parentId && <Line
                            points={[...getLinePoints(node, nodes.find(({id}) => id === node.parentId))]}
                            tension={0.5}
                            stroke="black"
                        />}
                    </React.Fragment>)}
                </Layer>
            </Stage>
        </div>
    )
};

export default Canvas;