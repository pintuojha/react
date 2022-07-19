import React from 'react'

function ErrorDiv(props)
{
    var width="700px";
    if(typeof(width)!=="undefined")
    {
        width=props.width;
    }
    return(<div id="error" className="error" style={{maxWidth:width,background:"#e57373",color:"white"}}>
    <h4 style={{textTransform:"none",color:"white"}}>{props.errorText}</h4>
    </div>);
}

export default ErrorDiv;