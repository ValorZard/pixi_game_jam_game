import { Application, Sprite, BitmapText, Ticker} from "pixi.js";

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
  }

export class Player {

    // @ts-ignore
    private speed: number;
    // @ts-ignore
    private sprite: Sprite;
    // @ts-ignore
    //private delta: number;

    public player_text: BitmapText;

    private position_x: number;
    private position_y: number;

    private velocity_x: number;
    private velocity_y: number;

    public name: string;

    private direction: Direction;

    constructor(app: Application) {
        this.name = "John";

        this.speed = 10.0;

        // set direction as down
        this.direction = Direction.Down;
        this.sprite = Sprite.from("assets/idle/idle_down.png");

        app.stage.addChild(this.sprite);

        this.position_x = 200;
        this.position_y = 200;

        this.sprite.x = this.position_x;
        this.sprite.y = this.position_y;

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
        
        // set position to change in velocity or whatever
        this.position_x += this.velocity_x * delta;
        this.position_y += this.velocity_y * delta;

        
        
        switch(this.direction) { 
            case Direction.Up: { 
               //statements; 
               this.player_text.text = "Current Direction: UP";
               //this.sprite = Sprite.from("assets/idle/idle_up.png");
               break; 
            } 
            case Direction.Down: { 
               //statements; 
               this.player_text.text = "Current Direction: Down";
               //this.sprite = Sprite.from("assets/idle/idle_down.png");
               break; 
            }
            case Direction.Left: { 
                //statements; 
                this.player_text.text = "Current Direction: Left";
                //this.sprite = Sprite.from("assets/idle/idle_left.png");
                break; 
            }
            case Direction.Right: { 
                //statements; 
                this.player_text.text = "Current Direction: Right";
                //this.sprite = Sprite.from("assets/idle/idle_right.png");
                break; 
            }
            default: { 
               //statements; 
               break; 
            } 
         } 
         
         
        // after makign sure we got correct sprite, then set position of sprite to player position
        this.sprite.x = this.position_x;
        this.sprite.y = this.position_y;

        this.player_text.text += "\n Current Position: " + this.position_x.toString() + ", " + this.position_y.toString();
        this.player_text.text += "\n Current Sprite Position: " + this.sprite.x.toString() + ", " + this.sprite.y.toString();
    }

    private onKeyDown(e: KeyboardEvent): void {
        //this.player_text.text = "KeyDown event fired! " + e.code;

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
        if (e.code == "KeyW")
        {
            this.direction = Direction.Up;
            this.velocity_y = -this.speed;
            //this.sprite = Sprite.from("assets/idle/idle_up.png");
        }
        if (e.code == "KeyS")
        {
            this.direction = Direction.Down;
            this.velocity_y = this.speed;
        }
        if (e.code == "KeyA")
        {
            this.direction = Direction.Left;
            this.velocity_x = -this.speed;
        }
        if (e.code == "KeyD")
        {
            this.direction = Direction.Right;
            this.velocity_x = this.speed;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.player_text.text = "KeyUp event fired! " + e.code;

        // right now, we'll just set all of the velocities to zero once you lift up the button
        // this is really jank and doesn't feel good tho
        if(e.code == "KeyW" || e.code == "KeyS" ){
            this.velocity_y = 0;
        }
        else if (e.code == "KeyA" || e.code == "KeyD" ){
            this.velocity_x = 0;
        }

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

}