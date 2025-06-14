
export const BubbleSort = async (circleArray, setCircleArray, canva, moveCircle, sleep, abortSort) => {

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
        if (abortSort.current) return;
        for (let j = 0; j < newArray.length - i - 1; j++) {
            if (abortSort.current) return;

            newArray[j].color = "orange";
            newArray[j + 1].color = "orange";
            newArray[j].textColor = "blue";
            newArray[j + 1].textColor = "blue";

            setCircleArray([...newArray]);
            await sleep(800);
            if (abortSort.current) return;

            if (parseInt(newArray[j].id) > parseInt(newArray[j + 1].id)) {
                const tempX = newArray[j].x;
                await Promise.all([
                    moveCircle(newArray[j], newArray[j + 1].x),
                    moveCircle(newArray[j + 1], tempX),
                ]);
                if (abortSort.current) return;

                const temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
            }

            newArray[j].color = "black";
            newArray[j + 1].color = "black";
            newArray[j].textColor = "white";
            newArray[j + 1].textColor = "white";
            setCircleArray([...newArray]);
            await sleep(800);
            if (abortSort.current) return;
        }
    }
};
