import { Application, Sprite, Container, Graphics, Text, TextStyle, BitmapFont, BitmapText} from 'pixi.js'
import { Player } from './player_input';
//import {LoaderScene} from "./loader_scene";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1920,
	height: 1080
});

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

// remember the assets manifest we created before? You need to import it here
//Loader.shared.add(assets);

// this will start the load of the files
//Loader.shared.load();

// @ts-ignore
//let loaderScene = new LoaderScene(app.screen.width, app.screen.height);

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

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta: number) => {
  elapsed += delta;
  bitmapTexty.text = player.name + " " + elapsed.toString();
  //player.update_player(delta);
});
