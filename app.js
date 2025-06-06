const d = document;
const baseURL = 'https://www.speedrun.com/api/v1/';

fetch(baseURL + `users/v8l66r8m/personal-bests?embed=game,category`)
  .then((res) => {
    res.json()
    .then((r) => findRuns(r))
  });


function findRuns(runs){
  console.log(runs)
  for(let i = 0; i < runs.data.length; i++){
    let time = runs.data[i].run.times.primary_t;
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600 / 60));
    let s = (time % 60).toFixed(0);

    if(m < 10 || m < 10 && h > 0){
      m = '0' + m.toString()
    }

    if(s < 10){
      s = '0' + s.toString()
    }

    let dateFix = new Date(runs.data[i].run.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
    let timeStr = h.toString() + ':' + m.toString() + ':' + s.toString();
    let catName = '';

    if(runs.data[i].game.data.names.international === 'Super Mario World'){
      switch(runs.data[i].category.data.id){
        case 'n2y1y72o':
          catName = '11 Exit (Cloud)';
        
        case '':
          catName = '11 Exit (Orb)';

        case '':
          catName = '11 Exit (Glitchless)';
      }
      d.getElementById('smw-table').innerHTML +=
        (`
          <tr>
            <td>${runs.data[i].category.data.name}</td>
            <td>${dateFix}</td>
            <td>${timeStr}</td>
            <!-- <td>${runs.data[i].place}</td> --!>
          </tr>
        `)
    }
    if(runs.data[i].game.data.names.international === 'Super Mario Sunshine'){
      if(runs.data[i].category.data.name !== 'Individual World'){
        if(runs.data[i].category.data.name !== 'Full Completion'){
          if(runs.data[i].category.data.name !== 'All Shines'){
            d.getElementById('sms-table').innerHTML +=
              (`
                <tr>
                  <td>${runs.data[i].category.data.name}</td>
                  <td>${dateFix}</td>
                  <td>${timeStr}</td>
                  <!-- <td>${runs.data[i].place}</td> --!>
                </tr>
              `)
          }
        }
      }
    }
  }
}