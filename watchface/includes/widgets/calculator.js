export class Calculator {
  constructor(x, y, w, h, Images, show_level) {
    show_level = show_level || hmUI.show_level.ONLY_NORMAL;
    w -= 16;

    this.pendingAction = "";
    this.register = "";
    this.accumulator = 0;
    this.resetDigits = true;
    this.error = false;

    this.digitsHigh = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x, y, w: Math.floor(w/2) + 8, h,
      font_array: Images.BigNums,
      h_space: 1,
      align_h: hmUI.align.RIGHT,
      negative_image: Images.Negative,
      dot_image: Images.Dot,
      text: '',
      show_level
    });

    this.digitsLow = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: x + Math.ceil(w/2) + 8, y, w: Math.floor(w/2) + 8, h,
      font_array: Images.BigNums,
      h_space: 1,
      align_h: hmUI.align.RIGHT,
      negative_image: Images.Negative,
      dot_image: Images.Dot,
      text: '0',
      show_level
    });

    this.errorWidget = hmUI.createWidget(hmUI.widget.IMG, {
      x: x + w - 164, y, w: 164, h,
      src: Images.Error,
      show_level
    });
    this.errorWidget.setProperty(hmUI.prop.VISIBLE, false);

    this.overflowWidget = hmUI.createWidget(hmUI.widget.IMG, {
      x, y, w, h,
      src: Images.Overflow,
      show_level
    });
    this.overflowWidget.setProperty(hmUI.prop.VISIBLE, false);
  }

  destroy() {
    if (this.digitsHigh) {
      hmUI.deleteWidget(this.digitsHigh);
      this.digitsHigh = null;
    }
    if (this.digitsLow) {
      hmUI.deleteWidget(this.digitsLow);
      this.digitsLow = null;
    }
  }

  show() {
    this.digitsLow.setProperty(hmUI.prop.VISIBLE, true);
    this.digitsLow.setProperty(hmUI.prop.TEXT, '0');
  }

  hide() {
    this.digitsHigh.setProperty(hmUI.prop.VISIBLE, false);
    this.digitsLow.setProperty(hmUI.prop.VISIBLE, false);
    this.errorWidget.setProperty(hmUI.prop.VISIBLE, false);
    this.overflowWidget.setProperty(hmUI.prop.VISIBLE, false);
    this.pendingAction = "";
    this.register = "";
    this.accumulator = 0;
    this.resetDigits = true;
    this.error = false;
  }

  handleKeyEvent(key) {
    if (key === '0' && `${this.register}` === '') return;

    let n = 0;
    let maxLen = this.register.includes('.') ? 9 : 8;
    switch (key) {
      case '.':
        if (`${this.register}`.includes('.')) break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (this.resetDigits) this.register = `${key}`;
        else if (this.register.length < maxLen) this.register = `${this.register}${key}`;
        maxLen = this.register.includes('.') ? 9 : 8;
        this.resetDigits = false;
        break;
      case '+':
      case '-':
      case '/':
      case 'X':
      case '=':
        if (this.processPendingAction()) {
          this.resetDigits = true;
          this.pendingAction = key;
          this.register = `${this.accumulator}`;
          maxLen = this.register.includes('.') ? 9 : 8;
          n = Math.floor(maxLen === 9 ? +`${this.register}0` : +this.register);
          if (n > 99999999) this.error = true;
        }
        break;
    }

    if (this.error) {
      this.digitsHigh.setProperty(hmUI.prop.VISIBLE, false);
      this.digitsLow.setProperty(hmUI.prop.VISIBLE, false);

      if (n > 99999999) {
        this.overflowWidget.setProperty(hmUI.prop.VISIBLE, true);
      } else {
        this.errorWidget.setProperty(hmUI.prop.VISIBLE, true);
      }

      return;
    }

    const digits = `${this.register}`.substr(0, maxLen);
    const len = digits.substr(-5).includes('.') ? 5 : 4;
    const digitsLow = digits.substr(-len);
    let digitsHigh = digits.length > len ? digits.substr(0, digits.length - digitsLow.length) : '';
    this.digitsLow.setProperty(hmUI.prop.TEXT, digitsLow);
    this.digitsHigh.setProperty(hmUI.prop.TEXT, digitsHigh);
    this.digitsHigh.setProperty(hmUI.prop.VISIBLE, digitsHigh !== '');
  }

  processPendingAction() {
    try {
      switch (this.pendingAction) {
        case '+':
          this.accumulator += +this.register;
          break;
        case '-':
          this.accumulator -= +this.register;
          break;
        case '/':
          this.accumulator /= +this.register;
          break;
        case 'X':
          this.accumulator *= +this.register;
          break;
        default:
          this.accumulator = +this.register;
          break;
      }
    } catch (ex) {
      // TODO: display exception state
      this.error = true;
      return false;
    }
    if (`${this.accumulator}` === 'Infinity' || `${this.accumulator}` === 'NaN') {
      this.error = true;
      return false;
    }

    return true;
  }
}
