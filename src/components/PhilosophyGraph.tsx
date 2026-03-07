'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface GraphNode {
  id: string;
  name: string;
  type: string;
  group: string;
}

interface GraphLink {
  source: string;
  target: string;
  type: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface PhilosophyGraphProps {
  highlightedNode?: string | null;
  onNodeClick?: (nodeId: string) => void;
}

export function PhilosophyGraph({ highlightedNode, onNodeClick }: PhilosophyGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    
    // Load graph data
    fetch('/graph-data.json')
      .then(res => res.json())
      .then(data => setGraphData(data))
      .catch(err => console.error('Failed to load graph data:', err));
  }, []);

  const nodeColors = useMemo(() => ({
    philosopher: '#c9a962',
    concept: '#4fc3f7',
    work: '#81c784',
  }), []);

  const getNodeColor = (node: GraphNode) => {
    if (highlightedNode === node.id) return '#ff6b6b';
    return nodeColors[node.type as keyof typeof nodeColors] || '#888';
  };

  if (!isClient) {
    return (
      <div ref={containerRef} style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 12
      }}>
        <p style={{ color: '#c9a962', fontFamily: '"Vazir", serif' }}>Loading the Graph of Being...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      background: 'radial-gradient(ellipse at center, rgba(201,169,98,0.1) 0%, transparent 70%)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <ForceGraph
        graphData={graphData}
        nodeColors={nodeColors}
        highlightedNode={highlightedNode}
        getNodeColor={getNodeColor}
        onNodeClick={onNodeClick || ((id) => router.push(`/philosophers/${id}`))}
      />
    </div>
  );
}

// Simple force-directed graph implementation
function ForceGraph({ 
  graphData, 
  nodeColors, 
  highlightedNode, 
  getNodeColor,
  onNodeClick,
}: {
  graphData: GraphData | null;
  nodeColors: Record<string, string>;
  highlightedNode: string | null | undefined;
  getNodeColor: (node: GraphNode) => string;
  onNodeClick: (id: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; vx: number; vy: number }>>({});
  const animationRef = useRef<number | null>(null);

  // Initialize positions
  useEffect(() => {
    if (!graphData?.nodes) return;
    
    const initialPositions: Record<string, { x: number; y: number; vx: number; vy: number }> = {};
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    graphData.nodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / graphData.nodes.length;
      const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
      initialPositions[node.id] = {
        x: centerX + radius * Math.cos(angle) + (Math.random() - 0.5) * 50,
        y: centerY + radius * Math.sin(angle) + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0,
      };
    });
    
    setPositions(initialPositions);
  }, [graphData, dimensions]);

  // Force simulation
  useEffect(() => {
    if (!graphData?.nodes || !graphData?.links || Object.keys(positions).length === 0) return;

    const simulate = () => {
      const newPositions = { ...positions };
      const alpha = 0.1;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      // Apply forces
      graphData.nodes.forEach(node => {
        const pos = newPositions[node.id];
        if (!pos) return;
        
        // Center gravity
        pos.vx += (centerX - pos.x) * alpha * 0.001;
        pos.vy += (centerY - pos.y) * alpha * 0.001;
        
        // Repulsion between nodes
        graphData.nodes.forEach(other => {
          if (other.id === node.id) return;
          const otherPos = newPositions[other.id];
          if (!otherPos) return;
          
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          
          if (dist < 100) {
            const force = 1000 / (dist * dist);
            pos.vx += (dx / dist) * force * alpha;
            pos.vy += (dy / dist) * force * alpha;
          }
        });
      });
      
      // Link attraction
      graphData.links.forEach(link => {
        const source = newPositions[link.source];
        const target = newPositions[link.target];
        if (!source || !target) return;
        
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        
        const force = (dist - 80) * alpha * 0.05;
        source.vx += (dx / dist) * force;
        source.vy += (dy / dist) * force;
        target.vx -= (dx / dist) * force;
        target.vy -= (dy / dist) * force;
      });
      
      // Update positions
      graphData.nodes.forEach(node => {
        const pos = newPositions[node.id];
        if (!pos) return;
        
        // Damping
        pos.vx *= 0.9;
        pos.vy *= 0.9;
        
        // Update position
        pos.x += pos.vx;
        pos.y += pos.vy;
        
        // Boundary
        pos.x = Math.max(50, Math.min(dimensions.width - 50, pos.x));
        pos.y = Math.max(50, Math.min(dimensions.height - 50, pos.y));
      });
      
      setPositions(newPositions);
      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [graphData, positions, dimensions]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!graphData) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <svg 
      ref={svgRef}
      width={dimensions.width} 
      height={dimensions.height}
      style={{ cursor: 'grab' }}
    >
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#c9a962" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#c9a962" stopOpacity={0} />
        </radialGradient>
      </defs>
      
      {/* Links */}
      {graphData.links.map((link, i) => {
        const source = positions[link.source];
        const target = positions[link.target];
        if (!source || !target) return null;
        
        return (
          <line
            key={i}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke={highlightedNode === link.source || highlightedNode === link.target ? '#ff6b6b' : 'rgba(201, 169, 98, 0.2)'}
            strokeWidth={highlightedNode === link.source || highlightedNode === link.target ? 2 : 1}
          />
        );
      })}
      
      {/* Nodes */}
      {graphData.nodes.map(node => {
        const pos = positions[node.id];
        if (!pos) return null;
        
        const isHighlighted = highlightedNode === node.id;
        const isConnected = graphData.links.some(
          l => l.source === highlightedNode || l.target === highlightedNode
        ) && graphData.links.some(l => l.source === node.id || l.target === node.id);
        
        return (
          <g 
            key={node.id}
            transform={`translate(${pos.x}, ${pos.y})`}
            onClick={() => onNodeClick(node.id)}
            style={{ cursor: 'pointer' }}
          >
            {isHighlighted && (
              <circle
                r={30}
                fill="url(#nodeGlow)"
                opacity={0.5}
              />
            )}
            <circle
              r={isHighlighted ? 12 : node.type === 'philosopher' ? 8 : 5}
              fill={getNodeColor(node)}
              opacity={isHighlighted ? 1 : isConnected ? 0.8 : 0.5}
              stroke={isHighlighted ? '#fff' : 'transparent'}
              strokeWidth={2}
            />
            <text
              y={isHighlighted ? 25 : 18}
              textAnchor="middle"
              fill={isHighlighted ? '#fff' : 'rgba(255,255,255,0.7)'}
              fontSize={isHighlighted ? 12 : 10}
              fontFamily='"Vazir", serif'
              style={{ pointerEvents: 'none' }}
            >
              {node.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default PhilosophyGraph;
