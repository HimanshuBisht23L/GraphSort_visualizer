
export const runDFS = async (AddOutput, circleArray, setCircleArray, DrawCanvas, Adjlist, key) => {
    let visited = new Array(circleArray.length).fill(false);
    let result = []


    // Reject No need 
    const delay = (ms) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    });

    // Set Heading of Algorithm
    AddOutput.current.innerHTML += `<br><br><span style="font-size: large; font-weight: bold; margin: 12px;" >DFS : </span>`;


    // Main DFS code
    const DFSCode = async (node) => {
        visited[node] = true;
        result.push(node)

        for (let i = 0; i < circleArray.length; i++) {
            if (parseInt(circleArray[i].id) == node) {
                circleArray[i].color = "green"
                setCircleArray([...circleArray])
                DrawCanvas()
                await delay(1000)


                // Adding Output in Operation Box
                if (AddOutput.current) {
                    AddOutput.current.innerHTML += `<span style="font-weight: bold; font-size: large; margin: 12px;">${node}</span>`;
                }

                circleArray[i].color = "black"
                setCircleArray([...circleArray])
                DrawCanvas()
                break;
            }

        }

        for (const element of (Adjlist[node] || [])) {
            if (!visited[element]) {
                await DFSCode(element)
            }
        }
    }

    DFSCode(parseInt(key))
    console.log(result)
};

export const runBFS = async (AddOutput, circleArray, setCircleArray, DrawCanvas, Adjlist, Key) => {
    let visited = new Array(circleArray.length).fill(false)
    let result = []

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    // Set Heading of Algorithm
    AddOutput.current.innerHTML += `<br><br><span style="font-size: large; font-weight: bold; margin: 12px;">BFS : </span>`;


    const BFSCode = async (startNode) => {
        let queue = []
        queue.push(startNode)
        visited[startNode] = true

        while (queue.length > 0) {
            let node = queue.shift()
            result.push(node)

            // Visualize Current Node
            for (let i = 0; i < circleArray.length; i++) {
                if (parseInt(circleArray[i].id) === node) {
                    circleArray[i].color = "blue"
                    setCircleArray([...circleArray])
                    DrawCanvas()
                    await delay(1000)

                    // Output
                    if (AddOutput.current) {
                        AddOutput.current.innerHTML += `<span style="font-weight: bold; font-size: large; margin: 12px;">${node}</span>`;
                    }

                    circleArray[i].color = "black"
                    setCircleArray([...circleArray])
                    DrawCanvas()
                    break
                }
            }

            // Enqueue Neighbors
            for (const neighbor of (Adjlist[node] || [])) {
                if (!visited[neighbor]) {
                    queue.push(neighbor)
                    visited[neighbor] = true
                }
            }
        }
    }

    BFSCode(parseInt(Key))
    console.log(result)
};



