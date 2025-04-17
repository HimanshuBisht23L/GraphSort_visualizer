import React, { useEffect, useRef, useState } from 'react';
import '../styles/BubbleSortVisualizer.css'

const BubbleSortVisualizer = () => {
    const canvasRef = useRef(null);
    const [circles, setCircles] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
  
    const canvasWidth = 800;
    const canvasHeight = 300;
    const radius = 20;
    const gap = 15;
  
    // Create initial circles with values and positions
    const generateCircles = () => {
      const newCircles = Array.from({ length: 10 }, (_, i) => ({
        value: Math.floor(Math.random() * 90 + 10),
        x: i * (radius * 2 + gap) + radius + 20,
        y: canvasHeight / 2,
      }));
      setCircles(newCircles);
    };
  
    const drawCircles = (ctx, circles, highlight = []) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      circles.forEach((circle, i) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = highlight.includes(i) ? 'red' : '#1976d2';
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(circle.value, circle.x, circle.y);
      });
    };
  
    const animateSwap = (i, j) => {
      return new Promise((resolve) => {
        const steps = 20;
        const c1 = { ...circles[i] };
        const c2 = { ...circles[j] };
        const dx = (c2.x - c1.x) / steps;
  
        let currentStep = 0;
        const animation = setInterval(() => {
          const newCircles = [...circles];
          newCircles[i].x += dx;
          newCircles[j].x -= dx;
          setCircles(newCircles);
          currentStep++;
  
          if (currentStep >= steps) {
            clearInterval(animation);
            const temp = newCircles[i];
            newCircles[i] = newCircles[j];
            newCircles[j] = temp;
            setCircles(newCircles);
            resolve();
          }
        }, 20);
      });
    };
  
    const bubbleSort = async () => {
      setIsSorting(true);
      const len = circles.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          const ctx = canvasRef.current.getContext('2d');
          drawCircles(ctx, circles, [j, j + 1]);
          await new Promise((r) => setTimeout(r, 300));
          if (circles[j].value > circles[j + 1].value) {
            await animateSwap(j, j + 1);
          }
        }
      }
      setIsSorting(false);
    };
  
    useEffect(() => {
      generateCircles();
    }, []);
  
    useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');
      drawCircles(ctx, circles);
    }, [circles]);

  return (
    <div className="circle-sort-container">
    <h2>Bubble Sort - Circle Animation</h2>
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="circle-canvas"
    />
    <div className="circle-buttons">
      <button onClick={generateCircles} disabled={isSorting}>Generate</button>
      <button onClick={bubbleSort} disabled={isSorting}>Sort</button>
    </div>
  </div>
  );
};

export default BubbleSortVisualizer;
