var GridViewItemSpacingPercent = 0.1;

class GridView extends View {

	static viewWithFrame(x, y, width, height) {
		var newView = new GridView();
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

		this.prototypeGridInteractions();
	}

	handleClick(clickHandler) {
     	// TODO   
    }

    prototypeGridInteractions() {
		this.createGrid(3);
    }

    matrix(x, y) {
    	var matrix = [];
		for(var i = 0; i < x; i++) {
		    matrix[i] = [];
		    for(var j = 0; j < y; j++) {
		        matrix[i][j] = undefined;
		    }
		}
		return matrix;
    }

    createGrid(n) {
    	var rows = 10
    	this.n = n
    	this.grid = this.matrix(n, rows);
    	for (var y = 0; y < rows; y++) {
    		for (var x = 0; x < n; x++) {
    			var square = View.viewWithFrame(0, 0, 100, 100);
    			square.setBackgroundColor('purple')
    			this.addSubview(square);
    			this.grid[x][y] = square;
    		}
    	}

    	this.layoutGrid();
    }

    layoutGrid() {
    	// TODO: add equidistant space before.
    	var squareAndSpacingWidth = this.width / this.n;
    	var spacing = GridViewItemSpacingPercent * squareAndSpacingWidth;
    	var squareWidth = squareAndSpacingWidth - spacing;
    	for (var column in this.grid) {
    		var columns = this.grid[column];
    		for (var row in columns) {
    			var square = this.grid[column][row];
    			square.setX(squareWidth * column + spacing * column);
    			square.setY(squareWidth * row + spacing*row);
    			square.setWidth(squareWidth);
    			square.setHeight(squareWidth);
    		}
    	}
    }

    //
    // Overriding frame setting to layout subviews
    // 

    setX(x) {
    	super.setX(x);
    	this.layoutGrid();
	}

	setY(y) {
		super.setY(y);
		this.layoutGrid();
	}

	setWidth(width) {
		super.setWidth(width);
		this.layoutGrid();
	}

	setHeight(height) {
		super.setHeight(height);
		this.layoutGrid();
	}
}