# BiteSpeed Chatbot Flow Builder

A polished, production-grade implementation of the BiteSpeed Frontend Assignment.

This project is a fully interactive chatbot flow builder built using **React**, **ReactFlow**, and a custom UI layer. It includes drag-and-drop node creation, node editing, connection rules, toast notifications, validations, and a clean modern interface.



Live Demo

https://chatbot-flow-builder15.vercel.app



## Features

### 1. Text Message Node

* Adding unlimited Text Message nodes.
* Drag-and-drop support.
* Clean, aesthetic node design.
* Live updating of the node text.

### 2. Nodes Panel

* Listing all available node types (currently only Text Message).
* Dragging nodes from the left panel into the canvas.
* Replaced by Settings Panel on node selection.

### 3. Settings Panel

* Appearing when selecting a node.
* Allowing editing of the selected Text Node.
* Updating the node content in real-time.

### 4. Connections & Handles

* Adding edges between nodes using ReactFlow.
* Allowing multiple incoming edges to a target.
* Restricting to a single outgoing edge from each source handle.
* Displaying toast notifications when invalid connections are attempted.

### 5. Validation

* Save Flow validates the structure.
* Showing an error if more than one node has an empty target (multiple root nodes).
* Printing flow JSON in the DevTools console.

### 6. UI Enhancements

* Custom dark theme.
* Smooth animations.
* Floating toolbars.
* Toast notifications.
* Hover and selection effects.
* Animated nodes.
* Glass-like panels and clean layout.

---

## Tech Stack

* **React 18**
* **ReactFlow 11**
* **Framer Motion (optional animations)**
* **Vite** for fast development
* **Custom CSS** for styling

---

## Running Locally

### 1. Clone the repository:

```
 git clone <your-repo-url>
 cd bitespeed-flow-builder
```

### 2. Install dependencies:

```
 npm install
```

### 3. Start development server:

```
 npm run dev
```

### 4. Open in browser:

```
 http://localhost:5173
```

---

## Deployment (Vercel)

1. Push this code to GitHub.
2. Visit [https://vercel.com](https://vercel.com)
3. Create a new project.
4. Import the GitHub repo.
5. Set framework: **Vite**
6. Deploy.

Your live link will appear in your Vercel dashboard.
Add that link here:

```
Live Demo: https://your-vercel-link.vercel.app
```

---

## Save Flow JSON Example

```
FLOW_SAVED {
  nodes: [...],
  edges: [...]
}
```

The output is visible in DevTools console.

---

## Folder Structure

```
src
│ App.jsx
│ main.jsx
│ styles.css
│
├─ nodes
│   └─ TextNode.jsx
│
├─ panels
│   ├─ NodesPanel.jsx
│   └─ SettingsPanel.jsx
```

---

## How This Meets the Assignment Requirements

### Drag Text Message node into canvas

### Select node to edit text in Settings Panel

### Only one outgoing edge from source handle

### Multiple incoming edges allowed

### Validation for multiple root nodes

### Save Flow prints JSON

### Clean UI, good code structure, commented logic

---

## Author

Dhruv Joshi

---

## Notes

This project goes beyond the basic assignment expectations by delivering a polished UI, animations, professional layout, and enhanced usability features.

---
