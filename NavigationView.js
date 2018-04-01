var NavigationViewNavItemRightBorder = 20.0;
var NavigationViewTopToFirstItem = 100.0;
var NavigationViewNavItemSpacing = 40.0;
var NavigationViewNavItemFontSize = 30.0;

class NavigationView extends View {

	static viewWithFrame(x, y, width, height) {
		var newView = new NavigationView();
		newView.init();
		newView.setX(x);
		newView.setY(y);
		newView.setWidth(width);
		newView.setHeight(height);
		return newView;
	}

	init() {
		super.init();
		this.navItems = []; // Nothing to start

		var viewClickHandler = EventHandler.clickHandler(this.handleClick.bind(this));
		this.addEventHandler(viewClickHandler);
	}

	handleClick(clickHandler) {
        
    }

    setNavItems(navItems) {
    	// Clear out existing navItems
    	for (var index in this.navItems) {
    		var navLabel = this.navItems[index];
    		navLabel.removeFromSuperview();
    	}
    	this.navItems = [];

    	for (var index in navItems) {
    		var navLabel = Label.labelWithFrame(0, 0, 0, 0);
    		navLabel.setBorderColor('blue');
			navLabel.setBorderWidth(1.0);
    		navLabel.setText(navItems[index]);
    		navLabel.setFontSize(NavigationViewNavItemFontSize);
    		navLabel.setFontColor('black');
    		var labelSize = Label.textSize(navItems[index], NavigationViewNavItemFontSize);
    		navLabel.setWidth(labelSize.width);
    		navLabel.setHeight(labelSize.height);
    		this.addSubview(navLabel);
    		this.navItems.push(navLabel);
    	}

    	this.layoutNavItems();
    }

    layoutNavItems() {
    	for (var index in this.navItems) {
    		var navLabel = this.navItems[index];
    		navLabel.setY(NavigationViewTopToFirstItem + NavigationViewNavItemSpacing * index);
    		navLabel.setX(this.width - navLabel.width - NavigationViewNavItemRightBorder);
    	}
    }

    //
    // Overriding frame setting to layout subviews
    // 

    setX(x) {
    	super.setX(x);
    	this.layoutNavItems();
	}

	setY(y) {
		super.setY(y);
		this.layoutNavItems();
	}

	setWidth(width) {
		super.setWidth(width);
		this.layoutNavItems();
	}

	setHeight(height) {
		super.setHeight(height);
		this.layoutNavItems();
	}
}