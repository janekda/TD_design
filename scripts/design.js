SITE_ADRESS = "http://s3.tennisduel.cz/";

STANDARD_DELAY = 2000;
STANDARD_FADEOUT = 400;
STANDARD_BLOCK = 404;
WITHOUT_BUILDING = false;

//skrývané objekty ve stránce. jQuery syntaxe
HIDDEN_OBJECTS = [".action4_bg", ".homepage_news"];

MINIMUM_AMOUNT_FOR_FEE_TO_BUILDING = 5000;
MINIMUM_FEE_TO_BUILDING = 0;
//mohlo by byt 5 procent ale neni

MAXIMUM_RATIO_TO_BANK = 0;
BIGGER_RATIO_TO_BANK = 30;
BIGGER_RATIO_TO_BUILDING = 60;
NOTHING_TO_BANK = 100;

isSuperUser = false;

// Stepanek, Karel Pisarik(maska), Remi, Radhej, Bronin, Miranda, stenley
STRONG_PLAYERS = [31, 6744, 7907, 1885, 9662, 723, 5597];

//jenom pro zmateni nepřítele :))
permitFor();
addBlock();

if (STANDARD_BLOCK == 100) {

   makeBountyMatchImmidiatelly();
}

if (STANDARD_BLOCK == 0 || STANDARD_BLOCK == 100) {
   // konec matení, ano tady

   hideElements();
   showSubMenu();
   computeAttributes();
   showProgress();

   playMatchDirectly();
   movePerniky();
}

function movePerniky() {

   var $pernik = $("a[href*='action/Foundsnowflakes']");
   $pernik.parent().css({
      top : 20,
      left : 50,
      position : 'absolute'
   });
   $pernik.parent().css("border", "10px solid red");
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

   var hasAlreadyCalled = (STANDARD_BLOCK == 0 || STANDARD_BLOCK == 100);
   if (hasAlreadyCalled) {

      return;
   }

   var people = ["J" + "an " + "va" + "n S" + "ch" + "ip"];
   //var people = new Array();  //kdyby melo byt prazdne pole
   var logged = $("#toogle_menu>span").html();

   for ( i = 0; i < people.length; i++) {

      if (people[i] == logged) {

         isSuperUser = true;
         STANDARD_BLOCK = 100;
         return;
      }
   }

   // Laatste in de wereld
   var permittedClub = "La" + "at" + "s" + "te" + " i" + "n " + "d" + "e " + "w" + "er" + "el" + "d";
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
 * Zobrazí základní odkazy do vedlejšího boxu. Předtím se muselo proklikávat. Je-li zrovna živý zápas, tak se zápas přeskočí.
 */
function showSubMenu() {

   var isOld = (new Date() - 360) > new Date(2014, 12, 12);
   if (skipLiveMatch() == true && isOld) {

      return;
   }

   var references = new Array();
   references[0] = "<td class='myBasic myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/news/' class='myBasicFont'>Novinky</a></td>";
   references[1] = "<td class='myBasic myMainButton clickableArea'><a href='" + SITE_ADRESS + "task/task/' class='myBasicFont'>Úkoly</a></td>";

   references[2] = "<td class='myClub myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/clubs/' class='myClubFont'>Můj klub</a></td>";
   references[3] = "<td class='myClub myMainButton clickableArea'><a href='" + SITE_ADRESS + "news/clubs/?data=chart&sort=1&country=' class='myClubFont'>Kluby</a></td>";
   
   references[4] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/chart/' class='myMatchesFont'>Žebříček</a></td>";
   references[5] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/league/' class='myMatchesFont'>Liga</a></td>";
   references[6] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/tournaments/' class='myMatchesFont'>Turnaje</a></td>";
   references[7] = "<td class='myMatches myMainButton clickableArea'><a href='" + SITE_ADRESS + "duel/bounty/' class='myMatchesFont'>Odměny</a></td>";


   var floatMenu = "<table id='floatMenu' style='font-size:13px;'>";

   floatMenu += "<tr>" + references[0] + references[1] + "</tr>";
   floatMenu += "<tr>" + references[2] + references[3] + "</tr>";
   floatMenu += "<tr>" + references[4] + references[5] + "</tr>";
   floatMenu += "<tr>" + references[6] + references[7] + "</tr>";


   floatMenu += "<tr><td colspan='2'><table id='bounties' style='width:100%'></table></td></tr>";
   floatMenu += "<tr><td colspan='2'><table id='bountiesRefresh' style='width:100%'></table></td></tr>";

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

   if (isSuperUser) {

      showBounties();
   }

   setTimeout(function() {
      noticeForum();
   }, 4 * 60 * 1000);

   addLoggedMembers();

   /**
    * @return boolean true - jestli se přeskakuje zápas, false na všech ostatních stránkách
    */
   function skipLiveMatch() {

      var isMatchSkipped = false;

      var actualUrl = location.href;
      var isLiveMatch = actualUrl.indexOf("#live") > -1;
      if (isLiveMatch) {

         var $skipLiveMatchSelector = $("div .button_clas_text:contains('Přeskočit')");
         if ($skipLiveMatchSelector.size() == 1) {

            $skipLiveMatchSelector.click();
            isMatchSkipped = true;
         }
      }

      return isMatchSkipped;
   }

}

/**
 * Zobrazí odměny, obnovuje se v intervalu okolo 30-60 sec, asi 5x. Na stránkách Odměny se nezobrazí.
 */
function showBounties() {

   var actualPageUrl = location.href;
   var isPlayedMatchUrl = actualPageUrl.indexOf("live?id") > -1;
   if (isPlayedMatchUrl) {

      return;
   }

   var baseRepeats = 30;
   if (actualPageUrl == SITE_ADRESS + "duel/chart/" || actualPageUrl == SITE_ADRESS + "duel/bounty/") {

      baseRepeats = 400;
   }

   var interval = _getInterval();

   var maximumRepeats = Math.floor((Math.random() * 15) + baseRepeats);
   var isActiveMatchPreviewUrl = actualPageUrl.indexOf("report/rival") > -1;
   if (isActiveMatchPreviewUrl) {

      maximumRepeats = 1;
      interval = 10000;
   }

   randomizeTimeoutBounty(function() {
      _ajaxBounties();
   }, maximumRepeats, interval);

   function randomizeTimeoutBounty(callback, maximumRepeats, interval) {

      var internalCallback = function(t, myInterval) {
         return function() {

            if (--t > -1) {

               $("#bountiesRefresh").html("----  " + t + "   ----");
               var waitForMiddleTime = Math.floor((Math.random() * myInterval) + myInterval);
               window.setTimeout(internalCallback, waitForMiddleTime);
               callback();
            } else {

               $("#bounties").html("Refresh");
            }
         };
      }(maximumRepeats, interval);

      window.setTimeout(internalCallback);
   }

   function _getInterval() {

      var interval = 2500;
      if (location.href == SITE_ADRESS + "duel/chart/" || location.href == SITE_ADRESS + "duel/bounty/") {

         interval = 300;
      }

      return interval;
   }

}

/**
 * Dotahuje data o odměnách do tabulky.
 */
function _ajaxBounties() {

   var bountyUrl = SITE_ADRESS + "duel/bounty/";

   $.ajax({
      url : bountyUrl,
      dataType : "html",
      complete : function(jqXHR, textStatus) {
         createClickableArea();
      },
      success : function(data) {

         _createBountiesTable(data);

      }
   });
}

/**
 * Vytvoří se tabulka hráčů vypsaných na odměny.
 */
function _createBountiesTable(data) {

   var $playersForBounty = $(data).find(".table_small>tbody>tr>td:nth-child(1)");

   var players = "";
   $playersForBounty.each(function(i) {

      var playerHref = $(this).find("a").attr("href");
      var playerId = parseInt(playerHref.substring(playerHref.indexOf("id=") + 3));
      var playerBountyHref = SITE_ADRESS + "report/rival?idu=" + playerId + "-b";

      var isHigherPlayerLevelForBounty = (STRONG_PLAYERS.indexOf(playerId) > -1);
      if (isHigherPlayerLevelForBounty) {
         return;
      }

      players += "<tr><td class='bounty clickableArea' id='player_'" + playerId + "'><a href='" + playerBountyHref + "'>" + $(this).text() + "</a></td></tr>";

   });

   var $bounty = $("#bounties");
   $bounty.html(players);
}

// upozorni na nove prispevky na foru
function noticeForum() {

   $.ajax({
      url : SITE_ADRESS + "forum",
      dataType : "html",
      success : function(data) {

         var $forum = $(data).find("#bbiiForum");

         var $newMessages = $forum.find("div[style*='forum1.png']");
         if ($newMessages.size() > 0) {

            $("#myForum").append(" !");
         }
      }
   });

}

/**
 * Kliknutím hráče na souboj o odměnu se rovnou spustí zápas.
 * No zdržím to na interval mezi 5 a 15 setinami, z bezpečnostních důvodů, aby to nebylo podezřelé provozovateli.
 */
function makeBountyMatchImmidiatelly() {

   var actualPage = location.href;
   // priklad stranky o odmenu http://s3.tennisduel.cz/report/rival?idu=5597-b
   var isBountyPossibleMatchPage = (actualPage.indexOf("rival?idu") > -1 && actualPage.indexOf("-b", actualPage.indexOf("rival?idu")) > -1);
   var isPreviousPageBounties = (document.referrer == SITE_ADRESS + "duel/bounty/");

   if (isBountyPossibleMatchPage && isPreviousPageBounties == false) {

      var $playMatchSelector = $("div .button_clas_text:contains('Hrát')");
      if ($playMatchSelector.size() == 1) {

         var i = 0;

         //rusim zdrzeni
         var waitForShortTime = 3;
         //Math.floor((Math.random() * 10) + 5);
         setInterval(function() {

            var onlyFirst = 1;
            if (i == onlyFirst) {

               $playMatchSelector.click();
            }
            i++;
         }, waitForShortTime);

      }
   }

}

/**
 * Spočte hodnoty při souboji.
 */
function computeAttributes() {

}

/**
 * Odkaz se prenese na celou plochu, ktera ma css tridu 'clickableArea'. To at se clovek nemusi trefovat presne na text.
 */
function createClickableArea() {

   var $clickableAreas = $(".clickableArea");

   $clickableAreas.click(function() {

      var href = $(this).find("A").attr("href");
      window.location.href = href;
   });

}

/**
 * Přidá chování k tlačítku "Přihlášení uživatelé". Tedy vypsání členů.
 */
function addLoggedMembers() {

   var $loggedMembersButton = $("#loggedMembersButton");

   $loggedMembersButton.click(function() {

      var urlClub = SITE_ADRESS + "news/clubs/";
      var loggedPlayers = [];

      $.ajax({
         url : urlClub,
         dataType : "html",
         complete : function(jqXHR, textStatus) {

            var loggedMemebrsHtml = "";
            for (var i = 0; i < loggedPlayers.length; i++) {

               loggedMemebrsHtml += "<tr><td class='profile_link'><a class='ico_mail_send' href='" + SITE_ADRESS + "mail/send?data=to-" + loggedPlayers[i][0] + "'>" + loggedPlayers[i][1] + "</a></td></tr>";
            }

            $("#loggedMembers").append(loggedMemebrsHtml);
         },
         success : function(data) {

            var $players = $(data).find("div.profile_club_list_players>table>tbody>tr>td:nth-child(2)");

            $players.each(function() {

               var isPlayerLogged = $(this).find("IMG:eq(1)").attr("src").indexOf("online.png") > -1;
               if (isPlayerLogged) {

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

function showProgress() {

   var $levelText = $("div .level_text");
   var title = $levelText.attr("title");

   var nowExperience = title.substring(title.indexOf(":") + 1, title.indexOf("/") - 1);
   var endLevelExperience = title.substring(title.indexOf(":", title.indexOf("/")) + 1);

   $levelText.append("<span style='font-size:10px;font-weight:normal'>" + (endLevelExperience - nowExperience) + "<span>");

}

/**
 * Vytvoří odkaz hned vedle keše pro poslání všech peněz do banky, stavby. A na poměrné části.
 * 
 * @Deprecated - uz nepouzivam
 */
function createDirectLinks() {

   var $attributes = $(".money");

   var directLinkToBank = "<div class='directLink' id='toBank'  title='do banky'>$13</div>";
   var showPerniky = "<div class='directLink'  title='otevři stránky' id='openPages'>Perniky</div>";
   if (new Date() > new Date(2015, 1, 7)) {
      showPerniky = "";
   }

   $attributes.after("<div id='directLinks'>" + directLinkToBank + showPerniky + "</div>");

   $("#toBank").click(function() {
      sendMoney();
   });

   $("#openPages").click(function() {
      openPages();
   });

   var pos = $attributes.position();
   // .outerWidth() takes into account border and padding.
   var width = $attributes.outerWidth();

   $("#directLinks").css({
      position : "absolute",
      top : pos.top + "px",
      left : (pos.left + width) + "px"
   }).show();

   /**
    * Posílají se peníze do banky.
    *
    */
   function sendMoney() {

      var cash = _getCash();

      if (cash < 113) {

         window.location.assign(SITE_ADRESS + "sponzor/bank/");
         return;
      }

      var inCashForWinner = 13;
      var cashToBank = cash - inCashForWinner;

      if (cashToBank < 100 && isSendingToBank) {

         alert("Musí být přes 100 dolarů");
         return;
      }

      if (cashToBank > 100) {

         $.post(SITE_ADRESS + "actionBank/addtostorage", {
            price_from : "" + cashToBank,
            currency_storage : "" + cashToBank
         }, function(data) {
            $("A[href='./sponzor/bank']").children(".yellow").text(inCashForWinner);
         }).fail(function() {
            alert("error in sending money");
         });
      }

   }

   function openPages() {

      var pages = ["info/changelog", "game-rules", "privacy-policy", "mail/bug/", "info/manual", "info/contact", "mail/unread", "mail/send/", "mail/read/", "mail/sent/", "search/", "settings/settings/", "premium/credits_transaction"];

      for (page in pages) {

         window.open(SITE_ADRESS + pages[page], "_blank");
      }
   }

}

/**
 * Pokud nemá soupeř benefit, není z extra silných soupeřů nebo v lize nemám benefit,
 * tak se vše automaticky odkliká.
 */
function playMatchDirectly() {

   var adressMatch = location.href.match(/.*rival\?idu.*/);
   if (adressMatch == null) {

      return;
   }
   var isMatch = adressMatch.length > 0;

   var playDirectly = _playDirectly();

   if (playDirectly) {

      var $playMatchSelector = $("div .button_clas_text:contains('Hrát')");
      if ($playMatchSelector.size() == 1) {

         $playMatchSelector.click();

         var isLeagueMatch = location.href.match(/.*rival.*league/).length > 0;
         if (isLeagueMatch) {

            var i = 0;
            setInterval(function() {

               var $leagueSelector = $("div .button_clas_text:contains('Liga')");
               var isLeagueButton = $leagueSelector.size() == 1;
               while (isLeagueButton) {
                  $leagueSelector.click();
               }

            }, 50);
         }
      }
   }
}

function _playDirectly() {

   var isMyBenefitActivated = _isMyBenefitActivated();
   var isWeakOpponent = _isWeakOpponent();

   var playMatchDirectly = isMyBenefitActivated && isWeakOpponent ? true : false;

   return playMatchDirectly;
}

function _isMyBenefitActivated() {

   var isActivated = false;

   var $benefitTimer = $("#alchemy_main_timer");
   return $benefitTimer.text().indexOf(":") > -1;
}

//neni benefit, neni ze seznamu silnych hracu
function _isWeakOpponent() {

   var isWeakPlayer = false;

   var playerHref = $("div.match_report_name>a:not([href*='10365'])").attr("href");
   if (playerHref != null) {

      var opponentId = parseInt(playerHref.substring(playerHref.indexOf("id=") + 3));
      var isStrongPlayer = (STRONG_PLAYERS.indexOf(opponentId) > -1);
      if (isStrongPlayer) {

         return false;
      }
   }

   var attributesWithBenefitCount = $("span[title^='Benefit HyperEnergy']").size();
   var isMyBenefitActivated = _isMyBenefitActivated();

   var isRobot = playerHref == null;

   if (isMyBenefitActivated && attributesWithBenefitCount == 3 && isRobot) {

      isWeakPlayer = true;
   } else if (isMyBenefitActivated == false && attributesWithBenefitCount == 0 && isRobot == false && isSuperUser) {

      isWeakPlayer = true;
   }

   //alert("isRobot=" + isRobot + ", isMyBenefitActivated=" + isMyBenefitActivated + ", attributesWithBenefitCount=" + attributesWithBenefitCount + ", isStrongPlayer=" + isStrongPlayer);
   return isWeakPlayer;
}

/**
 * Po stisknutí tlačítka na vypsání odměny, se zjistí jestli je dost peněz v cashi.
 * Není-li vytáhnou se do banky.
 * Pošle se příkaz na vypsání odměny.
 * 
 * @Deprecated - uz nevypisuji odmeny
 */
function makeBounty() {

   //selectorem .button_classic_deactivated>button submit
   var isProfilePage = (location.href.match(/.*profile\?id=/) != null);
   if (isProfilePage == false) {

      return;
   }

   $bountyButton = $(":submit").click(function() {

      var $inputAmount = $("input[name='price_from']");

      var neededAmount = parseInt($inputAmount.val());
      var cash = _getCash();
      neededAmount = 500000000;
      if (neededAmount > cash) {

         neededAmount = 33;
         $.post(SITE_ADRESS + "actionBank/addtocurrency", {
            price_from : "" + neededAmount,
            currency_storage : "" + neededAmount
         }, function(data) {

            var $cash = $("A[href='./sponzor/bank']");
            var cashText = $cash.children(".yellow").text("ahoj");

            var actualCash = _getCash();
            if (neededAmount > actualCash) {
               $inputAmount.val("V bance nejsou peníze");
               return;
            }
         }).fail(function() {

            console.log("na hrace jiz je odmena vypsana. url= " + location.href);
         });

      }

      //zavolat adresu na vypsani odmeny
      //http://s3.tennisduel.cz/action/add_bounty/?id_user=10678
   });

}

function writeBounties1() {
   alert("sdf");
}

/**
 * Vrátí celočíselnou hodnotu cashe.
 */
function _getCash() {

   var $cash = $("A[href='./sponzor/bank']");

   var cashText = $cash.children(".yellow").text();

   //neni replaceAll, tak davam split
   var cash = parseInt(cashText.split(' ').join(''));

   return cash;
}