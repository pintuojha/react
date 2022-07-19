import React from 'react'

function MessageDiv(props)
{
    var width="700px";
    if(typeof(width)!=="undefined")
    {
        width=props.width;
    }
    return(<div className="error" style={{maxWidth:`${width}`,background:"#81c784",color:"white"}}>
    <h4 style={{textTransform:"none"}}>{props.messageText}</h4>
    </div>);
}

export default MessageDiv;