import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Background, Controls, MiniMap,
  addEdge, useEdgesState, useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from './nodes/TextNode';
import NodesPanel from './panels/NodesPanel';
import SettingsPanel from './panels/SettingsPanel';
import './styles.css';

const nodeTypes = { text: TextNode };

/* creating a simple toast system without extra deps */
function ToastStack({ items }){
  return (
    <div className="toast-wrap">
      {items.map(t => (
        <div key={t.id} className={`toast ${t.kind === 'error' ? 'error' : 'ok'}`}>
          <div className="title">{t.title}</div>
          <div className="body">{t.body}</div>
        </div>
      ))}
    </div>
  );
}


export default function App(){
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selected, setSelected] = useState(null);
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(1);

  const pushToast = useCallback((kind, title, body) => {
    /* pushing new toast */
    const t = { id: String(Date.now() + Math.random()), kind, title, body };
    setToasts((s) => [...s, t]);
    /* removing after 2.8s */
    setTimeout(() => setToasts((s) => s.filter(x => x.id !== t.id)), 2800);
  }, []);

  const onConnect = useCallback((params)=>{
    /* enforcing single outgoing edge per source handle */
    const already = edges.some(e => e.source === params.source && e.sourceHandle === params.sourceHandle);
    if(already){
      pushToast('error', 'Connection blocked', 'A source handle is allowing only one outgoing edge.');
      return;
    }
    setEdges(eds => addEdge({ ...params, animated: true }, eds));
    pushToast('ok', 'Edge added', 'The nodes are connecting successfully.');
  }, [edges, setEdges, pushToast]);

  const onDragOver = useCallback((e)=>{
    /* allowing drop */
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e)=>{
    /* creating a node at drop position */
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if(!type) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const position = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };

    const id = String(idRef.current++);
    const newNode = {
      id,
      type,
      position,
      data: { text: '' }
    };
    setNodes(nds => nds.concat(newNode));
    setSelected(newNode);
    pushToast('ok', 'Node added', 'A new node is appearing on the canvas.');
  }, [setNodes, pushToast]);

  const onSelectionChange = useCallback(({ nodes: selNodes })=>{
    /* updating selected node */
    setSelected(selNodes?.[0] ?? null);
  }, []);

  const updateSelected = useCallback((updatedNode)=>{
    /* updating selected node data */
    setNodes(nds => nds.map(n => n.id === updatedNode.id ? updatedNode : n));
    setSelected(updatedNode);
  }, [setNodes]);

  const handleSave = useCallback(()=>{
    /* validating entry points and saving flow */
    if(nodes.length > 1){
      const indegree = Object.fromEntries(nodes.map(n => [n.id, 0]));
      edges.forEach(e => { if(indegree[e.target] !== undefined) indegree[e.target]++; });
      const roots = Object.values(indegree).filter(v => v === 0).length;
      if(roots > 1){
        pushToast('error', 'Validation failed', 'More than one node is having an empty target (no incoming edge). Please ensuring a single entry.');
        return;
      }
    }
    const payload = { nodes, edges };
    console.log('FLOW_SAVED', payload);
    pushToast('ok', 'Flow saved', 'The JSON is printing in DevTools → Console.');
  }, [nodes, edges, pushToast]);

  const resetAll = useCallback(()=>{
    /* resetting builder */
    setNodes([]); setEdges([]); setSelected(null);
    pushToast('ok', 'Canvas reset', 'Everything is clearing successfully.');
  }, [setNodes, setEdges, pushToast]);

  const panel = useMemo(()=> selected ?
    <SettingsPanel selectedNode={selected} onChange={updateSelected} /> :
    <NodesPanel />
  , [selected, updateSelected]);

  return (
    <div className="app-shell">
      <div className="left">{panel}</div>

      <div className="canvas-wrap">
        <div className="toolbar">
          <button className="btn" onClick={handleSave}>Save Flow</button>
          <button className="btn secondary" onClick={resetAll}>Reset</button>
        </div>

        <div style={{height:'calc(100% - 49px)'}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>

          {nodes.length === 0 && (
            <div className="empty-tip">Tip: dragging a node from the left panel into the canvas.</div>
          )}
        </div>
      </div>

      <div className="right">
        <h2>Help</h2>
        <div className="content">
          <ol style={{margin:0, paddingLeft:18, lineHeight:1.6}}>
            <li>Dragging <strong>Text Message</strong> from the Nodes panel into the canvas.</li>
            <li>Selecting a node to edit its text in <strong>Settings</strong>.</li>
            <li>Connecting nodes using the source → target handles.</li>
            <li>Allowing only one outgoing edge per source handle.</li>
            <li>Pressing <strong>Save Flow</strong> to validate and print JSON.</li>
          </ol>
          <p className="muted" style={{marginTop:12}}>
            Validation: If there are multiple nodes and more than one node is having an empty target (no incoming edge), saving is failing.
          </p>
        </div>
      </div>

      <ToastStack items={toasts} />
    </div>
  );
}
