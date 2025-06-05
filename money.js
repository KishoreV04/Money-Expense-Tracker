let transactions = [];

    const balanceEl = document.getElementById("balance");
    const moneyPlusEl = document.getElementById("money-plus");
    const moneyMinusEl = document.getElementById("money-minus");
    const listEl = document.getElementById("list");

    function addTransaction() {
      const text = document.getElementById("text").value;
      const amount = document.getElementById("amount").value;

      if (text === '' || amount === '') {
        alert("Please add a text and amount");
        return;
      }

      const transaction = {
        id: generateID(),
        text,
        amount: +amount
      };

      transactions.push(transaction);
      updateUI();
      document.getElementById("text").value = '';
      document.getElementById("amount").value = '';
    }

    function generateID() {
      return Math.floor(Math.random() * 100000000);
    }

    function removeTransaction(id) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      updateUI();
    }

    function updateUI() {
      listEl.innerHTML = '';
      transactions.forEach(addTransactionDOM);
      updateValues();
    }

    function addTransactionDOM(transaction) {
      const sign = transaction.amount < 0 ? '-' : '+';
      const item = document.createElement('li');
      item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

      item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button onclick="removeTransaction(${transaction.id})" style="color:red; background:none; border:none; cursor:pointer;">x</button>
      `;

      listEl.appendChild(item);
    }

    function updateValues() {
      const amounts = transactions.map(transaction => transaction.amount);
      const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
      const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
      const expense = (amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

      balanceEl.innerText = `$${total}`;
      moneyPlusEl.innerText = `+$${income}`;
      moneyMinusEl.innerText = `-$${expense}`;
    }

    updateUI();