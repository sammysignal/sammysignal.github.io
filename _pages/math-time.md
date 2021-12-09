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
  <table class="math-time math-time__table">
    <tr class="math-time__header-row">
      <th>Math Time!</th>
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
      <td><input class="name" placeholder="Person 1 Name (optional)"></input></td>
      <td><input class="hours" placeholder="Person 1 Hours Worked"></input></td>
      <td class="payout"></td>
    </tr>
    <tr class="person" id="person-2">
      <td>Person 1</td>
      <td><input class="name" placeholder="Person 2 Name (optional)"></input></td>
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

