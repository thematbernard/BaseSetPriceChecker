import * as XLSX from "xlsx";

const loadCardData = (file, setCardData) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const parsedCardData = XLSX.utils.sheet_to_json(sheet);
    setCardData(parsedCardData);
  };

  reader.onerror = (e) => {
    console.error("File reading error:", e.target.error);
  };

  reader.readAsArrayBuffer(file);
};

export default loadCardData;
