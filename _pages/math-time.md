---
layout: empty
permalink: /math-time/
title: Math Time!
---

{::nomarkdown}
<head>
	<link rel="stylesheet" href="/assets/css/main.css">
	<script src="/assets/js/math-time.js"></script>
</head>
<body>
  <table class="math-time math-time__table">
    <tr class="math-time__header-row">
      <th>ENTER TOTAL TIP VALUE --></th>
      <th><input placeholder="Total Tip Amount ($)" id="total-tip"></input></th>
      <th>Hourly Tip Rate --></th>
      <th id="hourly">0</th>
    </tr>
    <tr>
      <td>ID</td>
      <td>Name (Optional)</td>
      <td>Hours Worked</td>
      <td>Payout</td>
    </tr>
    <tr class="person" id="person-1">
      <td>Person 1</td>
      <td><input class="name" value="Person 1"></input></td>
      <td><input class="hours"></input></td>
      <td class="payout"></td>
    </tr>
    <tr class="person" id="person-2">
      <td>Person 1</td>
      <td><input class="name" value="Person 2"></input></td>
      <td><input class="hours"></input></td>
      <td class="payout"></td>
    </tr>
  </table>
  <br />
  <div style="width: 100%; display: flex; justify-content: center">
    <button id="add-person" class="math-time__add-person" type="button">Add Person</button>
  </div>
</body>
{:/}

