function Dijkstra(startNode,endNode)
{
    startNode.isWall=false;
    endNode.isWall=false;
    let openSet=[];
    let closedSet=[];
    let path=[];
    let visitedNodes=[];
    
    openSet.push(startNode);

    while(openSet.length>0)
    {
        let LeastIndex=0;
        for(let i=0;i<openSet.length;i++)
        {
            if(openSet[i].f < openSet[LeastIndex].f)
            {
                LeastIndex=i;
            }
        }
        let current=openSet[LeastIndex];
        visitedNodes.push(current);
        if(current === endNode )
        {
            //console.log("SUCCESS!!");
                path=[];

                let temp=current;
                path.push(temp);
                while(temp.previous)
                {
                    path.push(temp.previous);
                    temp=temp.previous;
                }
                return {path,visitedNodes};  
            
        }
        openSet=openSet.filter(x=>x!==current);
        closedSet.push(current);

        let neighbours=current.Neighbours;
        for(let i=0;i<neighbours.length;i++)
        {
            let neighbor=neighbours[i];
            if(!closedSet.includes(neighbor) && !neighbor.isWall){
            let newPath=false; 
            let tempG=current.g+1;
            if(openSet.includes(neighbor)){
                if(tempG<neighbor.g)
                {
                    neighbor.g=tempG;
                    newPath=true;
                }
            }
            else{
                neighbor.g=tempG;
                newPath=true;
                openSet.push(neighbor);
            }
            if(newPath){
                neighbor.f=neighbor.g
                neighbor.previous=current;
            }
        }
            
        }
    }
    return {path,error:"NO PATHS,NOW GTFO"}
}

export default Dijkstra;