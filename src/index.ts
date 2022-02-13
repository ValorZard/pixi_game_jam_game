import { Application, Sprite, Container, Graphics, Text, TextStyle, BitmapFont, BitmapText} from 'pixi.js'
import { Player } from './player_input';
import { Obstacle } from './obstacle';
//import { Layer } from '@pixi/layers';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1920,
	height: 1080
});

//app.stage = new display.Stage();
// PixiJS v5 sorting - works on zIndex - and layer gets its zIndex from a group!
//app.stage.sortableChildren = true;


const graphics: Graphics = new Graphics();
graphics.beginFill(0xFF00FF);
graphics.lineStyle(10, 0x00FF00);
graphics.drawCircle(0, 0, 25); // center
graphics.endFill();

app.stage.addChild(graphics);

graphics.x = 50;
graphics.y = 50;

const conty: Container = new Container();
conty.x = 50;
conty.y = 0;
conty.rotation = 0;
app.stage.addChild(conty);

const clampy: Sprite = Sprite.from("assets/clampy.png");
//const clampy: Sprite = Sprite.from("https://i.imgur.com/Vsjn557.jpeg");
clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

conty.addChild(clampy);

const styly: TextStyle = new TextStyle({
    align: "center",
    fill: "#754c24",
    fontSize: 42
});
const texty: Text = new Text('私に気づいて先輩！', styly); // Text supports unicode!
//texty.text = "This is expensive to change, please do not abuse";

app.stage.addChild(texty);

// If you need to know, this is the expensive part. This creates the font atlas
BitmapFont.from("comic 32", {
    fill: "#ffffff", // White, will be colored later
    fontFamily: "Comic Sans MS",
    fontSize: 32
})

// Remember, this font only has letters and numbers. No commas or any other symbol.
let bitmapTexty: BitmapText = new BitmapText("I love baking, my family, and my friends",
    {
        fontName: "comic 32",
        fontSize: 32, // Making it too big or too small will look bad
        tint: 0xFF0000 // Here we make it red.
    });

bitmapTexty.text = "This is cheap";
bitmapTexty.text = "Change it as much as you want";

app.stage.addChild(bitmapTexty);

// send the player the application context
let player : Player = new Player(app);
//app.stage.addChild(player.player_text);
//player.player_text.x =  app.screen.width / 2;
//player.player_text.y = app.screen.height / 2;
//app.stage.addChild(player.sprite);

//let obstacleLayer = new Layer();

//app.stage.addChild(obstacleLayer);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta: number) => {
  elapsed += delta;
  bitmapTexty.text = player.name + " " + elapsed.toString();
  //player.update_player(delta);
  // @ts-ignore
	let obstacle = new Obstacle(app, player);
});
