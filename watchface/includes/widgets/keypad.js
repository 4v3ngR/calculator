import { Button } from './button';

export class Keypad {
  constructor(x, y, Images, callback) {
    let dX = x;
    let dY = y;
    const w = 76;
    const h = 43;

    this.key7 = new Button(dX, dY, w, h, Images.Buttons['7'], () => callback("7")); dX += w;
    this.key8 = new Button(dX, dY, w, h, Images.Buttons['8'], () => callback("8")); dX += w;
    this.key9 = new Button(dX, dY, w, h, Images.Buttons['9'], () => callback("9")); dX += w;
    this.keyDivide = new Button(dX, dY, w, h, Images.Buttons.Divide, () => callback("/")); dX = x; dY += h;
    this.key4 = new Button(dX, dY, w, h, Images.Buttons['4'], () => callback("4")); dX += w;
    this.key5 = new Button(dX, dY, w, h, Images.Buttons['5'], () => callback("5")); dX += w;
    this.key6 = new Button(dX, dY, w, h, Images.Buttons['6'], () => callback("6")); dX += w;
    this.keyMultiply = new Button(dX, dY, w, h, Images.Buttons.Multiply, () => callback("X")); dX = x; dY += h;
    this.key1 = new Button(dX, dY, w, h, Images.Buttons['1'], () => callback("1")); dX += w;
    this.key2 = new Button(dX, dY, w, h, Images.Buttons['2'], () => callback("2")); dX += w;
    this.key3 = new Button(dX, dY, w, h, Images.Buttons['3'], () => callback("3")); dX += w;
    this.keyMinus = new Button(dX, dY, w, h, Images.Buttons.Minus, () => callback("-")); dX = x; dY += h;
    this.key0 = new Button(dX, dY, w, h, Images.Buttons['0'], () => callback("0")); dX += w;
    this.keyDot = new Button(dX, dY, w, h, Images.Buttons.Dot, () => callback(".")); dX += w;
    this.keyEqual = new Button(dX, dY, w, h, Images.Buttons.Equals, () => callback("=")); dX += w;
    this.keyPlus = new Button(dX, dY, w, h, Images.Buttons.Plus, () => callback("+")); dX += w;

    this.keyMode = new Button(x + 117, y + 173, w, h, Images.Buttons.Mode, () => callback("MODE"));
  }

  destroy() {
    hmUI.deleteWidget(this.key0);
    hmUI.deleteWidget(this.key1);
    hmUI.deleteWidget(this.key2);
    hmUI.deleteWidget(this.key3);
    hmUI.deleteWidget(this.key4);
    hmUI.deleteWidget(this.key5);
    hmUI.deleteWidget(this.key6);
    hmUI.deleteWidget(this.key7);
    hmUI.deleteWidget(this.key8);
    hmUI.deleteWidget(this.key9);
    hmUI.deleteWidget(this.keyDivide);
    hmUI.deleteWidget(this.keyMultiply);
    hmUI.deleteWidget(this.keyMinus);
    hmUI.deleteWidget(this.keyDot);
    hmUI.deleteWidget(this.keyEqual);
    hmUI.deleteWidget(this.keyPlus);
    this.key0 = null;
    this.key1 = null;
    this.key2 = null;
    this.key3 = null;
    this.key4 = null;
    this.key5 = null;
    this.key6 = null;
    this.key7 = null;
    this.key8 = null;
    this.key9 = null;
    this.keyDivide = null;
    this.keyMultiply = null;
    this.keyMinus = null;
    this.keyDot = null;
    this.keyEqual = null;
    this.keyPlus = null;
  }
}
