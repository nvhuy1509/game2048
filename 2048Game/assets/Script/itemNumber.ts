import { _decorator, Component, Label, Node, tween, Vec2, Vec3 } from 'cc';
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
        tween()
        .target(this.lblNumber.node)
        .to(0.3, {  scale: new Vec3(1.3, 1.3, 1) }).delay(0.1).to(1.0, {  scale: new Vec3(1, 1, 1) })
        .start();
    }

    update(deltaTime: number) {
        
    }
}


