# Binary Search Tree Visualizer

A modern, interactive web-based BST visualizer inspired by VisuAlgo. Built with React, TypeScript, and Vite for high performance.

## 🎯 Features

- **Interactive BST Operations**
  - Insert new values into the tree
  - Search for values with animated path highlighting
  - Remove nodes with automatic restructuring
  - Create random trees for testing

- **Visual Enhancements**
  - Clean, modern UI with gradient design
  - Color-coded nodes (normal, processing, found)
  - Real-time tree rendering with canvas
  - Smooth animations for all operations

- **Tree Traversal**
  - Inorder traversal display
  - Preorder traversal support
  - Postorder traversal support

- **Controls**
  - Adjustable animation speed (0.5x to 3x)
  - Step-by-step animation viewing
  - Clear visual feedback for operations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bst-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173/`

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect Vite and deploy

Or use the CLI:
```bash
npm install -g vercel
vercel
```

## 🏗️ Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Application styles
├── BST.ts               # Binary Search Tree implementation
├── TreeCanvas.tsx       # Canvas rendering component
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## 💻 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite 5
- **Rendering**: HTML5 Canvas
- **Styling**: CSS3 with gradients and animations

## 🎮 How to Use

1. **Insert Values**: Enter a number and click "Insert" or press Enter
2. **Search**: Enter a value and click "Search" to see the search path
3. **Remove**: Enter a value and click "Remove" to delete it
4. **Create Random Tree**: Click "Random Tree" to generate a tree with 12 nodes
5. **Traversal**: Click "Inorder" to highlight all nodes in order
6. **Animation Speed**: Adjust the speed slider to control animation pace

## 📊 Algorithm Complexity

- **Insert**: O(log n) average, O(n) worst case
- **Search**: O(log n) average, O(n) worst case
- **Remove**: O(log n) average, O(n) worst case
- **Traversal**: O(n)

## 🔄 Development

Hot module replacement (HMR) is enabled for fast development. Edit any file and see changes instantly.

## 📝 License

MIT License - feel free to use this project for educational purposes.

## 🙏 Inspiration

Inspired by the excellent [VisuAlgo](https://visualgo.net/en/bst) visualization tool by Dr. Steven Halim.

---

**Made with ❤️ for learning and teaching data structures**

## 🔗 Live Demo

You can view the deployed application here:

https://bstvisualizer-ten.vercel.app/
