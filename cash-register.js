function checkCashRegister(price, cash, cid) {
  let change = (cash - price) * 100;
  //make a reverse copy of the cid with the currency unit replaced by its value in cents.
  let cashDrawer = [[10000, 0], [2000, 0], [1000, 0], [500, 0], [100, 0], [25, 0], [10, 0], [5, 0], [1, 0]  ];
  for (let i = 0; i < cid.length; i++){
    cashDrawer[cid.length - 1 - i][1] = Math.round(cid[i][1]*100);
  }
  //make an array with the change due.
  let changeArray = [["ONE HUNDRED"], ["TWENTY"], ["TEN"], ["FIVE"], ["ONE"], ["QUARTER"], ["DIME"], ["NICKEL"], ["PENNY"],  ];
  for (let i = 0; i < cashDrawer.length; i++){
    if (change >= cashDrawer[i][0] && cashDrawer[i][1] > 0){
      if (change >= cashDrawer[i][1]){
        changeArray[i].push(cashDrawer[i][1]);
        change -= cashDrawer[i][1];
        cashDrawer[i][1] = 0; 
      } else {
        let partChange = Math.floor(change / cashDrawer[i][0]) * cashDrawer[i][0];
        changeArray[i].push(partChange);
        change -= partChange;
        cashDrawer[i][1] -= partChange;
      }
    } else {
      changeArray[i].push(0);
    }
  }
  
  changeArray = changeArray
                  .filter(elem => elem[1] != 0)
                  .map(elem => [elem[0], elem[1]/100]);
  //check the status of the cid and change and set the return parameters accordingly.
  let status = "OPEN";
  let leftoverCash = 0;
  for (let i = 0; i < cashDrawer.length; i++){
    leftoverCash += cashDrawer[i][1];
  }
  if (change !== 0){
    status = "INSUFFICIENT_FUNDS";
    changeArray = [];
  } else if (leftoverCash === 0){
    status = "CLOSED";
    changeArray = [...cid];
  } 
  console.log(status, changeArray);
  return {status: status, change: changeArray};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);