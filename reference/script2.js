var arrayOfGoods = [];
var typeOfFood = '';
var quantity = 0;
var amount = 0;
var bestbefore = 0;
var val = {};
var totalamount = 0;
var select = '';

const localStorageArrays = JSON.parse(localStorage.getItem('arrayOfGoods'));

/*let arrayOfGoods =
  localStorage.getItem('arrayOfGoods') !== null ? localStorageArrays : [];*/

function storeValue() {
  select = document.getElementById('mySelect');
  typeOfFood = select.options[select.selectedIndex].value;
  //   console.log(typeOfFood);
}

function getQuantity() {
  quantity = document.getElementById('quantity').value;
  //   console.log(quantity);
}
function getAmount() {
  amount = document.getElementById('amount').value;
  //   console.log(amount);
}
function getbestbefore() {
  bestbefore = document.getElementById('bestbefore').value;
  //   console.log(bestbefore);
}

function getMeasure() {
  if (
    typeOfFood === 'Bakery' ||
    typeOfFood === 'Biscuits' ||
    typeOfFood === 'Chocolates' ||
    typeOfFood === 'Packaged Snacks' ||
    typeOfFood === 'Tetra Pack'
  )
    return 'Pieces';
  else if (typeOfFood === 'Dairy' || typeOfFood === 'Milk') return 'litres';
  else return 'kg';
}

document.getElementById('btn').addEventListener('click', function (event) {
  if (
    typeOfFood !== '' &&
    typeOfFood !== 'Select' &&
    quantity > 0 &&
    amount > 0 &&
    bestbefore > 0
  ) {
    val = { typeOfFood, amount, quantity, bestbefore };

    
    price();
    addGoodsDOM();
    setTotalAmount(val);
    arrayOfGoods.push(val);
    updateLocalStorage();
  } else {
    alert('Enter valid values please.');
  }
//   console.log(arrayOfGoods);
  
  document.getElementById("form").reset();
  event.preventDefault();
});

const getData = () => {
  
}

document.getElementById("btn1").addEventListener("click", function (event) {
  console.log(arrayOfGoods)
  const data = JSON.stringify({data: arrayOfGoods});
    const response = fetch('http://localhost:3000/savef2',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    })
    if(response.ok){
      const jsonResponse = response.json();
    }
  
});

function addGoodsDOM() {
  const item = document.createElement('li');

  item.innerHTML = `
      
         <span> ${val.typeOfFood} "-" ${val.quantity}  "x"   ${val.amount}</span>
      `;

  list.appendChild(item);
}

function updateLocalStorage() {
  localStorage.setItem('arrayOfGoods', JSON.stringify(arrayOfGoods));
}

function setTotalAmount(val) {
  totalamount = Number(totalamount) + Number(val.amount) * Number(val.quantity);
  document.getElementById('totalamount').innerText = totalamount;
  console.log(totalamount);
}

if(typeOfFood = 'Bakery')
max_expiry = 5
else if(typeOfFood = 'Biscuits')
max_expiry = 240
if(typeOfFood = 'Cereal')
max_expiry = 240
if(typeOfFood = 'Chocolates')
max_expiry = 240
if(typeOfFood = 'Dairy ')
max_expiry = 270
if(typeOfFood = 'Bakery')
max_expiry = 5
if(typeOfFood = 'Bakery')
max_expiry = 5
if(typeOfFood = 'Bakery')
max_expiry = 5
if(typeOfFood = 'Bakery')
max_expiry = 5
function price( typeOfFood, max_expiry, amount, quantity, bestbefore)
{
    
    var amount = amount, factor = 0;
    if(quantity > 100)
    factor = quantity / 10000;
    factor += (max_expiry - bestbefore) / (max_expiry);
    if(factor > 0.7)
        factor = 0.7;
    final_price = amount - (amount * factor);
    console.log(Math.round(final_price), factor);
    
}


//price('Amul Butter 100g','Dairy', 270, 55, 120, 200);