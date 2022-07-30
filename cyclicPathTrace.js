async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
    let visited = [];
    let dfsvisited = [];

    for(let i=0; i<rows; i++) {
        let = visitedRow = [];
        let dfsvisitedRow = [];
        for(let j=0; j<cols; j++) {
            visitedRow.push(false);
            dfsvisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsvisitedRow);
    }

    let hasCycle = await dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited, dfsvisited);
    if(hasCycle)
        return Promise.resolve(true);

    return Promise.resolve(false);
}

function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

// Coloring the cell For cycle detection path
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsvisited) {
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    
    await colorPromise(); // delay one second
    cell.style.backgroundColor = "lightblue";

    for(let child=0; child < graphComponentMatrix[srcr][srcc].length; child++) {
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][child];
        if(visited[crid][ccid] === false) {
            let hasCycle = await dfsCycleDetectionTracePath(graphComponentMatrix, crid, ccid, visited, dfsvisited);
            if(hasCycle === true) {
                await colorPromise();
                cell.style.backgroundColor = "transparent";
                return Promise.resolve(true);
            }
        }
        else if(dfsvisited[crid][ccid] === true) {
            let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();
            cell.style.backgroundColor = "transparent";

            return Promise.resolve(true);
        }
    }

    dfsvisited[srcr][srcc] = false;
    return Promise.resolve(false);
}