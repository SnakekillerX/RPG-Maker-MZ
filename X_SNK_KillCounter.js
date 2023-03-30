//_X_SNK_KillCounter.js
/*:
 * @target MZ
 * @plugindesc [v1.2] Enemy Kill Counter
 * @author SnakekillerX
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \   \   \   \       Kill Counter      /   /   /   /   /   /   /   /
 *  \   \   \   \   \   \       Version 1.2     /   /   /   /   /   /   /   /
 * ############################################################################
 * Author: SnakekillerX 
 * Please credit if used.
 *
 * Description:
 * Automatically keeps track of the specific enemies that are killed by the
 * party, as well as individual actors.
 *
 * Also keeps track of specific actor deaths and total party member deaths.
 *
 * Usage:
 * Check the condition of kill/death counts by using a conditional branch.
 * $killCounter.party[EnemyID]    
 * (The party has collectively killed this many of [EnemyID])
 *
 * $killCounter.actor[ActorID][EnemyID]    
 * ([ActorID] has killed this many [EnemyID]'s)
 *
 * $deathCounter.party 
 * (The party has died this many times collectively)
 *
 * $deathCounter.actor[ActorID]
 * (This [ActorID] has died this many times)
 * 
 * You can set, or reset the above values manually if needed:
 * $killCounter.party[21] = 100
 * $killCounter.actor[1][15] = 50
 * $deathCounter.party = 12
 * $deathCounter.actor[1] = 0
 *
 *
 * Examples:
 * ◆Comment：//Goblins killed (Goblin ID = 15)
 * ◆If：Script：$killCounter.party[15] >= 3
 * ◆Text：None, None, Window, Bottom
 * ：    ：Woah.. you killed all the goblins!
 * ◆
 * ：Else
 * ◆Text：None, None, Window, Bottom
 * ：    ：Please help, there are still many goblins around here.
 * ◆
 * ：End
 
 * ◆Comment：//Goblins killed by Actor 1
 * ◆If：Script：$killCounter.actor[1][15] >= 3
 * ◆Text：None, None, Window, Bottom
 * ：    ：Wow, your leader sure is bloodthirsty.. he killed all 3 of the goblins
 * ：    ：by himself!
 * ◆
 * ：Else
 * ◆Text：None, None, Window, Bottom
 * ：    ：If you want to go far, teamwork is key.  Keep it up!
 * ◆
 * ：End
 
 * ◆Comment：//If Actor 1 has not died
 * ◆If：Script：$deathCounter.actor[1] == 0
 * ◆Text：None, None, Window, Bottom
 * ：    ：Lead us to victory oh great leader!
 * ◆
 * ：Else
 * ◆Text：None, None, Window, Bottom
 * ：    ：To fall to such a weak enemy.. what a sham of a leader.
 * ◆
 * ：End
 
 * ◆Comment：//Reward if no party deaths
 * ◆If：Script：$deathCounter.party == 0
 * ◆Text：None, None, Window, Bottom
 * ：    ：The enemy forces don't stand a chance against you.
 * ：    ：Imagine coming this far without losing a single ally.
 * ◆Change Gold：+ 100
 * ◆
 * ：Else
 * ◆Text：None, None, Window, Bottom
 * ：    ：Looks like you've take casualties.  Please see the healer for assistance.
 * ◆
 * ：End
 *
 * =========================
 * Known Issues
 * =========================
 * If slip damage death is allowed, death by state damage will count the kill
 * towards the last acting actor.
 *
 * I may try and fix this in the future.
 * 
 * =========================
 * Changelog
 * =========================
 * [v1.2] - Update Mar 30th 2023
 * Added "Party Kill Counter"
 * Added "Party Death Counter"
 * Added specific "Actor Kill Counter"
 * Added specific "Actor Death Counter"
 * Fixed bug where actor deaths would incorrectly modify killCounter array.
 *
 * [v1.0] - Released Mar 29th 2023
 * 
 * ==================================================
 * MIT License. Open Source.
 * https://opensource.org/license/mit/
 * ==================================================
 * 
 * @
 * ############################################################################
 *  End
 * ############################################################################
 * 
 */

$killCounter = {}
$killCounter.party = []
$killCounter.actor = []
$deathCounter = {}
$deathCounter.party = 0
$deathCounter.actor = []
	
const Alias_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	Alias_DataManager_createGameObjects.call(this)
	//Set default party and actor kill count values to 0
	for (let i = 1; i < $dataEnemies.length; i++) {
	$killCounter.party[i] = 0
	}
	$deathCounter.party = 0
	for (let j = 1; j < $dataActors.length; j++) {
	$killCounter.actor[j] = []
	$deathCounter.actor[j] = 0
		for (let k = 1; k < $dataEnemies.length; k++) {
		$killCounter.actor[j][k] = 0
		}
	}
};

const Alias_Game_BattlerBase_Die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
	Alias_Game_BattlerBase_Die.call(this);
	if(!this._actorId){
		//Enemy Died
		$killCounter.party[this._enemyId] ++
		if($gameTemp._lastActionData[2] != 0){
		$killCounter.actor[$gameTemp._lastActionData[2]][this._enemyId] ++
		}
	}else{
		//Actor Died
		$deathCounter.party++
		$deathCounter.actor[this._actorId] ++
	}
};

const Alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = Alias_DataManager_makeSaveContents.call(this);
	contents.killCounter = $killCounter;
	contents.deathCounter = $deathCounter
    return contents;
};

const Alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	Alias_DataManager_extractSaveContents.call(this, contents);
	contents.killCounter ? $killCounter = contents.killCounter : console.warn("Could not load Kill Counter data!");
	contents.deathCounter ? $deathCounter = contents.deathCounter : console.warn("Could not load Death Counter data!");
};
