function convertCurrency() {
    const amount = document.querySelector(".inpt").value;
    const from = document.querySelector(".from input").value.trim().toUpperCase(); 
    const to = document.querySelector(".to input").value.trim().toUpperCase(); 
    const result = document.querySelector(".result"); 
    if (!amount || isNaN(amount)) {
      result.innerHTML = "Please enter a valid amount.";
      return;
    }
  
    if (!from || !to) {
      result.innerHTML = "Please enter valid currency codes.";
      return;
    }
  
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }
        return response.json();
      })
      .then((data) => {
        const rate = data.rates[to];
        if (!rate) {
          throw new Error("Invalid currency code");
        }
        const convertedAmount = (amount * rate).toFixed(2);
        result.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
      })
      .catch((error) => {
        result.innerHTML = `Error: ${error.message}`;
        console.error("Error:", error);
      });
  }
  