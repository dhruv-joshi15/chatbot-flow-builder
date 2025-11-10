import React from 'react';

export default function SettingsPanel({ selectedNode, onChange }){
  return (
    <div>
      <h2>Settings</h2>
      <div className="content">
        {!selectedNode ? (
          <p className="muted">Selecting a node to edit its settings.</p>
        ) : (
          <>
            <div className="field">
              <label>Text</label>
              <textarea
                rows={6}
                value={selectedNode.data?.text ?? ''}
                onChange={(e)=> onChange({ ...selectedNode, data: { ...selectedNode.data, text: e.target.value } })}
                placeholder="Inserting message text here"
              />
            </div>
            <p className="muted">The settings panel is replacing the Nodes panel when a node is selected.</p>
          </>
        )}
      </div>
    </div>
  );
}
