// X_SNK_SkipUpdate.js
/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v1.4] Suppresses Update Function on Chosen Events.
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \                   Skip Update v1.4                     /   /   /   
 * ############################################################################
 *
 * Authors: SnakekillerX made in collaboration with The Ninefold Spirit Dev
 *
 * ############################################################################
 * NOTE: Game_Event.prototype.update is suppressed under specific conditions.  
 * To ensure proper event update suppression, this plugin must be loaded last. 
 * (or at least after any plugins that you may want to suppress)
 * ############################################################################
 *
 * This plugin seeks to improve game performance by allowing you to disable 
 * update processing for unnecessary events.
 *
 * Even empty events incur some process load on every frame. 
 * While negligible in many situations, this becomes a more significant problem
 * when:
 *
 * - Using resource-intensive plugins. (like VisuStella Events and Movement Core)
 * - Having hundreds of events. (even if they are completely empty/inactive)
 * - Running on lower-end devices.
 *
 * Update is automatically skipped on 'Dummy Events': (If meets all requirements)
 * 1) No code on current page
 * 2) Fixed movement
 * 3) No stepping
 *
 * The <Proximity: X> note tag can be used to suppress the update function on
 * events outside of the X tile range specified.
 *
 * The <SkipUpdate> note tag can alternatively be used to permanently suppress the
 * update function of an event, regardless of other settings.
 *
 * The above will help by suppressing event update checks for events that do not
 * require them.
 *
 * ############################################################################
 *
 * =========================
 * Changelog
 * =========================
 * [v1.4] - Updated Oct 23rd 2025
 * - Fixed a bug with 'param' and other variables not being declared within IIFE.
 *
 * [v1.3] - Updated Aug 18th 2025
 * - Added automatic skip update on events with 'Fixed' movement type and no code.
 *
 * [v1.2] - Updated Aug 17th 2025
 * - Added <ProximityUpdate: X> tag which will also skip update on events
 * outside of the proximity range theshold.
 *
 * [v1.1] - Updated June 20th 2025
 * - Updated to remove metadata copying from $dataMap and use .event().meta instead
 *
 * [v1.0] - Created on June 19th 2025
 *
 * MIT License. Open Source.
 * https://opensource.org/license/mit/
 * 
 * ############################################################################
 *
 * @param DummyUpdateCheck
 * @text Auto Skip Update On 'Dummy Event'
 * @desc Skips update if the event has no code, is 'Fixed' movement and not stepping.
 * @type boolean
 * @default true
 *
 * @param ProximityUpdateCheck
 * @text Enable Tag: <ProximityUpdate: X>
 * @desc Note tag skips update if outside tile range specificed.  Disable to improve efficiency if not used.
 * @type boolean
 * @default true
 *
 * @param SkipUpdateCheck
 * @text Enable Tag: <SkipUpdate>
 * @desc Note tag permanently skips update function.              Disable to improve efficiency if not used.
 * @type boolean
 * @default true
 */

(() => {
	let param = PluginManager.parameters('X_SNK_SkipUpdate')
	let skipUpdateCheck = JSON.parse(param.SkipUpdateCheck);
	let proximityCheck = JSON.parse(param.ProximityUpdateCheck);
	let dummyCheck = JSON.parse(param.DummyUpdateCheck);

	//Disables Events With <SkipUpdate> or <ProximityUpdate: X> Note Tag From Processing (if outside range)
	const Alias_SkipUpdate_Game_Event_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function() {
		//Check If Skip Empty Page Is Used.
		if(dummyCheck){
			//Do Not Update If Tag Is Found
			if(this.event() && this.page() && this.page().list.length === 1 && this._moveType === 0 && this._stepAnime === false){
				return;
			}
		}
		
		//Check <ProximityUpdate: X> Tag If Used.
		if(proximityCheck){
			if(this.event() && this.event().meta && this.event().meta["ProximityUpdate"] && this.event().meta["ProximityUpdate"] !== true){
				//Do Not Update If Outside Proximity Range
				if(this.event().meta["ProximityUpdate"] >= 0){
					if($gameMap.distance($gamePlayer.x, $gamePlayer.y, this.x, this.y) > Number(this.event().meta["ProximityUpdate"])){
						return;
					}
				}
			}
		}
		
		//Check If <SkipUpdate> Tag Is Used.
		if(skipUpdateCheck){
			//Do Not Update If Page Has No Code
			if(this.event() && this.event().meta && this.event().meta["SkipUpdate"]){
				return;
			}
		}

		//Process Normal Update
		Alias_SkipUpdate_Game_Event_update.call(this);
	};
})();