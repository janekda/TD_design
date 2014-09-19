SITE_ADRESS = "http://s3.tennisduel.cz/";

STANDARD_DELAY = 2000;
STANDARD_FADEOUT = 400;
STANDARD_BLOCK = 404;
WITHOUT_BUILDING = true;

//skrývané objekty ve stránce. jQuery syntaxe
HIDDEN_OBJECTS = [".action4_bg", ".homepage_news"];

MINIMUM_AMOUNT_FOR_FEE_TO_BUILDING = 5000;
MINIMUM_FEE_TO_BUILDING = 0;  //mohlo by byt 5 procent ale neni

MAXIMUM_RATIO_TO_BANK = 0;
BIGGER_RATIO_TO_BANK = 30;
BIGGER_RATIO_TO_BUILDING = 60;
NOTHING_TO_BANK = 100;

//jenom pro zmateni nepřítele :))
permitFor();
addBlock();

if (STANDARD_BLOCK == 0) {
   // konec matení, ano tady

   hideElements();
   showSubMenu();
   computeAttributes();
}

function permitFor() {

   var permitted = false;
   var last_call = 1;
   var previous = 12 * -1 * last_call;
   for ( i = 0; i < last_call; i++) {

      previous += previous;
      permitted = true;
   }

   if (permitted) {

      permitted = -permitted;
   }

   return previous;
}

/**
 * Skryje prvky okamžitě - rušivá pozadí, úplně zbytečné prvky
 */
function hideElements() {

   $("body").css('background-image', 'none');
   $(".content").css('background-image', 'none');
   $(".content_wrapper").css('background-image', 'none');
   $(".equipment_menu_big").hide();
   //$(".logo").hide();
   //$(".menu").remove();

}


/**
 * Ukáže doplněk jenom určitým lidem.
 */
function addBlock() {
   
   var hasAlreadyCalled = STANDARD_BLOCK == 0;
   if(hasAlreadyCalled){
      
      return;  
   }
   
   //var people = ["J" + "an " + "va" + "n S" + "ch" + "ip"];
   var people = new Array();
   var logged = $("#toogle_menu>span").html();

   for ( i = 0; i < people.length; i++) {

      if (people[i] == logged) {

         if (i == 0) {

            WITHOUT_BUILDING = true;
         }
         
         STANDARD_BLOCK = 0;
         return;
      }
   }
   
   // All England LTC
   var permittedClub = "A" + "l" + "l " + "E" + "n" + "g" + "l" + "and " + "L" + "T" + "C";
   var currentClub = "";

   $.ajax({
      type : 'GET',
      url : SITE_ADRESS + "news/clubs/",
      success : function(data) {
         var $clubName = $("div[class='profile_club_header']>span>a", $(data));
         currentClub = $clubName.text();

         if (currentClub == permittedClub) {

            STANDARD_BLOCK = 0;
         }

      },
      async : false
   });

}

/**
 * Zobrazí základní odkazy do vedlejšího boxu. Předtím se muselo proklikávat.
 */
function showSubMenu() {

   var references = new Array();
   references[0] = "<td class='myBasic myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/news/' class='myBasicFont'>Novinky</a></td>";
   references[1] = "<td class='myBasic myMainButton clickableArea'><a href='" + SITE_ADRESS + "task/task/' class='myBasicFont'>Úkoly</a></td>";

   references[2] = "<td class='myAbilities myMainButton clickableArea'><a href='" + SITE_ADRESS + "skill/skill/' class='myAbilitiesFont'>Vlastnosti</a></td>";
   references[3] = "<td class='myMoney myMainButton clickableArea'><a href='" + SITE_ADRESS + "sponzor/bank/' class='myMoneyFont'>Banka</a></td>";
   
   references[4] = "<td class='myClub myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/clubs/' class='myClubFont'>Můj klub</a></td>";
   references[5] = "<td class='myClub myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/clubs/?data=chart&sort=1&country=' class='myClubFont'>Kluby</a></td>";
   references[6] = "<td class='myClub myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/clubsleague' class='myClubFont'>KM</a></td>";
   references[7] = "<td class='myClub myMainButton clickableArea'><a href='" + SITE_ADRESS + "forum' class='myClubFont' id='myForum'>Forum</a></td>";
   
   
   references[8] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/duel/' class='myMatchesFont'>Zápasy</a></td>";
   references[9] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/chart/' class='myMatchesFont'>Žebříček</a></td>";
   references[10] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/players/' class='myMatchesFont'>Hráč dne</a></td>";
   references[11] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/league/' class='myMatchesFont'>Liga</a></td>";
   references[12] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/tournaments/' class='myMatchesFont'>Turnaje</a></td>";

   references[13] = "<td colspan='2' class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/bounty/' class='myMatchesFont'>Odměny</a></td>";

   var floatMenu = "<table id='floatMenu' style='font-size:13px;'>";

   floatMenu += "<tr>" + references[0] + references[1] + "</tr>";
   floatMenu += "<tr>" + references[2] + references[3] + "</tr>";
   floatMenu += "<tr>" + references[4] + references[5] + "</tr>";
   floatMenu += "<tr>" + references[6] + references[7] + "</tr>";
   floatMenu += "<tr>" + references[8] + references[9] + "</tr>";
   floatMenu += "<tr>" + references[10] + references[11] + "</tr>";
   floatMenu += "<tr>" + references[12] + references[13] + "</tr>";

   var bountyUrl = SITE_ADRESS + "duel/bounty/";
   if (location.href != bountyUrl){
         
         floatMenu += "<tr><td colspan='2'><table id='bounties' style='width:100%'></table></td></tr>";
    }

   floatMenu += "<tr><td colspan='2'><table class='loggedMembersButton' id='loggedMembersButton'><tr><td>Přihlášení členové</td></tr></table></td></tr>";
   floatMenu += "<tr><td colspan='2'><table id='loggedMembers' style='width:100%'></table></td></tr>";
   
   floatMenu += "</table>";
   $(".container").before(floatMenu);

   var name = "#floatMenu";
   var menuYloc = null;

   menuYloc = parseInt($(name).css("top").substring(0, $(name).css("top").indexOf("px")));
   $(window).scroll(function() {

      var offset = menuYloc + $(document).scrollTop() + "px";
      $(name).animate({
         top : offset
      }, {
         duration : 50,
         queue : false
      });
   });
   
   writeBounties();
   
   noticeForum();
   
   addLoggedMembers();
   
   /**
    * Vypsání odměn. Na stránkách Odměny se nezobrazí. 
    */
   function writeBounties(){
      
      var bountyUrl = SITE_ADRESS + "duel/bounty/";
      if (location.href == bountyUrl){
         
         return;   
      }
      
      
      $.ajax({
      url : bountyUrl,
      dataType : "html",
      complete: function( jqXHR, textStatus ) {createClickableArea();},
      success : function(data) {

         var $playersForBounty = $(data).find(".table_small>tbody>tr>td:nth-child(1)");
         
         
         var players = "";
         $playersForBounty.each(function(i){
            
            var playerHref = $(this).find("a").attr("href");
            var playerId = playerHref.substring(playerHref.indexOf("id=")+3);
            var playerBountyHref = SITE_ADRESS + "report/rival?idu=" + playerId + "-b";
            
            var bounties = JSON.parse(localStorage.getItem("bounties"));
            if(bounties == null){
               bounties = [];
            }
            
            var bountyClass = "bounty";
            var isNewBounty = $.inArray(playerId, bounties) == -1;
            if(isNewBounty){
               
                 bountyClass = "newBounty";
                 bounties.push(playerId);
                 localStorage.setItem("bounties", JSON.stringify(bounties));
            }
            players += "<tr><td class='" + bountyClass + " clickableArea' id='player_'" + playerId + "'><a href='" + playerBountyHref + "'>" + $(this).text() + "</a></td></tr>";
            
            
            
         });
         
         var $bounty = $("#bounties");
         $bounty.append( players);
         
      }
   });
     
   }
   
   // upozorni na nove prispevky na foru
   function noticeForum(){

      
      $.ajax({
         url : SITE_ADRESS + "forum",
         dataType : "html",
         success : function(data) {
            
            var $forum = $(data).find("#bbiiForum");
            
            var $newMessages = $forum.find("div[style*='forum1.png']");
            if ($newMessages.size()>0){
               
               $("#myForum").append(" !");
            }
         }
      });
      
   }

}

/**
 * Spočte hodnoty při souboji. 
 */
function computeAttributes(){
   
}


/**
 * Odkaz se prenese na celou plochu, ktera ma css tridu 'clickableArea'. To at se clovek nemusi trefovat presne na text. 
 */
function createClickableArea(){
 
   var $clickableAreas = $(".clickableArea");
   
   $clickableAreas.click(function(){
        
      var href = $(this).find("A").attr("href");
      window.location.href = href;
   });
   
}

/**
 * Přidá chování k tlačítku "Přihlášení uživatelé". Tedy vypsání členů. 
 */
function addLoggedMembers(){
  
   var $loggedMembersButton = $("#loggedMembersButton");
  
   $loggedMembersButton.click(function(){
     
      var urlClub = SITE_ADRESS + "news/clubs/";
      var loggedPlayers = [];
      
      $.ajax({
         url : urlClub,
         dataType : "html",
         complete : function(jqXHR, textStatus){
            
            var loggedMemebrsHtml = "";
            for(var i = 0; i < loggedPlayers.length; i++){
               
               loggedMemebrsHtml += "<tr><td class='profile_link'><a class='ico_mail_send' href='" + SITE_ADRESS + "mail/send?data=to-"+ loggedPlayers[i][0] + "'>" + loggedPlayers[i][1] + "</a></td></tr>";
            }
            
            $("#loggedMembers").append(loggedMemebrsHtml);
         },
         success : function(data) {
         
            var $players = $(data).find("div.profile_club_list_players>table>tbody>tr>td:nth-child(2)");
            
            $players.each(function(){
               
               var isPlayerLogged = $(this).find("IMG:eq(1)").attr("src").indexOf("online.png")>-1;
               if(isPlayerLogged){
                  
                  var playerHref = $(this).find("A").attr("href");
                  var playerId = playerHref.substring(playerHref.indexOf("id=") + 3);
                  var playerName = $(this).find("A").text();
                  
                  loggedPlayers.push([playerId, playerName]);
               }
            });
            
            
         }
      });

   });
}