import loadCardData from "./loadCardData";

const handleFileChange = (e, setCardData) => {
  const file = e.target.files[0];
  console.log("File selected:", file);
  loadCardData(file, setCardData);
};

export default handleFileChange;