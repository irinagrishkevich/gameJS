import {Snake} from "./snake.js";

export class Game{
    context = null
    snake = null
    positionCount = null
    positionSize = null
    constructor(context, settings){
        this.context = context;

        this.positionCount = settings.positionCount;
        this.positionSize = settings.positionSize;

        document.getElementById('start').onclick = () =>{

            this.startGame()
        }

    }

    startGame(){
        this.snake = new Snake(this.context, this.positionCount, this.positionSize)

        setInterval(this.gameProcess.bind(this),100)
    }

    gameProcess(){
        this.context.clearRect(0,0,this.positionCount*this.positionSize, this.positionCount*this.positionSize)
        this.showGrid()
        this.snake.showSnake()
    }
    showGrid(){
        const size = this.positionCount* this.positionSize
        for (let x = 0; x <= size; x += this.positionSize) {
            this.context.moveTo(0.5 + x + this.positionSize, 0);
            this.context.lineTo(0.5 + x + this.positionSize, size + this.positionSize);
        }

        for (let x = 0; x <= size; x += this.positionSize) {
            this.context.moveTo(0, 0.5 + x + this.positionSize);
            this.context.lineTo(size + this.positionSize, 0.5 + x + this.positionSize);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();
    }
}