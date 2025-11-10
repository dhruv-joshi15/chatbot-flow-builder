import React from 'react';

const PALETTE = [
  {
    type: 'text',
    title: 'Text Message',
    description: 'Sending a simple text to the user.',
  },
];

export default function NodesPanel(){
  return (
    <div>
      <h2>Nodes</h2>
      <div className="content">
        {PALETTE.map((n) => (
          <div
            key={n.type}
            className="pill"
            draggable
            onDragStart={(e)=>{
              /* storing drag data for drop */
              e.dataTransfer.setData('application/reactflow', n.type);
              e.dataTransfer.effectAllowed = 'move';
            }}
            title="Dragging into the canvas"
          >
            <strong>{n.title}</strong>
            <small>{n.description}</small>
          </div>
        ))}
        <p className="muted" style={{marginTop:12}}>Dragging a node into the canvas.</p>
      </div>
    </div>
  );
}
