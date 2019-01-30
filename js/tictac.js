function addField(outerDiv) {
  outerDiv.innerHTML =
  `
  <table id="toe-table">
    <tbody id="tictac">
      <tr>
        <td data-align="corner" class="h1 v1 d1">
          <img src="">
        </td>
        <td data-align="mid-top" class="h1 v2">
          <img src="">
        </td>
        <td data-align="corner" class="h1 v3 d2">
          <img src="">
        </td>
      </tr>
      <tr>
        <td data-align="mid-left" class="h2 v1">
          <img src="">
        </td>
        <td data-align="middle" class="h2 v2 d1 d2">
          <img src="">
        </td>
        <td data-align="mid-right" class="h2 v3">
          <img src="">
        </td>
      </tr>
      <tr>
        <td data-align="corner" class="h3 v1 d2">
          <img src="">
        </td>
        <td data-align="mid-bot" class="h3 v2">
          <img src="">
        </td>
        <td data-align="corner" class="h3 v3 d1">
          <img src="">
        </td>
      </tr>
    </tbody>
  </table>
  <br>
  <button id="restart-btn">Restart</button>
  `;

  let toeListener = (event) => {
    let target = event.target;
    let td = target.closest('td');

    if(!td) {
      return
    };
    
    let currentImg = td.querySelector('img');
    
    if (ticOrTac === 'x' && td.getAttribute('data-check-status') !== 'checked') {
      currentImg.src = 'http://www.picshare.ru/uploads/190119/22E0dhSwiX.png';
      currentImg.alt = 'x';
      td.setAttribute('data-check-status', 'checked');
      ticOrTac = 'o';
    } else if (ticOrTac === 'o' && td.getAttribute('data-check-status') !== 'checked') {
      currentImg.src = 'http://www.picshare.ru/uploads/190119/6W17uP6tKr.png';
      currentImg.alt = 'o';
      td.setAttribute('data-check-status', 'checked');
      ticOrTac = 'x';
    }
    
    let lanesClasses = [...td.classList];
    for (let laneClass of lanesClasses) {
      let laneCells = [...tictac.querySelectorAll(`.${laneClass}`)];
      if (laneCells.every(
            cell => {
              return (cell.getAttribute('data-check-status') === 'checked')
                       && (cell.querySelector('img').src === currentImg.src)
            })
         ) {
        // console.log(`${currentImg.alt} wins`);
        laneCells.forEach(el => el.style.background = 'lightblue');
        tictac.removeEventListener('click', toeListener);
      }
    }
  }

  let ticOrTac = 'x';

  tictac.addEventListener('click', toeListener);
  
  tablediv.querySelector('#restart-btn').onclick = () => {
    addField(outerDiv);
  }
}

addField(tablediv);