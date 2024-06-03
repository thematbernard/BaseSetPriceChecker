const handleChange = (event, selectedCard, setSelectedCard, cardData, setCardInfo) => {
    const selectedCardName = event.target.value;
    setSelectedCard(selectedCardName);
    setCardInfo(null); // Reset card info
  
    // Load card information from Excel
    if (selectedCardName) {
      const selectedCardData = cardData.find((card) => card["Card Name"] === `Base Set ${selectedCardName}`);
      console.log("Selected card data:", selectedCardData);
      setCardInfo(selectedCardData);
    }
  };
  
  export default handleChange;