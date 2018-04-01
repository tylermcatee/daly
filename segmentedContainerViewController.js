class segmentedContainerViewController extends ViewController {
	constructor() {
		super();
		this.setPercent(0.5);
	}

	viewDidLoad() {
		super.viewDidLoad();

		this.leftView = View();
		this.leftView.setBackgroundColor('red');
		this.rightView = View());
		this.rightView.setBackgroundColor('blue');

		this.view.addSubview(this.leftView);
		this.view.addSubview(this.rightView);
	}

	layoutLeftView() {
		this.leftView.setX(0);
		this.leftView.setY(0);
		this.leftView.setHeight(this.view.height);
		this.leftView.setWidth(this.view.width * this.percent);
	}

	layoutRightView() {
		this.rightView.setX(this.view.width * this.percent);
		this.rightView.setY(0);
		this.rightView.setHeight(this.view.height);
		this.rightView.setWidth(this.view.width/2.0);
	}

	windowDidResize() {
		super.windowDidResize();
        this.layoutRightView();
        this.layoutLeftView();
    }

    setPercent(percent) {
    	this.percent = percent;
    }
}