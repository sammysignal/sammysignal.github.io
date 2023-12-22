---
layout: empty
permalink: /math-time/
title: Math Time!
---

{::nomarkdown}
<head>
  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->
	<link rel="stylesheet" href="/assets/css/main.css">
	<script src="/assets/js/math-time.js"></script>
</head>
<body>
  <div style="margin: 0 auto;max-width: 1000px;padding: 5%;">
    <h1 style='font-family: "Lora", sans-serif;'>Restaurant Server's Tip Calculator</h1>
    <p style='font-size: large;'>This application is deigned specifically for cases where a sum of money needs to be divided evenly to a group of employees where every person has the same hourly rate but they worked a different number of hours.</p>
    <p style='font-size: large;'>To use, simply enter the total amount of money, followed by the number of hours worked for each employee. The payouts on the right will be automatically generated.</p>
  </div>
  <table class="math-time math-time__table">
    <tr class="math-time__header-row">
      <th>Total Tip:</th>
      <th><input placeholder="Total Tip Amount ($)" id="total-tip"></input></th>
      <th>Hourly Tip Rate:</th>
      <th id="hourly">0</th>
    </tr>
    <tr class="math-time__row" style="background-color: darkmagenta;height: 20px;">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr class="math-time__row">
      <td></td>
      <td>Name (Optional)</td>
      <td>Hours Worked</td>
      <td>Payout</td>
    </tr>
    <tr class="person math-time__row" id="person-1">
      <td>Person 1</td>
      <td><input class="name" placeholder="Person 1 Name"></input></td>
      <td><input class="hours" placeholder="Person 1 Hours Worked"></input></td>
      <td class="payout"></td>
    </tr>
    <tr class="person math-time__row" id="person-2">
      <td>Person 2</td>
      <td><input class="name" placeholder="Person 2 Name"></input></td>
      <td><input class="hours" placeholder="Person 2 Hours Worked"></input></td>
      <td class="payout"></td>
    </tr>
  </table>
  <br />
  <div style="width: 100%; display: flex; justify-content: center">
    <button id="add-person" class="math-time__add-person" type="button">Add Person</button>
  </div>
</body>
{:/}

