export const InsertionSort = async (circleArray, setCircleArray, canva, moveCircle, sleep, abortSort) => {


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

    for (let i = 1; i < newArray.length; i++) {

        if (abortSort.current) return;

        let j = i;
        const key = newArray[i];

        key.color = "orange";
        key.textColor = "blue";
        setCircleArray([...newArray]);
        await sleep(800);
        if (abortSort.current) return;

        while (j > 0 && parseInt(newArray[j - 1].id) > parseInt(key.id)) {
            if (abortSort.current) return;

            newArray[j] = newArray[j - 1];
            j--;
        }
        newArray[j] = key;

        // Recalculate x positions and animate them
        for (let k = 0; k <= i; k++) {
            if (abortSort.current) return;

            const targetX = startX + k * spacing;
            if (newArray[k].x !== targetX) {
                await moveCircle(newArray[k], targetX);
                newArray[k].x = targetX;
            }
        }

        // Set colors
        for (let k = 0; k <= i; k++) {
            newArray[k].color = "green";
            newArray[k].textColor = "white";
        }

        for (let k = i + 1; k < newArray.length; k++) {
            newArray[k].color = "black";
            newArray[k].textColor = "white";
        }

        setCircleArray([...newArray]);
        await sleep(800);
        if (abortSort.current) return;

    }

    // Final update
    newArray.forEach(circle => {
        circle.color = "green";
        circle.textColor = "white";
    });
    setCircleArray([...newArray]);
};
