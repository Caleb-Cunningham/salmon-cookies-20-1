const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const  = document.getElementById('sales-table');
const locations = document.getElementById('add-location');

function CookieStand(locationName, minCustomers, maxCustomers, avgCookiesPerSale) 

{
  this.locationName = locationName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
  CookieStand.all.push(this);
}

CookieStand.prototype.customersHourly = function ()

{
  for (let p = 0; p < hours.length; p++) {
    this.customersEachHour.push(random(this.minCustomers
  , this.maxCustomers));
  }
};

CookieStand.prototype.calcCookiesEachHour = function () 

{
  this.calcCustomersEachHour();
  this.totalDailyCookies = 0;
  for (let p = 0; p < hours.length; p++) {
    const oneHour = Math.ceil(this.customersEachHour[p] * this.avgCookiesPerSale);
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

CookieStand.prototype.render = function () 

{
  this.calcCookiesEachHour();
  const trEl = document.createElement('tr');

  let tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);

  for (let p = 0; p < hours.length; p++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[p];
    trEl.appendChild(tdEl);
  }

  let thEl = document.createElement('th');
  thEl.textContent = this.totalDailyCookies;
  trEl.appendChild(thEl);

  .appendChild(trEl);
};

CookieStand.all = [];
new CookieStand('Seattle', 23, 65, 6.3, 'seattle');
new CookieStand('Tokyo', 3, 24, 1.2, 'tokyo');
new CookieStand('Dubai', 11, 38, 3.7, 'dubai');
new CookieStand('Paris', 20, 38, 2.3, 'paris');
new CookieStand('Lima', 2, 16, 4.6, 'lima');

function random(min, max) 

{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleForm(e) 

{
  e.preventDefault();
  const loc = e.target.location.value;
  const min = parseInt(e.target.min.value);
  const max = parseInt(e.target.max.value);
  const avg = parseFloat(e.target.avg.value);

  for (let p = 0; p < CookieStand.all.length; p++) {
    if (loc === CookieStand.all[p].locationName) {
      CookieStand.all[p].minCustomers
   = min;
      CookieStand.all[p].maxCustomers = max;
      CookieStand.all[p].avgCookiesPerSale = avg;

      CookieStand.all[p].customersEachHour = [];
      CookieStand.all[p].totalDailyCookies = 0;
      CookieStand.all[p].cookiesEachHour = [];

      CookieStand.all[p].calcCookiesEachHour();
      clearForm();
      renderTable();
      return;
    }
  }

  

  function clearForm() 

  {
    e.target.location.value = null;
    e.target.min.value = null;
    e.target.max.value = null;
    e.target.avg.value = null;
  }
  clearForm();

  renderTable();
}

function makeHeaderRow() 

{
  const trEl = document.createElement('tr');

  let thElement = document.createElement('th');
  thElement.textContent = 'Locations';
  trEl.appendChild(thEl);

  for (let p = 0; p < hours.length; p++) {
    thEl = document.createElement('th');
    thEl.textContent = hours[p];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Locations Amount';
  trEl.appendChild(thEl);

  .appendChild(trEl);
}

function makeFooterRow() 

{
  const trEl = document.createElement('tr');

  let thEl = document.createElement('th');
  thEl.textContent = 'Hourly Totals for Every Location';
  trEl.appendChild(thEl);

  let totalOfTotals = 0;
  let hourlyTotal = 0;


  for (let p = 0; p < hours.length; p++) {
    hourlyTotal = 0;
    for (let x = 0; x < CookieStand.all.length; x++) 

    {
      hourlyTotal += CookieStand.all[x].cookiesEachHour[p];

      totalOfTotals += CookieStand.all[x].cookiesEachHour[p];

    }
    thEl = document.createElement('th');

    thEl.textContent = hourlyTotal;

    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = totalOfTotals;
  trEl.appendChild(thEl);

  .appendChild(trEl);
}

function renderTable() {
  .innerHTML = '';
  makeHeaderRow();
  for (let p = 0; p < CookieStand.all.length; p++) {
    CookieStand.all[p].render();
  }
  makeFooterRow();
}

renderTable();

theLocations.addEventListener('submit', handleForm);

