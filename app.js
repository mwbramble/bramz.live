const d = document;
const baseURL = 'https://www.speedrun.com/api/v1/';

let parsedRuns = [];

let smwCategories = ['96 Exit', 'All Castles', '11 Exit', 'Lunar Dragon', '95 Exit, No Cape', 'No Cape, No Starworld', 'Small Only'];
let smsCategories = ['120 Shines', '96 Shines', 'All Blue Coins', 'Any% (No ACE)'];

fetch(baseURL + `users/v8l66r8m/personal-bests?embed=game,category`)
  .then((res) => {
    res.json()
    .then((r) => findRuns(r))
  });


function findRuns(runs){
  console.log(runs)
  for(let i = 0; i < runs.data.length; i++){
    
    if(runs.data[i].category.data.name){}

    let runObj = {
      category: '',
      date: '',
      time: '',
      placement: null
    }

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

    runObj.date = dateFix;
    runObj.time = timeStr;

  }

  finalizeRuns();
}

function finalizeRuns(){

}