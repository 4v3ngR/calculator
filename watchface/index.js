import { getImages } from './includes/images';
import { Keypad } from './includes/widgets/keypad';
import { Clock } from './includes/widgets/clock';
import { Calculator } from './includes/widgets/calculator';

let mode = "WATCH";
let clockWidget = null;
let calculatorWidget = null;
let stopwatchWidget = null;

WatchFace({
  initView() {
    const deviceInfo = hmSetting.getDeviceInfo();
    const screenType = hmSetting.getScreenType();

    this.Images = getImages(hmSetting.getLanguage());

    this.background = hmUI.createWidget(hmUI.widget.IMG, {
      x: px(0),
      y: px(0),
      w: px(deviceInfo.width),
      h: px(deviceInfo.height),
      src: this.Images.Background,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this.createWidgets();
  },

  createWidgets() {
		try {
    clockWidget = new Clock(168, 80, 140, 60, this.Images, hmUI.show_level.ONLY_NORMAL);
    clockWidget.show();

		calculatorWidget = new Calculator(27, 80, 280, 60, this.Images, hmUI.show_level.ONLY_NORMAL);
		calculatorWidget.hide();

		keypad = new Keypad(13, 167, this.Images, this.onKeyPress);
		} catch (ex) {
			console.log("got ex: " + ex.message);
		}
  },

  onInit() {
  },

  build() {
    try {
      this.initView();
    } catch (ex) { }
  },

  onDestroy() {
  },

	onKeyPress(keycode) {
		if (keycode === "MODE") switch (mode) {
			case "WATCH":
				mode = "CALCULATOR";
				clockWidget.hide();
				calculatorWidget.show();
				// stopwatchWidget.hide();
				break;
			case "CALCULATOR":
				/*
				mode = "STOPWATCH";
				clockWidget.hide();
				calculatorWidget.hide();
				// stopwatchWidget.show();
				break;
			case "STOPWATCH":
				*/
				mode = "WATCH";
				clockWidget.show();
				calculatorWidget.hide();
				// stopwatchWidget.hide();
				break;
		} else switch (mode) {
			case "WATCH":
				clockWidget.handleKeyEvent(keycode);
				break;
			case "CALCULATOR":
				calculatorWidget.handleKeyEvent(keycode);
				break;
			case "STOPWATCH":
				// stopwatchWidget.handleKeyEvent(keycode);
				break;
		}
	},
})
