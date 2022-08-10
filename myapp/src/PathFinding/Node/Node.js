import React from "react";
import "./NodeStyle.css"

const Node=({isStart,isEnd,isWall,row,col})=>{
    const classes=isStart?'node-start':isEnd?'node-end': isWall?'node-wall':"";
    return <div className={`node ${classes}`} id={`node ${row} ${col}`}></div>;
}

export default Node;