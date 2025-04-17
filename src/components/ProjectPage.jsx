import React, { useRef, useState, useEffect } from 'react'
import '../styles/Projectpage.css'

export default function ProjectPage() {

    const canva = useRef(null)
    const [startAddVtx, stopAddVtx] = useState(false)
    const [Vertix_data, updateWord] = useState("Add Vertex")

    const [addedge, setaddedge] = useState(false)
    const [edges, setedges] = useState([]);
    const [selectedVertix, setSelectedVertix] = useState([]) 

    const [circleArray, setCircleArray] = useState([])

    function Circle(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius

        this.draw = (ptr, i) => {
            ptr.beginPath();
            ptr.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ptr.fillStyle = "black"
            ptr.fill()
            ptr.stroke()

            ptr.fillStyle = "white";
            ptr.font = "20px Arial";
            ptr.textAlign = "center";
            ptr.textBaseline = "middle";
            ptr.fillText(i, this.x, this.y);
        }
    }

    function ConnectLine(startCircle, endCircle) {
        this.start = startCircle;
        this.end = endCircle;

        this.draw = (ptr) => {
            ptr.beginPath();
            ptr.moveTo(this.start.x, this.start.y);
            ptr.lineTo(this.end.x, this.end.y);
            ptr.stroke();
        };
    }

    const DrawCanvas = () => {
        const cnva = canva.current
        const ptr = cnva.getContext("2d")

        cnva.width = cnva.getBoundingClientRect().width;
        cnva.height = cnva.getBoundingClientRect().height;

        // Clear Cnava
        ptr.clearRect(0, 0, cnva.width, cnva.height);

        edges.forEach(edge => edge.draw(ptr));
        let i = 1;
        circleArray.forEach(circle => circle.draw(ptr, i++));
    }

    const getCircle = (e) => {
        const cnva = canva.current;
        const rect = cnva.getBoundingClientRect();

        const xpos = e.clientX - rect.left;
        const ypos = e.clientY - rect.top;

        if (addedge) {
            const clickedCircle = circleArray.find((circle) => {
                let cx = xpos - circle.x;
                let cy = ypos - circle.y;
                return Math.sqrt(cx * cx + cy * cy) <= circle.radius;
            });

            if (clickedCircle) {
                const selection = [...selectedVertix, clickedCircle];
                setSelectedVertix(selection)

                if (selection.length === 2) { 
                    const newline = new ConnectLine(selection[0], selection[1]);
                    const Newedge = [...edges, newline]
                    setedges(Newedge);
                    setSelectedVertix([]);
                }
            }
        } else if (startAddVtx) {
            let circle = new Circle(xpos, ypos, 25)
            const newCircle = [...circleArray, circle]
            setCircleArray(newCircle)
        }
    }

    //redraw state when updates is hapenning on rerender
    useEffect(() => {
        DrawCanvas();
    }, [circleArray, edges]);

    const clearTheCanva = () => {
        setCircleArray([])
        setedges([])
        const cnva = canva.current;
        let ptr = cnva.getContext("2d");
        ptr.clearRect(0, 0, cnva.width, cnva.height);
    };

    const Make_Vertex = () => {
        if (addedge === true) {
            setaddedge(!addedge);
        }

        if (startAddVtx === true) {
            updateWord("Add Vertex")
        } else {
            updateWord("Stop Adding")
        }
        stopAddVtx(!startAddVtx);
    }

    const Add_edge = () => {
        if (startAddVtx === false && addedge === false || addedge === true && startAddVtx === false) {
            setaddedge(!addedge);
            return;
        }

        if (startAddVtx === true && addedge === false) {
            stopAddVtx(!startAddVtx);
            setaddedge(!addedge);
            updateWord("Add Vertex");
        } else {
            stopAddVtx(!startAddVtx);
            updateWord("Stop Adding");
        }
    }

    
    return (
        <div className="container">

            <canvas ref={canva} onClick={getCircle} className="canvas" style={{ border: "1px solid #000000" }} />

            <div className="display-panel">
                <div className="top-panel">
                    <h1>Operations</h1>
                    <h1>
                        Mode: <span className="mode-name">Pointer</span>
                    </h1>
                </div>
                <div className="operations"></div>
            </div>

            <div className="controls">
                <h2>Controls</h2>

                <div className="right">
                    <form>
                        <label><b>Starting Node</b></label>
                        <input type="text" name="message" className="start-node" />
                    </form>
                </div>

                <div className="left">
                    <button onClick={Make_Vertex} className="vertexButton" data-clicked="false">{Vertix_data}</button>
                    <button onClick={Add_edge} className="edgeButton" data-clicked="false">{!addedge ? "Add Edge" : "Stop Edge"}</button>
                    <button className="bfsButton">BFS</button>
                    <button className="dfsButton">DFS</button>
                    <button onClick={clearTheCanva} className="clearCanvas">Clear Canvas</button>
                </div>

            </div>
        </div>
    )
}
