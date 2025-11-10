import React from 'react';
import { Handle, Position } from 'reactflow';

export default function TextNode({ data, selected }){
  return (
    <div className={`node-card ${selected ? 'selected' : ''}`}>
      <div className="node-title">Text</div>
      <div className="node-text">{data.text || 'New message...'}</div>

      {/* adding handles */}
      <Handle type="target" position={Position.Left} id="t" />
      <Handle type="source" position={Position.Right} id="s" />
    </div>
  );
}
