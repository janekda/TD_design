var waitTime = rnd(2000, 2);
//console.log(waitTime);

//showBountiesAlert();

/**
 * Vysune se malý frame s alertem o bounties a odkazem na souboj.
 * Kontrola odměn probíhá co 5 minut. 
 */
function showBountiesAlert(){
   
   setInterval(function () {
      
         waitTime = rnd(2000, 200);
         
         //writeBounties1();
      }, 5000);
}


function rnd(mean, stdev) {
   return Math.round(rnd_snd()*stdev+mean);
}

function rnd_snd() {
   return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}
