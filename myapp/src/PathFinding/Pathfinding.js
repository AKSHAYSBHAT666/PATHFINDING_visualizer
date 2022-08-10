import React,{useEffect,useState} from "react";
import Node from "./Node/Node.js"
import Astar from "./Algorithms/Astar.js"
import Astar8 from "./Algorithms/Astar8.js"
import Dijkstra from "./Algorithms/Dijkstra.js";
import Dijkstra8 from "./Algorithms/Dijkstra8.js";
import "./Pathfinding.css"

const row=40;
const col=50;


const NODE_START_ROW=Math.floor(Math.random() * (row-2));
const NODE_END_ROW=row-1;
const NODE_START_COL=Math.floor(Math.random() * (col-2));
const NODE_END_COL=col-1;

const Pathfinding =()=>{

    const [Grid,setGrid]=useState([]);
    const [Path1,setPath1]=useState([]);
    const [VisitedNodes1,setVisitedNodes1]=useState([]);
    const [Path2,setPath2]=useState([]);
    const [VisitedNodes2,setVisitedNodes2]=useState([]);
    const [Path3,setPath3]=useState([]);
    const [VisitedNodes3,setVisitedNodes3]=useState([]);
    const [Path4,setPath4]=useState([]);
    const [VisitedNodes4,setVisitedNodes4]=useState([]);

    useEffect(()=>{
        // eslint-disable-next-line 
        initializegrid();
        // eslint-disable-next-line 
    },[]);

    const initializegrid=()=>{

    const grid=new Array(row);
    
        for(let j=0;j<col;j++)
        {
            grid[j]=new Array(col);
        }
    createSpot(grid);
    setGrid(grid);
    addNeighbours(grid);
    addNeighbours8(grid);

    const startNode=grid[NODE_START_ROW][NODE_START_COL];
    const endNode=grid[NODE_END_ROW][NODE_END_COL];
    startNode.isWall=false;
    endNode.isWall=false;
    let path1=Astar(startNode,endNode);
    
        setPath1(path1.path);
        setVisitedNodes1(path1.visitedNodes);
    
    //console.log(res);
    let path2=Dijkstra(startNode,endNode);
    
        setPath2(path2.path);
        setVisitedNodes2(path2.visitedNodes);

    let path3=Astar8(startNode,endNode);
    
        setPath3(path3.path);
        setVisitedNodes3(path3.visitedNodes);
    
    let path4=Dijkstra8(startNode,endNode);
        setPath4(path4.path);
        setVisitedNodes4(path4.visitedNodes);
    
};

const createSpot=(grid)=>{
    for(let i=0;i<row;i++)
    {
        for(let j=0;j<col;j++)
        {
            grid[i][j]=new Spot(i,j);
        }
    }
}

const addNeighbours=function(grid){
    for(let i=0;i<row;i++)
    {
        for(let j=0;j<col;j++)
        {
            grid[i][j].addneighbours(grid);
        }
    }
}

const addNeighbours8=function(grid){
    for(let i=0;i<row;i++)
    {
        for(let j=0;j<col;j++)
        {
            grid[i][j].addneighbours8(grid);
        }
    }
}

function Spot(i,j)
{
    this.x=i;
    this.y=j;
    this.isStart=this.x===NODE_START_ROW && this.y===NODE_START_COL;
    this.isEnd=this.x===NODE_END_ROW && this.y===NODE_END_COL;
    this.g=0;
    this.f=0;
    this.h=0;
    this.isWall=false;
    this.Neighbours=[];
    this.Neighbours8=[];
    this.previous=undefined;

    if(Math.random(1)<0.2)
    {
        this.isWall=true;
    }

    this.addneighbours=function(grid){
        let i=this.x;
        let j=this.y;

        if( i > 0 )
        {
            this.Neighbours.push(grid[i-1][j]);
        }
        if( i < row-1  )
        {
            this.Neighbours.push(grid[i+1][j]);
        }
        if( j>0 )
        {
            this.Neighbours.push(grid[i][j-1]);
        }
        if( j<col-1 )
        {
            this.Neighbours.push(grid[i][j+1]);
        }
    }

    this.addneighbours8=function(grid){
        let i=this.x;
        let j=this.y;

        if( i > 0 )
        {
            this.Neighbours8.push(grid[i-1][j]);
        }
        if( i < row-1  )
        {
            this.Neighbours8.push(grid[i+1][j]);
        }
        if( j>0 )
        {
            this.Neighbours8.push(grid[i][j-1]);
        }
        if( j<col-1 )
        {
            this.Neighbours8.push(grid[i][j+1]);
        }
        if(i>0 && j>0)
        {
            this.Neighbours8.push(grid[i-1][j-1]);
        }
        if(i>0 && j<col-1)
        {
            this.Neighbours8.push(grid[i-1][j+1]);
        }
        if(i<row-1 && j>0)
        {
            this.Neighbours8.push(grid[i+1][j-1]);
        }
        if(i<row-1 && j<col-1)
        {
            this.Neighbours8.push(grid[i+1][j+1]);
        }
    }

}
//console.log("GRID:");
const gridwithNode=(
    <div className="parent">
        {Grid.map((row,rowIndex)=>{
            return(
                <div key={rowIndex} className="rowWrapper">
                {
                    row.map((col,colIndex)=>{
                        const {isStart,isEnd,isWall}=col;
                        //console.log(Grid[rowIndex][colIndex].wall);
                        return <Node key={colIndex} isStart={isStart} isEnd={isEnd} isWall={isWall} row={rowIndex} col={colIndex}/>
                    })
                }
                </div>
            )
        })}
    </div>
);

const visualizeShortestPathAstar=(ShortestPathNodes)=>{

    
    for(let i=0;i<ShortestPathNodes.length;i++)
    {
       
        setTimeout(()=>{
            const node=ShortestPathNodes[i];
            document.getElementById(`node ${node.x} ${node.y}`).className='node node-shortest-path';
        },40*i);
    }

}

const visualizeastar=()=>{
    
    const startingtime=+new Date();
    for(let i=0;i<VisitedNodes1.length;i++)
    {
        if(i===VisitedNodes1.length-1)
        {
            
            setTimeout(()=>{
            visualizeShortestPathAstar(Path1);
        },20*i);
        }
        else
        {
            
            setTimeout(()=>{
                const node=VisitedNodes1[i];
                document.getElementById(`node ${node.x} ${node.y}`).className='node node-visited';
            },20*i);
            
        }
        
    }
    const endingtime=+new Date();
    const time=endingtime-startingtime;
    console.log(+time);
}

const visualizeShortestPathDijkstra=(ShortestPathNodes)=>{

    
    for(let i=0;i<ShortestPathNodes.length;i++)
    {
       
        setTimeout(()=>{
            const node=ShortestPathNodes[i];
            document.getElementById(`node ${node.x} ${node.y}`).className='node node-shortest-path';
        },40*i);
    }

}

const visualizedijkstra=()=>{
    
    const startingtime=+new Date();
    for(let i=0;i<VisitedNodes2.length;i++)
    {
        if(i===VisitedNodes2.length-1)
        {
            
            setTimeout(()=>{
            visualizeShortestPathDijkstra(Path2);
        },20*i);
        }
        else
        {
            
            setTimeout(()=>{
                const node=VisitedNodes2[i];
                document.getElementById(`node ${node.x} ${node.y}`).className='node node-visited';
            },20*i);
            
        }
        
    }
    const endingtime=+new Date();
    const time=endingtime-startingtime;
    console.log(+time);
}

const visualizeShortestPathAstar8=(ShortestPathNodes)=>{

    
    for(let i=0;i<ShortestPathNodes.length;i++)
    {
       
        setTimeout(()=>{
            const node=ShortestPathNodes[i];
            document.getElementById(`node ${node.x} ${node.y}`).className='node node-shortest-path';
        },40*i);
    }

}

const visualizeastar8=()=>{
    
    const startingtime=+new Date();
    for(let i=0;i<VisitedNodes3.length;i++)
    {
        if(i===VisitedNodes3.length-1)
        {
            
            setTimeout(()=>{
            visualizeShortestPathAstar8(Path3);
        },20*i);
        }
        else
        {
            
            setTimeout(()=>{
                const node=VisitedNodes3[i];
                document.getElementById(`node ${node.x} ${node.y}`).className='node node-visited';
            },20*i);
            
        }
        
    }
    const endingtime=+new Date();
    const time=endingtime-startingtime;
    console.log(+time);
}

const visualizeShortestPathDijkstra8=(ShortestPathNodes)=>{

    
    for(let i=0;i<ShortestPathNodes.length;i++)
    {
       
        setTimeout(()=>{
            const node=ShortestPathNodes[i];
            document.getElementById(`node ${node.x} ${node.y}`).className='node node-shortest-path';
        },40*i);
    }

}

const visualizedijkstra8=()=>{
    
    const startingtime=+new Date();
    for(let i=0;i<VisitedNodes4.length;i++)
    {
        if(i===VisitedNodes4.length-1)
        {
            
            setTimeout(()=>{
            visualizeShortestPathDijkstra8(Path4);
        },20*i);
        }
        else
        {
            
            setTimeout(()=>{
                const node=VisitedNodes4[i];
                document.getElementById(`node ${node.x} ${node.y}`).className='node node-visited';
            },20*i);
            
        }
        
    }
    const endingtime=+new Date();
    const time=endingtime-startingtime;
    console.log(+time);
}

//console.log(Grid);
//console.log(Path);
   return(
       
       <div className="Wrapper">
        <div class="center_div">
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        </style>
            <h1>PATHFINDER</h1>
        </div>
       
	
        <div className="btn1" ><button onClick={visualizeastar}>A* Path Algorithm (4 directional)</button>
        </div>
        <div className="btn2"><button onClick={visualizedijkstra}>Dijkstra Algorithm (4 directional)</button>
        </div>
        <div className="btn3"><button onClick={visualizeastar8}>A* Path Algorithm (8 directional!)</button>
        </div>
        <div className="btn4"><button onClick={visualizedijkstra8}>Dijkstra Algorithm (8 directional!)</button>
        </div>
        
        <div className="finalgrid"></div>
           {gridwithNode}
       </div>
   )
}

export default Pathfinding;