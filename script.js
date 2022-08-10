function removeArr(arr,elt){
    for(var i=arr.length-1;i>=0;i--){
        if(arr[i]==elt)
        {
            arr.splice(i,1);
        }
    }
}

function heuristic(a,b)
{
    var d=dist(a.i,a.j,b.i,b.j);
    return d;
}

var cols=50;
var rows=50;
var matrix=new Array(rows);//remember here

var openSet=[];
var closedSet=[];
var start;
var end;
var w,h;
var path=[];

function Spot(i,j)
{
    this.i=i;
    this.j=j;

    this.f=0;
    this.g=0;
    this.h=0;
    
    this.Neighbours=[];
    this.previous=undefined;

    this.Show=function(colors){
        fill(colors);
        
        noStroke();
        rect(this.i*w,this.j*h,w-1,h-1);
    }

    this.addNeighbours=function(matrix){
        var i=this.i;
        var j=this.j;

        if( i < rows-1 )
        {
            this.Neighbours.push(matrix[i+1][j]);
        }
        if( i > 0 )
        {
            this.Neighbours.push(matrix[i-1][j]);
        }
        if( j<cols-1 )
        {
            this.Neighbours.push(matrix[i][j+1]);
        }
        if( j>0 )
        {
            this.Neighbours.push(matrix[i][j-1]);
        }
    }
}

function setup()
{
    createCanvas(800,800);
    console.log("A*");
    for(var i=0;i<cols;i++)
    {
        matrix[i]=new Array(cols);
    }
    w=width/rows;
    h=height/cols;

    for(var i=0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            matrix[i][j]=new Spot(i,j);
        }
    }

    for(var i=0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            matrix[i][j].addNeighbours(matrix);
        }
    }
    

    start=matrix[15][15];
    end=matrix[rows-1][cols-1];

    openSet.push(start);

    console.log(matrix)
}

function draw()
{
    if(openSet.length>0)
    {
        var LeastIndex=0;
        for(var i=0;i<openSet.length;i++)
        {
            if(openSet[i].f < openSet[LeastIndex].f)
            {
                LeastIndex=i;
            }
        }
        var current=openSet[LeastIndex];
        if(current === end)
        {
            path=[];
            var temp=current;
            path.push(temp);
            while(temp.previous)
            {
                path.push(temp.previous);
                temp=temp.previous;
            }
            console.log("SUCCESS!!");

        }
        removeArr(openSet,current);
        closedSet.push(current);

        var neighbours=current.Neighbours;
        for(var i=0;i<neighbours.length;i++)
        {
            var neighbor=neighbours[i];
            if(!closedSet.includes(neighbor)){
            var tempG=current.g+1;
            if(openSet.includes(neighbor)){
                if(tempG<neighbor.g)
                {
                    neighbor.g=tempG;
                }
            }
            else{
                neighbor.g=tempG;
                openSet.push(neighbor);
            }
            neighbor.h=heuristic(neighbor,end);
            neighbor.f=neighbor.g+neighbor.h;
            neighbor.previous=current;
            }
        }
    }
    else
    {

    }
    background(0);
    for(var i=0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            matrix[i][j].Show(color(255));
        }
    }
    for(var i=0;i<openSet.length;i++)
    {
        openSet[i].Show(color(255, 0,0));
    }
    for(var i=0;i<closedSet.length;i++)
    {
        closedSet[i].Show(color(0,255,0));
    } 
    for(var i=0;i<path.length;i++)
    {
        path[i].Show(color(250,0,0));
    }   
}