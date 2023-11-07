import { _decorator, Component, Label, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('itemNumber')
export class itemNumber extends Component {
  
    @property(Label)
    lblNumber: Label = null
    
    position = new Vec2(0,0)
    start() {

    }

    setInfo(data,x,y){
        this.position.x = x;
        this.position.y = y;

        this.lblNumber.string = data;
    }

    update(deltaTime: number) {
        
    }
}


