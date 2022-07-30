// Storage 
let graphComponentMatrix = [];

for(let i=0; i<rows; i++) {
    let row = [];
    for(let j=0; j<cols; j++) {
        // dependencies array for each cell
        row.push([]);
    }
    graphComponentMatrix.push(row);
}


function isGraphCyclic(graphComponentMatrix) {
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

    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if(!visited[i][j]) {
                let hasCycle = dfsCycleDetection(graphComponentMatrix,i,j,visited, dfsvisited);
                if(hasCycle === true)
                    return [i,j];
            }
        }
    }

    return null;
}

function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsvisited) {
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    for(let child=0; child < graphComponentMatrix[srcr][srcc].length; child++) {
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][child];
        if(visited[crid][ccid] === false) {
            let hasCycle = dfsCycleDetection(graphComponentMatrix, crid, ccid, visited, dfsvisited);
            if(hasCycle === true)
                return true;
        }
        else if(dfsvisited[crid][ccid] === true)
            return true;
    }

    dfsvisited[srcr][srcc] = false;
    return false;
}