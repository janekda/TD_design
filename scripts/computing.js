
/**
 * Vrátí asociované pole s hodnotami atributů. Čte se ze stránky /profile/
 * Klíče jsou  hitsSum, hitsSkill, hitsProperty, hitsAbilities, hitsFacilitie, hitsBenefit motionSum, ...., conditionSum
 * a taky hitsSumDetailedText, motionSumDetailedText, conditionSumDetailedText
 * 
 * @parameter playerId V případě, že nejsem na stránce profilu, ale žebř, výsledku, tak si musím stáhnout data z profilu
 */
function getAttributes(playerId){
   
   var attributes;
   var isOutsideProfile = arguments.length == 1;
   if(isOutsideProfile){
      var address = "http://s3.tennisduel.cz/news/profile/?id=" + playerId;
      $.ajax({
         url: address,
         type: "GET",
         dataType: "html",
         success: function (html) {
            
           var $profilePage = $(html);
           var $anotherPlayerContentTable = $profilePage.find(".content_table:first");
           attributes = findAllAttributes($anotherPlayerContentTable);

         }
      });
   } else {
      
      var $contentTable = $(".content_table:first");
      attributes = findAllAttributes($contentTable);
   }
   
   return attributes;
}

function findAllAttributes($contentTable){
     
   var attributes = new Array();
   
   attributes = getSkill($contentTable, attributes);
   attributes = getBenefit($contentTable, attributes);
   attributes = getPropertyAttributes($contentTable, attributes);
   attributes = getAbilityAttributes($contentTable, attributes);
   attributes = getFacilitie($contentTable, attributes);
   attributes = getSumOfAttributes($contentTable, attributes);

   return attributes;
}

/**
 * Vrátí velikost základních atributů bez závislosti na benefitu.
 *  
 * @param $contentTable tabulka v kter0 jsou atributy
 * @param attributes asoc pole atributů
 * @return attributes doplněné pole o základní atributy
 */
function getSkill($contentTable, attributes){
   
   var $hitsSkill = $contentTable.find(".table_profile_skill>tbody>tr:eq(0)>td").has("div[class='yellow_middle']");
   attributes["hitsSkill"] = parseInt($hitsSkill.text());
   var $motionSkill = $contentTable.find(".table_profile_skill>tbody>tr:eq(1)>td").has("div[class='yellow_middle']");
   attributes["motionSkill"] = parseInt($motionSkill.text());
   var $conditionSkill = $contentTable.find(".table_profile_skill>tbody>tr:eq(2)>td").has("div[class='yellow_middle']");
   attributes["conditionSkill"] = parseInt($conditionSkill.text());
   
   return attributes;
}

/**
 * Vrátí velikost schopností z výbavy bez závislosti na benefitu.
 *  
 * @param attributes asoc pole atributů
 * @return attributes doplněné pole o výbavu
 */
function getPropertyAttributes($contentTable, attributes){
   
   var $hitsProperty = $contentTable.find("div[class='table_profile_body']>div:eq(0)>a>div:nth-child(2)>span[class='yellow_small']");
   attributes["hitsProperty"] = parseInt(getZeroForNoneProperty($hitsProperty.text()));
   var $motionProperty = $contentTable.find("div[class='table_profile_body']>div:eq(1)>a>div:nth-child(2)>span[class='yellow_small']");
   attributes["motionProperty"] = parseInt(getZeroForNoneProperty($motionProperty.text()));
   var $conditionProperty = $contentTable.find("div[class='table_profile_body']>div:eq(2)>a>div:nth-child(2)>span[class='yellow_small']");
   attributes["conditionProperty"] = parseInt(getZeroForNoneProperty($conditionProperty.text()));
   
   return attributes;
}

function getZeroForNoneProperty(text){
   
   return (text.length == 0) ? "0" : text;  
}

/**
 * Vrátí velikost schopností(přepočet z procent) bez závislosti na benefitu.
 *  
 * @param attributes asoc pole atributů
 * @return attributes doplněné pole o schopnosti
 */
function getAbilityAttributes($contentTable, attributes){
   
   var hitsAbilities = 0;
   var motionAbilities = 0;
   var conditionAbilities = 0;
   var $abilitiesSelector = $contentTable.find("div[class='table_profile_body']:eq(1)>div[class='profile_box_mini_bg']");
   
   $abilitiesSelector.each(function(){
      
      var allTextForAbility = $(this).find("div>div[class='profile_box_small_info']").text();
      
      var hitsAbilityIndex = allTextForAbility.indexOf("Údery: +") + 8;
      var motionAbilityIndex = allTextForAbility.indexOf("Pohyb: +") + 8;
      var conditionAbilityIndex = allTextForAbility.indexOf("Kondice: +") + 10;
      
      var afterHitsAbilityIndex = allTextForAbility.indexOf("%", hitsAbilityIndex);
      var afterMotionAbilityIndex = allTextForAbility.indexOf("%", motionAbilityIndex);
      var afterConditionAbilityIndex = allTextForAbility.indexOf("%", conditionAbilityIndex);
      
      var hitsAbility = 0;
      if(hitsAbilityIndex-8 > -1){
         hitsAbility = allTextForAbility.substring(hitsAbilityIndex, afterHitsAbilityIndex);
      }
      
      var motionAbility = 0;
      if(motionAbilityIndex-8 > -1){
         motionAbility = allTextForAbility.substring(motionAbilityIndex, afterMotionAbilityIndex);
      }
      
      var conditionAbility = 0;
      if(conditionAbilityIndex-10 > -1){
         conditionAbility = allTextForAbility.substring(conditionAbilityIndex, afterConditionAbilityIndex);
      }
      var multiplier = $(this).find("div>div>span>b").text();
      
      hitsAbilities += parseFloat(hitsAbility)*parseInt(multiplier);
      motionAbilities += parseFloat(motionAbility)*parseInt(multiplier);
      conditionAbilities += parseFloat(conditionAbility)*parseInt(multiplier);
   });
   
   attributes["hitsAbilities"] = Math.floor(hitsAbilities*attributes["hitsSkill"]/100);
   attributes["motionAbilities"] = Math.floor(motionAbilities*attributes["motionSkill"]/100);
   attributes["conditionAbilities"] = Math.floor(conditionAbilities*attributes["conditionSkill"]/100);
   
   return attributes;
}

/**
 * Vrátí velikost zázemí bez závislosti na benefitu.
 *  
 * @param attributes asoc pole atributů
 * @return attributes doplněné pole o zázemí
 */
function getFacilitie($contentTable, attributes){
   
   var hitsFacilitie = 0;
   var motionFacilitie = 0;
   var conditionFacilitie = 0;
   var $facilitieSelector = $contentTable.find("div[class='table_profile_body']:eq(2)>div[class='profile_box_mini_bg']");
   
   $facilitieSelector.each(function(){
      
      var allTextForFacilitie = $(this).find("div>div[class='profile_box_small_info']").text();
      
      var hitsFacilitieIndex = allTextForFacilitie.indexOf("Údery: +") + 8;
      var motionFacilitieIndex = allTextForFacilitie.indexOf("Pohyb: +") + 8;
      var conditionFacilitieIndex = allTextForFacilitie.indexOf("Kondice: +") + 10;
      
      var afterHitsFacilitieIndex = allTextForFacilitie.indexOf(" ", hitsFacilitieIndex);
      var afterMotionFacilitieIndex = allTextForFacilitie.indexOf(" ", motionFacilitieIndex);
      var afterConditionFacilitieIndex = allTextForFacilitie.indexOf(" ", conditionFacilitieIndex);
      
      var oneHitsFacilitie = 0;
      if(hitsFacilitieIndex-8 > -1){
         oneHitsFacilitie = allTextForFacilitie.substring(hitsFacilitieIndex, afterHitsFacilitieIndex);
      }
      
      var oneMotionFacilitie = 0;
      if(motionFacilitieIndex-8 > -1){
         oneMotionFacilitie = allTextForFacilitie.substring(motionFacilitieIndex, afterMotionFacilitieIndex);
      }
      
      var oneConditionFacilitie = 0;
      if(conditionFacilitieIndex-10 > -1){
         oneConditionFacilitie = allTextForFacilitie.substring(conditionFacilitieIndex, afterConditionFacilitieIndex);
      }
      
      var multiplier = $(this).find("div>div>span>b").text();
      
      hitsFacilitie += parseFloat(oneHitsFacilitie)*parseInt(multiplier);
      motionFacilitie += parseFloat(oneMotionFacilitie)*parseInt(multiplier);
      conditionFacilitie += parseFloat(oneConditionFacilitie)*parseInt(multiplier);
   });
   
   attributes["hitsFacilitie"] = hitsFacilitie;
   attributes["motionFacilitie"] = motionFacilitie;
   attributes["conditionFacilitie"] = conditionFacilitie;

   return attributes;
}

/**
 * Vrátí velikost benefitu.
 *  
 * @param attributes asoc pole atributů
 * @return attributes doplněné pole o základní atributy
 */
function getBenefit($contentTable, attributes){
   
   var $hitsSkill = $(".table_profile_skill>tbody>tr:eq(0)>td").has("div[class='yellow_middle']");
   
   var basicHitsAttributes = $hitsSkill.text();
   if(basicHitsAttributes.split("+").length < 2){
      
        attributes["hitsBenefit"] = 0;
        attributes["motionBenefit"] = 0;
        attributes["conditionBenefit"] = 0;
        
        return attributes;
   }
   
   attributes["hitsBenefit"] = getBenefitValue($hitsSkill);
   
   var $motionSkill = $(".table_profile_skill>tbody>tr:eq(1)>td").has("div[class='yellow_middle']");
   attributes["motionBenefit"] = getBenefitValue($motionSkill);
   var $conditionSkill = $(".table_profile_skill>tbody>tr:eq(2)>td").has("div[class='yellow_middle']");
   attributes["conditionBenefit"] = getBenefitValue($conditionSkill);
   
   return attributes;
}

/**
 * Vrátí celkovou sumu atributů na benefitu.
 *  
 * @param attributes asoc pole atributů
 * @return attributes doplněné pole o sumu atributů
 */
function getSumOfAttributes($contentTable, attributes){
   
   attributes["hitsSum"] = attributes["hitsSkill"] + attributes["hitsProperty"] + attributes["hitsAbilities"];
   attributes["motionSum"] = attributes["motionSkill"] + attributes["motionProperty"] + attributes["motionAbilities"];
   attributes["conditionSum"] = attributes["conditionSkill"] + attributes["conditionProperty"] + attributes["conditionAbilities"];

   var hitsBenefit = "";
   var motionBenefit = "";
   var conditionBenefit = "";
   if(attributes["hitsBenefit"]>0){

      hitsBenefit = "(" + attributes["hitsBenefit"] + ")";
      motionBenefit = "(" + attributes["motionBenefit"] + ")";
      conditionBenefit = "(" + attributes["conditionBenefit"] + ")";
   }
   
   attributes["hitsSumDetailedText"] = attributes["hitsSkill"] + hitsBenefit + "," + attributes["hitsProperty"] + "," + attributes["hitsAbilities"] + ",(" + attributes["hitsFacilitie"] + ")";
   attributes["motionSumDetailedText"] = attributes["motionSkill"] + motionBenefit+ "," + attributes["motionProperty"] + "," + attributes["motionAbilities"] + ",(" + attributes["motionFacilitie"] + ")";
   attributes["conditionSumDetailedText"] = attributes["conditionSkill"] + conditionBenefit + "," + attributes["conditionProperty"] + "," + attributes["conditionAbilities"] + ",(" + attributes["conditionFacilitie"] + ")";
   
   return attributes;
}

/**
 * Vrátí hodnotu benefitu z pole, kde je i základní atribut.
 *  
 * @param allText př: "47 (+90)"
 */
function getBenefitValue($allText){
   
   var benefitWithParenthes = $allText.text().split("+")[1];
   var benefitInText = benefitWithParenthes.substring(0, benefitWithParenthes.length-1);
   
   return parseInt(benefitInText);
}