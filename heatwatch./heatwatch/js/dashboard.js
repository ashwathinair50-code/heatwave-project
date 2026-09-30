// Fixed educational examples. No network requests or live weather data.
'use strict';

const locations = {
  nagpur: { name: 'Nagpur',    temperature: 42, humidity: 30, heatIndex: 45 },
  pune:   { name: 'Pune',      temperature: 29, humidity: 40, heatIndex: 29 },
  mumbai: { name: 'Mumbai',    temperature: 32, humidity: 60, heatIndex: 37 },
  delhi:  { name: 'New Delhi', temperature: 45, humidity: 30, heatIndex: 50 }
};

const precautions = {
  Low: 'Keep drinking water and stay aware of changing conditions during outdoor activities.',
  Moderate: 'Take breaks in shade. Choose cooler hours for outdoor activity and keep water nearby.',
  High: 'Limit time in the heat. Move outdoor activities to cooler hours and take regular cooling breaks.',
  Extreme: 'Postpone strenuous outdoor activities. Seek an air-conditioned place and check on people vulnerable to heat.'
};

// Project-defined bands (not official criteria): <32 Low, 32 to <40 Moderate, 40 to <48 High, >=48 Extreme
function getRisk(index) {
  if (index >= 48) return 'Extreme';
  if (index >= 40) return 'High';
  if (index >= 32) return 'Moderate';
  return 'Low';
}

function makeCell(tag, text, scope) {
  const cell = document.createElement(tag);
  if (scope) cell.scope = scope;
  cell.textContent = text;
  return cell;
}

// The comparison table is built from the same data object, so the table and
// the selector can never disagree (the static rows in the HTML are the no-JS fallback).
function buildTable() {
  const body = document.getElementById('comparison-body');
  body.textContent = '';
  Object.keys(locations).forEach(function (key) {
    const d = locations[key];
    const risk = getRisk(d.heatIndex);
    const row = document.createElement('tr');
    row.dataset.key = key;
    row.appendChild(makeCell('th', d.name, 'row'));
    row.appendChild(makeCell('td', d.temperature + '°C'));
    row.appendChild(makeCell('td', d.humidity + '%'));
    row.appendChild(makeCell('td', d.heatIndex + '°C'));
    const riskCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'badge ' + risk.toLowerCase();
    badge.textContent = risk;
    riskCell.appendChild(badge);
    row.appendChild(riskCell);
    body.appendChild(row);
  });
}

function updateDashboard() {
  const key = document.getElementById('location').value;
  const data = locations[key];
  if (!data) return;
  const risk = getRisk(data.heatIndex);
  document.getElementById('city-title').textContent = data.name;
  document.getElementById('temperature').textContent = data.temperature + '°C';
  document.getElementById('humidity').textContent = data.humidity + '%';
  document.getElementById('heat-index').textContent = data.heatIndex + '°C';
  document.getElementById('risk-text').textContent = risk;
  const badge = document.getElementById('risk-badge');
  badge.textContent = risk + ' risk';
  badge.className = 'badge ' + risk.toLowerCase();
  document.getElementById('advice').textContent = precautions[risk];
  // highlight the selected location in the table
  document.querySelectorAll('#comparison-body tr').forEach(function (tr) {
    tr.style.outline = tr.dataset.key === key ? '2px solid #ffad45' : '';
    tr.style.outlineOffset = '-2px';
  });
}

buildTable();
document.getElementById('location').addEventListener('change', updateDashboard);
updateDashboard();
