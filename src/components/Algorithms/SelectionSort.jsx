export const SelectionSort = async (circleArray, setCircleArray, canva, moveCircle, sleep, abortSort) => {

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

    for (let i = 0; i < newArray.length - 1; i++) {
        let minIndex = i;

        newArray[i].color = "purple"; // currently selected
        newArray[i].textColor = "white";
        setCircleArray([...newArray]);
        await sleep(500);

        for (let j = i + 1; j < newArray.length; j++) {
            newArray[j].color = "orange"; // candidate for min
            newArray[j].textColor = "blue";
            setCircleArray([...newArray]);
            await sleep(400);

            if (parseInt(newArray[j].id) < parseInt(newArray[minIndex].id)) {
                if (minIndex !== i) {
                    newArray[minIndex].color = "black"; // reset previous min
                    newArray[minIndex].textColor = "white";
                }
                minIndex = j;
            } else {
                newArray[j].color = "black";
                newArray[j].textColor = "white";
            }

            setCircleArray([...newArray]);
        }

        if (minIndex !== i) {
            const tempX = newArray[i].x;
            await Promise.all([
                moveCircle(newArray[i], newArray[minIndex].x),
                moveCircle(newArray[minIndex], tempX),
            ]);

            const temp = newArray[i];
            newArray[i] = newArray[minIndex];
            newArray[minIndex] = temp;
        }

        newArray[i].color = "green"; // sorted
        newArray[i].textColor = "white";

        if (minIndex !== i) {
            newArray[minIndex].color = "black";
            newArray[minIndex].textColor = "white";
        }

        setCircleArray([...newArray]);
        await sleep(600);
    }

    newArray[newArray.length - 1].color = "green"; // mark last as sorted
    newArray[newArray.length - 1].textColor = "white";
    setCircleArray([...newArray]);
};
