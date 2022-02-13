import { Application, Sprite, BitmapText, Ticker, DisplayObject} from "pixi.js";

export class Player {

    // @ts-ignore
    private speed: number;
    // @ts-ignore
    public sprite: Sprite;
    // @ts-ignore
    //private delta: number;

    public player_text: BitmapText;

    private position_x: number;
    private position_y: number;

    private velocity_x: number;
    private velocity_y: number;

    public name: string;

    // this would really be a pointer/reference to the app in index.ts
    private app: Application;

    constructor(app: Application) {
        this.app = app;

        this.name = "John";

        this.speed = 5.0;

        this.sprite = Sprite.from("assets/Faceset.png");
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
        if(this.position_x > this.app.screen.width)
        {
            this.position_x = 0;
        }
        else if(this.position_x < 0){
            this.position_x = this.app.screen.width;
        }
        this.position_y += this.velocity_y * delta;
        if(this.position_y > this.app.screen.height)
        {
            this.position_y = 0;
        }
        else if(this.position_y < 0){
            this.position_y = this.app.screen.height;
        }

        // after makign sure we got correct sprite, then set position of sprite to player position
        this.sprite.x = this.position_x;
        this.sprite.y = this.position_y;

        this.player_text.text = "Current Position: " + this.position_x.toString() + ", " + this.position_y.toString();
        this.player_text.text += "\n Current Sprite Position: " + this.sprite.x.toString() + ", " + this.sprite.y.toString();
        //this.player_text.text += "\n Bounds: " + this.sprite.getBounds().left.toString();
    }

    private onKeyDown(e: KeyboardEvent): void {
        //this.player_text.text = "KeyDown event fired! " + e.code;

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

    public checkCollision(objB: DisplayObject): boolean {
        const a = this.sprite.getBounds();
        const b = objB.getBounds();
    
        const rightmostLeft = a.left < b.left ? b.left : a.left;
        const leftmostRight = a.right > b.right ? b.right : a.right;
    
        if (leftmostRight <= rightmostLeft) {
            return false;
        }
    
        const bottommostTop = a.top < b.top ? b.top : a.top;
        const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;
    
        return topmostBottom > bottommostTop;
    }
    

}