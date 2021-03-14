import React from 'react'
import {Group, Rect, Text} from "react-konva";

import {ACTIVE_COLOUR, NODE_HEIGHT, NODE_WIDTH, PASSIVE_COLOUR} from "../configs/configurations";

const Node = ({node, onClickCallback}) => {
    return (
        <Group
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            onClick={() => onClickCallback(node)}
        >
            <Rect
                text={node.label}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                fill={node.active ? ACTIVE_COLOUR : PASSIVE_COLOUR}
                shadowBlur={5}
                shadowOpacity={0.6}
                opacity={0.8}
            />
            <Text text={node.label}
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  fill={'#000'}
                  align={'center'}
                  padding={10}
                  fontSize={14}
            />
        </Group>
    )
};

export default Node;