//X_SNK_StairLogic.js
/*:
 * @target MZ
 * @author SnakekillerX
 * @plugindesc [v1.0] Stair Logic.
 * @url https://github.com/SnakekillerX/RPG-Maker-MZ
 *
 * @help
 * 
 * ############################################################################
 * \   \   \   \   \               Stair Logic                /   /   /   /   /
 *  \   \   \   \   \   \          Version 1.0           /   /   /   /   /   /
 * ############################################################################
 *
 * Author: SnakekillerX
 * Please credit if used.
 *
 * Description: Used to setup stair type diagonal movement when pressing 
 * left/right on while standing on any of the regionId/terrainTag/tileId listed.
 * 
 * Usage:
 * - Assign the base, middle and top parts of each ↗↙ and ↘↖ stair directions.
 * - To find which tileId you are on, use the new function in the debug console:
 * $gamePlayer.highestTileId()
 *
 * ############################################################################
 *
 * @param Group1
 * @text ↗↙ Stairs Conditions ↗↙
 * @desc Header for the first set of stairs.
 * @default -------------------------
 *
 * @param Top1
 * @text Top
 * @parent Group1
 *
 * @param RegionIdsTop1
 * @text Region Ids
 * @parent Top1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TerrainTagsTop1
 * @text Terrain Tags
 * @parent Top1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TileIdsTop1
 * @text Tile Ids
 * @parent Top1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param Mid1
 * @text Mid
 * @parent Group1
 *
 * @param RegionIdsMid1
 * @text Region Ids
 * @parent Mid1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TerrainTagsMid1
 * @text Terrain Tags
 * @parent Mid1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TileIdsMid1
 * @text Tile Ids
 * @parent Mid1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param Base1
 * @text Base
 * @parent Group1
 *
 * @param RegionIdsBase1
 * @text Region Ids
 * @parent Base1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TerrainTagsBase1
 * @text Terrain Tags
 * @parent Base1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TileIdsBase1
 * @text Tile Ids
 * @parent Base1
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param Group2
 * @text ↘↖ Stairs Conditions ↘↖
 * @desc Header for the first set of stairs.
 * @default -------------------------
 *
 * @param Top2
 * @text Top
 * @parent Group2
 *
 * @param RegionIdsTop2
 * @text Region Ids
 * @parent Top2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TerrainTagsTop2
 * @text Terrain Tags
 * @parent Top2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TileIdsTop2
 * @text Tile Ids
 * @parent Top2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param Mid2
 * @text Mid
 * @parent Group2
 *
 * @param RegionIdsMid2
 * @text Region Ids
 * @parent Mid2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TerrainTagsMid2
 * @text Terrain Tags
 * @parent Mid2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TileIdsMid2
 * @text Tile Ids
 * @parent Mid2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param Base2
 * @text Base
 * @parent Group2
 *
 * @param RegionIdsBase2
 * @text Region Ids
 * @parent Base2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TerrainTagsBase2
 * @text Terrain Tags
 * @parent Base2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 *
 * @param TileIdsBase2
 * @text Tile Ids
 * @parent Base2
 * @type number[]
 * @desc List of IDs for the top of the stairs.
 * @default []
 */
/*
 *
 * =========================
 * Changelog
 * =========================
 * [v1.0] - Created Mar 16th 2026
 *
 * @
 * ############################################################################
 *  End
 * ############################################################################
 * 
 */

  (() => {
	//'use strict';
	let param = PluginManager.parameters("X_SNK_StairLogic");

	const top1 = [
		JSON.parse(param.RegionIdsTop1 || "[]").map(Number),
		JSON.parse(param.TerrainTagsTop1 || "[]").map(Number),
		JSON.parse(param.TileIdsTop1 || "[]").map(Number)
	];
	
	const mid1 = [
		JSON.parse(param.RegionIdsMid1 || "[]").map(Number),
		JSON.parse(param.TerrainTagsMid1 || "[]").map(Number),
		JSON.parse(param.TileIdsMid1 || "[]").map(Number)
	];
	
	const base1 = [
		JSON.parse(param.RegionIdsBase1 || "[]").map(Number),
		JSON.parse(param.TerrainTagsBase1 || "[]").map(Number),
		JSON.parse(param.TileIdsBase1 || "[]").map(Number)
	];
	
	const top2 = [
		JSON.parse(param.RegionIdsTop2 || "[]").map(Number),
		JSON.parse(param.TerrainTagsTop2 || "[]").map(Number),
		JSON.parse(param.TileIdsTop2 || "[]").map(Number)
	];
	
	const mid2 = [
		JSON.parse(param.RegionIdsMid2 || "[]").map(Number),
		JSON.parse(param.TerrainTagsMid2 || "[]").map(Number),
		JSON.parse(param.TileIdsMid2 || "[]").map(Number)
	];
	
	const base2 = [
		JSON.parse(param.RegionIdsBase2 || "[]").map(Number),
		JSON.parse(param.TerrainTagsBase2 || "[]").map(Number),
		JSON.parse(param.TileIdsBase2 || "[]").map(Number)
	];
	
	
	Game_Player.prototype.checkStairConditions = function(type){
		if(type == "top1"){
			return top1[0].includes(this.regionId()) || top1[1].includes(this.terrainTag()) || top1[2].includes(this.highestTileId());
		}else if(type == "mid1"){
			return mid1[0].includes(this.regionId()) || mid1[1].includes(this.terrainTag()) || mid1[2].includes(this.highestTileId());
		}else if(type == "base1"){
			return base1[0].includes(this.regionId()) || base1[1].includes(this.terrainTag()) || base1[2].includes(this.highestTileId());
		}else if(type == "top2"){
			return top2[0].includes(this.regionId()) || top2[1].includes(this.terrainTag()) || top2[2].includes(this.highestTileId());
		}else if(type == "mid2"){
			return mid2[0].includes(this.regionId()) || mid2[1].includes(this.terrainTag()) || mid2[2].includes(this.highestTileId());
		}else if(type == "base2"){
			return base2[0].includes(this.regionId()) || base2[1].includes(this.terrainTag()) || base2[2].includes(this.highestTileId());
		}
		return false;
	}
	
	
	//Region Ids Stairs Logic	
	const Alias_X_SNK_Stairs_Game_Player_executeMove = Game_Player.prototype.executeMove;
	Game_Player.prototype.executeMove = function(direction) {
		if(this.checkStairConditions("top1")){   		//Top of ↗↙ Stairs  (top1)
			if(direction == 4){
				this.setDirection(4);
				this.setThrough(true);
				this.moveDiagonally(4, 2);
				this.setThrough(false);
			}else {
				Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
			}
		}else if(this.checkStairConditions("mid1")){   	//Middle of ↗↙ Stairs   (mid1)
			if(direction == 4){
				this.setDirection(4);
				this.setThrough(true);
				this.moveDiagonally(4, 2);
				this.setThrough(false);
			}else if(direction == 6){
				this.setDirection(6);
				this.setThrough(true);
				this.moveDiagonally(6, 8);
				this.setThrough(false);
			}else {
				Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
			}
		}else if(this.checkStairConditions("base1")){	//Base of ↗↙ Stairs (base1)
			if(direction == 6){
				this.setDirection(6);
				this.setThrough(true);
				this.moveDiagonally(6, 8);
				this.setThrough(false);
			}else {
				Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
			}
		}else if(this.checkStairConditions("top2")){   	//Top of ↘↖ Stairs  (top2)
			if(direction == 6){
				this.setDirection(6);
				this.setThrough(true);
				this.moveDiagonally(6, 2);
				this.setThrough(false);
			}else {
				Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
			}
		}else if(this.checkStairConditions("mid2")){  	//Middle of ↘↖ Stairs   (mid2)
			if(direction == 4){
				this.setDirection(4);
				this.setThrough(true);
				this.moveDiagonally(4, 8);
				this.setThrough(false);
			}else if(direction == 6){
				this.setDirection(6);
				this.setThrough(true);
				this.moveDiagonally(6, 2);
				this.setThrough(false);
			}else {
				Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
			}
		}else if(this.checkStairConditions("base2")){  	//Base of ↘↖ Stairs  (base2)
			if(direction == 4){
				this.setDirection(4);
				this.setThrough(true);
				this.moveDiagonally(4, 8);
				this.setThrough(false);
			}else {
				Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
			}
		}else{
			Alias_X_SNK_Stairs_Game_Player_executeMove.call(this, direction);
		}
	};
	
	//Get Highest Tile Id
	Game_Player.prototype.highestTileId = function(){
		let tileId;
		if($gameMap.tileId(this.x, this.y, 0) != 0){
			tileId = $gameMap.tileId(this.x, this.y, 0);
		}
		if($gameMap.tileId(this.x, this.y, 1) != 0){
			tileId = $gameMap.tileId(this.x, this.y, 1);
		}
		if($gameMap.tileId(this.x, this.y, 2) != 0){
			tileId = $gameMap.tileId(this.x, this.y, 2);
		}
		if($gameMap.tileId(this.x, this.y, 3) != 0){
			tileId = $gameMap.tileId(this.x, this.y, 3);
		}
		return tileId;
	}
})();