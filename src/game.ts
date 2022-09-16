import { Application, Loader, Sprite } from "pixi.js";
import { gsap } from "gsap";
import { getResource, setResources } from "./texture.util";
import { Spine } from "pixi-spine";
export class Game extends Application {
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "goblin", url: "assests/Goblin/goblins.json" },
        { name: "boy", url: "assests/spineboy/spineboy.json" },
        { name: "hero", url: "assests/hero/hero.json" },
      ],
      this.onLoad.bind(this)
    );
  }
  preload(list: any[], cb: () => {}): void {
    this.loader.onComplete.add((l: Loader) => {
      setResources(l.resources);
    });
    this.loader.add(list);
    this.loader.load(cb);
  }
  onLoad(): void {
    this.stage.interactive = true;
    const wheel = new Sprite(this.loader.resources['wheel'].texture);
    wheel.width=innerWidth;
     wheel.height=innerHeight;
    this.stage.addChild(wheel);
    const hero = new Spine(getResource("boy").spineData);
    hero.x = this.screen.width / 2;
    hero.y = this.screen.height;
    hero.scale.set(0.5);
    hero.skeleton.setSlotsToSetupPose();
    hero.stateData.setMix('walk', 'jump', 0.2);
    hero.stateData.setMix('jump', 'walk', 0.4);
    hero.state.setAnimation(0, "idle", true);
    this.stage.addChild(hero);
    let previousAnim: string = 'idle';
    let currentAnim: string = 'idle';
    let revertToAnim:string = 'idle';
    let direction: number = 1;
    let defaultScale = hero.scale.x;
    this.ticker.add(()=>{
        hero.scale.x = defaultScale * direction;
        if(currentAnim!=previousAnim){
            console.log(currentAnim, previousAnim);
            hero.state.setAnimation(0, currentAnim, true);
            previousAnim = currentAnim;
            
        }
    });
    function onKeyEvent(e: KeyboardEvent): void {
      console.log("keyboard event", e);
      switch (e.type) {
        case "keyup":
            switch(e.code) {
                default:
                    currentAnim = revertToAnim;
                    // direction = 1;
                    break;
            }
          break;
        case "keydown":
            switch(e.code) {
                case 'KeyW':
                    currentAnim = 'jump';
                    break;
                case 'KeyD':
                    currentAnim = 'walk';
                    revertToAnim = 'walk';
                    direction = 1;
                    break;
                case 'KeyA':
                    currentAnim = 'walk';
                    revertToAnim = 'walk';
                    direction = -1;
                    break;
                case 'Space':
                    currentAnim = 'shoot';
                    break;
                default:
                    currentAnim = 'idle';
                    revertToAnim = 'idle';
            }
          break;
        default:
          console.warn("Event has no listener", e.type);
      }
    }
    window.addEventListener("keydown", onKeyEvent);
    window.addEventListener("keyup", onKeyEvent);
  }
}