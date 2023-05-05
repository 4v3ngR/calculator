export class Button {
  constructor(x, y, w, h, Image, callback) {
    this.button = hmUI.createWidget(hmUI.widget.IMG, {
      x, y, w, h,
      src: Image,
      show_level: hmUI.show_level.ONLY_NORMAL
    });

    if (callback) {
      this.button.addEventListener(hmUI.event.CLICK_DOWN, callback);
    }
  }

  destroy() {
    if (this.button) {
      hmUI.deleteWidget(this.button);
      this.button = null;
    }
  }

  show() {
    this.button.setProperty(hmUI.prop.VISIBLE, true);
  }

  hide() {
    this.button.setProperty(hmUI.prop.VISIBLE, false);
  }
}
