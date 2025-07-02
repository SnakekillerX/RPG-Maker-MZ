/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v1.1] Suppresses Update Function on Chosen Events.
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \                     Skip Update v1.1                     /   /   /   
 * ############################################################################
 *
 * Authors: SnakekillerX made in collaboration with The Ninefold Spirit Dev
 *
 * This plugin seeks to improve game performance by allowing you to disable 
 * unnecessary event processing for specific events via the <SkipUpdate> note tag.
 *
 * Even empty events incur some process load on every frame. 
 * While negligible in many situations, this becomes a more significant problem
 * when:
 *
 * - Using resource-intensive plugins. (like VisuStella Events and Movement Core)
 * - Having hundreds of events. (even if they are completely empty/inactive)
 * - Running on lower-end devices.
 * 
 * Placing <SkipUpdate> on an event's note field will suppress it's 
 * Game_Event.prototype.update function from processing, as well as any
 * other plugins that may be trying to piggyback off of this function.  
 * 
 * This will avoid multiple processing checks on events that don't need them.
 *
 * ############################################################################
 *
 * =========================
 * Changelog
 * =========================
 * [v1.1] - Updated to remove metadata copying from $dataMap and use .event().meta instead
 *
 * [v1.0] - Created on June 19th - 2025
 * 
 *
 * MIT License. Open Source.
 * https://opensource.org/license/mit/
 * 
 * ############################################################################
 *
 */

//Disables Events With <SkipUpdate> Note Tag From Processing
const Alias_SkipUpdate_Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
	if(this.event() && this.event().meta && !this.event().meta["SkipUpdate"]){
		Alias_SkipUpdate_Game_Event_update.call(this);
	}
};