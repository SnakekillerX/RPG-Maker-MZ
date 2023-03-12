//X_SNK_FormationLock_and_RowStateToggle.js
/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v1.0] Formation Lock and Row State Toggle.
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \   \      Formation Lock and Row State Toggle       /   /   /   /
 *  \   \   \   \   \   \   \     Version  1.0     /   /   /   /   /   /   /   
 * ############################################################################
 *
 * Author: SnakekillerX 
 * Please credit if used.
 *
 * Description:
 * Allows formation party index and actor index locations to be locked/unlocked.
 * Selecting the same actor in formation command will toggle the actor's row state.
 * (Used for toggling front/back row state like in Final Fantasy games)
 * 
 * NOTE: You must already have a method of changing rows in your game.
 * This plugin just allows you to toggle the row using the formation command
 * by toggling the character's state.
 * 
 *
 * Usage:
 * Assign both 'Lock Index' and 'Lock Actor' to different variables.
 * If these values are undefined, changing formation will crash the game.
 * Both 'Lock Index' and 'Lock Actor' are assigned differently, view example.
 *
 * Lock Index Examples:
 * //no index lock, but will prevent 'undefined crash'.
 * $gameVariables.setValue(1, [])
 *
 * //party index 0 and 1 are locked.
 * $gameVariables.setValue(1, [0,1])
 *
 * //party index 0, 1, 2 and 3 are locked.
 * $gameVariables.setValue(1, [0,1,2,3])
 *
 * Lock Actor Examples:
 * //no actor index lock, but will prevent 'undefined crash'.
 * $gameVariables.setValue(2, [])
 *
 * //actors 1 and 2 party indexes are locked.
 * $gameVariables.setValue(2, [$gameActors.actor(1).index(),$gameActors.actor(2).index()])
 *
 * //assigned using eventing:
 * ◆Control Variables：#0001 Locked Index = []
 * ◆Control Variables：#0002 Locked Actor = [$gameActors.actor(1).index()]
 *                                    
 *
 * ############################################################################
 *
 * @param LockIndex
 * @text Lock Index
 * @desc Lock this party formation index number.
 * @type variable
 *
 * @param LockActor 
 * @text Lock Actor
 * @desc Lock this actor's location in the party formation.
 * @type variable
 *
 * @param EnableRowsOption 
 * @text Enable Row Changing?
 * @desc Enable this if you wish to use row changing functionality with formation command.
 * @type boolean
 * @default false
 *
 * @param EnableFaceRows 
 * @text Move Face Position?
 * @desc Enable this if you wish to move the face position to match front/back row location.
 * @type boolean
 * @default false
 *
 * @param ToggleStateId 
 * @text Toggle State Id
 * @desc This state is toggled when selecting the same character in formation command.
 * @type state
 *
 * @
 * =========================
 * Changelog
 * =========================
 * [v1.0] - Released Mar 12th, 2023
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
    const pluginName = 'X_SNK_FormationLock_and_RowStateToggle';
    const param = PluginManager.parameters(pluginName);

//Formation changing the same character toggles back row state on/off    (Pending Index = Moving from, Index = Moving to)
Scene_Menu.prototype.onFormationOk = function() {
    const index = this._statusWindow.index();
    const pendingIndex = this._statusWindow.pendingIndex();
	//Change Formation
    if (pendingIndex >= 0) {
		if ($gameVariables.value(param.LockIndex).includes(pendingIndex) || $gameVariables.value(param.LockIndex).includes(index) || $gameVariables.value(param.LockActor).includes(pendingIndex) || $gameVariables.value(param.LockActor).includes(index)) {
			if (pendingIndex != index) {
				AudioManager.playSe({name: 'Buzzer1',volume: 90,pitch: 100});
			}
			$gameParty.swapOrder(pendingIndex, pendingIndex);
			this._statusWindow.setPendingIndex(-1);
			this._statusWindow.redrawItem(index);
		}else{
			$gameParty.swapOrder(index, pendingIndex);
			this._statusWindow.setPendingIndex(-1);
			this._statusWindow.redrawItem(index);
		}
		if(param.EnableRowsOption == "true"){
		//Change Rows
			if (pendingIndex == index) {
				if($gameParty.members()[index].isStateAffected(eval(param.ToggleStateId))){
					$gameParty.members()[index].eraseState(eval(param.ToggleStateId));
				}else{
					$gameParty.members()[index].addState(eval(param.ToggleStateId));
				}
			}		
		}
    } else {
        this._statusWindow.setPendingIndex(index);
    }
	this._statusWindow.refresh();
    this._statusWindow.activate();
};

//Update actor face position based on row position
	Window_MenuStatus.prototype.drawItemImage = function(index) {
	const actor = this.actor(index);
	const rect = this.itemRect(index);
	const width = ImageManager.faceWidth;
	const height = rect.height - 2;
	this.changePaintOpacity(actor.isBattleMember());
	//If Face Rows Enabled
	if(param.EnableFaceRows == "true"){
		if($gameParty.members()[index].isStateAffected(eval(param.ToggleStateId))){
			this.drawActorFace(actor, rect.x + 20, rect.y + 1, width, height);
		}else{
			this.drawActorFace(actor, rect.x - 20, rect.y + 1, width, height);
		}
	}else{
		this.drawActorFace(actor, rect.x, rect.y + 1, width, height);
	}
	this.changePaintOpacity(true);
};
})();