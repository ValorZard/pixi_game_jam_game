
import { Application, Graphics, } from 'pixi.js';
import {Player} from './player_input';
//@ts-ignore
//import { Layer } from '@pixi/layers';

export class Obstacle {
	private position_x: number;
	private position_y: number;

	private graphics: Graphics;

	private player_ref: Player;
	private boundary_around_player: number;

	constructor(app: Application, player: Player)
	{
		this.player_ref = player;
		this.boundary_around_player = 20;

		this.position_x = Math.random() * app.screen.width;
		// keep finding values that are not around the player until one fits
		while((this.position_x < this.player_ref.sprite.x + this.boundary_around_player && this.position_x > this.player_ref.sprite.x - this.boundary_around_player)){
			this.position_x = Math.random() * app.screen.width;
		}
		
		this.position_y = Math.random() * app.screen.height;
		// keep finding values that are not around the player until one fits
		while((this.position_y < this.player_ref.sprite.y + this.boundary_around_player && this.position_y > this.player_ref.sprite.y - this.boundary_around_player)){
			this.position_y = Math.random() * app.screen.height;
		}

		this.graphics = new Graphics();
		this.graphics.beginFill(0xFF00FF);
		this.graphics.lineStyle(10, 0x00FF00);
		this.graphics.drawCircle(0, 0, 25); // center
		this.graphics.endFill();

		app.stage.addChild(this.graphics);
        //this.graphics.parentLayer = layer;

		this.graphics.x = this.position_x;
		this.graphics.y = this.position_y;

        //this.graphics.zOrder = -1;

	}
}