export const QuickSort = async (circleArray, setCircleArray, canva, moveCircle, sleep, abortSort) => {

    if (abortSort.current) return;

    const canvas = canva.current;
    const rect = canvas.getBoundingClientRect();

    const spacing = 100;
    const totalWidth = (circleArray.length - 1) * spacing;
    const startX = (rect.width - totalWidth) / 2;
    const centerY = rect.height / 2;

    const newArray = [...circleArray];

    // Initial positioning
    newArray.forEach((circle, i) => {
        circle.x = startX + i * spacing;
        circle.y = centerY;
    });
    setCircleArray([...newArray]);

    const updateXPositions = async () => {
        if (abortSort.current) return;
        for (let i = 0; i < newArray.length; i++) {
            if (abortSort.current) return;
            const targetX = startX + i * spacing;
            if (newArray[i].x !== targetX) {
                await moveCircle(newArray[i], targetX);
                newArray[i].x = targetX;
            }
        }
        setCircleArray([...newArray]);
    };

    const partition = async (low, high) => {
        if (abortSort.current) return;

        const pivotValue = parseInt(newArray[low].id);
        newArray[low].color = "red";
        setCircleArray([...newArray]);
        await sleep(1000);
        if (abortSort.current) return;

        let i = low + 1;
        let j = high;

        while (i <= j) {
            if (abortSort.current) return;
            while (i <= high && parseInt(newArray[i].id) <= pivotValue) i++;
            while (j >= low + 1 && parseInt(newArray[j].id) >= pivotValue) j--;

            if (i < j) {
                const temp = newArray[i];
                newArray[i] = newArray[j];
                newArray[j] = temp;
                await updateXPositions();
                await sleep(1000);
                if (abortSort.current) return;
            }
        }

        // Swap pivot (low) with j
        const temp = newArray[low];
        newArray[low] = newArray[j];
        newArray[j] = temp;
        await updateXPositions();
        await sleep(1000);
        if (abortSort.current) return;

        newArray[j].color = "green"; // Mark as placed
        setCircleArray([...newArray]);

        return j;
    };

    const quickSortRecursive = async (low, high) => {
        if (abortSort.current) return;
        if (low < high) {
            const pivotIndex = await partition(low, high);
            await quickSortRecursive(low, pivotIndex - 1);
            await quickSortRecursive(pivotIndex + 1, high);
        } else if (low === high) {
            if (abortSort.current) return;
            newArray[low].color = "green";
            setCircleArray([...newArray]);
        }
    };

    await quickSortRecursive(0, newArray.length - 1);

    if (abortSort.current) return;

    // Final pass to ensure all circles are marked sorted
    newArray.forEach(circle => {
        circle.color = "green";
        circle.textColor = "white";
    });
    setCircleArray([...newArray]);
};
