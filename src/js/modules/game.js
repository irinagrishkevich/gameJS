import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game{
    context = null
    snake = null
    positionCount = null
    positionSize = null
    scoreElement = null
    gameOver = null
    btn = null
    interval = null
    title = null
    score = 0
    constructor(context, settings){
        this.context = context;

        this.positionCount = settings.positionCount;
        this.positionSize = settings.positionSize;

        this.scoreElement = document.getElementById('score')
        this.gameOver = document.getElementById('end-game')
        this.btn = document.getElementById('start')
        this.title = document.createElement('h1')


        this.btn.onclick = () =>{

            this.startGame()
        }

    }

    startGame(){
        this.btn.innerText = 'Начать заново'
        this.gameOver.style.display = 'none'
        this.title.innerText = 'Игра Началась'
        document.getElementById('container').appendChild(this.title)
         if (this.interval){
             clearInterval(this.interval)
         }
        this.food = new Food(this.context, this.positionCount, this.positionSize)
        this.snake = new Snake(this.context, this.positionCount, this.positionSize)


        this.food.setNewFoodPosition()
        this.interval =setInterval(this.gameProcess.bind(this),100)
    }

    gameProcess(){
        this.context.clearRect(0,0,this.positionCount*this.positionSize, this.positionCount*this.positionSize)
        this.showGrid()
        this.food.showFood()
        let result = this.snake.showSnake(this.food.foodPosition)
        if (result){
            if (result.collision){
                this.endGame()
            }else if (result.gotFood){
                this.score +=1
                this.scoreElement.innerText = this.score
                this.food.setNewFoodPosition()

            }

        }
    }
    endGame(){
        clearInterval(this.interval)
        //
        // this.context.fillStyle = 'black'
        // this.context.font = 'bold 40px Arial'
        // this.context.textAlign = 'center'
        // this.context.fillText('Вы набрали: ' + this.score + ' очков',
        //     (this.positionCount * this.positionSize) / 2, (this.positionCount * this.positionSize) / 2)


        // this.gameOver.style.backgroundColor = 'red'
        // this.gameOver.style.width = '500px'
        this.gameOver.style.display = 'block'
        this.btn.innerText = 'Начнем новую игру'
        this.gameOver.innerText = 'Ваши очки за игру: ' + this.score + '. Можно было бы и больше набрать, как так:('
        this.title.innerText = 'Вы проиграли'


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