import axios from "axios";
const getETHPrice = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum"
    );
    if (response.status == 200) {
      const data = response.data;
      const ethPrice = data[0].current_price;
      return parseFloat(parseFloat(ethPrice).toFixed(2));
    }
  } catch (error) {
    console.log(error);
  }
};
export default getETHPrice;
