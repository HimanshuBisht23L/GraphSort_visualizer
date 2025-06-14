import { useRef, useState, useEffect } from 'react';
import '../styles/SortingViso.css';
import { useNavigate } from 'react-router-dom';
import { BubbleSort } from './Algorithms/BubbleSort.jsx'
import { SelectionSort } from './Algorithms/SelectionSort.jsx'
import { InsertionSort } from './Algorithms/InsertionSort.jsx'
import { QuickSort } from './Algorithms/QuickSort.jsx';
import { MergeSort } from './Algorithms/MergeSort.jsx';

export default function SortingViso() {
    const canva = useRef(null);
    const [startVal, setStartVal] = useState("");
    const [circleArray, setCircleArray] = useState([]);
    const [edges, setedges] = useState([]);
    const [whichSort, setWhichsort] = useState("BubbleSort");
    const [running, setrunning] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const abortSort = useRef(false);
    const navigate = useNavigate();

    function Circle(id, x, y, radius, color, textColor) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.textColor = textColor;
        this.draw = (ctx) => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = this.textColor;
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.id, this.x, this.y);
        };
    }


    const DrawCanvas = () => {
        const canvas = canva.current;
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        edges.forEach(edge => edge.draw(ctx));
        circleArray.forEach(circle => circle.draw(ctx));
    };

    useEffect(() => {
        DrawCanvas();
    }, [circleArray, edges]);

    const Make_Vertex = () => {
        setDeleteMode(false)
        if (!startVal) return;


        if (circleArray.length >= 14) {
            alert("You Can't Add More")
            return;
        }

        const canvas = canva.current;
        const rect = canvas.getBoundingClientRect();

        const updatedArray = [...circleArray, new Circle(startVal, 0, 0, 30, "black", "white")]; // temporary x/y

        const spacing = 100;
        const totalWidth = (updatedArray.length - 1) * spacing;
        const startX = (rect.width - totalWidth) / 2;
        const centerY = rect.height / 2;

        updatedArray.forEach((circle, i) => {
            circle.x = startX + i * spacing;
            circle.y = centerY;
        });

        setCircleArray(updatedArray);
        setStartVal("");
    };


    useEffect(() => {
        const canvas = canva.current;
        if (!canvas) return;

        const handleClick = (e) => {
            if (!deleteMode) return;

            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Find if any circle is clicked
            const clickedIndex = circleArray.findIndex(circle => {
                const dx = mouseX - circle.x;
                const dy = mouseY - circle.y;
                return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
            });

            if (clickedIndex !== -1) {
                const updatedCircles = [...circleArray];
                updatedCircles.splice(clickedIndex, 1);
                setCircleArray(updatedCircles);
                setDeleteMode(false);
            }
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener("click", handleClick);
    }, [deleteMode, circleArray]);




    const clearTheCanva = () => {
        abortSort.current = true;
        setCircleArray([]);
        setedges([]);
        const ctx = canva.current.getContext("2d");
        ctx.clearRect(0, 0, canva.current.width, canva.current.height);
    };

    const goback = () => {
        clearTheCanva();
        navigate("/Test");
    };



    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const moveCircle = (circle, targetX, duration = 300) => {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const startX = circle.x;

            const animate = (currentTime) => {

                if (abortSort.current) return;

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                circle.x = startX + (targetX - startX) * progress;

                setCircleArray(prev => [...prev]); // re-render
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    };




    const AnimateSort = async () => {
        console.log("Selected Sort:", whichSort);

        if (running) {
            return;
        }

        abortSort.current = false;

        setrunning(true);
        if (whichSort == "BubbleSort") {
            await BubbleSort(circleArray, setCircleArray, canva, moveCircle, sleep, abortSort);
        }
        else if (whichSort == "SelectionSort") {
            await SelectionSort(circleArray, setCircleArray, canva, moveCircle, sleep, abortSort);
        }
        else if (whichSort == "InsertionSort") {
            await InsertionSort(circleArray, setCircleArray, canva, moveCircle, sleep, abortSort);
        }
        else if (whichSort == "QuickSort") {
            await QuickSort(circleArray, setCircleArray, canva, moveCircle, sleep, abortSort);
        }
        else if (whichSort == "MergeSort") {
            await MergeSort(circleArray, setCircleArray, canva, moveCircle, sleep, abortSort);
        }
        setrunning(false);


    }




    return (
        <div className="container">
            <canvas
                ref={canva}
                className="canvas"
                style={{ border: "1px solid #000" }}
            />
            <div className="controls">
                <h2>Controls</h2>
                <div className="right">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label><b>Add Number</b></label>
                        <input
                            type="number"
                            className="start-node"
                            max={99999}
                            onChange={(e) => {
                                if (e.target.value.length <= 5) setStartVal(e.target.value);
                            }}

                            value={startVal}
                            placeholder="Enter node value"
                            onKeyDown={(e) => {
                                e.key == "Enter" ? Make_Vertex() : ""
                            }}
                        />
                    </form>
                </div>
                <div className="left">
                    <button onClick={Make_Vertex} className="vertexButton">Add Node</button>

                    <button
                        onClick={() => {
                            circleArray.length === 0 ? undefined : setDeleteMode(prev => !prev)
                        }}
                        className={`deleteBTN ${deleteMode ? "active" : ""}`}
                    >
                        {deleteMode ? "Cancel Delete" : "Delete Node"}
                    </button>


                    <select
                        name="sortings"
                        className="selectbtns"
                        onChange={(e) => setWhichsort(e.target.value)}
                    >
                        <option value="BubbleSort">BubbleSort</option>
                        <option value="InsertionSort">InsertionSort</option>
                        <option value="SelectionSort">SelectionSort</option>
                        <option value="QuickSort">QuickSort</option>
                        <option value="MergeSort">MergeSort</option>
                    </select>
                    <button onClick={AnimateSort} className="runBTN">Start</button>
                    <button onClick={clearTheCanva} className="clearCanvas">Clear Canvas</button>
                    <button onClick={goback} className="goback">Back</button>
                </div>
            </div>
        </div>
    );
}
