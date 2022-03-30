var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    GigsList(JSON.parse(this.responseText));
  }
};
xmlhttp.open("GET", "Live.json", true);
xmlhttp.send();

function GigsList(live) {
  var liveContainer = document.getElementById('live');
  var lastPrintedYear;
  var gigs = live["gigs"];
  gigs.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  for (var i = 0; i < gigs.length; i++) {
    var gig = gigs[i];
    var gigDate = new Date(Date.parse(gig["date"]));
    var gigYear = gigDate.getFullYear();
    var gigMonth = gigDate.toLocaleString('en-us', {
      month: 'long'
    });
    var gigDay = gigDate.getDate();
    if (lastPrintedYear !== gigYear) {
      liveContainer.appendChild(createYearElement(gigYear));
      var yearList = document.createElement('ul');
      liveContainer.appendChild(yearList);
      lastPrintedYear = gigYear;
    }
    var gigElement = createGigElement(gig["band"], getOrdinalNum(gigDay) + ' ' + gigMonth, gig["venue"], gig["bill"]);
    yearList.appendChild(gigElement);
  }
}

function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

function createYearElement(year) {
  var yearElement = document.createElement('div');
  yearElement.id = 'live' + year;
  yearElement.className = "row year";
  var emptyColumn = document.createElement('div');
  emptyColumn.className = 'col-sm-8';
  yearElement.appendChild(emptyColumn);
  var yearColumn = document.createElement('div');
  yearColumn.className = 'col-sm-4';
  var yearHeading = document.createElement('h1');
  yearHeading.textContent = year;
  yearColumn.appendChild(yearHeading);
  yearElement.appendChild(yearColumn);
  return yearElement;
}

function createGigElement(band, date, venue, bill) {
  var gigElement = document.createElement('li');
  gigElement.innerHTML += 'with ';
  var bandSpan = document.createElement('span');
  bandSpan.className = 'band';
  bandSpan.textContent = band + ': ';
  gigElement.appendChild(bandSpan);
  var gigSpan = document.createElement('span');
  gigSpan.className = 'gig';
  gigSpan.innerHTML = date + ' at ' + venue;
  gigElement.appendChild(gigSpan);
  gigElement.innerHTML += '. ';
  if (bill != '') {
    var billElement = document.createElement('span');
    billElement.className = 'bill';
    billElement.textContent = 'Also on the bill: ' + bill + '.';
    gigElement.appendChild(billElement);
  }
  return gigElement;
}
