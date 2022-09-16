import { Application } from 'pixi.js';
import { Game } from './Game';
import './css/main.css';

window.onload = ()=>{
    const gameDiv:HTMLDivElement = <HTMLDivElement>document.getElementById('game');
    const app:Application = new Game({
        width:innerWidth,
        height:innerHeight,
        //resizeTo: gameDiv,
        //backgroundColor: 0x996633,
        // sharedLoader: true,
        // sharedTicker: true
    });
    gameDiv.appendChild(app.view);
}