import { Application, Sprite, BitmapText } from "pixi.js";

export class Player {

    // @ts-ignore
    private speed: number;
    // @ts-ignore
    private sprite: Sprite;
    // @ts-ignore
    private delta: number;

    public player_text: BitmapText;

    constructor(app: Application) {
        this.speed = 10.0;

        this.sprite = Sprite.from("assest\pencil.jpg");
        this.sprite.x = 100;
        this.sprite.y = 100;
        app.stage.addChild(this.sprite);
        
        //document.addEventListener('keydown', this.logKey);

        this.player_text = new BitmapText("I love baking, my family, and my friends",
            {
                fontName: "comic 32",
                fontSize: 32, // Making it too big or too small will look bad
                tint: 0xFF0000 // Here we make it red.
            });

        app.stage.addChild(this.player_text);
        this.player_text.x = app.screen.width / 2;
        this.player_text.y = app.screen.height / 2;

        // No pixi here, All HTML DOM baby!
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }


    public update_player(delta: number) {
        // There's probably a better way to do thi
        this.delta = delta;
        //this.player_text.text = "Pog?";
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.player_text.text = "KeyDown event fired! " + e.code.toString();

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.player_text.text = "KeyUp event fired! " + e.code.toString();

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

}