//X_SNK_Extended Fade Out.js
/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v0.1] Togglable extended fade out after battle
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \   \   \           Extended Fade Out            /   /   /   /   /
 *  \   \   \   \   \   \   \     Version  0.1     /   /   /   /   /   /   /   
 * ############################################################################
 *
 * Author: SnakekillerX 
 * Please credit if used.
 *
 * Description:
 * Allows the user to hide the screen for an extend period of time after a 
 * battle is over in order to move things around on the map before the fade in.
 * 
 *
 * Usage:
 * Assign a switch to be toggled on/off when you'd like the extended fade.
 * Turn the switch on either before or during the battle.
 * During the extended fade you have time to move things within your scene
 * before manually calling a fade in.
 *
 * Turn the switch off after the battle so it doesn't keep triggering extended fade out.                                    
 *
 * ############################################################################
 *
 * @param ExtendedFadeOut
 * @text Extended FadeOut Switch
 * @desc Switch to check to enable extended fade out.
 * @type switch
 *
 * @
 * =========================
 * Additional Notes
 * =========================
 * This is a pretty simple plugin, may add to this in the future. 
 * Leaving this as v0.1 for now.
 *
 * =========================
 * Changelog
 * =========================
 * [v0.1] - Released Mar 14th, 2023
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
    const pluginName = 'X_SNK_Extended Fade Out';
    const param = PluginManager.parameters(pluginName);

//If switch is on, call perminante screen fade out (must call fade in event to remove it)
SceneManager.pop = function() {
	if($gameSwitches.value(param.ExtendedFadeOut) == true){
	$gameScreen.startFadeOut(1)
	}
    if (this._stack.length > 0) {
        this.goto(this._stack.pop());
    } else {
		$gameScreen.startFadeOut(1)
    }
};

})();