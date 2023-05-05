export class Clock {
	constructor(x, y, w, h, Images, show_level) {
		show_level = show_level || hmUI.show_level.ONLY_NORMAL;

		this.Images = Images;
		this.isAOD = show_level === hmUI.show_level.ONAL_AOD;

		const timeFormat = hmSetting.getTimeFormat();

		this.timeWidget = hmUI.createWidget(hmUI.widget.IMG_TIME, {
			hour_zero: timeFormat,
			hour_startX: x,
			hour_startY: y,
			hour_array: Images.BigNums,
			hour_space: 0,
			hour_unit_sc: Images.Colon,
			hour_unit_tc: Images.Colon,
			hour_unit_en: Images.Colon,
			hour_align: hmUI.align.RIGHT,
			minute_zero: 1,
			minute_array: Images.BigNums,
			minute_align: hmUI.align.RIGHT,
			minute_follow: 1,
			enable: true,
			show_level
		});
	}

	destroy() {
		if (this.timeWidget) {
			hmUI.deleteWidget(this.timeWidget);
			this.timeWidget = null;
		}
	}

	show() {
		this.timeWidget.setProperty(hmUI.prop.VISIBLE, true);
	}

	hide() {
		this.timeWidget.setProperty(hmUI.prop.VISIBLE, false);
	}

	handleKeyEvent(key) {
	}
}
