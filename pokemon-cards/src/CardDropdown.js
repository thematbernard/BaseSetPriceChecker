import React, { useState } from "react";
import cards from "./data/cardData";
import handleFileChange from "./functions/handleFileChange";
import handleChange from "./functions/handleChange";
import loadCardData from "./functions/loadCardData";
import './styles/CardDropdown.css';

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };

const images = importAll(require.context('./pictures', false, /\.(png|jpe?g|svg)$/));
console.log(images)
const CardDropdown = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [cardInfo, setCardInfo] = useState(null);
  const [cardData, setCardData] = useState([]);
  
  
  return (
    <div className="cardSelect">
      <label htmlFor="card-select">Select a Card: </label>
      <select id="card-select" value={selectedCard} onChange={(event) => handleChange(event, selectedCard, setSelectedCard, cardData, setCardInfo)}>
        <option value="">--Please choose an option--</option>
        {cards.map((card) => (
          <option key={card.number} value={card.name}>
            {card.number}: {card.name}
          </option>
        ))}
      </select>
      {/* Display the image if cardInfo is available */}
      {cardInfo && (
        <div className="card-content">
            {console.log("card name = " + cardInfo["Card Name"] +".png")}
            <img src={images[`${cardInfo["Card Name"]}.png`]} alt={cardInfo["Card Name"]} className="cardimage"/>
           <div className="card-info">
          <h2>Card Info</h2>
          <p>Card Name: {cardInfo["Card Name"]}</p>
          <p>Card Number: {cardInfo["Card Number"]}</p>
          <p>Ungraded Price: {cardInfo["Ungraded Price"]}</p>
          <p>PSA 10 Price: {cardInfo["PSA 10 Price"]}</p>
          </div>
        </div>
      )}
      <input type="file" onChange={(event) => handleFileChange(event, setCardData)} />
    </div>
  );
};

export default CardDropdown;
