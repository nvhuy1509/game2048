import { _decorator, Component, instantiate, Layout, Node, Prefab, size, UITransform, Vec2, input, Input, EventTouch, EventKeyboard, KeyCode, log } from 'cc';
import { itemNumber } from './itemNumber';
const { ccclass, property } = _decorator;

@ccclass('main2048')
export class main2048 extends Component {
    @property(Node)
    Node_PopUpMap: Node = null

    @property(Node)
    Node_GameLayout: Node = null

    @property(Prefab)
    prefab_Square: Prefab = null

    private  matrixMap = [];
    private typeMap: number = 0;
    private score = 0;

    start() {
        this.Node_PopUpMap.active = true;
    }

    update(deltaTime: number) {
        
    }

    onLoad () {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        console.log(event.getLocation());  // location on screen space
        console.log(event.getUILocation());  // location on UI space
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
                this.changePosition(KeyCode.ARROW_UP);
                break;
            case KeyCode.ARROW_DOWN:
                console.log('Vuốt xuống dưới');
                break;
            case KeyCode.ARROW_LEFT:
                console.log('Vuốt sang trái');
                break;
            case KeyCode.ARROW_RIGHT:
                console.log('Vuốt sang phải');
                break;
                
        }
    }

    changePosition(keycode) {
        if(keycode == KeyCode.ARROW_UP) {
            console.log("di chuyển lên=====")
            this.Node_GameLayout.children.forEach(element => {
                    var x = element.getComponent(itemNumber).position.x;
                    var y = element.getComponent(itemNumber).position.y;     
                        if(element.getComponent(itemNumber).lblNumber.string) {
                            console.log("vị trí có phần tử: x --y" + x+"--"+y)
                            this.Node_GameLayout.children.forEach(elementBefore => {
                                var count = 0;
                                while(x >=0){
                                    if(elementBefore.getComponent(itemNumber).position.x == x-1 && elementBefore.getComponent(itemNumber).position.y == y) {
                                        // while(elementBefore.getComponent(itemNumber).lblNumber.string == ""){
                                        //     console.log("Vị trí được di chuyển lên là x===y" + elementBefore.getComponent(itemNumber).position.x +"====" + elementBefore.getComponent(itemNumber).position.y)
                                        //     elementBefore.getComponent(itemNumber).lblNumber.string = element.getComponent(itemNumber).lblNumber.string;
                                        //     element.getComponent(itemNumber).lblNumber.string = ""
                                        // }
                                        console.log("vị trí phía trên nó: x --y" + elementBefore.getComponent(itemNumber).position.x +"====" + elementBefore.getComponent(itemNumber).position.y)
                                        if(elementBefore.getComponent(itemNumber).lblNumber.string == element.getComponent(itemNumber).lblNumber.string) {
                                            count = Number(element.getComponent(itemNumber).lblNumber.string)*2
                                            console.log("1----")
                                        } 
                                        if(elementBefore.getComponent(itemNumber).lblNumber.string == "") {
                                            count = Number(element.getComponent(itemNumber).lblNumber.string)
                                            console.log("2----")
                                        }
                                        // if(elementBefore.getComponent(itemNumber).lblNumber.string != "" && elementBefore.getComponent(itemNumber).lblNumber.string != element.getComponent(itemNumber).lblNumber.string){
                                            elementBefore.getComponent(itemNumber).lblNumber.string = count.toString();
                                            element.getComponent(itemNumber).lblNumber.string = ""
                                            // console.log("3----")
                                        // }
                                    }
                                    x--;
                                }
                                // while(element.getComponent(itemNumber).lblNumber.string != elementBefore.getComponent(itemNumber).lblNumber.string && elementBefore.getComponent(itemNumber).lblNumber.string != "") {
                                    
                                // }
                                
                            })
                        // this.Node_GameLayout.children.forEach(elementBefore => {
                        //     while(x >=1){
                        //         if(elementBefore.getComponent(itemNumber).position.x == x-1 && elementBefore.getComponent(itemNumber).position.y == y) {
                        //             // while(element.getComponent(itemNumber).lblNumber.string != elementBefore.getComponent(itemNumber).lblNumber.string && elementBefore.getComponent(itemNumber).lblNumber.string != "" ){
                        //             //     elementBefore
                        //             // }
                        //             if(element.getComponent(itemNumber).lblNumber.string == elementBefore.getComponent(itemNumber).lblNumber.string) {
                        //                 elementBefore.getComponent(itemNumber).lblNumber.string = (Number(element.getComponent(itemNumber).lblNumber.string)*2).toString();
                        //             }
                        //         }
                        //         x--;
                        //     }
                            
                        // });
                        }
            });
            // const currentMatrix = this.matrixMap.map(row => [...row]);

            // console.log("ma trận trước khi thay đổi==")
            // console.log(currentMatrix);
            
            // this.matrixMap = this.moveUp(this.matrixMap);
            // console.log("ma trận sau khi thay đổi==")
            // console.log(this.matrixMap)

            // this.Node_GameLayout.children.forEach(element => {
            //     var x = element.getComponent(itemNumber).position.x;
            //     var y = element.getComponent(itemNumber).position.y;  
            //     if(this.matrixMap[x][y] != 0) {
            //         element.getComponent(itemNumber).lblNumber.string = this.matrixMap[x][y].toString();
            //     } else {
            //         element.getComponent(itemNumber).lblNumber.string = ""
            //     }
            // })
            // if(this.isMatrixChanged(currentMatrix,this.matrixMap)) {
                // this.randomNumber(2); 
            // }
        }
       
    }

    isMatrixChanged(matrix1: number[][], matrix2: number[][]): boolean {
        const numRows = matrix1.length;
        const numCols = matrix1[0].length;
    
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (matrix1[row][col] !== matrix2[row][col]) {
                    return true; // Ma trận đã thay đổi
                }
            }
        }
    
        return false; // Ma trận không thay đổi
    }

    mergeRow(row: number[]): number[] {
        const nonZeroValues = row.filter(value => value !== 0);
        const mergedRow = [];
    
        for (let i = 0; i < nonZeroValues.length; i++) {
            if (i < nonZeroValues.length - 1 && nonZeroValues[i] === nonZeroValues[i + 1]) {
                mergedRow.push(nonZeroValues[i] * 2);
                nonZeroValues[i + 1] = 0;
                i++; // Bỏ qua số tiếp theo
            } else {
                mergedRow.push(nonZeroValues[i]);
            }
        }
    
        while (mergedRow.length < row.length) {
            mergedRow.push(0);
        }
    
        return mergedRow;
    }
    
    moveUp(matrix: number[][]): number[][] {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
    
        for (let col = 0; col < numCols; col++) {
            const column = [];
            for (let row = 0; row < numRows; row++) {
                column.push(matrix[row][col]);
            }
    
            const mergedColumn = this.mergeRow(column);
    
            for (let row = 0; row < numRows; row++) {
                matrix[row][col] = mergedColumn[row];
            }
        }
    
        return matrix;
    }

    calculateScore(matrix: number[][]): number {
        
        const numRows = matrix.length;
        const numCols = matrix[0].length;
    
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                // Kiểm tra xem có ô số đã bị kết hợp
                if (matrix[row][col] > 0) {
                    this.score += matrix[row][col];
                }
            }
        }
    
        console.log("điểm hiện tại====" + this.score);
        return this.score;
    }
    
    selectMap(event, map){
        const ItemSize = size()

        this.typeMap = map;
        this.Node_PopUpMap.active = false;
        const widthLayout = this.Node_GameLayout.getComponent(UITransform).contentSize.width - (20*(map - 1));
        for (let i = 0; i < map; i++) {
            this.matrixMap[i] = [];
            for( let j = 0; j < map; j++) {
                this.matrixMap[i][j] = 0;
                var a = instantiate(this.prefab_Square);
                a.getComponent(UITransform).width = widthLayout/map;
                a.getComponent(UITransform).height = widthLayout/map;
                a.parent = this.Node_GameLayout;
                a.getComponent(itemNumber).position = new Vec2(i,j);
            }
        }

        this.randomNumber(1);
    }

    randomNumber(type) {
        //type == 1: start game sinh ra 2 item
        // type == 2: khi chơi sinh ra 1 item
        
        const emptyPositions = [];
        // Xác định danh sách các vị trí trống
        this.Node_GameLayout.children.forEach(element => {
            const x = element.getComponent(itemNumber).position.x;
            const y = element.getComponent(itemNumber).position.y;
            if (!element.getComponent(itemNumber).lblNumber.string) {
                emptyPositions.push({ x, y });
            }
        });

        if(type == 1) {
            if (emptyPositions.length < 2) {
                // Không đủ vị trí trống để tạo số
                return;
            }
    
            const randomIndex1 = Math.floor(Math.random() * emptyPositions.length);
            const x1 = emptyPositions[randomIndex1].x;
            const y1 = emptyPositions[randomIndex1].y;
            emptyPositions.splice(randomIndex1, 1);
    
            const randomIndex2 = Math.floor(Math.random() * emptyPositions.length);
            const x2 = emptyPositions[randomIndex2].x;
            const y2 = emptyPositions[randomIndex2].y;
    
            console.log(x1, y1, x2, y2);
    
            // Tạo số ở vị trí x1, y1 và x2, y2
            this.Node_GameLayout.children.forEach(element => {
                if (element.getComponent(itemNumber).position.x == x1 && element.getComponent(itemNumber).position.y == y1) {
                    element.getComponent(itemNumber).setInfo(this.generateNumberWithProbability(), x1, y1);
                } else if (element.getComponent(itemNumber).position.x == x2 && element.getComponent(itemNumber).position.y == y2) {
                    element.getComponent(itemNumber).setInfo(this.generateNumberWithProbability(),x2, y2);
                }
            });
        }
        if(type == 2) {
            if (emptyPositions.length < 1) {
                console.log("game over======");
                
                return;
            }
            const randomIndex1 = Math.floor(Math.random() * emptyPositions.length);
            const x1 = emptyPositions[randomIndex1].x;
            const y1 = emptyPositions[randomIndex1].y;
            emptyPositions.splice(randomIndex1, 1);
            this.Node_GameLayout.children.forEach(element => {
                if (element.getComponent(itemNumber).position.x == x1 && element.getComponent(itemNumber).position.y == y1) {
                    element.getComponent(itemNumber).setInfo(this.generateNumberWithProbability(), x1, y1);
                } 
            });
        }
        
        
    }

    generateRandomNumber(): number {
        // Tạo một số ngẫu nhiên từ 0 đến 1
        return Math.random();
    }
    
    generateNumberWithProbability(): number {
        const randomValue = this.generateRandomNumber();
    
        // Xác suất xuất hiện số 2 là 90%
        if (randomValue < 0.9) {
            return 2;
        } else {
            // Xác suất xuất hiện số 4 là 10%
            return 4;
        }
    }

    generateRandomNumberInRangeExcluding(min: number, max: number, excludedNumber: number): number {
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randomNumber === excludedNumber);
    
        return randomNumber;
    }
}


