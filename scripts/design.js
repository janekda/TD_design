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
   //fadeOutElements();
   showSubMenu();
   
   //bylo treba pri stavbe MTC
   //createMap();
   //uz neukladam penize
   //createDirectLinks();
   
   //hledani uz nepouzivam
   //modifyRankingSelector();
   
   
   //computeAttributesOld();
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
 * Skryje prvky ve stránce po krátkém zobrazení - hlavně reklamy.
 */
function fadeOutElements() {

   for ( i = 0; i < HIDDEN_OBJECTS.length; i++) {

      $(HIDDEN_OBJECTS[i]).delay(STANDARD_DELAY).fadeOut(STANDARD_FADEOUT);
   }

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

   references[13] = "<td colspan='2' class='myMatches myMainButton'><a href='" + SITE_ADRESS + "duel/bounty/' class='myMatchesFont'>Odměny</a></td>";

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
                 alert(bounties.length + "\n" + playerId);
                 bounties.push(playerId);
                 alert(bounties.length + "\nAFTER");
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
 * Vytvoří klikací mapu nad obrázkem stavby.
 */
function createMap() {

   var currentUrl = window.location.href;

   if (currentUrl.indexOf("data=competitions") == -1) {

      return;
   }

   $("div .ch_block").css("cursor", "pointer");

   $("div .ch_block").click(function() {

      var divClass = $(this).attr("class");
      var lastPodtrzitko = divClass.lastIndexOf("_");
      var buildingId = divClass.substring(lastPodtrzitko + 1) - 1;

      var new_position = $(".page_list_task:eq(" + buildingId + ")").offset();

      window.scrollTo(0, new_position.top);

      $("#toggle_contribute_" + (buildingId + 1)).click();

      var alreadyExistsToTop = $("#toTop").length > 0;

      if (alreadyExistsToTop) {

         return;
      }

      $(".plt_name:eq(" + buildingId + ")").append("&nbsp;&nbsp;&nbsp;<span id='toTop' style='cursor:pointer;color:blue;font-weight:bolder;'>TOP</span>").click(function() {

         $("#toggle_contribute_" + (buildingId + 1)).click();
         window.scrollTo(0, -new_position.top);
      });

   });
}

/**
 * Vytvoří odkaz hned vedle keše pro poslání všech peněz do banky, stavby. A na poměrné části.
 */
function createDirectLinks() {

   //var $attributes = $(".money>a>.yellow");
   var $attributes = $(".money");
   
   var $cash = $("A[href='./sponzor/bank']");
   
   var cashText = $cash.children(".yellow").text();

   var directLinkToBank = "<div class='directLink' id='toBank' title='do banky'>B</div>";

   if (WITHOUT_BUILDING) {
      
      $attributes.after("<span id='directLinks'>" + directLinkToBank + "</span>");
      
      $("#toBank").click(function() {
         sendMoney(MAXIMUM_RATIO_TO_BANK, 0);
      });
      
   } else {


      var directLinkToBuilding30 = "<div class='directLink' id='toBuilding30' title='do banky 70%, do stavby 30%'>BS</div>";
      

      var directLinkToBuilding = "<div class='directLink' id='toBuilding'  title='do stavby'>S</div>";
      $attributes.after("<div id='directLinks'>" + directLinkToBuilding + "</div>");


      $attributes.after("<div id='directLinks'>" + directLinkToBank + directLinkToBuilding30 + directLinkToBuilding + "</div>");

      $("#toBank").click(function() {
         sendMoney(MAXIMUM_RATIO_TO_BANK, MINIMUM_FEE_TO_BUILDING);
      });

      $("#toBuilding30").click(function() {
         sendMoney(BIGGER_RATIO_TO_BANK);
      });

      $("#toBuilding").click(function() {
         sendMoney(NOTHING_TO_BANK);
      });
   }
   
   var pos = $attributes.position();
   // .outerWidth() takes into account border and padding.
   var width = $attributes.outerWidth();

   $("#directLinks").css({
      position: "absolute",
      top: pos.top + "px",
      left: (pos.left + width) + "px"
   }).show();
      

   /**
    * Posílají se peníze do banky a na stavbu.
    *
    * @param ratio 0 - vše do banky, 10 - 10 procent na stavbu, zbytek do banky
    */
   function sendMoney(ratio, fee) {
      
         //neni replaceAll, tak davam split
      var cash = parseInt(cashText.split(' ').join(''));
   
      if(cash < 113){

         window.location.assign(SITE_ADRESS + "sponzor/bank/");
         return;
      }
      
      var isSendingToBank = (ratio == MAXIMUM_RATIO_TO_BANK || ratio == BIGGER_RATIO_TO_BANK);

      var inCashForWinner = 13;
      var cashToBank = (cash * (100 - ratio) / 100).toFixed() - inCashForWinner;

      if (cashToBank < 100 && isSendingToBank) {

         alert("Musí být přes 100 dolarů");
         return;
      }

      var moneyForTax = cash - MINIMUM_AMOUNT_FOR_FEE_TO_BUILDING;

      var withFeeToBank = cash >= MINIMUM_AMOUNT_FOR_FEE_TO_BUILDING && ratio == MAXIMUM_RATIO_TO_BANK && fee > 0;


      if (withFeeToBank) {

         var feeRatio = (100 - fee) / 100;
         var cleanMoneyToBank = (moneyForTax * feeRatio).toFixed();
         cashToBank = parseInt(cleanMoneyToBank) + MINIMUM_AMOUNT_FOR_FEE_TO_BUILDING;

      }
      
      var cashToBuilding = cash - cashToBank - inCashForWinner;

      var buildingId = getBuildingId();

      if (cashToBank > 100) {

         $.post(SITE_ADRESS + "actionBank/addtostorage", {
            price_from : "" + cashToBank,
            currency_storage : "" + cashToBank
         },
         function( data ) {
            $("A[href='./sponzor/bank']").children(".yellow").text(inCashForWinner);
         })
        .fail(function() {
          alert( "error in sending money");
        });
      }

      if (cashToBuilding > 0) {

         $.post(SITE_ADRESS + "actionClubs/addtocompetition/?comp_id=" + buildingId, {
            price_from : cashToBuilding,
            money_contribute1 : cashToBuilding
         });
      }

      
      function getBuildingId() {

         //dal jsem natvrdo stavbu cislo 9, pac jinak bych musel slozite zjistovat, na kterou se ma prispivat.
         //musi se zmenit i $post metode cislo
         return 1;
      }

   }
}

/**
 * Zarovná doleva a přidá rovnou tlačítka. Spec.označí právě vybranou oblast a oblast, kde je přihlášený uživatel.
 * Toto přidá i dolů + odkaz nahoru.
 */
function modifyRankingSelector() {

   var currentUrl = window.location.href;

   if (currentUrl.indexOf("duel/chart/") == -1) {

      return;
   }

   var $rankingBar = $(".lista_rebricek");
   var $rankingForm = $("form[action='./duel/chart/']");

   var rangeButtons = addRanges();
   $rankingForm.parent().css("text-align", "left");
   $rankingForm.append(rangeButtons);

   $rankingBar.append("<a name='top'></a>");

   $(".range").click(function() {

      $(".range").css("background-color", "#393654");
      $(this).css("background-color", "#96962D");
   });

   $("table.table_small").after("<div>" + rangeButtons + "</>");

   //vrati html s poli odkazu
   function addRanges() {

      var $rangeElements = $("select[name='limit']").children();

      var ranges = new Array();

      $rangeElements.each(function() {

         var borders = $(this).text().split(" - ");
         ranges.push(borders);
      });

      var htmlRanges = "";
      for ( i = 0; i < ranges.length; i++) {

         var group = $("select[name='group']").val();
         var href = "href='" + SITE_ADRESS + "./duel/chart/?sort=&pos=&group=" + group + "&limit=" + (ranges[i][0] - 1) + "'";
         htmlRanges += "<a class='range'" + href + ">" + ranges[i][0] + "-" + ranges[i][1] + "</a>";
      }

      return htmlRanges;
   }

}

/**
 * Spočte hodnoty při souboji. 
 */
function computeAttributes(){
   
}

/**
 *Spočte atributy údery, pohyb, kondice jenom u samotneho profilu.
 */
function computeAttributesOld(){
   
   var currentUrl = window.location.href;

   if (currentUrl.indexOf("news/profile") == -1) {

      return;
   }
   
   $(".table_profile_skill>tbody>tr>td").css("width", "130px");
   var $basicHitsTd = $(".table_profile_skill>tbody>tr:eq(0)>td").has("div[class='yellow_middle']");
   $basicHitsTd.css("width", "70px");
   $basicHitsTd.after("<td style='font-size:11px' class='yellow_small abilityClass'></td>");
   
   var $basicMotionTd = $(".table_profile_skill>tbody>tr:eq(1)>td").has("div[class='yellow_middle']");
   $basicMotionTd.css("width", "70px");
   $basicMotionTd.after("<td style='font-size:11px' class='yellow_small motionClass'></td>");
   
   var $basicConditionTd = $(".table_profile_skill>tbody>tr:eq(2)>td").has("div[class='yellow_middle']");
   $basicConditionTd.css("width", "70px");
   $basicConditionTd.after("<td style='font-size:11px' class='yellow_small conditionClass'></td>");
    
   var attributes = getAttributes();
   
   //var myAttributes = getAttributes("10365");
   //alert(myAttributes["hitsSum"]);
   
   $(".table_profile_skill>tbody>tr:eq(0)>td:eq(2)>div").text(attributes["hitsSum"]);
   
   $(".abilityClass").text(attributes["hitsSumDetailedText"]);
   //$(".abilityClass").text(attributes["hitsSumDetailedText"] + "; " + (myAttributes["hitsSum"] - attributes["hitsSum"]));
   
   $(".table_profile_skill>tbody>tr:eq(1)>td:eq(2)>div").text(attributes["motionSum"]);
   $(".motionClass").text(attributes["motionSumDetailedText"]);
   
   $(".table_profile_skill>tbody>tr:eq(2)>td:eq(2)>div").text(attributes["conditionSum"]);
   $(".conditionClass").text(attributes["conditionSumDetailedText"]);
}


/**
 * Odkaz se prenese na celou plochu, ktera ma css tridu 'clickableArea'. To at se clovek nemusi trefovat presne na text. 
 */
function createClickableArea(){
 
   $clickableAreas = $(".clickableArea");
   
   $clickableAreas.click(function(){
        
      var href = $(this).find("A").attr("href");
      window.location.href = href;
   });
   
}