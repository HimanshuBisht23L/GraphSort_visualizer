export const runDFS = async (AddOutput, circleArray, setCircleArray, DrawCanvas, Adjlist, key, abortTraversal) => {
    if (abortTraversal.current) return;

    let visited = new Array(circleArray.length).fill(false);
    let result = [];

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    AddOutput.current.innerHTML += `<br><br><span style="font-size: large; font-weight: bold; margin: 12px;">DFS : </span>`;

    const DFSCode = async (node) => {
        if (abortTraversal.current) return;
        visited[node] = true;
        result.push(node);

        for (let i = 0; i < circleArray.length; i++) {
            if (abortTraversal.current) return;
            if (parseInt(circleArray[i].id) === node) {
                circleArray[i].color = "green";
                setCircleArray([...circleArray]);
                DrawCanvas();
                await delay(1000);
                if (abortTraversal.current) return;

                if (AddOutput.current) {
                    AddOutput.current.innerHTML += `<span style="font-weight: bold; font-size: large; margin: 12px;">${node}</span>`;
                }

                circleArray[i].color = "black";
                setCircleArray([...circleArray]);
                DrawCanvas();
                break;
            }
        }

        // Sorting neighbors before recursive call
        for (const neighbor of [...(Adjlist[node] || [])].sort((a, b) => a - b)) {
            if (abortTraversal.current) return;
            if (!visited[neighbor]) {
                await DFSCode(neighbor);
            }
        }
    };

    await DFSCode(parseInt(key));
    console.log("DFS Result:", result);
};

export const runBFS = async (AddOutput, circleArray, setCircleArray, DrawCanvas, Adjlist, Key, abortTraversal) => {
    if (abortTraversal.current) return;

    let visited = new Array(circleArray.length).fill(false);
    let result = [];

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    AddOutput.current.innerHTML += `<br><br><span style="font-size: large; font-weight: bold; margin: 12px;">BFS : </span>`;

    const BFSCode = async (startNode) => {
        if (abortTraversal.current) return;
        let queue = [];
        queue.push(startNode);
        visited[startNode] = true;

        while (queue.length > 0) {
            if (abortTraversal.current) return;
            let node = queue.shift();
            result.push(node);

            for (let i = 0; i < circleArray.length; i++) {
                if (abortTraversal.current) return;
                if (parseInt(circleArray[i].id) === node) {
                    circleArray[i].color = "blue";
                    setCircleArray([...circleArray]);
                    DrawCanvas();
                    await delay(1000);
                    if (abortTraversal.current) return;

                    if (AddOutput.current) {
                        AddOutput.current.innerHTML += `<span style="font-weight: bold; font-size: large; margin: 12px;">${node}</span>`;
                    }

                    circleArray[i].color = "black";
                    setCircleArray([...circleArray]);
                    DrawCanvas();
                    break;
                }
            }

            // Sorting neighbors before enqueue
            for (const neighbor of [...(Adjlist[node] || [])].sort((a, b) => a - b)) {
                if (abortTraversal.current) return;
                if (!visited[neighbor]) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                }
            }
        }
    };

    await BFSCode(parseInt(Key));
    console.log("BFS Result:", result);
};
