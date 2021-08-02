let times = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', 'TOTAL'];
let locations = [];

let newStore = document.getElementById('new-store');

function StoreLocations(store, min, max, avgCookies) 

{
  this.store = store;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.averageCookiesPerHour = avgCookies;

  this.randomVisitorsPerHour = function() 
  {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  };
  this.randomCookiesPerHour = function() {
    return Math.floor(this.randomVisitorsPerHour() * this.averageCookiesPerHour);
  };

  this.cookies = [];
  this.customers = [];
  this.dailyTotal = 0;

  this.createArrays = function() 
  
  {
    for (let j = 0; j < times.length - 1; j++) {
      this.cookies.push(this.randomCookiesPerHour());
      this.customers.push(this.randomVisitorsPerHour());
      this.dailyTotal += this.randomCookiesPerHour();
    }

  };
  this.randomVisitorsPerHour();
  this.randomCookiesPerHour();
  this.createArrays();
  locations.push(this);
}

let seattlePlace = new StoreLocations('Seattle', 23, 65, 6.3);
let tokyoPlace = new StoreLocations('Tokyo', 3, 24, 1.2);
let dubaiPlace = new StoreLocations('Dubai', 11, 38, 3.7);
let parisPlace = new StoreLocations('Paris', 20, 38, 2.3);
let limaPlace = new StoreLocations('Lime', 2, 16, 4.6);

function createHeader()

{
  let header = document.getElementById('firstRow');
  for (i = 0; i < times.length; i++) {
    let th = document.createElement('th');
    th.textContent = times[i];
    header.appendChild(th);
  }
}

function createBody() 

{
  let bodyRow = document.getElementById('bodyRow');
  bodyRow.innerHTML = '';
  for(i = 0; i < locations.length; i++) {
    let tr = document.createElement('tr');
    bodyRow.appendChild(tr);
    let td = document.createElement('td');
    td.textContent = locations[i].store;
    tr.appendChild(td);
    for(let x = 0; x < locations[i].cookies.length; x++) {
      let td2 = document.createElement('td');
      td2.textContent = locations[i].cookies[x];
      tr.appendChild(td2);
    }
    let td3 = document.createElement('td');
    td3.textContent = locations[i].dailyTotal;
    tr.appendChild(td3);
  }
}

function handleNewStoreSubmit(event) 

{
  event.preventDefault();
  let newStoreName = event.target.storeName.value;
  let newMinimumCustomers = event.target.minCustomers.value;
  let newMaximumCustomers = event.target.maxCustomers.value;
  let newAverageCookiesPerHour = event.target.averageCookies.value;

  let j = 1;

  for(let x = 0; x < locations.length; x++) {
    if(newStoreName === locations[x].store) {
      locations[x].minCustomers = parseInt(newMinimumCustomers);
      locations[x].maxCustomers = parseInt(newMaximumCustomers);
      locations[x].averageCookiesPerHour = parseInt(newAverageCookiesPerHour);
      locations[x].cookies = [];
      locations[x].customers = [];
      locations[x].dailyTotal = 0;
      locations[x].randomCookiesPerHour();
      locations[x].createArrays();
      createBody();
    }else{
      j++;
    }
  }
  console.log(locations.length);
  console.log(j);

  if(j > locations.length) 
  {
    let newStore = new StoreLocations(newStoreName, newMinimumCustomers, newMaximumCustomers, newAverageCookiesPerHour);
    createBody();
  }

  event.target.storeName.value = null;
  event.target.minCustomers.value = null;
  event.target.maxCustomers.value = null;
  event.target.averageCookies.value = null;
};

newStore.addEventListener('submit', handleNewStoreSubmit);

createHeader();
createBody();