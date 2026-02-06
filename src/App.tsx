import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BST, TreeNode } from './BST';
import { TreeCanvas } from './TreeCanvas';
import './App.css';

interface AnimationStep {
  message: string;
  highlightedNodes: Set<string>;
  processingNode: string | null;
  foundNode: string | null;
}

export function App() {
  const [bst] = useState(() => new BST());
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [processingNode, setProcessingNode] = useState<string | null>(null);
  const [foundNode, setFoundNode] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [speed, setSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play animation
  useEffect(() => {
    if (isAnimating && currentStep < animationSteps.length) {
      const step = animationSteps[currentStep];
      setHighlightedNodes(step.highlightedNodes);
      setProcessingNode(step.processingNode);
      setFoundNode(step.foundNode);
      setMessage(step.message);

      const delay = 800 / speed;
      animationIntervalRef.current = setTimeout(() => {
        if (currentStep < animationSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsAnimating(false);
        }
      }, delay);
    }

    return () => {
      if (animationIntervalRef.current) {
        clearTimeout(animationIntervalRef.current);
      }
    };
  }, [isAnimating, currentStep, animationSteps, speed]);

  const insertNumber = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    const node = bst.insert(value);
    setRoot(bst.root);

    const steps: AnimationStep[] = [
      {
        message: `Inserting ${value}...`,
        highlightedNodes: new Set(),
        processingNode: node.id,
        foundNode: null,
      },
      {
        message: `Successfully inserted ${value}!`,
        highlightedNodes: new Set([node.id]),
        processingNode: null,
        foundNode: node.id,
      },
    ];

    setAnimationSteps(steps);
    setCurrentStep(0);
    setIsAnimating(true);
    setInputValue('');
  };

  const searchNumber = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    const steps: AnimationStep[] = [];
    const visited = new Set<string>();

    const buildSteps = (node: TreeNode | null) => {
      if (!node) {
        steps.push({
          message: `${value} not found in tree`,
          highlightedNodes: new Set(visited),
          processingNode: null,
          foundNode: null,
        });
        return;
      }

      visited.add(node.id);
      steps.push({
        message: `Checking node ${node.value}...`,
        highlightedNodes: new Set(visited),
        processingNode: node.id,
        foundNode: null,
      });

      if (value === node.value) {
        steps.push({
          message: `Found ${value}!`,
          highlightedNodes: new Set([node.id]),
          processingNode: null,
          foundNode: node.id,
        });
        return;
      }

      if (value < node.value) {
        buildSteps(node.left);
      } else {
        buildSteps(node.right);
      }
    };

    buildSteps(bst.root);
    
    if (steps.length === 0) {
      setMessage('Tree is empty');
      return;
    }

    setAnimationSteps(steps);
    setCurrentStep(0);
    setIsAnimating(true);
    setInputValue('');
  };

  const removeNumber = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    if (!bst.search(value)) {
      setMessage(`${value} not found in tree`);
      setInputValue('');
      return;
    }

    bst.remove(value);
    setRoot(bst.root);
    setMessage(`Removed ${value} from tree`);
    setAnimationSteps([]);
    setCurrentStep(0);
    setHighlightedNodes(new Set());
    setProcessingNode(null);
    setFoundNode(null);
    setInputValue('');
  };

  const clearTree = () => {
    bst.root = null;
    bst.nodeCounter = 0;
    setRoot(null);
    setMessage('Tree cleared');
    setAnimationSteps([]);
    setCurrentStep(0);
    setHighlightedNodes(new Set());
    setProcessingNode(null);
    setFoundNode(null);
    setIsAnimating(false);
  };

  const createRandomTree = () => {
    clearTree();
    const values = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
    values.forEach(val => bst.insert(val));
    setRoot(bst.root);
    setMessage('Random tree created with 12 nodes');
  };

  const showInorderTraversal = () => {
    if (!bst.root) {
      setMessage('Tree is empty');
      return;
    }
    const result = bst.inorderTraversal();
    const nodes = bst.getAllNodes();
    setMessage(`Inorder: ${result.join(', ')}`);
    setHighlightedNodes(new Set(nodes.map(n => n.id)));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Binary Search Tree Visualizer</h1>
        <p>Interact with BST operations and see animations</p>
      </header>

      <div className="controls">
        <div className="input-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && insertNumber()}
            placeholder="Enter a number"
            className="input"
          />
        </div>

        <div className="button-group">
          <button onClick={insertNumber} className="btn btn-insert">
            Insert
          </button>
          <button onClick={searchNumber} className="btn btn-search">
            Search
          </button>
          <button onClick={removeNumber} className="btn btn-remove">
            Remove
          </button>
          <button onClick={clearTree} className="btn btn-clear">
            Clear
          </button>
          <button onClick={createRandomTree} className="btn btn-random">
            Random Tree
          </button>
          <button onClick={showInorderTraversal} className="btn btn-traverse">
            Inorder
          </button>
        </div>

        <div className="speed-control">
          <label>Speed: </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span>{speed}x</span>
        </div>
      </div>

      <div className="canvas-container">
        <TreeCanvas
          root={root}
          highlightedNodes={highlightedNodes}
          processingNode={processingNode}
          foundNode={foundNode}
        />
      </div>

      <div className="message-box">
        {message || 'Ready for operations...'}
      </div>

      {isAnimating && (
        <div className="animation-controls">
          <span className="step-indicator">
            Step {currentStep + 1} / {animationSteps.length}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
