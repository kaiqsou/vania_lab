import Square from "./Square";
import react from "react";

export default function Board({board, onPlay, disabled})
{
    return (
        <div className="board">
            <Square key={i} value={cell} onclick={() => onPlay(i)} disabled={disabled} />
        </div>
    )
}