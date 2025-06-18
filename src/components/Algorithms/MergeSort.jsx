export const MergeSort = async (circleArray, setCircleArray, canva, moveCircle, sleep, abortSort) => {
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

    const updatePositions = async (array, offsetY = 0) => {
        if (abortSort.current) return;
        for (let i = 0; i < array.length; i++) {
            if (abortSort.current) return;
            const targetX = startX + i * spacing;
            const targetY = centerY + offsetY;
            await moveCircle(array[i], targetX, targetY);
            array[i].x = targetX;
            array[i].y = targetY;
        }
        setCircleArray([...newArray]);
    };

    const merge = async (left, mid, right) => {
        if (abortSort.current) return;

        const leftArr = newArray.slice(left, mid + 1);
        const rightArr = newArray.slice(mid + 1, right + 1);

        // dividing phase
        leftArr.forEach(c => c.color = "orange");
        rightArr.forEach(c => c.color = "blue");
        setCircleArray([...newArray]);
        await sleep(800);
        if (abortSort.current) return;

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            if (abortSort.current) return;

            if (parseInt(leftArr[i].id) <= parseInt(rightArr[j].id)) {
                newArray[k] = leftArr[i];
                i++;
            } else {
                newArray[k] = rightArr[j];
                j++;
            }
            k++;
        }

        while (i < leftArr.length) {
            if (abortSort.current) return;
            newArray[k] = leftArr[i];
            i++;
            k++;
        }

        while (j < rightArr.length) {
            if (abortSort.current) return;
            newArray[k] = rightArr[j];
            j++;
            k++;
        }

        // merge phase with color
        for (let idx = left; idx <= right; idx++) {
            newArray[idx].color = "green";
        }
        await updatePositions(newArray);
        await sleep(800);
        if (abortSort.current) return;
    };

    const mergeSortRecursive = async (left, right) => {
        if (abortSort.current) return;
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        await mergeSortRecursive(left, mid);
        await mergeSortRecursive(mid + 1, right);
        await merge(left, mid, right);
    };

    await mergeSortRecursive(0, newArray.length - 1);

    newArray.forEach(circle => {
        circle.color = "green";
        circle.textColor = "white";
    });
    setCircleArray([...newArray]);
};
