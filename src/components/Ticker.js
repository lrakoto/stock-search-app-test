import React from "react";

function Ticker(props) {
    return (
        <div>
            <div id="favbox">
                <h3>{props.name}</h3>
                <button id="fav">Add to favorites</button>
                <ul>
                    <li>Close Price: {props.closePrice}</li>
                    <li>Highest Price: {props.highestPrice}</li>
                    <li>Lowest Price: {props.lowestPrice}</li>
                    <li>Transactions: {props.transactions}</li>
                    <li>Open Price: {props.openPrice}</li>
                    <li>Trading Volume: {props.tradingVolume}</li>
                    <li>Trading Volume Weighted: {props.volumeWeighted}</li>
                </ul>
            </div>
        </div>
    )
}

export default Ticker;