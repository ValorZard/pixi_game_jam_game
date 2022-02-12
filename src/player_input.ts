import { Application, Sprite, BitmapText, Ticker } from "pixi.js";

export class Player {

    // @ts-ignore
    private speed: number;
    // @ts-ignore
    private sprite: Sprite;
    // @ts-ignore
    //private delta: number;

    public player_text: BitmapText;

    private velocity_x: number;
    private velocity_y: number;

    public name: string;

    constructor(app: Application) {
        this.name = "John";

        this.speed = 10.0;

        this.sprite = Sprite.from("assets/knowledge_graph_logo.png");
        app.stage.addChild(this.sprite);
        this.sprite.x = 200;
        this.sprite.y = 200;

        this.velocity_x = 0;
        this.velocity_y = 0;

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

        // Set up the ticker/update function
        Ticker.shared.add(this.update, this);
    }


    public update(delta: number) {
        // There's probably a better way to do thi
        
        this.sprite.x += this.velocity_x * delta;
        this.sprite.y += this.velocity_y * delta;
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.player_text.text = "KeyDown event fired! " + e.code;

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
        if (e.code == "KeyW")
        {
            this.velocity_y = -this.speed;
        }
        if (e.code == "KeyS")
        {
            this.velocity_y = this.speed;
        }
        if (e.code == "KeyA")
        {
            this.velocity_x = -this.speed;
        }
        if (e.code == "KeyD")
        {
            this.velocity_x = this.speed;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.player_text.text = "KeyUp event fired! " + e.code;

        // right now, we'll just set all of the velocities to zero once you lift up the button
        // this is really jank and doesn't feel good tho
        //this.velocity_x = 0;
        //this.velocity_y = 0;

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

}