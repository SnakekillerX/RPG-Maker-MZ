//X_SNK_Rows_And_Formation_Lock.js
/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v1.1] Rows And Formation Lock
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \   \            Rows And Formation Lock     /   /   /   /   /   /
 *  \   \   \   \   \   \   \     Version  1.1     /   /   /   /   /   /   /   
 * ############################################################################
 *
 * Author: SnakekillerX 
 * Please credit if used.
 *
 * Description:
 * = Rows =
 * Adds _row to $gameActors object. (can equal "front" or "back")
 * If rows are enabled, portraits in the menu will reflect which row they are in.
 * (it is up to you to use these new values to make variations based on rows)
 * 
 * = Formation Lock =
 * Adds _formationLocked to $gameActors object. (can equal true or false)
 * Actors who are formation locked cannot be moved through the formation command.
 *
 * = Usage =
 * $gameParty.enableRows = true or false
 * $gameActors.actor(id)._row = "front" or "back"
 * $gameActors.actor(id)._formationLocked = true or false
 * $gameParty.members()[index]._row = "front" or "back"
 * $gameParty.members()[index]._formationLocked = true or false
 *
 * ############################################################################
 *
 * @
 * =========================
 * Changelog
 * =========================
 * [v1.1] - Updated Sept 24th, 2023 - Removed Plugin Parameters.  Controlled by script calls instead now.
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

	//New Game
	Alias_Row_And_Formation_Lock_DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		Alias_Row_And_Formation_Lock_DataManager_createGameObjects.call(this)
		//Adds "Row" and "Formation Locked" to $gameActors object
		for (let i = 1; i < $dataActors.length; i++){
			$gameActors.actor(i)._row = "front";
			$gameActors.actor(i)._formationLocked = false;
		}
		$gameParty.enableRows = true
	};	
	
    //'use strict';
    const pluginName = 'X_SNK_Rows_And_Formation_Lock';
    const param = PluginManager.parameters(pluginName);

	//Formation changing the same character toggles back row state on/off    (Pending Index = Moving from, Index = Moving to)
	Scene_Menu.prototype.onFormationOk = function() {
		const index = this._statusWindow.index();
		const pendingIndex = this._statusWindow.pendingIndex();
		//Change Formation
		if (pendingIndex >= 0) {
			if ($gameParty.members()[pendingIndex]._formationLocked == true || $gameParty.members()[index]._formationLocked == true) {
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
			//If Face Rows Enabled
			//Change Rows
			if($gameParty.enableRows == true){
				if (pendingIndex == index) {
					if($gameParty.members()[index]._row == "front"){
						$gameParty.members()[index]._row = "back";
					}else{
						$gameParty.members()[index]._row = "front";
					}
				}
			}
		} else {
			this._statusWindow.setPendingIndex(index);
		}
		this._statusWindow.refresh();
		this._statusWindow.activate();
	};

	//Update Actor Portrait Based on Row Position
		Window_MenuStatus.prototype.drawItemImage = function(index) {
		const actor = this.actor(index);
		const rect = this.itemRect(index);
		const width = ImageManager.faceWidth;
		const height = rect.height - 2;
		this.changePaintOpacity(actor.isBattleMember());
		
		//If Face Rows Enabled
		if($gameParty.enableRows == true){
			if($gameParty.members()[index]._row == "back"){
				this.drawActorFace(actor, rect.x + 20, rect.y + 1, width, height);
			}else{
				this.drawActorFace(actor, rect.x - 20, rect.y + 1, width, height);
			}
			}else{
				this.drawActorFace(actor, rect.x, rect.y + 1, width, height);
			}
		this.changePaintOpacity(true);
		//
	};
})();