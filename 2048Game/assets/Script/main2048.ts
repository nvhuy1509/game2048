import { _decorator, Component, instantiate, Layout, Node, Prefab, size, UITransform, Vec2, input, Input, EventTouch, EventKeyboard, KeyCode, log, v2, director } from 'cc';
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

    onRestartGame() {
        director.loadScene("game");
    }


    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
                // this.moveUp();
                break;
            case KeyCode.ARROW_DOWN:
                console.log('Vuốt xuống dưới');
                this.moveDown();
                break;
            case KeyCode.ARROW_LEFT:
                console.log('Vuốt sang trái');
                break;
            case KeyCode.ARROW_RIGHT:
                console.log('Vuốt sang phải');
                break;
                
        }
    }

    // changePosition(keycode) {
    //     if(keycode == KeyCode.ARROW_UP) {
    //         console.log("di chuyển lên=====")
            
    //         this.randomNumber(2);
    //         // const currentMatrix = this.matrixMap.map(row => [...row]);

    //         // console.log("ma trận trước khi thay đổi==")
    //         // console.log(currentMatrix);
            
    //         // this.matrixMap = this.moveUp(this.matrixMap);
    //         // console.log("ma trận sau khi thay đổi==")
    //         // console.log(this.matrixMap)

    //         // this.Node_GameLayout.children.forEach(element => {
    //         //     var x = element.getComponent(itemNumber).position.x;
    //         //     var y = element.getComponent(itemNumber).position.y;  
    //         //     if(this.matrixMap[x][y] != 0) {
    //         //         element.getComponent(itemNumber).lblNumber.string = this.matrixMap[x][y].toString();
    //         //     } else {
    //         //         element.getComponent(itemNumber).lblNumber.string = ""
    //         //     }
    //         // })
    //         // if(this.isMatrixChanged(currentMatrix,this.matrixMap)) {
    //             // this.randomNumber(2); 
    //         // }
    //     }
       
    // }

    // isMatrixChanged(matrix1: number[][], matrix2: number[][]): boolean {
    //     const numRows = matrix1.length;
    //     const numCols = matrix1[0].length;
    
    //     for (let row = 0; row < numRows; row++) {
    //         for (let col = 0; col < numCols; col++) {
    //             if (matrix1[row][col] !== matrix2[row][col]) {
    //                 return true; // Ma trận đã thay đổi
    //             }
    //         }
    //     }
    
    //     return false; // Ma trận không thay đổi
    // }

    // mergeRow(row: number[]): number[] {
    //     const nonZeroValues = row.filter(value => value !== 0);
    //     const mergedRow = [];
    
    //     for (let i = 0; i < nonZeroValues.length; i++) {
    //         if (i < nonZeroValues.length - 1 && nonZeroValues[i] === nonZeroValues[i + 1]) {
    //             mergedRow.push(nonZeroValues[i] * 2);
    //             nonZeroValues[i + 1] = 0;
    //             i++; // Bỏ qua số tiếp theo
    //         } else {
    //             mergedRow.push(nonZeroValues[i]);
    //         }
    //     }
    
    //     while (mergedRow.length < row.length) {
    //         mergedRow.push(0);
    //     }
    
    //     return mergedRow;
    // }
    
    // moveUp(matrix: number[][]): number[][] {
    //     const numRows = matrix.length;
    //     const numCols = matrix[0].length;
    
    //     for (let col = 0; col < numCols; col++) {
    //         const column = [];
    //         for (let row = 0; row < numRows; row++) {
    //             column.push(matrix[row][col]);
    //         }
    
    //         const mergedColumn = this.mergeRow(column);
    
    //         for (let row = 0; row < numRows; row++) {
    //             matrix[row][col] = mergedColumn[row];
    //         }
    //     }
    
    //     return matrix;
    // }

    // calculateScore(matrix: number[][]): number {
        
    //     const numRows = matrix.length;
    //     const numCols = matrix[0].length;
    
    //     for (let row = 0; row < numRows; row++) {
    //         for (let col = 0; col < numCols; col++) {
    //             // Kiểm tra xem có ô số đã bị kết hợp
    //             if (matrix[row][col] > 0) {
    //                 this.score += matrix[row][col];
    //             }
    //         }
    //     }
    
    //     console.log("điểm hiện tại====" + this.score);
    //     return this.score;
    // }
    
    moveUp(){
        this.Node_GameLayout.children.forEach(element => {
            // let number = element.getComponent(itemNumber).lblNumber.string;
            var x = element.getComponent(itemNumber).position.x;
            var y = element.getComponent(itemNumber).position.y;     
                if(element.getComponent(itemNumber).lblNumber.string) { // kiểm tra vị trí phần tử có giá trị số
                    console.log("vị trí có phần tử: x --y" + x+"--"+y);
                    var label = element.getComponent(itemNumber).lblNumber.string; 
                    var checked = false; // khai báo biến để kiểm tra giá trị có di chuyển tiếp được hay không
                    for (let i = x -1; i >=0; i--) {
                        console.log("kiểm tra vị trí ở trên: x --y" + i+"--"+y);
                        
                        this.Node_GameLayout.children.forEach(elementBefore => { // foreach lấy ra các vị trí thuộc cột chứa phần tử có giá trị,
                            if(elementBefore.getComponent(itemNumber).position.x == i && elementBefore.getComponent(itemNumber).position.y == y){  //lấy ra phần tử trên phần tử ban đầu
                                if(elementBefore.getComponent(itemNumber).lblNumber.string == ""  ) { // nếu phần tử phía trên trống. gán giá trị của ô này bằng với label
                                    console.log("elementBefore=>",elementBefore.getComponent(itemNumber).position);
                                    
                                    elementBefore.getComponent(itemNumber).lblNumber.string =  label; 
                                    console.log("kiểm tra vị trí thỏa mãn if: x --y" + i+"--"+y);
                                    checked = true;
                                }
                                else{
                                    if(elementBefore.getComponent(itemNumber).lblNumber.string == label) { // nếu phần tử phía trên có giá trị bằng vị trí ban đầu
                                        label = (Number(label)*2).toString();
                                        console.log("nếu 2 giá trị liền nhau = nhau ===" + label + "i là ===" + i);
                                        elementBefore.getComponent(itemNumber).lblNumber.string =  label; 
                                        this.Node_GameLayout.children.forEach(elementCheck => {
                                            if(elementCheck.getComponent(itemNumber).position.x == i-1 && elementCheck.getComponent(itemNumber).position.y == y){ // kiểm tra vị trí ở trên element before xem có giá trị chưa
                                                console.log("when checked == false elementCheck ===", elementCheck.getComponent(itemNumber).position );
                                                if(elementCheck.getComponent(itemNumber).lblNumber.string) { // nếu có giá trị ở trên thì dừng lại không di chuyển nữa
                                                    checked = false
                                                    elementBefore.getComponent(itemNumber).lblNumber.string =  label;
                                                    if(Number(element.getComponent(itemNumber).position.x) - Number(elementBefore.getComponent(itemNumber).position.x) > 1) {
                                                        this.Node_GameLayout.children.forEach(elementDel => { // nếu giá trị ban đầu cách xa giá trị before thì sẽ xóa 1 lần ở ngay dưới before đi bởi vì checked = false nên không dùng được đoạn xóa phần tử ở dưới
                                                            if(elementDel.getComponent(itemNumber).position.x == elementBefore.getComponent(itemNumber).position.x+1 && elementDel.getComponent(itemNumber).position.y == element.getComponent(itemNumber).position.y){
                                                                console.log("when checked == false elementDel ===", elementDel.getComponent(itemNumber).position );
                                                                elementDel.getComponent(itemNumber).lblNumber.string = ""
                                                            }
                                                        })
                                                    }
                                                    console.log("when checked == false elementBefore ===", elementBefore.getComponent(itemNumber).position );
                                                    console.log("when checked == false elementCheck ===", elementCheck.getComponent(itemNumber).position );
                                                    console.log("when checked == false element ===", element.getComponent(itemNumber).position );
                                                }   else{
                                                    checked = true
                                                } 
                                            } 
                                        })
                                        element.getComponent(itemNumber).lblNumber.string =  ""; // sau khi di chuyển đến vị trí mới đặt vị trí ban đầu = 0
                                        
                                    } else { // nếu giá trị phía trên có giá trị khác thì dừng lại break vòng for
                                        checked = false
                                    }
                                }
                            }
                            if(checked == true) {// nếu di chuyển tiếp được 
                                if(elementBefore.getComponent(itemNumber).position.x == i+1 && elementBefore.getComponent(itemNumber).position.y == y){// lấy ra vị trí vừa di chuyển của elementbefore 
                                    if(elementBefore.getComponent(itemNumber).lblNumber.string != "" ) { // nếu có giá trị thì đặt = 0 
                                            // ví dụ đoạn mã ở trên sẽ lấy ra giá trị elementBefore để di chuyển lên từng ô 1. khi vừa di chuyển thì xóa đi giá trị ở vị trí cũ
                                            console.log("elementBefore check vị trí=>",elementBefore.getComponent(itemNumber).position);
                                            elementBefore.getComponent(itemNumber).lblNumber.string =  "";
                                    } else {
                                        if(elementBefore.getComponent(itemNumber).lblNumber.string == element.getComponent(itemNumber).lblNumber.string) { // nếu có 2 giá trị bằng nhau thì x2 lên merge vào 1 ô
                                            elementBefore.getComponent(itemNumber).lblNumber.string =  (Number(label)*2).toString();
                                        } else {
                                            return;
                                        }
                                    }
                                }
                            }
                            
                        });
                        if(checked == false) 
                        {
                                break;
                        }
                        
                    }
                }
        });
        this.randomNumber(2);
    }

    moveDown(){
            this.Node_GameLayout.children.forEach(element => {
                // let number = element.getComponent(itemNumber).lblNumber.string;
                var x = element.getComponent(itemNumber).position.x;
                var y = element.getComponent(itemNumber).position.y;     
                    if(element.getComponent(itemNumber).lblNumber.string) { // kiểm tra vị trí phần tử có giá trị số
                        console.log("vị trí có phần tử: x --y" + x+"--"+y);
                        var label = element.getComponent(itemNumber).lblNumber.string; 
                        var checked = false; // khai báo biến để kiểm tra giá trị có di chuyển tiếp được hay không
                        for (let i = x +1; i <= this.typeMap; i++) {
                            console.log("kiểm tra vị trí ở dưới: x --y" + i+"--"+y);
                            
                            this.Node_GameLayout.children.forEach(elementBefore => { // foreach lấy ra các vị trí thuộc cột chứa phần tử có giá trị,
                                if(elementBefore.getComponent(itemNumber).position.x == i && elementBefore.getComponent(itemNumber).position.y == y){  //lấy ra phần tử dưới phần tử ban đầu
                                    if(elementBefore.getComponent(itemNumber).lblNumber.string == ""  ) { // nếu phần tử phía dưới trống. gán giá trị của ô này bằng với label
                                        console.log("elementBefore=>",elementBefore.getComponent(itemNumber).position);
                                        
                                        elementBefore.getComponent(itemNumber).lblNumber.string =  label; 
                                        console.log("kiểm tra vị trí thỏa mãn if: x --y" + i+"--"+y);
                                        checked = true;
                                    }
                                    else{
                                        // if(elementBefore.getComponent(itemNumber).lblNumber.string == label) { // nếu phần tử phía dưới có giá trị bằng vị trí ban đầu
                                        //     label = (Number(label)*2).toString();
                                        //     console.log("nếu 2 giá trị liền nhau = nhau ===" + label + "i là ===" + i);
                                        //     elementBefore.getComponent(itemNumber).lblNumber.string =  label; 
                                        //     this.Node_GameLayout.children.forEach(elementCheck => {
                                        //         if(elementCheck.getComponent(itemNumber).position.x == i+1 && elementCheck.getComponent(itemNumber).position.y == y){ // kiểm tra vị trí ở dưới element before xem có giá trị chưa
                                        //             console.log("when checked == false elementCheck ===", elementCheck.getComponent(itemNumber).position );
                                        //             if(elementCheck.getComponent(itemNumber).lblNumber.string) { // nếu có giá trị ở dưới thì dừng lại không di chuyển nữa
                                        //                 checked = false
                                        //                 elementBefore.getComponent(itemNumber).lblNumber.string =  label;
                                        //                 // if(Number(element.getComponent(itemNumber).position.x) - Number(elementBefore.getComponent(itemNumber).position.x) > 1) {
                                        //                 //     this.Node_GameLayout.children.forEach(elementDel => { // nếu giá trị ban đầu cách xa giá trị before thì sẽ xóa 1 lần ở ngay dưới before đi bởi vì checked = false nên không dùng được đoạn xóa phần tử ở dưới
                                        //                 //         if(elementDel.getComponent(itemNumber).position.x == elementBefore.getComponent(itemNumber).position.x+1 && elementDel.getComponent(itemNumber).position.y == element.getComponent(itemNumber).position.y){
                                        //                 //             console.log("when checked == false elementDel ===", elementDel.getComponent(itemNumber).position );
                                        //                 //             elementDel.getComponent(itemNumber).lblNumber.string = ""
                                        //                 //         }
                                        //                 //     })
                                        //                 // }
                                        //                 console.log("when checked == false elementBefore ===", elementBefore.getComponent(itemNumber).position );
                                        //                 console.log("when checked == false elementCheck ===", elementCheck.getComponent(itemNumber).position );
                                        //                 console.log("when checked == false element ===", element.getComponent(itemNumber).position );
                                        //             }   else{
                                        //                 checked = true
                                        //             } 
                                        //         } 
                                        //     })
                                        //     element.getComponent(itemNumber).lblNumber.string =  ""; // sau khi di chuyển đến vị trí mới đặt vị trí ban đầu = 0
                                            
                                        // } else { // nếu giá trị phía trên có giá trị khác thì dừng lại break vòng for
                                        //     checked = false
                                        // }
                                    }
                                }
                                if(checked == true) {// nếu di chuyển tiếp được 
                                    if(elementBefore.getComponent(itemNumber).position.x == i-1 && elementBefore.getComponent(itemNumber).position.y == y){// lấy ra vị trí vừa di chuyển của elementbefore 
                                        console.log("kiểm tra vị trí nếu di chuyển được=>",elementBefore.getComponent(itemNumber).position);
                                        if(elementBefore.getComponent(itemNumber).lblNumber.string != "" ) { // nếu có giá trị thì đặt = 0 
                                                // ví dụ đoạn mã ở trên sẽ lấy ra giá trị elementBefore để di chuyển lên từng ô 1. khi vừa di chuyển thì xóa đi giá trị ở vị trí cũ
                                                console.log("elementBefore check vị trí=>",elementBefore.getComponent(itemNumber).position);
                                                elementBefore.getComponent(itemNumber).lblNumber.string =  "";
                                        } else {
                                            if(elementBefore.getComponent(itemNumber).lblNumber.string == element.getComponent(itemNumber).lblNumber.string) { // nếu có 2 giá trị bằng nhau thì x2 lên merge vào 1 ô
                                                elementBefore.getComponent(itemNumber).lblNumber.string =  (Number(label)*2).toString();
                                            } else {
                                                return;
                                            }
                                        }
                                    }
                                }
                                
                            });
                            if(checked == false) 
                            {
                                    break;
                            }
                            
                        }
                    }
            });
            // this.randomNumber(2);
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


