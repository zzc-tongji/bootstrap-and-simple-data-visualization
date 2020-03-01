var elementSelector1 = $('#selector-1');
var elementSelector2 = $('#selector-2');
var elementSelector3 = $('#selector-3');

function selectorOnClick(event) {
  var id = event.target.id !== '' ? event.target.id : event.target.parentNode.id;
  if (id === 'selector-1') {
    elementSelector1.addClass('active');
    elementSelector2.removeClass('active');
    elementSelector3.removeClass('active');
    drawEducation();
  } else if (id === 'selector-2') {
    elementSelector1.removeClass('active');
    elementSelector2.addClass('active');
    elementSelector3.removeClass('active');
    drawHealth();
  } else { // id === 'selector-3'
    elementSelector1.removeClass('active');
    elementSelector2.removeClass('active');
    elementSelector3.addClass('active');
    drawMilitray();
  }
}

function drawEducation() {
  drawSheetName('educationspending', 'SELECT A,G,H,I,J,K', educationSpendingResponseHandler);
  drawSheetName('educationspending', 'SELECT A,F', EducationSpendingResponseHandler);
}

function drawHealth() {
  drawSheetName('healthspending', 'SELECT A,G,H,I,J,K', healthSpendingResponseHandler);
  drawSheetName('healthspending', 'SELECT A,F', HealthSpendingResponseHandler);
}

function drawMilitray() {
  drawSheetName('militaryspending', 'SELECT A,B,C,D,E,F', militarySpendingResponseHandler);
  drawSheetName('militaryspending', 'SELECT A,F', MilitarySpendingResponseHandler);
}

function drawSheetName(sheetName, query, responseHandler) {
  var queryString = encodeURIComponent(query);
  var query = new google.visualization.Query(
    "https://docs.google.com/spreadsheets/d/1lj1Z85RWa95D577baAoQqVddZcXsVY3EBM4VPln0ymA/gviz/tq?sheet=" + sheetName + "&headers=1&tq=" + queryString
  );
  query.send(responseHandler);
}

function militarySpendingResponseHandler(response) {
  var data = response.getDataTable();
  data.sort({ column: 5, desc: true });
  var options = {
    title: 'military spending from 2011-2015',
    height: 400,
    vAxis: { title: 'Spending in $' },
    hAxis: { title: 'Country' }
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('canvas-1'));
  chart.draw(data, options);
}

function MilitarySpendingResponseHandler(response) {
  var data = response.getDataTable();
  data.sort({ column: 1, desc: true });
  var options = {
    height: 400,
    title: 'Top Countries by Military Spending 2015'
  };
  var chart = new google.visualization.GeoChart(document.getElementById('canvas-2'));
  chart.draw(data, options);
}

function healthSpendingResponseHandler(response) {
  var data = response.getDataTable();
  data.sort({ column: 5, desc: true });
  var options = {
    title: 'health spending from 2011-2015',
    height: 400,
    vAxis: { title: 'Spending in $' },
    hAxis: { title: 'Country' }
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('canvas-1'));
  chart.draw(data, options);
}

function HealthSpendingResponseHandler(response) {
  var data = response.getDataTable();
  data.sort({ column: 1, desc: true });
  var options = {
    height: 400,
  };
  var chart = new google.visualization.GeoChart(document.getElementById('canvas-2'));
  chart.draw(data, options);
}

function educationSpendingResponseHandler(response) {
  var data = response.getDataTable();
  data.sort({ column: 5, desc: true });
  var options = {
    title: 'education spending from 2011-2015',
    height: 400,
    vAxis: { title: 'Spending in $' },
    hAxis: { title: 'Country' }
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('canvas-1'));
  chart.draw(data, options);
}

function EducationSpendingResponseHandler(response) {
  var data = response.getDataTable();
  data.sort({ column: 1, desc: true });
  var options = {
    height: 400,
    title: 'Top Countries by Education Spending 2015'
  };
  var chart = new google.visualization.GeoChart(document.getElementById('canvas-2'));
  chart.draw(data, options);
}

elementSelector1.bind('click', selectorOnClick);
elementSelector2.bind('click', selectorOnClick);
elementSelector3.bind('click', selectorOnClick);

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawEducation);
