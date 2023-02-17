//X_SNK_NegativeExpGold+LevelUpAnimations.js
/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v1.0] Negative Exp/Gold Drops + Level Up/Down Animations.
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \ Negative Exp/Gold Drops + Level Up/Down Animations /   /   /   / 
 *  \   \   \   \   \   \   \     Version  1.0     /   /   /   /   /   /   /   
 * ############################################################################
 *
 * Author: SnakekillerX 
 * Please credit if used.
 *
 * Description:
 * Allows enemies to drop negative values of Exp or Gold.
 * Set values as normal, then add notetags to make the values negative.
 *
 * Usage:
 * Notetags can be added to Enemy's notes.
 * <Negative EXP>
 * <Negative GOLD>
 *
 * ############################################################################
 *
 * @param LoseSkill 
 * @text Lose Skill On Down Level?
 * @desc Choose whether or not skills are lost when leveling down.
 * @type boolean
 * @default true
 *
 * @param LevelUpAnimation 
 * @text Level Up Animation
 * @desc Choose whether or to play a different animation on level down.
 * @type select
 * @option "no change"
 * @option "walk"
 * @option "wait"
 * @option "chant"
 * @option "guard"
 * @option "damage"
 * @option "evade"
 * @option "thrust"
 * @option "swing"
 * @option "missile"
 * @option "skill"
 * @option "escape"
 * @option "victory"
 * @option "dying"
 * @option "abnormal"
 * @option "sleep"
 * @option "dead"
 * @default "guard"
 *
 * @param LevelDownAnimation 
 * @text Level Down Animation
 * @desc Choose whether or to play a different animation on level down.
 * @type select
 * @option "no change"
 * @option "walk"
 * @option "wait"
 * @option "chant"
 * @option "guard"
 * @option "damage"
 * @option "evade"
 * @option "thrust"
 * @option "swing"
 * @option "missile"
 * @option "skill"
 * @option "escape"
 * @option "victory"
 * @option "dying"
 * @option "abnormal"
 * @option "sleep"
 * @option "dead"
 * @default "damage"
 *
 * @param PositiveExpMessage 
 * @text Positive Exp Message.
 * @desc Positive Exp message. (%1 = Exp Value, %2 = Exp Label)
 * @type string
 * @default "%1 %2 Received!".format(exp, TextManager.exp)
 *
 * @param NegativeExpMessage 
 * @text Negative Exp Message.
 * @desc Negative Exp message. (%1 = Exp Value, %2 = Exp Label)
 * @type value
 * @default "%1 %2 lost..".format(exp, TextManager.exp)
 *
 * @param PositiveGoldMessage 
 * @text Positive Gold Message.
 * @desc Positive Gold message. (%1 = Gold Value, %2 = Gold Label)
 * @type string
 * @default "%1 %2 found!".format(gold, TextManager.currencyUnit)
 *
 * @param NegativeGoldMessage 
 * @text Negative Gold Message.
 * @desc Negative Gold message. (%1 = Gold Value, %2 = Gold Label)
 * @type value
 * @default "%1 %2 lost..".format(gold, TextManager.gold)
 *
 * @
 * =========================
 * Changelog
 * =========================
 * [v1.0] - Released Feb 17th, 2023
 * 
 *
 * MIT License. Open Source.
 * https://opensource.org/license/mit/
 * 
 * @
 * ############################################################################
 *  End
 * ############################################################################
 * 
 */
 
(() => {
    //'use strict';
    const pluginName = 'X_SNK_NegativeExpGold+LevelUpAnimations';
    const param = PluginManager.parameters(pluginName);


//Check on database load, make negative EXP changes to database based on <Negative EXP> note tag.
_Negative_EXP_and_GOLD_changes_loaded = false
_Negative_EXP_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!_Negative_EXP_DataManager_isDatabaseLoaded.call(this)) return false;
	if (!_Negative_EXP_and_GOLD_changes_loaded) {
		for (let i = 1; i < $dataEnemies.length; i++) {
			if($dataEnemies[i].meta["Negative EXP"]){
			$dataEnemies[i].exp *= -1
			}
		}
		for (let i = 1; i < $dataEnemies.length; i++) {
			if($dataEnemies[i].meta["Negative GOLD"]){
			$dataEnemies[i].gold *= -1
			}
		}
		_Negative_EXP_and_GOLD_changes_loaded = true;
	}
	return true;
};

//Altered function to show negative EXP values as well.
BattleManager.displayExp = function() {
    const exp = this._rewards.exp;
    if (exp > 0) {
        $gameMessage.add(eval(param.PositiveExpMessage));
    }
    if (exp < 0) {
        $gameMessage.add(eval(param.NegativeExpMessage));
		
    }
};

//Altered function to show negative GOLD values as well.
BattleManager.displayGold = function() {
    const gold = this._rewards.gold;
    if (gold > 0) {
        $gameMessage.add(eval(param.PositiveGoldMessage));
    }
	if (gold < 0) {
        $gameMessage.add(eval(param.NegativeGoldMessage));
    }
};

//Altered function to display level down
Game_Actor.prototype.changeExp = function(exp, show) {
    this._exp[this._classId] = Math.max(exp, 0);
    const lastLevel = this._level;
    const lastSkills = this.skills();
    while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
        this.levelUp();
    }
    while (this.currentExp() < this.currentLevelExp()) {
        this.levelDown();
    }
    if (show && this._level > lastLevel) {
        this.displayLevelUp(this.findNewSkills(lastSkills));
    }
	if (show && this._level < lastLevel) {
        this.displayLevelDown(this.findOldSkills(lastSkills));
    }
    this.refresh();
};

//Altered function to enable losing skills when leveling down.
Game_Actor.prototype.levelDown = function() {
    this._level--;
};

//Allows displaying of lost skills
Game_Actor.prototype.findOldSkills = function(lastSkills) {
    const newSkills = this.skills();
	for (const learning of this.currentClass().learnings) {
        if (learning.level === this._level + 1) {
            this.learnSkill(learning.skillId);
        }
    }
    for (const lastSkill of lastSkills) {
        newSkills.remove(lastSkill);
    }
    return newSkills;
};

//Alter function to enable animation and sound option to level up.
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    const text = TextManager.levelUp.format(
        this._name,
        TextManager.level,
        this._level
    );
	if(eval(param.LevelUpAnimation) != "no change"){
		if (this.canMove()) {
			this.requestMotion(eval(param.LevelUpAnimation));
		}
	}
    $gameMessage.newPage();
    $gameMessage.add(text);
    for (const skill of newSkills) {
        $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    }
};

//Alter function to give new messages to player on level down / forget skill.  Animation and sound option to level down added.
Game_Actor.prototype.displayLevelDown = function(newSkills) {
    const text = TextManager.levelDown.format(
        this._name,
        TextManager.level,
        this._level
    );
    $gameMessage.newPage();
	if(eval(param.LevelDownAnimation) != "no change"){
		if (this.canMove()) {
			this.requestMotion(eval(param.LevelDownAnimation));
		}
	}
    $gameMessage.add(this._name + " has fallen to Lv " + (this._level) + "..");
	if(param.LoseSkill == "true"){	
		for (const learning of this.currentClass().learnings) {
			if (learning.level === this._level + 1) {
				$gameMessage.add($dataSkills[learning.skillId].name + " was forgotten..");
				this.forgetSkill(learning.skillId);
			}
		}
	}
};

})();