//_X_SNK_KillCounter.js
/*:
 * @target MZ
 * @plugindesc [v1.0] Enemy Kill Counter
 * @author SnakekillerX
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \   \   \   \       Kill Counter      /   /   /   /   /   /   /   /
 *  \   \   \   \   \   \       Version 1.0     /   /   /   /   /   /   /   /
 * ############################################################################
 * Author: SnakekillerX 
 * Please credit if used.
 *
 * Usage:
 * Compare $killCounter[enemyid] in a condition to see if it meets your
 * requirement. You may also change the kill counter of an enemy ID if needed.
 * 
 * Example:
 * //kill quest
 * if($killCounter[1] > 10){
 * $gameMessage.add("wow you've killed that many goblins?")
 * }else{
 * $gameMessage.add("come back when you've killed more goblins.")	 
 * }
 *
 * //reset kill count
 * $killCounter[1] = 0
 *
 * =========================
 * Changelog
 * =========================
 * [v1.0] - Released Mar 29th 2023
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

$killCounter = []
	
const Alias_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	Alias_DataManager_createGameObjects.call(this)
	//set default kill value to 0
	for (let i = 0; i < $dataEnemies.length; i++) {
	$killCounter[i] = 0
	}
};

const Alias_Game_BattlerBase_Die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
	Alias_Game_BattlerBase_Die.call(this);
	$killCounter[this._enemyId] ++
};

const Alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = Alias_DataManager_makeSaveContents.call(this);
	contents.killCounter = $killCounter;
    return contents;
};

const Alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	Alias_DataManager_extractSaveContents.call(this, contents);
	contents.killCounter ? $killCounter = contents.killCounter : console.warn("Could not load KillCounter data!");
};
