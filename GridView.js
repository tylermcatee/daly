var GridViewItemSpacingPercent = 0.1;

class SquareView extends View {

	static viewWithFrame(x, y, width, height) {
		var newView = new SquareView();
		newView.init();
		newView.setX(x);
		newView.setY(y);
		newView.setWidth(width);
		newView.setHeight(height);
		return newView;
	}

	init() {
		super.init();
		this.row = undefined;
		this.column = undefined;
	}
}

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

		// var viewClickHandler = EventHandler.clickHandler(this.handleClick.bind(this));
		// this.addEventHandler(viewClickHandler);

		this.prototypeGridInteractions();
		this.hidden = false;
	}

	handleClick(clickHandler) {
		// if (this.hidden) {
		// 	this.hidden = false;
		// 	this.animateInWithCompletion();
		// } else {
		// 	this.hidden = true;
		// 	this.animateOutWithCompletion();
		// }
    }

    animateOutWithCompletion(completion) {
    	for (var column in this.grid) {
    		var columns = this.grid[column];
    		for (var row in columns) {
    			var square = this.grid[column][row];
				Animation.animate(square, 0.3, function(view) {
					view.setOpacity(0.0);
					view.setTransform(Transform.translate(0, -120.0));
				}, (function() {
					if (completion) {
						completion()	
					}
				}).bind(this), Easing.easeInCubic);
    		}
    	}
    }

    animateInWithCompletion(completion) {
    	this.enumerateSquares(function(square, row, column) {
    		square.setTransform(Transform.translate(0, 50.0));
    		Animation.animate(square, 0.2, function(view) {
				view.setOpacity(1.0);
				view.setTransform(Transform.translate(0, 0));
			}, (function() {
				
			}).bind(this), Easing.easeOutCubic, (column + row)/100.0);
    	});
    }

    

    prototypeGridInteractions() {
		this.createGrid(3);
    }

    // Grid Primitives

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
    			var square = SquareView.viewWithFrame(0, 0, 100, 100);
    			square.row = x;
    			square.column = y;
    			square.setBackgroundColor('purple')
    			this.addSubview(square);
    			this.grid[x][y] = square;

    			var squareClickHandler = EventHandler.clickHandler(this.handleSquareClick.bind(this));
				square.addEventHandler(squareClickHandler);
    		}
    	}

    	this.layoutGrid();
    }

    setDelegate(delegate) {
    	this.delegate = delegate;
    }

    handleSquareClick(clickHandler) {
    	var square = clickHandler.target;
    	if (this.delegate) {
    		this.delegate.gridViewDidClickSquare(square);
    	}
    }

    enumerateSquares(applier) { // applier should be (square, row, column)
    	for (var column in this.grid) {
    		var columns = this.grid[column];
    		for (var row in columns) {
    			var square = this.grid[column][row];
    			applier(square, row, column);
    		}
    	}
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