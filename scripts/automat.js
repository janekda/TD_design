//zobrazuj zapasy ze storage - čas v sekundach, jestli jsem použil bf a peněžitá výhra

// zobraz checkbox na automat

// pri zapnutem automatu dělej skening odměn, štěpánka, bronina (cca co 4min) s odstupem pár sekund
// kdyz stoupnou vyhry Stepankovi, Broninovi tak zrychli skening na 2sekundy po dobu cca 2min
// kdyz se zobrazi odmeny zrychlit skening na cca 1sekundu po dobu cca 3min

// kdyz se zobrazi prvni odmena losovat aby byla šance 1/3
// u dalších skeningů cca 2/3 šance na výzvu
// je-li povoleno hrát, tak kliknout na odměnu
// spočítat šanci na výhru, je-li převaha tak zrychleně hrát a návat do žebříčkové stránky
// je-li šance na výhru s benefitem a je to druhá nebo další odměna během posledních 3.minut, tak zapnout benefit

// šanci na výhru - počty bodů(moje a soupeřovi) taky zobrazovat při normálním hraní

var match = {

   name : "name of player",
   playerId : 0,
   moneyWon : 0,
   time : 0,

   /**
    * Ukládá do storage vyhrané zápasy - žebříčkové a o peníze. 16 hodin staré zápasy maže.
    */
   save : function() {

      var isMatchResultPage = location.href.indexOf("report?id=") > -1;
      var matchType = $(".table_match_top").text();

      var isRankingMatch = matchType.indexOf("Žebříčkový zápas") > -1;
      var isMoneyMatch = matchType.indexOf("Zápas o odměnu") > -1;

      if (isRankingMatch || isMoneyMatch) {

         var isWinning = $(".winner_box").size() > 0;

         if (isWinning) {

            this.opponent = $("a[href*='profile?id=']").not(":contains('10365')").text();
            this.earning = 0;
            //li[class=reward_tooltip]>span
            this.time = new Date();

            var newMatch = this;
            matches.updateInStorage(newMatch);
         }
      }
   },

   mutualStrength : function() {

   },

   decidedToPlay : function() {

   }
};

var matches = {

   inStorage : [],

   show : function() {

   },

   getStored : function() {

      this.inStorage = localStorage.getItem("TennisDuelMatches");
      return inStorage;
   },

   /**
    * Přidá další zápas do storage item "TennisDuelMatches".
    * Přitom smaže zápasy starší než 16 hodin.
    */
   updateInStorage : function(newMatch) {

      var isStored = false;
      for (var i = 0, len = this.inStorage.length; i < len; i++) {

         if (newMatch == this.inStorage[i]) {
            isStored = true;
            break;
         }
      }

      if (isStored == false) {

         var newStoredMatch = newMatch;
         //TODO - dod2lat
         this.inStorage.push(newStoredMatch);
         localStorage.setItem("TennisDuelMatches", this.myArray);
      }

   }
};

var strength = {

   oponent : 1000,
   mine : 0,

   show : function() {

   },

   iamStronger : function() {

   },

   computeBoth : function() {

   }
};

var bounty = {

   isAutomat : false,

   showAutomatSetting : function() {

   },

   check : function() {

   },

   play : function() {

   }
};


match.save();