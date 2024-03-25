export class Snake{

    currentDirection = 'right'
    snake = [
        {x: 10, y: 10},
    ]
    context = null
    positionCount = null
    positionSize = null
    constructor(context, positionCount, positionSize){
    this.context = context;
    this.positionCount = positionCount;
    this.positionSize = positionSize;

        this.addKeyboardHandler()
    }
    addKeyboardHandler(){
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && this.currentDirection !== 'right'){
                this.currentDirection = 'left'
            }else if (event.key === 'ArrowRight' && this.currentDirection !== 'left'){
                this.currentDirection = 'right'
            }else if (event.key === 'ArrowUp' && this.currentDirection !== 'down'){
                this.currentDirection = 'up'
            }else if (event.key === 'ArrowDown' && this.currentDirection !== 'up'){
                this.currentDirection = 'down'
            }
        })
    }
    showSnake(){
        for (let i = 0; i < this.snake.length; i++){
            this.context.fillStyle = 'black'
            this.context.beginPath();
            this.context.fillRect(this.snake[i].x * this.positionSize - this.positionSize,
                this.snake[i].y * this.positionSize - this.positionSize, this.positionSize, this.positionSize);
        }
        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y
        }

        this.snake.pop()
        if(this.currentDirection === 'left'){
            if (newHeadPosition.x === 1){
                newHeadPosition.x = this.positionCount
                // alert('Game over')
                // location.reload()
                // return;
            }else{
                newHeadPosition.x -= 1
            }

        }else if(this.currentDirection === 'right'){
            if (newHeadPosition.x === this.positionCount){
                newHeadPosition.x = 1
                // alert('Game over')
                // location.reload()
                // return;
            }else{
                newHeadPosition.x += 1
            }

        }else if(this.currentDirection === 'up'){
            if (newHeadPosition.y === 1){
                newHeadPosition.y = this.positionCount
                // alert('Game over')
                // location.reload()
                // return;
            }else{
                newHeadPosition.y -= 1
            }

        }else if(this.currentDirection === 'down'){
            if (newHeadPosition.y === this.positionCount){
                newHeadPosition.y = 1
                // alert('Game over')
                // location.reload()
                // return;
            }else{
                newHeadPosition.y += 1
            }

        }

        this.snake.unshift(newHeadPosition)
    }
}