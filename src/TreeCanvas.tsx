import React, { useEffect, useRef } from 'react';
import { TreeNode } from './BST';

interface CanvasProps {
  root: TreeNode | null;
  highlightedNodes: Set<string>;
  processingNode: string | null;
  foundNode: string | null;
}

export const TreeCanvas: React.FC<CanvasProps> = ({ root, highlightedNodes, processingNode, foundNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!root) {
      // Draw empty tree message
      ctx.fillStyle = '#999';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Tree is empty', canvas.width / 2, canvas.height / 2);
      return;
    }

    const nodePositions = new Map<string, { x: number; y: number }>();
    calculatePositions(root, canvas.width / 2, 40, canvas.width / 4, nodePositions);

    // Draw edges
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    drawEdges(root, nodePositions, ctx);

    // Draw nodes
    drawNodes(root, nodePositions, ctx, highlightedNodes, processingNode, foundNode);
  }, [root, highlightedNodes, processingNode, foundNode]);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={650}
      style={{
        border: '2px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        display: 'block',
        margin: '20px auto',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

function calculatePositions(
  node: TreeNode | null,
  x: number,
  y: number,
  offset: number,
  positions: Map<string, { x: number; y: number }>,
): void {
  if (!node) return;

  positions.set(node.id, { x, y });

  const nextOffset = Math.max(offset / 2.2, 30);

  if (node.left) {
    calculatePositions(node.left, x - offset, y + 90, nextOffset, positions);
  }
  if (node.right) {
    calculatePositions(node.right, x + offset, y + 90, nextOffset, positions);
  }
}

function drawEdges(
  node: TreeNode | null,
  positions: Map<string, { x: number; y: number }>,
  ctx: CanvasRenderingContext2D,
): void {
  if (!node) return;

  const pos = positions.get(node.id);
  if (!pos) return;

  if (node.left) {
    const leftPos = positions.get(node.left.id);
    if (leftPos) {
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(leftPos.x, leftPos.y);
      ctx.stroke();
    }
    drawEdges(node.left, positions, ctx);
  }

  if (node.right) {
    const rightPos = positions.get(node.right.id);
    if (rightPos) {
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(rightPos.x, rightPos.y);
      ctx.stroke();
    }
    drawEdges(node.right, positions, ctx);
  }
}

function drawNodes(
  node: TreeNode | null,
  positions: Map<string, { x: number; y: number }>,
  ctx: CanvasRenderingContext2D,
  highlighted: Set<string>,
  processing: string | null,
  found: string | null,
): void {
  if (!node) return;

  const pos = positions.get(node.id);
  if (!pos) return;

  const radius = 28;

  // Determine node color
  let fillColor = '#ffffff';
  let borderColor = '#333';
  let borderWidth = 2;
  let textColor = '#000';

  if (found === node.id) {
    fillColor = '#4caf50';
    borderColor = '#2e7d32';
    borderWidth = 4;
    textColor = '#ffffff';
  } else if (processing === node.id) {
    fillColor = '#ff9800';
    borderColor = '#e65100';
    borderWidth = 4;
    textColor = '#ffffff';
  } else if (highlighted.has(node.id)) {
    fillColor = '#2196f3';
    borderColor = '#1565c0';
    borderWidth = 3;
    textColor = '#ffffff';
  }

  // Draw circle
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Draw text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(node.value), pos.x, pos.y);

  // Draw children
  if (node.left) drawNodes(node.left, positions, ctx, highlighted, processing, found);
  if (node.right) drawNodes(node.right, positions, ctx, highlighted, processing, found);
}
