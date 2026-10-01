webvowl =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var nodeMap = __webpack_require__(5)();
	var propertyMap = __webpack_require__(40)();


	var webvowl = {};
	webvowl.graph = __webpack_require__(57);
	webvowl.options = __webpack_require__(64);
	webvowl.version = "1.1.7";

	webvowl.util = {};
	webvowl.util.constants = __webpack_require__(12);
	webvowl.util.languageTools = __webpack_require__(11);
	webvowl.util.elementTools = __webpack_require__(63);
	webvowl.util.prefixTools = __webpack_require__(72);
	webvowl.modules = {};
	webvowl.modules.colorExternalsSwitch = __webpack_require__(73);
	webvowl.modules.compactNotationSwitch = __webpack_require__(74);
	webvowl.modules.datatypeFilter = __webpack_require__(75);
	webvowl.modules.disjointFilter = __webpack_require__(77);
	webvowl.modules.focuser = __webpack_require__(78);
	webvowl.modules.emptyLiteralFilter = __webpack_require__(79);
	webvowl.modules.nodeDegreeFilter = __webpack_require__(80);
	webvowl.modules.nodeScalingSwitch = __webpack_require__(81);
	webvowl.modules.objectPropertyFilter = __webpack_require__(82);
	webvowl.modules.pickAndPin = __webpack_require__(83);
	webvowl.modules.selectionDetailsDisplayer = __webpack_require__(315);
	webvowl.modules.setOperatorFilter = __webpack_require__(316);
	webvowl.modules.statistics = __webpack_require__(317);
	webvowl.modules.subclassFilter = __webpack_require__(318);


	webvowl.nodes = {};
	nodeMap.entries().forEach(function ( entry ){
	  mapEntryToIdentifier(webvowl.nodes, entry);
	});

	webvowl.properties = {};
	propertyMap.entries().forEach(function ( entry ){
	  mapEntryToIdentifier(webvowl.properties, entry);
	});

	function mapEntryToIdentifier( map, entry ){
	  var identifier = entry.key.replace(":", "").toLowerCase();
	  map[identifier] = entry.value;
	}


	module.exports = webvowl;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var nodes = [];
	nodes.push(__webpack_require__(7));
	nodes.push(__webpack_require__(18));
	nodes.push(__webpack_require__(19));
	nodes.push(__webpack_require__(26));
	nodes.push(__webpack_require__(27));
	nodes.push(__webpack_require__(28));
	nodes.push(__webpack_require__(29));
	nodes.push(__webpack_require__(30));
	nodes.push(__webpack_require__(31));
	nodes.push(__webpack_require__(32));
	nodes.push(__webpack_require__(33));
	nodes.push(__webpack_require__(34));
	nodes.push(__webpack_require__(38));
	nodes.push(__webpack_require__(39));

	var map = d3.map(nodes, function ( Prototype ){
	  return new Prototype().type();
	});

	module.exports = function (){
	  return map;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = d3;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.attributes(["external"])
	      .type("ExternalClass");
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseNode = __webpack_require__(9);
	var CenteringTextElement = __webpack_require__(14);
	var drawTools = __webpack_require__(17)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseNode.apply(this, arguments);
	    
	    var that = this,
	      collapsible = false,
	      radius = 50,
	      collapsingGroupElement,
	      pinGroupElement,
	      haloGroupElement = null,
	      rectangularRepresentation = false,
	      renderingElement,
	      textBlock;
	    
	    this.setRectangularRepresentation = function ( val ){
	      rectangularRepresentation = val;
	    };
	    this.getRectangularRepresentation = function (){
	      return rectangularRepresentation;
	    };
	    
	    this.getHalos = function (){
	      return haloGroupElement;
	    };
	    
	    // Properties
	    this.collapsible = function ( p ){
	      if ( !arguments.length ) return collapsible;
	      collapsible = p;
	      return this;
	    };
	    
	    this.textBlock = function ( p ){
	      if ( !arguments.length ) return textBlock;
	      textBlock = p;
	      return this;
	    };
	    
	    /**
	     * This might not be equal to the actual radius, because the instance count is used for its calculation.
	     * @param p
	     * @returns {*}
	     */
	    this.radius = function ( p ){
	      if ( !arguments.length ) return radius;
	      radius = p;
	      return this;
	    };
	    
	    
	    // Functions
	    this.setHoverHighlighting = function ( enable ){
	      that.nodeElement().selectAll("circle").classed("hovered", enable);
	    };
	    
	    this.textWidth = function ( yOffset ){
	      var availableWidth = this.actualRadius() * 2;
	      
	      // if the text is not placed in the center of the circle, it can't have the full width
	      if ( yOffset ) {
	        var relativeOffset = Math.abs(yOffset) / this.actualRadius();
	        var isOffsetInsideOfNode = relativeOffset <= 1;
	        
	        if ( isOffsetInsideOfNode ) {
	          availableWidth = Math.cos(relativeOffset) * availableWidth;
	        } else {
	          availableWidth = 0;
	        }
	      }
	      
	      return availableWidth;
	    };
	    
	    this.toggleFocus = function (){
	      that.focused(!that.focused());
	      if ( that.nodeElement() )
	        that.nodeElement().select("circle").classed("focused", that.focused());
	      graph.resetSearchHighlight();
	      graph.options().searchMenu().clearText();
	      
	    };
	    
	    this.actualRadius = function (){
	      if ( !graph.options().scaleNodesByIndividuals() || that.individuals().length <= 0 ) {
	        return that.radius();
	      } else {
	        // we could "listen" for radius and maxIndividualCount changes, but this is easier
	        var MULTIPLIER = 8,
	          additionalRadius = Math.log(that.individuals().length + 1) * MULTIPLIER + 5;
	        
	        return that.radius() + additionalRadius;
	      }
	    };
	    
	    this.distanceToBorder = function (){
	      return that.actualRadius();
	    };
	    
	    this.removeHalo = function (){
	      if ( that.halo() ) {
	        that.halo(false);
	        if ( haloGroupElement ) {
	          haloGroupElement.remove();
	        }
	      }
	    };
	    
	    this.drawHalo = function ( pulseAnimation ){
	      that.halo(true);
	      if ( rectangularRepresentation === true ) {
	        haloGroupElement = drawTools.drawRectHalo(that.nodeElement(), 80, 80, 5);
	      } else {
	        haloGroupElement = drawTools.drawHalo(that.nodeElement(), that.actualRadius(), this.removeHalo);
	      }
	      if ( pulseAnimation === false ) {
	        var pulseItem = haloGroupElement.selectAll(".searchResultA");
	        pulseItem.classed("searchResultA", false);
	        pulseItem.classed("searchResultB", true);
	        pulseItem.attr("animationRunning", false);
	      }
	    };
	    
	    /**
	     * Draws the pin on a round node on a position depending on its radius.
	     */
	    this.drawPin = function (){
	      that.pinned(true);
	      var dx = (-3.5 / 5) * that.actualRadius(),
	        dy = (-7 / 10) * that.actualRadius();
	      pinGroupElement = drawTools.drawPin(that.nodeElement(), dx, dy, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	      
	      
	    };
	    
	    /**
	     * Removes the pin and refreshs the graph to update the force layout.
	     */
	    this.removePin = function (){
	      that.pinned(false);
	      if ( pinGroupElement ) {
	        pinGroupElement.remove();
	      }
	      graph.updateStyle();
	    };
	    
	    this.drawCollapsingButton = function (){
	      
	      collapsingGroupElement = that.nodeElement()
	        .append("g")
	        .classed("hidden-in-export", true)
	        .attr("transform", function (){
	          var dx = (-2 / 5) * that.actualRadius(),
	            dy = (1 / 2) * that.actualRadius();
	          return "translate(" + dx + "," + dy + ")";
	        });
	      
	      collapsingGroupElement.append("rect")
	        .classed("class pin feature", true)
	        .attr("x", 0)
	        .attr("y", 0)
	        .attr("width", 40)
	        .attr("height", 24);
	      
	      collapsingGroupElement.append("line")
	        .attr("x1", 13)
	        .attr("y1", 12)
	        .attr("x2", 27)
	        .attr("y2", 12);
	      
	      collapsingGroupElement.append("line")
	        .attr("x1", 20)
	        .attr("y1", 6)
	        .attr("x2", 20)
	        .attr("y2", 18);
	    };
	    
	    /**
	     * Draws a circular node.
	     * @param parentElement the element to which this node will be appended
	     * @param [additionalCssClasses] additional css classes
	     */
	    this.draw = function ( parentElement, additionalCssClasses ){
	      var cssClasses = that.collectCssClasses();
	      that.nodeElement(parentElement);
	      
	      var bgColor = that.backgroundColor();
	      if ( bgColor === null ) bgColor = undefined;
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      if ( additionalCssClasses instanceof Array ) {
	        cssClasses = cssClasses.concat(additionalCssClasses);
	      }
	      if ( rectangularRepresentation === true ) {
	        renderingElement = drawTools.appendRectangularClass(parentElement, 80, 80, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        renderingElement = drawTools.appendCircularClass(parentElement, that.actualRadius(), cssClasses, that.labelForCurrentLanguage(), bgColor);
	      }
	      that.postDrawActions(parentElement);
	    };
	    
	    this.redrawElement = function (){
	      renderingElement.remove();
	      textBlock.remove();
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      
	      var cssClasses = that.collectCssClasses();
	      
	      if ( rectangularRepresentation === true ) {
	        renderingElement = drawTools.appendRectangularClass(that.nodeElement(), 80, 80, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        renderingElement = drawTools.appendCircularClass(that.nodeElement(), that.actualRadius(), cssClasses, that.labelForCurrentLanguage(), bgColor);
	      }
	      that.postDrawActions(that.nodeElement());
	    };
	    /**
	     * Common actions that should be invoked after drawing a node.
	     */
	    this.postDrawActions = function (){
	      that.textBlock(createTextBlock());
	      
	      that.addMouseListeners();
	      if ( that.pinned() ) {
	        that.drawPin();
	      }
	      if ( that.halo() ) {
	        that.drawHalo(false);
	      }
	      if ( that.collapsible() ) {
	        that.drawCollapsingButton();
	      }
	    };
	    
	    this.redrawLabelText = function (){
	      that.textBlock().remove();
	      that.textBlock(createTextBlock());
	      renderingElement.select("title").text(that.labelForCurrentLanguage());
	    };
	    function createTextBlock(){
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 )
	        bgColor = undefined;
	      
	      var textBlock = new CenteringTextElement(that.nodeElement(), bgColor);
	      
	      var equivalentsString = that.equivalentsString();
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      
	      textBlock.addText(that.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      textBlock.addEquivalents(equivalentsString);
	      if ( !graph.options().compactNotation() ) {
	        textBlock.addSubText(that.indicationString());
	      }
	      textBlock.addInstanceCount(that.individuals().length);
	      
	      return textBlock;
	    }
	    
	    this.equivalentsString = function (){
	      var equivalentClasses = that.equivalents();
	      if ( !equivalentClasses ) {
	        return;
	      }
	      
	      return equivalentClasses
	        .map(function ( node ){
	          return node.labelForCurrentLanguage();
	        })
	        .join(", ");
	    };
	  };
	  o.prototype = Object.create(BaseNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var BaseElement = __webpack_require__(10);
	var forceLayoutNodeFunctions = __webpack_require__(13)();

	module.exports = (function (){
	  
	  var Base = function ( graph ){
	    BaseElement.apply(this, arguments);
	    
	    var that = this,
	      // Basic attributes
	      complement,
	      disjointUnion,
	      disjointWith,
	      individuals = [],
	      intersection,
	      union,
	      links,
	      rendertype = "round",
	      // Additional attributes
	      maxIndividualCount,
	      fobj, // foreigner object for editing
	      ignoreLocalHoverEvents = false,
	      backupFullIri,
	      // Element containers
	      nodeElement;
	    
	    // array to store my properties; // we will need this also later for semantic zooming stuff
	    var assignedProperties = [];
	    that.editingTextElement = false;
	    
	    this.isPropertyAssignedToThisElement = function ( property ){
	      // this goes via IRIS
	      console.log("Element IRI :" + property.iri());
	      if ( property.type() === "rdfs:subClassOf" )
	        for ( var i = 0; i < assignedProperties.length; i++ ) {
	          var iriEl = assignedProperties[i].iri();
	          if ( property.iri() === iriEl ) {
	            return true;
	          }
	          if ( property.type() === "rdfs:subClassOf" && assignedProperties[i].type() === "rdfs:subClassOf" )
	            return true;
	          if ( property.type() === "owl:disjointWith" && assignedProperties[i].type() === "owl:disjointWith" )
	            return true;
	          
	        }
	      return false;
	    };
	    
	    
	    this.existingPropertyIRI = function ( url ){
	      // this goes via IRIS
	      for ( var i = 0; i < assignedProperties.length; i++ ) {
	        var iriEl = assignedProperties[i].iri();
	        if ( iriEl === url ) {
	          return true;
	        }
	      }
	      return false;
	    };
	    
	    this.addProperty = function ( property ){
	      if ( assignedProperties.indexOf(property) === -1 ) {
	        assignedProperties.push(property);
	      }
	    };
	    
	    this.removePropertyElement = function ( property ){
	      // console.log("Calling removing old property!"+ property.iri());
	      if ( assignedProperties.indexOf(property) !== -1 ) {
	        // console.log("Found it!");
	        assignedProperties.splice(assignedProperties.indexOf(property), 1);
	      }
	    };
	    this.getMyProperties = function (){
	      return assignedProperties;
	    };
	    this.copyOtherProperties = function ( otherProperties ){
	      assignedProperties = otherProperties;
	    };
	    
	    this.copyInformation = function ( other ){
	      console.log(other.labelForCurrentLanguage());
	      if ( other.type() !== "owl:Thing" )
	        that.label(other.label());
	      that.complement(other.complement());
	      that.iri(other.iri());
	      that.copyOtherProperties(other.getMyProperties());
	      that.baseIri(other.baseIri());
	      if ( other.type() === "owl:Class" ) {
	        that.backupLabel(other.label());
	        // console.log("copied backup label"+that.backupLabel());
	      }
	      if ( other.backupLabel() !== undefined ) {
	        that.backupLabel(other.backupLabel());
	      }
	    };
	    
	    this.enableEditing = function ( autoEditing ){
	      if ( autoEditing === false )
	        return;
	      that.raiseDoubleClickEdit(true);
	    };
	    
	    this.raiseDoubleClickEdit = function ( forceIRISync ){
	      d3.selectAll(".foreignelements").remove();
	      if ( nodeElement === undefined || this.type() === "owl:Thing" || this.type() === "rdfs:Literal" ) {
	        console.log("No Container found");
	        return;
	      }
	      if ( fobj !== undefined ) {
	        nodeElement.selectAll(".foreignelements").remove();
	      }
	      
	      backupFullIri = undefined;
	      graph.options().focuserModule().handle(undefined);
	      graph.options().focuserModule().handle(that);
	      // add again the editing elements to that one
	      if ( graph.isTouchDevice() === true ) {
	        graph.activateHoverElements(true, that, true);
	      }
	      that.editingTextElement = true;
	      ignoreLocalHoverEvents = true;
	      that.nodeElement().selectAll("circle").classed("hoveredForEditing", true);
	      graph.killDelayedTimer();
	      graph.ignoreOtherHoverEvents(false);
	      fobj = nodeElement.append("foreignObject")
	        .attr("x", -0.5 * (that.textWidth() - 2))
	        .attr("y", -12)
	        .attr("height", 30)
	        .attr("class", "foreignelements")
	        .on("dragstart", function (){
	          return false;
	        }) // remove drag operations of text element)
	        .attr("width", that.textWidth() - 2);
	      
	      var editText = fobj.append("xhtml:input")
	        .attr("class", "nodeEditSpan")
	        .attr("id", that.id())
	        .attr("align", "center")
	        .attr("contentEditable", "true")
	        .on("dragstart", function (){
	          return false;
	        }); // remove drag operations of text element)
	      
	      var bgColor = '#f00';
	      var txtWidth = that.textWidth() - 2;
	      editText.style({
	        
	        'align': 'center',
	        'color': 'black',
	        'width': txtWidth + "px",
	        'height': '15px',
	        'background-color': bgColor,
	        'border-bottom': '2px solid black'
	      });
	      var txtNode = editText.node();
	      txtNode.value = that.labelForCurrentLanguage();
	      txtNode.focus();
	      txtNode.select();
	      that.frozen(true); // << releases the not after selection
	      that.locked(true);
	      
	      
	      d3.event.stopPropagation();
	      // ignoreNodeHoverEvent=true;
	      // // add some events that relate to this object
	      editText.on("click", function (){
	        d3.event.stopPropagation();
	      });
	      // // remove hover Events for now;
	      editText.on("mouseout", function (){
	        d3.event.stopPropagation();
	        
	        
	      });
	      editText.on("mousedown", function (){
	        d3.event.stopPropagation();
	      })
	        .on("keydown", function (){
	          d3.event.stopPropagation();
	          if ( d3.event.keyCode === 13 ) {
	            this.blur();
	            that.frozen(false); // << releases the not after selection
	            that.locked(false);
	          }
	        })
	        .on("keyup", function (){
	          if ( forceIRISync ) {
	            var labelName = editText.node().value;
	            var resourceName = labelName.replaceAll(" ", "_");
	            var syncedIRI = that.baseIri() + resourceName;
	            backupFullIri = syncedIRI;
	            
	            d3.select("#element_iriEditor").node().title = syncedIRI;
	            d3.select("#element_iriEditor").node().value = graph.options().prefixModule().getPrefixRepresentationForFullURI(syncedIRI);
	          }
	          d3.select("#element_labelEditor").node().value = editText.node().value;
	          
	        })
	        .on("blur", function (){
	          that.editingTextElement = false;
	          ignoreLocalHoverEvents = false;
	          that.nodeElement().selectAll("circle").classed("hoveredForEditing", false);
	          var newLabel = editText.node().value;
	          nodeElement.selectAll(".foreignelements").remove();
	          // that.setLabelForCurrentLanguage(classNameConvention(editText.node().value));
	          that.label(newLabel);
	          that.backupLabel(newLabel);
	          that.redrawLabelText();
	          that.frozen(graph.paused());
	          that.locked(graph.paused());
	          graph.ignoreOtherHoverEvents(false);
	          // console.log("Calling blur on Node!");
	          if ( backupFullIri ) {
	            var sanityCheckResult = graph.checkIfIriClassAlreadyExist(backupFullIri);
	            if ( sanityCheckResult === false ) {
	              that.iri(backupFullIri);
	            } else {
	              // throw warnign
	              graph.options().warningModule().showWarning("Already seen this class",
	                "Input IRI: " + backupFullIri + " for element: " + that.labelForCurrentLanguage() + " already been set",
	                "Restoring previous IRI for Element : " + that.iri(), 2, false, sanityCheckResult);
	              
	            }
	          }
	          if ( graph.isADraggerActive() === false ) {
	            graph.options().focuserModule().handle(undefined);
	            graph.options().focuserModule().handle(that);
	          }
	        });	// add a foreiner element to this thing;
	    };
	    
	    
	    this.renderType = function ( t ){
	      if ( !arguments.length ) return rendertype;
	      rendertype = t;
	      return this;
	    };
	    // Properties
	    this.complement = function ( p ){
	      if ( !arguments.length ) return complement;
	      complement = p;
	      return this;
	    };
	    
	    this.disjointUnion = function ( p ){
	      if ( !arguments.length ) return disjointUnion;
	      disjointUnion = p;
	      return this;
	    };
	    
	    this.disjointWith = function ( p ){
	      if ( !arguments.length ) return disjointWith;
	      disjointWith = p;
	      return this;
	    };
	    
	    this.individuals = function ( p ){
	      if ( !arguments.length ) return individuals;
	      individuals = p || [];
	      return this;
	    };
	    
	    this.intersection = function ( p ){
	      if ( !arguments.length ) return intersection;
	      intersection = p;
	      return this;
	    };
	    
	    this.links = function ( p ){
	      if ( !arguments.length ) return links;
	      links = p;
	      return this;
	    };
	    
	    this.maxIndividualCount = function ( p ){
	      if ( !arguments.length ) return maxIndividualCount;
	      maxIndividualCount = p;
	      return this;
	    };
	    
	    this.nodeElement = function ( p ){
	      if ( !arguments.length ) return nodeElement;
	      nodeElement = p;
	      return this;
	    };
	    
	    this.union = function ( p ){
	      if ( !arguments.length ) return union;
	      union = p;
	      return this;
	    };
	    
	    
	    /**
	     * Returns css classes generated from the data of this object.
	     * @returns {Array}
	     */
	    that.collectCssClasses = function (){
	      var cssClasses = [];
	      
	      if ( typeof that.styleClass() === "string" ) {
	        cssClasses.push(that.styleClass());
	      }
	      
	      cssClasses = cssClasses.concat(that.visualAttributes());
	      
	      return cssClasses;
	    };
	    
	    
	    // Reused functions TODO refactor
	    this.addMouseListeners = function (){
	      // Empty node
	      if ( !that.nodeElement() ) {
	        console.warn(this);
	        return;
	      }
	      
	      that.nodeElement().selectAll("*")
	        .on("mouseover", onMouseOver)
	        .on("mouseout", onMouseOut);
	    };
	    
	    this.animationProcess = function (){
	      var animRuns = false;
	      if ( that.getHalos() ) {
	        var haloGr = that.getHalos();
	        var haloEls = haloGr.selectAll(".searchResultA");
	        animRuns = haloGr.attr("animationRunning");
	        if ( typeof animRuns !== "boolean" ) {
	          // parse this to a boolean value
	          animRuns = (animRuns === 'true');
	        }
	        if ( animRuns === false ) {
	          haloEls.classed("searchResultA", false);
	          haloEls.classed("searchResultB", true);
	        }
	      }
	      return animRuns;
	    };
	    
	    this.foreground = function (){
	      var selectedNode = that.nodeElement().node(),
	        nodeContainer = selectedNode.parentNode;
	      // check if the halo is present and an animation is running
	      if ( that.animationProcess() === false ) {
	        // Append hovered element as last child to the container list.
	        nodeContainer.appendChild(selectedNode);
	      }
	      
	    };
	    
	    function onMouseOver(){
	      if ( that.mouseEntered() || ignoreLocalHoverEvents === true ) {
	        return;
	      }
	      
	      var selectedNode = that.nodeElement().node(),
	        nodeContainer = selectedNode.parentNode;
	      
	      // Append hovered element as last child to the container list.
	      if ( that.animationProcess() === false ) {
	        nodeContainer.appendChild(selectedNode);
	      }
	      if ( graph.isTouchDevice() === false ) {
	        that.setHoverHighlighting(true);
	        that.mouseEntered(true);
	        if ( graph.editorMode() === true && graph.ignoreOtherHoverEvents() === false ) {
	          graph.activateHoverElements(true, that);
	        }
	      } else {
	        if ( graph.editorMode() === true && graph.ignoreOtherHoverEvents() === false ) {
	          graph.activateHoverElements(true, that, true);
	        }
	        
	      }
	      
	      
	    }
	    
	    function onMouseOut(){
	      that.setHoverHighlighting(false);
	      that.mouseEntered(false);
	      if ( graph.editorMode() === true && graph.ignoreOtherHoverEvents() === false ) {
	        graph.activateHoverElements(false);
	      }
	    }
	    
	    
	    forceLayoutNodeFunctions.addTo(this);
	  };
	  
	  Base.prototype = Object.create(BaseElement.prototype);
	  Base.prototype.constructor = Base;
	  
	  
	  return Base;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * The base element for all visual elements of webvowl.
	 */
	module.exports = (function (){
	  
	  var Base = function ( graph ){
	    // Basic attributes
	    var equivalents = [],
	      id,
	      label,
	      type,
	      iri,
	      baseIri,
	      // Additional attributes
	      annotations,
	      attributes = [],
	      backgroundColor,
	      comment,
	      description,
	      equivalentBase,
	      visualAttributes = [],
	      // Style attributes
	      focused = false,
	      indications = [],
	      mouseEntered = false,
	      styleClass,
	      visible = true,
	      
	      backupLabel,
	      // Other
	      languageTools = __webpack_require__(11)();
	    
	    
	    this.backupLabel = function ( label ){
	      if ( !arguments.length ) return backupLabel;
	      backupLabel = label;
	    };
	    // Properties
	    this.attributes = function ( p ){
	      if ( !arguments.length ) return attributes;
	      attributes = p;
	      return this;
	    };
	    
	    this.annotations = function ( p ){
	      if ( !arguments.length ) return annotations;
	      annotations = p;
	      return this;
	    };
	    
	    this.redrawElement = function (){
	      // TODO: OVERLOADED BY INDIVIDUAL ELEMENTS
	    };
	    
	    this.backgroundColor = function ( p ){
	      if ( !arguments.length ) return backgroundColor;
	      backgroundColor = p;
	      return this;
	    };
	    
	    this.baseIri = function ( p ){
	      if ( !arguments.length ) return baseIri;
	      baseIri = p;
	      return this;
	    };
	    
	    this.comment = function ( p ){
	      if ( !arguments.length ) return comment;
	      comment = p;
	      return this;
	    };
	    
	    this.description = function ( p ){
	      if ( !arguments.length ) return description;
	      description = p;
	      return this;
	    };
	    
	    this.equivalents = function ( p ){
	      if ( !arguments.length ) return equivalents;
	      equivalents = p || [];
	      return this;
	    };
	    
	    this.equivalentBase = function ( p ){
	      if ( !arguments.length ) return equivalentBase;
	      equivalentBase = p;
	      return this;
	    };
	    
	    this.focused = function ( p ){
	      if ( !arguments.length ) return focused;
	      focused = p;
	      return this;
	    };
	    
	    this.id = function ( p ){
	      if ( !arguments.length ) return id;
	      id = p;
	      return this;
	    };
	    
	    this.indications = function ( p ){
	      if ( !arguments.length ) return indications;
	      indications = p;
	      return this;
	    };
	    
	    this.iri = function ( p ){
	      if ( !arguments.length ) return iri;
	      iri = p;
	      return this;
	    };
	    
	    this.label = function ( p ){
	      if ( !arguments.length ) return label;
	      label = p;
	      return this;
	    };
	    
	    this.mouseEntered = function ( p ){
	      if ( !arguments.length ) return mouseEntered;
	      mouseEntered = p;
	      return this;
	    };
	    
	    this.styleClass = function ( p ){
	      if ( !arguments.length ) return styleClass;
	      styleClass = p;
	      return this;
	    };
	    
	    this.type = function ( p ){
	      if ( !arguments.length ) return type;
	      type = p;
	      return this;
	    };
	    
	    this.visible = function ( p ){
	      if ( !arguments.length ) return visible;
	      visible = p;
	      return this;
	    };
	    
	    this.visualAttributes = function ( p ){
	      if ( !arguments.length ) return visualAttributes;
	      visualAttributes = p;
	      return this;
	    };
	    
	    
	    this.commentForCurrentLanguage = function (){
	      return languageTools.textInLanguage(this.comment(), graph.language());
	    };
	    
	    /**
	     * @returns {string} the css class of this node..
	     */
	    this.cssClassOfNode = function (){
	      return "node" + this.id();
	    };
	    
	    this.descriptionForCurrentLanguage = function (){
	      return languageTools.textInLanguage(this.description(), graph.language());
	    };
	    
	    this.defaultLabel = function (){
	      return languageTools.textInLanguage(this.label(), "default");
	    };
	    
	    this.indicationString = function (){
	      return this.indications().join(", ");
	    };
	    
	    this.labelForCurrentLanguage = function (){
	      var preferredLanguage = graph && graph.language ? graph.language() : null;
	      return languageTools.textInLanguage(this.label(), preferredLanguage);
	    };
	  };
	  
	  Base.prototype.constructor = Base;
	  
	  Base.prototype.equals = function ( other ){
	    return other instanceof Base && this.id() === other.id();
	  };
	  
	  Base.prototype.toString = function (){
	    return this.labelForCurrentLanguage() + " (" + this.type() + ")";
	  };
	  
	  
	  return Base;
	}());


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(12)();

	/**
	 * Encapsulates methods which return a label in a specific language for a preferred language.
	 */
	module.exports = (function (){
	  
	  var languageTools = {};
	  
	  
	  languageTools.textInLanguage = function ( textObject, preferredLanguage ){
	    if ( typeof textObject === "undefined" ) {
	      return undefined;
	    }
	    
	    if ( typeof textObject === "string" ) {
	      return textObject;
	    }
	    
	    if ( preferredLanguage && textObject.hasOwnProperty(preferredLanguage) ) {
	      return textObject[preferredLanguage];
	    }
	    
	    var textForLanguage = searchLanguage(textObject, "en");
	    if ( textForLanguage ) {
	      return textForLanguage;
	    }
	    textForLanguage = searchLanguage(textObject, constants.LANG_UNDEFINED);
	    if ( textForLanguage ) {
	      return textForLanguage;
	    }
	    
	    return textObject[constants.LANG_IRIBASED];
	  };
	  
	  
	  function searchLanguage( textObject, preferredLanguage ){
	    for ( var language in textObject ) {
	      if ( language === preferredLanguage && textObject.hasOwnProperty(language) ) {
	        return textObject[language];
	      }
	    }
	  }
	  
	  return function (){
	    /* Use a function here to keep a consistent style like webvowl.path.to.module()
	     * despite having just a single languageTools object. */
	    return languageTools;
	  };
	})();


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = (function (){
	  
	  var constants = {};
	  
	  constants.LANG_IRIBASED = "IRI-based";
	  constants.LANG_UNDEFINED = "undefined";
	  
	  return function (){
	    /* Use a function here to keep a consistent style like webvowl.path.to.module()
	     * despite having just a single object. */
	    return constants;
	  };
	})();


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/**
	 * The functions for controlling attributes of nodes of the force layout can't be modelled to the element hierarchy,
	 * which is used for inheriting visual and OWL-like attributes.
	 *
	 * To reduce code redundancy the common functions for controlling the force layout node attributes are excluded into this
	 * module, which can add them to the node objects.
	 *
	 * @type {{}}
	 */
	var nodeFunctions = {};
	module.exports = function (){
	  return nodeFunctions;
	};


	nodeFunctions.addTo = function ( node ){
	  addFixedLocationFunctions(node);
	};

	function addFixedLocationFunctions( node ){
	  var locked = false,
	    frozen = false,
	    halo = false,
	    pinned = false;
	  
	  node.locked = function ( p ){
	    if ( !arguments.length ) {
	      return locked;
	    }
	    locked = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  node.frozen = function ( p ){
	    if ( !arguments.length ) {
	      return frozen;
	    }
	    frozen = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  node.halo = function ( p ){
	    if ( !arguments.length ) {
	      return halo;
	    }
	    halo = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  node.pinned = function ( p ){
	    if ( !arguments.length ) {
	      return pinned;
	    }
	    pinned = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  function applyFixedLocationAttributes(){
	    if ( node.locked() || node.frozen() || node.pinned() ) {
	      node.fixed = true;
	    } else {
	      node.fixed = false;
	    }
	  }
	}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var textTools = __webpack_require__(15)();
	var AbstractTextElement = __webpack_require__(16);

	module.exports = CenteringTextElement;
	function CenteringTextElement( container, backgroundColor ){
	  AbstractTextElement.apply(this, arguments);
	  this.storedFullTextLines = [];
	  this.storedSpanArrays = [];
	  this.storedStyle = [];
	  
	}

	CenteringTextElement.prototype = Object.create(AbstractTextElement.prototype);
	CenteringTextElement.prototype.constructor = CenteringTextElement;

	CenteringTextElement.prototype.addText = function ( text, prefix, suffix ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default, prefix, suffix);
	  }
	};

	CenteringTextElement.prototype.addSubText = function ( text ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.subtext, "(", ")");
	  }
	};

	CenteringTextElement.prototype.addEquivalents = function ( text ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default);
	  }
	};

	CenteringTextElement.prototype.addInstanceCount = function ( instanceCount ){
	  if ( instanceCount ) {
	    this.addTextline(instanceCount.toString(), this.CSS_CLASSES.instanceCount);
	  }
	};
	CenteringTextElement.prototype.saveCorrespondingSpan = function ( correspondingSpan ){
	  this.storedSpanArrays.push(correspondingSpan);
	};
	CenteringTextElement.prototype.saveFullTextLine = function ( fullText ){
	  this.storedFullTextLines.push(fullText);
	};
	CenteringTextElement.prototype.saveStyle = function ( style ){
	  this.storedStyle.push(style);
	};

	CenteringTextElement.prototype.updateAllTextElements = function (){
	  // TODO : TEST THIS postPrefix >>>  _applyPreAndPostFix
	  for ( var i = 0; i < this.storedSpanArrays.length; i++ ) {
	    var truncatedText = textTools.truncate(this.storedFullTextLines[i], this._textBlock().datum().textWidth(), this.storedStyle[i]);
	    this.storedSpanArrays[i].text(truncatedText);
	  }
	};


	CenteringTextElement.prototype.addTextline = function ( text, style, prefix, postfix ){
	  var truncatedText = textTools.truncate(text, this._textBlock().datum().textWidth(), style);
	  this.saveFullTextLine(text);
	  this.saveStyle(style);
	  var tspan = this._textBlock().append("tspan")
	    .classed(this.CSS_CLASSES.default, true)
	    .classed(style, true)
	    .text(this._applyPreAndPostFix(truncatedText, prefix, postfix))
	    .attr("x", 0);
	  this._repositionTextLine(tspan);
	  this.saveCorrespondingSpan(tspan);
	  
	  this._repositionTextBlock();
	};

	CenteringTextElement.prototype._repositionTextLine = function ( tspan ){
	  var fontSizeProperty = window.getComputedStyle(tspan.node()).getPropertyValue("font-size");
	  var fontSize = parseFloat(fontSizeProperty);
	  
	  var siblingCount = this._lineCount() - 1;
	  var lineDistance = siblingCount > 0 ? this.LINE_DISTANCE : 0;
	  
	  tspan.attr("dy", fontSize + lineDistance + "px");
	};

	CenteringTextElement.prototype.getTextBox = function (){
	  return this._textBlock();
	};


	CenteringTextElement.prototype._repositionTextBlock = function (){
	  // Nothing to do if no child elements exist
	  var lineCount = this._lineCount();
	  if ( lineCount < 1 ) {
	    this._textBlock().attr("y", 0);
	    return;
	  }
	  
	  var textBlockHeight = this._textBlock().node().getBBox().height;
	  this._textBlock().attr("y", -textBlockHeight * 0.5 + "px");
	};

	CenteringTextElement.prototype._lineCount = function (){
	  return this._textBlock().property("childElementCount");
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var ADDITIONAL_TEXT_SPACE = 4;

	var tools = {};

	function measureTextWidth( text, textStyle ){
	  // Set a default value
	  if ( !textStyle ) {
	    textStyle = "text";
	  }
	  var d = d3.select("body")
	      .append("div")
	      .attr("class", textStyle)
	      .attr("id", "width-test") // tag this element to identify it
	      .attr("style", "position:absolute; float:left; white-space:nowrap; visibility:hidden;")
	      .text(text),
	    w = document.getElementById("width-test").offsetWidth;
	  d.remove();
	  return w;
	}

	tools.truncate = function ( text, maxWidth, textStyle, additionalTextSpace ){
	  maxWidth -= isNaN(additionalTextSpace) ? ADDITIONAL_TEXT_SPACE : additionalTextSpace;
	  if ( isNaN(maxWidth) || maxWidth <= 0 ) {
	    return text;
	  }
	  
	  var truncatedText = text,
	    newTruncatedTextLength,
	    textWidth,
	    ratio;
	  
	  while ( true ) {
	    textWidth = measureTextWidth(truncatedText, textStyle);
	    if ( textWidth <= maxWidth ) {
	      break;
	    }
	    
	    ratio = textWidth / maxWidth;
	    newTruncatedTextLength = Math.floor(truncatedText.length / ratio);
	    
	    // detect if nothing changes
	    if ( truncatedText.length === newTruncatedTextLength ) {
	      break;
	    }
	    
	    truncatedText = truncatedText.substring(0, newTruncatedTextLength);
	  }
	  
	  if ( text.length > truncatedText.length ) {
	    return text.substring(0, truncatedText.length - 3) + "...";
	  }
	  return text;
	};


	module.exports = function (){
	  return tools;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = AbstractTextElement;

	function AbstractTextElement( container, backgroundColor ){
	  var textBlock = container.append("text")
	    .classed("text", true)
	    .style("fill", this._getTextColor(backgroundColor))
	    .attr("text-anchor", "middle");
	  
	  this._textBlock = function (){
	    return textBlock;
	  };
	}

	AbstractTextElement.prototype.LINE_DISTANCE = 1;
	AbstractTextElement.prototype.CSS_CLASSES = {
	  default: "text",
	  subtext: "subtext",
	  instanceCount: "instance-count"
	};
	AbstractTextElement.prototype.DARK_TEXT_COLOR = "#000";
	AbstractTextElement.prototype.LIGHT_TEXT_COLOR = "#fff";

	AbstractTextElement.prototype.translation = function ( x, y ){
	  this._textBlock().attr("transform", "translate(" + x + ", " + y + ")");
	  return this;
	};

	AbstractTextElement.prototype.remove = function (){
	  this._textBlock().remove();
	  return this;
	};

	AbstractTextElement.prototype._applyPreAndPostFix = function ( text, prefix, postfix ){
	  if ( prefix ) {
	    text = prefix + text;
	  }
	  if ( postfix ) {
	    text += postfix;
	  }
	  return text;
	};

	AbstractTextElement.prototype._getTextColor = function ( rawBackgroundColor ){
	  if ( !rawBackgroundColor ) {
	    return AbstractTextElement.prototype.DARK_TEXT_COLOR;
	  }
	  
	  var backgroundColor = d3.rgb(rawBackgroundColor);
	  if ( calculateLuminance(backgroundColor) > 0.5 ) {
	    return AbstractTextElement.prototype.DARK_TEXT_COLOR;
	  } else {
	    return AbstractTextElement.prototype.LIGHT_TEXT_COLOR;
	  }
	};

	function calculateLuminance( color ){
	  return 0.3 * (color.r / 255) + 0.59 * (color.g / 255) + 0.11 * (color.b / 255);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains reusable function for drawing nodes.
	 */
	module.exports = (function (){
	  
	  var tools = {};
	  
	  /**
	   * Append a circular class node with the passed attributes.
	   * @param parent the parent element to which the circle will be appended
	   * @param radius
	   * @param [cssClasses] an array of additional css classes
	   * @param [tooltip]
	   * @param [backgroundColor]
	   * @returns {*}
	   */
	  tools.appendCircularClass = function ( parent, radius, cssClasses, tooltip, backgroundColor ){
	    var circle = parent.append("circle")
	      .classed("class", true)
	      .attr("r", radius);
	    
	    addCssClasses(circle, cssClasses);
	    addToolTip(circle, tooltip);
	    addBackgroundColor(circle, backgroundColor);
	    
	    return circle;
	  };
	  
	  function addCssClasses( element, cssClasses ){
	    if ( cssClasses instanceof Array ) {
	      cssClasses.forEach(function ( cssClass ){
	        element.classed(cssClass, true);
	      });
	    }
	  }
	  
	  function addToolTip( element, tooltip ){
	    if ( tooltip ) {
	      element.append("title").text(tooltip);
	    }
	  }
	  
	  function addBackgroundColor( element, backgroundColor ){
	    if ( backgroundColor ) {
	      element.style("fill", backgroundColor);
	    }
	  }
	  
	  /**
	   * Appends a rectangular class node with the passed attributes.
	   * @param parent the parent element to which the rectangle will be appended
	   * @param width
	   * @param height
	   * @param [cssClasses] an array of additional css classes
	   * @param [tooltip]
	   * @param [backgroundColor]
	   * @returns {*}
	   */
	  tools.appendRectangularClass = function ( parent, width, height, cssClasses, tooltip, backgroundColor ){
	    var rectangle = parent.append("rect")
	      .classed("class", true)
	      .attr("x", -width / 2)
	      .attr("y", -height / 2)
	      .attr("width", width)
	      .attr("height", height);
	    
	    addCssClasses(rectangle, cssClasses);
	    addToolTip(rectangle, tooltip);
	    addBackgroundColor(rectangle, backgroundColor);
	    
	    return rectangle;
	  };
	  
	  tools.drawPin = function ( container, dx, dy, onClick, accuraciesHelperFunction, useAccuracyHelper ){
	    var pinGroupElement = container
	      .append("g")
	      .classed("hidden-in-export", true)
	      .attr("transform", "translate(" + dx + "," + dy + ")");
	    
	    var base = pinGroupElement.append("circle")
	      .classed("class pin feature", true)
	      .attr("r", 12)
	      .on("click", function (){
	        if ( onClick ) {
	          onClick();
	        }
	        d3.event.stopPropagation();
	      });
	    
	    pinGroupElement.append("line")
	      .attr("x1", 0)
	      .attr("x2", 0)
	      .attr("y1", 12)
	      .attr("y2", 16);
	    
	    if ( useAccuracyHelper === true ) {
	      pinGroupElement.append("circle")
	        .attr("r", 15)
	        .attr("cx", -7)
	        .attr("cy", -7)
	        .classed("superHiddenElement ", true)
	        .classed("superOpacityElement", !accuraciesHelperFunction())
	        .on("click", function (){
	          if ( onClick ) {
	            onClick();
	          }
	          d3.event.stopPropagation();
	        })
	        .on("mouseover", function (){
	          base.classed("feature_hover", true);
	        })
	        .on("mouseout", function (){
	          base.classed("feature_hover", false);
	        })
	      ;
	      
	    }
	    
	    
	    return pinGroupElement;
	  };
	  
	  tools.drawRectHalo = function ( node, width, height, offset ){
	    var container;
	    if ( node.nodeElement )
	      container = node.nodeElement();
	    else
	      container = node.labelElement();
	    
	    if ( !container ) {
	      // console.log("no container found");
	      return;
	    }
	    
	    var haloGroupElement = container
	      .append("g")
	      .classed("hidden-in-export", true);
	    
	    haloGroupElement.append("rect")
	      .classed("searchResultA", true)
	      .attr("x", (-width - offset) / 2)
	      .attr("y", (-offset - height) / 2)
	      .attr("width", width + offset)
	      .attr("height", height + offset);
	    haloGroupElement.attr("animationRunning", true);
	    
	    haloGroupElement.node().addEventListener("webkitAnimationEnd", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    haloGroupElement.node().addEventListener("animationend", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    
	    
	    return haloGroupElement;
	    
	  };
	  tools.drawHalo = function ( container, radius ){
	    if ( container === undefined ) {
	      return null;
	      // there is no element to add the halo to;
	      // this means the node was not rendered previously
	    }
	    
	    var haloGroupElement = container
	      .append("g")
	      .classed("hidden-in-export", true);
	    
	    
	    haloGroupElement.append("circle", ":first-child")
	      .classed("searchResultA", true)
	      .attr("r", radius + 15);
	    haloGroupElement.attr("animationRunning", true);
	    
	    
	    haloGroupElement.node().addEventListener("webkitAnimationEnd", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true)
	        .attr("animationRunning", false);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    haloGroupElement.node().addEventListener("animationend", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true)
	        .attr("animationRunning", false);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    
	    return haloGroupElement;
	  };
	  
	  return function (){
	    // Encapsulate into function to maintain default.module.path()
	    return tools;
	  };
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.type("owl:Class");
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw;
	    
	    this.styleClass("complementof")
	      .type("owl:complementOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      symbol.append("circle")
	        .attr("class", "symbol")
	        .classed("fineline", true)
	        .attr("r", 10);
	      symbol.append("path")
	        .attr("class", "nofill")
	        .attr("d", "m -7,-1.5 12,0 0,6")
	        .attr("transform", "scale(.5)");
	      
	      symbol.attr("transform",
	        "translate(-" + (that.radius() - 15) / 100 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var AbsoluteTextElement = __webpack_require__(21);
	var BoxArrowLink = __webpack_require__(22);
	var RoundNode = __webpack_require__(8);
	var drawTools = __webpack_require__(17)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var that = this,
	      superHoverHighlightingFunction = that.setHoverHighlighting,
	      superPostDrawActions = that.postDrawActions;
	    
	    this.setHoverHighlighting = function ( enable ){
	      superHoverHighlightingFunction(enable);
	      
	      // Highlight links pointing to included nodes when hovering the set operator
	      that.links()
	        .filter(function ( link ){
	          return link instanceof BoxArrowLink;
	        })
	        .filter(function ( link ){
	          return link.domain().equals(that);
	        })
	        .forEach(function ( link ){
	          link.property().setHighlighting(enable);
	        });
	    };
	    
	    this.draw = function ( element ){
	      that.nodeElement(element);
	      
	      drawTools.appendCircularClass(element, that.actualRadius(),
	        that.collectCssClasses().join(" "),
	        that.labelForCurrentLanguage(), that.backgroundColor());
	    };
	    
	    this.postDrawActions = function (){
	      superPostDrawActions();
	      that.textBlock().remove();
	      
	      var textElement = new AbsoluteTextElement(that.nodeElement(), that.backgroundColor());
	      
	      var equivalentsString = that.equivalentsString();
	      var offsetForFollowingEquivalents = equivalentsString ? -30 : -17;
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      textElement.addText(that.labelForCurrentLanguage(), offsetForFollowingEquivalents, "",
	        suffixForFollowingEquivalents);
	      
	      textElement.addEquivalents(equivalentsString, -17);
	      
	      
	      if ( !graph.options().compactNotation() ) {
	        
	        if ( that.indicationString().length > 0 ) {
	          textElement.addSubText(that.indicationString(), 17);
	          textElement.addInstanceCount(that.individuals().length, 30);
	        } else {
	          textElement.addInstanceCount(that.individuals().length, 17);
	        }
	      } else {
	        textElement.addInstanceCount(that.individuals().length, 17);
	      }
	      
	      that.textBlock(textElement);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var textTools = __webpack_require__(15)();
	var AbstractTextElement = __webpack_require__(16);

	module.exports = AbsoluteTextElement;
	function AbsoluteTextElement( container, backgroundColor ){
	  AbstractTextElement.apply(this, arguments);
	}

	AbsoluteTextElement.prototype = Object.create(AbstractTextElement.prototype);
	AbsoluteTextElement.prototype.constructor = AbsoluteTextElement;

	AbsoluteTextElement.prototype.addText = function ( text, yShift, prefix, suffix ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default, yShift, prefix, suffix);
	  }
	};

	AbsoluteTextElement.prototype.addSubText = function ( text, yShift ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.subtext, yShift, "(", ")");
	  }
	};

	AbsoluteTextElement.prototype.addEquivalents = function ( text, yShift ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default, yShift);
	  }
	};

	AbsoluteTextElement.prototype.addInstanceCount = function ( instanceCount, yShift ){
	  if ( instanceCount ) {
	    this.addTextline(instanceCount.toString(), this.CSS_CLASSES.instanceCount, yShift);
	  }
	};


	AbsoluteTextElement.prototype.addTextline = function ( text, style, yShift, prefix, postfix ){
	  var truncatedText = textTools.truncate(text, this._textBlock().datum().textWidth(yShift), style);
	  
	  var tspan = this._textBlock().append("tspan")
	    .classed(this.CSS_CLASSES.default, true)
	    .classed(style, true)
	    .text(this._applyPreAndPostFix(truncatedText, prefix, postfix))
	    .attr("x", 0);
	  this._repositionTextLine(tspan, yShift);
	};

	AbsoluteTextElement.prototype._repositionTextLine = function ( tspan, yShift ){
	  var fontSizeProperty = window.getComputedStyle(tspan.node()).getPropertyValue("font-size");
	  var fontSize = parseFloat(fontSizeProperty);
	  
	  /* BBox height is not supported in Firefox for tspans and dominant-baseline doesn't work in some SVG editors */
	  var approximatedShiftForVerticalCentering = (1 / 3) * fontSize;
	  
	  tspan.attr("y", approximatedShiftForVerticalCentering + (yShift || 0) + "px");
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var PlainLink = __webpack_require__(23);


	module.exports = BoxArrowLink;

	function BoxArrowLink( domain, range, property ){
	  PlainLink.apply(this, arguments);
	}

	BoxArrowLink.prototype = Object.create(PlainLink.prototype);
	BoxArrowLink.prototype.constructor = BoxArrowLink;


	BoxArrowLink.prototype.draw = function ( linkGroup, markerContainer ){
	  var property = this.label().property();
	  var inverse = this.label().inverse();
	  
	  createPropertyMarker(markerContainer, property);
	  if ( inverse ) {
	    createInverseMarker(markerContainer, inverse);
	  }
	  
	  PlainLink.prototype.draw.apply(this, arguments);
	  
	  // attach the markers to the link
	  linkGroup.attr("marker-start", "url(#" + property.markerId() + ")");
	  if ( inverse ) {
	    linkGroup.attr("marker-end", "url(#" + inverse.markerId() + ")");
	  }
	};


	function createPropertyMarker( markerContainer, inverse ){
	  var inverseMarker = appendBasicMarker(markerContainer, inverse);
	  inverseMarker.attr("refX", -8);
	  inverseMarker.append("path")
	    .attr("d", "M0,-8L8,0L0,8L-8,0L0,-8L8,0")
	    .classed(inverse.markerType(), true);
	  
	  inverse.markerElement(inverseMarker);
	}

	function createInverseMarker( markerContainer, property ){
	  var marker = appendBasicMarker(markerContainer, property);
	  marker.attr("refX", 8);
	  marker.append("path")
	    .attr("d", "M0,-8L8,0L0,8L-8,0L0,-8L8,0")
	    .classed(property.markerType(), true);
	  
	  property.markerElement(marker);
	}

	function appendBasicMarker( markerContainer, property ){
	  return markerContainer.append("marker")
	    .datum(property)
	    .attr("id", property.markerId())
	    .attr("viewBox", "-10 -10 20 20")
	    .attr("markerWidth", 20)
	    .attr("markerHeight", 20)
	    .attr("markerUnits", "userSpaceOnUse")
	    .attr("orient", "auto");
	}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var Label = __webpack_require__(24);


	module.exports = PlainLink;

	/**
	 * A link connects at least two VOWL nodes.
	 * The properties connecting the VOWL nodes are stored separately into the label.
	 * @param domain
	 * @param range
	 * @param property
	 */
	function PlainLink( domain, range, property ){
	  var layers,
	    layerIndex,
	    loops,
	    loopIndex,
	    pathEl,
	    label = new Label(property, this);
	  
	  var backPart = __webpack_require__(25)(domain, label, this),
	    frontPart = __webpack_require__(25)(label, range, this);
	  
	  
	  this.layers = function ( p ){
	    if ( !arguments.length ) return layers;
	    layers = p;
	    return this;
	  };
	  
	  this.layerIndex = function ( p ){
	    if ( !arguments.length ) return layerIndex;
	    layerIndex = p;
	    return this;
	  };
	  
	  this.loops = function ( p ){
	    if ( !arguments.length ) return loops;
	    loops = p;
	    return this;
	  };
	  
	  this.loopIndex = function ( p ){
	    if ( !arguments.length ) return loopIndex;
	    loopIndex = p;
	    return this;
	  };
	  
	  
	  this.domain = function (){
	    return domain;
	  };
	  
	  this.label = function (){
	    return label;
	  };
	  
	  this.linkParts = function (){
	    return [frontPart, backPart];
	  };
	  
	  this.range = function (){
	    return range;
	  };
	  this.pathObj = function ( pE ){
	    if ( !arguments.length ) {
	      return pathEl;
	    }
	    pathEl = pE;
	  };
	}


	PlainLink.prototype.draw = function ( linkGroup ){
	  var property = this.label().property();
	  var inverse = this.label().inverse();
	  
	  property.linkGroup(linkGroup);
	  if ( inverse ) {
	    inverse.linkGroup(linkGroup);
	  }
	  
	  var pathElement = linkGroup.append("path");
	  pathElement.classed("link-path", true)
	    .classed(this.domain().cssClassOfNode(), true)
	    .classed(this.range().cssClassOfNode(), true)
	    .classed(property.linkType(), true);
	  this.pathObj(pathElement);
	  
	};


	PlainLink.prototype.inverse = function (){
	  return this.label().inverse();
	};

	PlainLink.prototype.isLoop = function (){
	  return this.domain().equals(this.range());
	};

	PlainLink.prototype.property = function (){
	  return this.label().property();
	};



/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = Label;

	/**
	 * A label represents the element(s) which further describe a link.
	 * It encapsulates the property and its inverse property.
	 * @param property the property; the inverse is inferred
	 * @param link the link this label belongs to
	 */
	function Label( property, link ){
	  this.link = function (){
	    return link;
	  };
	  
	  this.property = function (){
	    return property;
	  };
	  
	  // "Forward" the fixed value set on the property to avoid having to access this container
	  Object.defineProperty(this, "fixed", {
	    get: function (){
	      var inverseFixed = property.inverse() ? property.inverse().fixed : false;
	      return property.fixed || inverseFixed;
	    },
	    set: function ( v ){
	      property.fixed = v;
	      if ( property.inverse() ) property.inverse().fixed = v;
	    }
	  });
	  this.frozen = property.frozen;
	  this.locked = property.locked;
	  this.pinned = property.pinned;
	}

	Label.prototype.actualRadius = function (){
	  return this.property().actualRadius();
	};

	Label.prototype.draw = function ( container ){
	  return this.property().draw(container);
	};

	Label.prototype.inverse = function (){
	  return this.property().inverse();
	};

	Label.prototype.equals = function ( other ){
	  if ( !other ) {
	    return false;
	  }
	  
	  var instance = other instanceof Label;
	  var equalProperty = this.property().equals(other.property());
	  
	  var equalInverse = false;
	  if ( this.inverse() ) {
	    equalInverse = this.inverse().equals(other.inverse());
	  } else if ( !other.inverse() ) {
	    equalInverse = true;
	  }
	  
	  return instance && equalProperty && equalInverse;
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/**
	 * A linkPart connects two force layout nodes.
	 * It reprents a link which can be used in d3's force layout.
	 * @param _domain
	 * @param _range
	 * @param _link
	 */
	module.exports = function ( _domain, _range, _link ){
	  var linkPart = {},
	    domain = _domain,
	    link = _link,
	    range = _range;
	  
	  // Define d3 properties
	  Object.defineProperties(linkPart, {
	    "source": { value: domain, writable: true },
	    "target": { value: range, writable: true }
	  });
	  
	  
	  linkPart.domain = function (){
	    return domain;
	  };
	  
	  linkPart.link = function (){
	    return link;
	  };
	  
	  linkPart.range = function (){
	    return range;
	  };
	  
	  
	  return linkPart;
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.attributes(["deprecated"])
	      .type("owl:DeprecatedClass")
	      .styleClass("deprecated")
	      .indications(["deprecated"]);
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw;
	    
	    this.styleClass("disjointunionof")
	      .type("owl:disjointUnionOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      var symbolRadius = 10;
	      symbol.append("circle")
	        .attr("class", "symbol")
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("cx", 10)
	        .attr("class", "symbol")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("text")
	        .attr("class", "link")
	        .text("1")
	        .attr("transform", "scale(.7)translate(3,5)");
	      
	      symbol.attr("transform", "translate(-" + (that.radius() - 15) / 7 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);
	var drawTools = __webpack_require__(17)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var CIRCLE_SIZE_DIFFERENCE = 4;
	    var renderingElement;
	    var that = this,
	      superActualRadiusFunction = that.actualRadius;
	    
	    this.styleClass("equivalentclass")
	      .type("owl:equivalentClass");
	    
	    this.actualRadius = function (){
	      return superActualRadiusFunction() + CIRCLE_SIZE_DIFFERENCE;
	    };
	    
	    this.redrawElement = function (){
	      renderingElement.remove();
	      that.textBlock().remove();
	      var bgColor = that.backgroundColor();
	      
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      var cssClasses = that.collectCssClasses();
	      renderingElement = that.nodeElement().append("g");
	      
	      if ( that.getRectangularRepresentation() === true ) {
	        drawTools.appendRectangularClass(renderingElement, 84, 84, ["white", "embedded"]);
	        drawTools.appendRectangularClass(renderingElement, 80 - CIRCLE_SIZE_DIFFERENCE, 80 - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        drawTools.appendCircularClass(renderingElement, that.actualRadius(), ["white", "embedded"]);
	        console.log(cssClasses);
	        console.log(that.attributes());
	        console.log("what is bgColor" + bgColor);
	        drawTools.appendCircularClass(renderingElement, that.actualRadius() - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	        
	      }
	      that.postDrawActions(that.nodeElement());
	      
	    };
	    this.draw = function ( parentElement ){
	      var cssClasses = that.collectCssClasses();
	      
	      that.nodeElement(parentElement);
	      renderingElement = parentElement.append("g");
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      // draw the outer circle at first and afterwards the inner circle
	      if ( that.getRectangularRepresentation() === true ) {
	        drawTools.appendRectangularClass(renderingElement, 84, 84, ["white", "embedded"]);
	        drawTools.appendRectangularClass(renderingElement, 80 - CIRCLE_SIZE_DIFFERENCE, 80 - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        drawTools.appendCircularClass(renderingElement, that.actualRadius(), ["white", "embedded"]);
	        drawTools.appendCircularClass(renderingElement, that.actualRadius() - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	        
	      }
	      
	      that.postDrawActions();
	    };
	    
	    /**
	     * Sets the hover highlighting of this node.
	     * @param enable
	     */
	    that.setHoverHighlighting = function ( enable ){
	      that.nodeElement().selectAll("circle:last-of-type").classed("hovered", enable);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw,
	      INTERSECTION_BACKGROUND_PATH = createIntersectionPath();
	    
	    this.styleClass("intersectionof")
	      .type("owl:intersectionOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      var symbolRadius = 10;
	      symbol.append("path")
	        .attr("class", "nostroke")
	        .classed("symbol", true)
	        .attr("d", INTERSECTION_BACKGROUND_PATH);
	      symbol.append("circle")
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("cx", 10)
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("path")
	        .attr("class", "nofill")
	        .attr("d", "m 9,5 c 0,-2 0,-4 0,-6 0,0 0,0 0,0 0,0 0,-1.8 -1,-2.3 -0.7,-0.6 -1.7,-0.8 -2.9," +
	          "-0.8 -1.2,0 -2,0 -3,0.8 -0.7,0.5 -1,1.4 -1,2.3 0,2 0,4 0,6")
	        .attr("transform", "scale(.5)translate(5,0)");
	      
	      symbol.attr("transform",
	        "translate(-" + (that.radius() - 15) / 7 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	    
	    function createIntersectionPath(){
	      var height = 18;
	      
	      var offsetX = 5;
	      var offsetY = -(height / 2);
	      
	      var bezierX = 7;
	      var bezierY = 5;
	      var bottomBezierY = height - bezierY;
	      
	      var startPosition = "M" + offsetX + "," + offsetY;
	      var rightSide = "c" + bezierX + "," + bezierY + " " + bezierX + "," + bottomBezierY + " 0," + height;
	      var leftSide = "c" + -bezierX + "," + -bezierY + " " + -bezierX + "," + -bottomBezierY + " 0," + -height;
	      
	      return startPosition + rightSide + leftSide;
	    }
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var OwlThing = __webpack_require__(31);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    OwlThing.apply(this, arguments);
	    
	    this.label("Nothing")
	      .type("owl:Nothing")
	      .iri("http://www.w3.org/2002/07/owl#Nothing");
	  };
	  o.prototype = Object.create(OwlThing.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var superDrawFunction = this.draw;
	    
	    this.label("Thing")
	      .type("owl:Thing")
	      .iri("http://www.w3.org/2002/07/owl#Thing")
	      .radius(30);
	    
	    this.draw = function ( element ){
	      superDrawFunction(element, ["white", "dashed"]);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw;
	    
	    this.styleClass("unionof")
	      .type("owl:unionOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      var symbolRadius = 10;
	      symbol.append("circle")
	        .attr("class", "symbol")
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("cx", 10)
	        .attr("class", "symbol")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("path")
	        .attr("class", "link")
	        .attr("d", "m 1,-3 c 0,2 0,4 0,6 0,0 0,0 0,0 0,2 2,3 4,3 2,0 4,-1 4,-3 0,-2 0,-4 0,-6")
	        .attr("transform", "scale(.5)translate(5,0)");
	      
	      symbol.attr("transform", "translate(-" + (that.radius() - 15) / 7 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.attributes(["rdf"])
	      .type("rdfs:Class");
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var DatatypeNode = __webpack_require__(35);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    DatatypeNode.apply(this, arguments);
	    var dTypeString = "undefined";
	    this.attributes(["datatype"])
	      .type("rdfs:Datatype")
	      .styleClass("datatype");
	    this.dType = function ( val ){
	      if ( !arguments.length ) return dTypeString;
	      dTypeString = val;
	      
	    };
	  };
	  o.prototype = Object.create(DatatypeNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var RectangularNode = __webpack_require__(36);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RectangularNode.apply(this, arguments);
	  };
	  o.prototype = Object.create(RectangularNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var BaseNode = __webpack_require__(9);
	var CenteringTextElement = __webpack_require__(14);
	var drawTools = __webpack_require__(17)();
	var rectangularElementTools = __webpack_require__(37)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseNode.apply(this, arguments);
	    
	    var that = this,
	      height = 20,
	      width = 60,
	      pinGroupElement,
	      haloGroupElement,
	      labelWidth = 80,
	      myWidth = 80,
	      defaultWidth = 80,
	      shapeElement,
	      textBlock,
	      smallestRadius = height / 2;
	    
	    that.renderType("rect");
	    // Properties
	    this.height = function ( p ){
	      if ( !arguments.length ) return height;
	      height = p;
	      return this;
	    };
	    
	    this.width = function ( p ){
	      if ( !arguments.length ) return width;
	      width = p;
	      return this;
	    };
	    
	    this.getHalos = function (){
	      return haloGroupElement;
	    };
	    
	    // Functions
	    // for compatibility reasons // TODO resolve
	    this.actualRadius = function (){
	      return smallestRadius;
	    };
	    
	    this.distanceToBorder = function ( dx, dy ){
	      return rectangularElementTools.distanceToBorder(that, dx, dy);
	    };
	    
	    this.setHoverHighlighting = function ( enable ){
	      that.nodeElement().selectAll("rect").classed("hovered", enable);
	      
	      var haloGroup = that.getHalos();
	      if ( haloGroup ) {
	        var test = haloGroup.selectAll(".searchResultA");
	        test.classed("searchResultA", false);
	        test.classed("searchResultB", true);
	      }
	      
	    };
	    
	    
	    // overwrite the labelWith;
	    
	    
	    this.textWidth = function (){
	      return labelWidth;
	    };
	    this.width = function (){
	      return labelWidth;
	    };
	    
	    this.getMyWidth = function (){
	      // use a simple heuristic
	      var text = that.labelForCurrentLanguage();
	      myWidth = measureTextWidth(text, "text") + 20;
	      
	      // check for sub names;
	      var indicatorText = that.indicationString();
	      var indicatorWidth = measureTextWidth(indicatorText, "subtext") + 20;
	      if ( indicatorWidth > myWidth )
	        myWidth = indicatorWidth;
	      
	      return myWidth;
	    };
	    
	    this.textWidth = function (){
	      return that.width();
	    };
	    function measureTextWidth( text, textStyle ){
	      // Set a default value
	      if ( !textStyle ) {
	        textStyle = "text";
	      }
	      var d = d3.select("body")
	          .append("div")
	          .attr("class", textStyle)
	          .attr("id", "width-test") // tag this element to identify it
	          .attr("style", "position:absolute; float:left; white-space:nowrap; visibility:hidden;")
	          .text(text),
	        w = document.getElementById("width-test").offsetWidth;
	      d.remove();
	      return w;
	    }
	    
	    this.toggleFocus = function (){
	      that.focused(!that.focused());
	      that.nodeElement().select("rect").classed("focused", that.focused());
	      graph.resetSearchHighlight();
	      graph.options().searchMenu().clearText();
	    };
	    
	    /**
	     * Draws the rectangular node.
	     * @param parentElement the element to which this node will be appended
	     * @param [additionalCssClasses] additional css classes
	     */
	    this.draw = function ( parentElement, additionalCssClasses ){
	      var cssClasses = that.collectCssClasses();
	      
	      that.nodeElement(parentElement);
	      
	      if ( additionalCssClasses instanceof Array ) {
	        cssClasses = cssClasses.concat(additionalCssClasses);
	      }
	      
	      // set the value for that.width()
	      // update labelWidth Value;
	      if ( graph.options().dynamicLabelWidth() === true ) labelWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	      else                              labelWidth = defaultWidth;
	      
	      width = labelWidth;
	      shapeElement = drawTools.appendRectangularClass(parentElement, that.width(), that.height(), cssClasses, that.labelForCurrentLanguage(), that.backgroundColor());
	      
	      textBlock = new CenteringTextElement(parentElement, that.backgroundColor());
	      textBlock.addText(that.labelForCurrentLanguage());
	      
	      that.addMouseListeners();
	      
	      if ( that.pinned() ) {
	        that.drawPin();
	      }
	      if ( that.halo() ) {
	        that.drawHalo(false);
	      }
	    };
	    
	    this.drawPin = function (){
	      that.pinned(true);
	      // if (graph.options().dynamicLabelWidth()===true) labelWidth=that.getMyWidth();
	      // else                							labelWidth=defaultWidth;
	      // width=labelWidth;
	      // console.log("this element label Width is "+labelWidth);
	      var dx = -0.5 * labelWidth + 5,
	        dy = -1.1 * height;
	      
	      pinGroupElement = drawTools.drawPin(that.nodeElement(), dx, dy, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	      
	    };
	    
	    this.removePin = function (){
	      that.pinned(false);
	      if ( pinGroupElement ) {
	        pinGroupElement.remove();
	      }
	      graph.updateStyle();
	    };
	    
	    this.removeHalo = function (){
	      that.halo(false);
	      if ( haloGroupElement ) {
	        haloGroupElement.remove();
	        haloGroupElement = null;
	      }
	    };
	    
	    this.drawHalo = function ( pulseAnimation ){
	      that.halo(true);
	      
	      var offset = 0;
	      haloGroupElement = drawTools.drawRectHalo(that, this.width(), this.height(), offset);
	      
	      if ( pulseAnimation === false ) {
	        var pulseItem = haloGroupElement.selectAll(".searchResultA");
	        pulseItem.classed("searchResultA", false);
	        pulseItem.classed("searchResultB", true);
	        pulseItem.attr("animationRunning", false);
	      }
	      
	      if ( that.pinned() ) {
	        var selectedNode = pinGroupElement.node();
	        var nodeContainer = selectedNode.parentNode;
	        nodeContainer.appendChild(selectedNode);
	      }
	      
	    };
	    
	    this.updateTextElement = function (){
	      textBlock.updateAllTextElements();
	      
	    };
	    
	    this.textBlock = function (){
	      return textBlock;
	    };
	    
	    this.redrawLabelText = function (){
	      textBlock.remove();
	      textBlock = new CenteringTextElement(that.nodeElement(), that.backgroundColor());
	      textBlock.addText(that.labelForCurrentLanguage());
	      that.animateDynamicLabelWidth(graph.options().dynamicLabelWidth());
	      shapeElement.select("title").text(that.labelForCurrentLanguage());
	    };
	    
	    this.animateDynamicLabelWidth = function ( dynamic ){
	      that.removeHalo();
	      var height = that.height();
	      if ( dynamic === true ) {
	        labelWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -labelWidth / 2, y: -height / 2, width: labelWidth, height: height })
	          .each("end", function (){
	            that.updateTextElement();
	          });
	        
	      } else {
	        labelWidth = defaultWidth;
	        that.updateTextElement();
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -labelWidth / 2, y: -height / 2, width: labelWidth, height: height });
	        
	      }
	      
	      // for the pin we dont need to differ between different widths -- they are already set
	      if ( that.pinned() === true && pinGroupElement ) {
	        
	        var dx = 0.5 * labelWidth - 10,
	          dy = -1.1 * height;
	        
	        pinGroupElement.transition()
	          .tween("attr.translate", function (){
	          })
	          .attr("transform", "translate(" + dx + "," + dy + ")")
	          .ease('linear')
	          .duration(100);
	      }
	    };
	    
	    this.addTextLabelElement = function (){
	      var parentElement = that.nodeElement();
	      textBlock = new CenteringTextElement(parentElement, this.backgroundColor());
	      textBlock.addText(that.labelForCurrentLanguage());
	    };
	    
	    
	  };
	  o.prototype = Object.create(BaseNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	var tools = {};
	module.exports = function (){
	  return tools;
	};

	tools.distanceToBorder = function ( rect, dx, dy ){
	  var width = rect.width(),
	    height = rect.height();
	  
	  var innerDistance,
	    m_link = Math.abs(dy / dx),
	    m_rect = height / width;
	  
	  if ( m_link <= m_rect ) {
	    var timesX = dx / (width / 2),
	      rectY = dy / timesX;
	    innerDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(rectY, 2));
	  } else {
	    var timesY = dy / (height / 2),
	      rectX = dx / timesY;
	    innerDistance = Math.sqrt(Math.pow(height / 2, 2) + Math.pow(rectX, 2));
	  }
	  
	  return innerDistance;
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var DatatypeNode = __webpack_require__(35);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    DatatypeNode.apply(this, arguments);
	    
	    var superDrawFunction = this.draw,
	      superLabelFunction = this.label;
	    
	    this.attributes(["datatype"])
	      .label("Literal")
	      .styleClass("literal")
	      .type("rdfs:Literal")
	      .iri("http://www.w3.org/2000/01/rdf-schema#Literal");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element, ["dashed"]);
	    };
	    
	    this.label = function ( p ){
	      if ( !arguments.length ) return superLabelFunction();
	      return this;
	    };
	  };
	  o.prototype = Object.create(DatatypeNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var superDrawFunction = this.draw;
	    
	    this.attributes(["rdf"])
	      .label("Resource")
	      .radius(30)
	      .styleClass("rdfsresource")
	      .type("rdfs:Resource");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element, ["rdf", "dashed"]);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var properties = [];
	properties.push(__webpack_require__(41));
	properties.push(__webpack_require__(44));
	properties.push(__webpack_require__(45));
	properties.push(__webpack_require__(46));
	properties.push(__webpack_require__(47));
	properties.push(__webpack_require__(48));
	properties.push(__webpack_require__(49));
	properties.push(__webpack_require__(50));
	properties.push(__webpack_require__(51));
	properties.push(__webpack_require__(52));
	properties.push(__webpack_require__(53));
	properties.push(__webpack_require__(54));
	properties.push(__webpack_require__(55));
	properties.push(__webpack_require__(56));

	var map = d3.map(properties, function ( Prototype ){
	  return new Prototype().type();
	});

	module.exports = function (){
	  return map;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var superGenerateCardinalityText = this.generateCardinalityText;
	    
	    this.linkType("values-from")
	      .markerType("filled values-from")
	      .styleClass("allvaluesfromproperty")
	      .type("owl:allValuesFrom");
	    
	    this.generateCardinalityText = function (){
	      var cardinalityText = "A";
	      
	      var superCardinalityText = superGenerateCardinalityText();
	      if ( superCardinalityText ) {
	        cardinalityText += ", " + superCardinalityText;
	      }
	      
	      return cardinalityText;
	    };
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());




/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var BaseElement = __webpack_require__(10);
	var CenteringTextElement = __webpack_require__(14);
	var drawTools = __webpack_require__(17)();
	var forceLayoutNodeFunctions = __webpack_require__(13)();
	var rectangularElementTools = __webpack_require__(37)();
	var math = __webpack_require__(43)();

	module.exports = (function (){
	  
	  // Static variables
	  var labelHeight = 28,
	    labelWidth = 80,
	    smallestRadius = labelHeight / 2;
	  
	  
	  // Constructor, private variables and privileged methods
	  var Base = function ( graph ){
	    BaseElement.apply(this, arguments);
	    
	    var that = this,
	      // Basic attributes
	      cardinality,
	      domain,
	      inverse,
	      link,
	      minCardinality,
	      maxCardinality,
	      range,
	      subproperties,
	      superproperties,
	      // Style attributes
	      linkType = "normal",
	      markerType = "filled",
	      labelVisible = true,
	      // Element containers
	      cardinalityElement,
	      labelElement,
	      linkGroup,
	      markerElement,
	      // Other
	      ignoreLocalHoverEvents,
	      fobj,
	      pinGroupElement,
	      haloGroupElement,
	      myWidth = 80,
	      defaultWidth = 80,
	      shapeElement,
	      textElement,
	      parent_labelObject,
	      backupFullIri,
	      
	      redundantProperties = [];
	    
	    
	    this.existingPropertyIRI = function ( url ){
	      return graph.options().editSidebar().checkForExistingURL(url);
	    };
	    
	    this.getHalos = function (){
	      return haloGroupElement;
	    };
	    
	    this.getPin = function (){
	      return pinGroupElement;
	    };
	    this.labelObject = function ( lo, once ){
	      if ( !arguments.length ) {
	        return parent_labelObject;
	      }
	      else {
	        parent_labelObject = lo;
	        if ( that.inverse() && once !== true ) {
	          that.inverse().labelObject(lo, true);
	        }
	        
	      }
	    };
	    this.hide = function ( val ){
	      that.labelElement().classed("hidden", val);
	      that.linkGroup().classed("hidden", val);
	      if ( that.cardinalityElement() )
	        that.cardinalityElement().classed("hidden", val);
	    };
	    
	    // Properties
	    this.cardinality = function ( p ){
	      if ( !arguments.length ) return cardinality;
	      cardinality = p;
	      return this;
	    };
	    
	    this.cardinalityElement = function ( p ){
	      if ( !arguments.length ) return cardinalityElement;
	      cardinalityElement = p;
	      return this;
	    };
	    
	    this.domain = function ( p ){
	      if ( !arguments.length ) return domain;
	      domain = p;
	      return this;
	    };
	    
	    this.inverse = function ( p ){
	      if ( !arguments.length ) return inverse;
	      inverse = p;
	      return this;
	    };
	    
	    this.labelElement = function ( p ){
	      if ( !arguments.length ) return labelElement;
	      labelElement = p;
	      return this;
	    };
	    
	    this.labelVisible = function ( p ){
	      if ( !arguments.length ) return labelVisible;
	      labelVisible = p;
	      return this;
	    };
	    
	    this.link = function ( p ){
	      if ( !arguments.length ) return link;
	      link = p;
	      return this;
	    };
	    
	    this.linkGroup = function ( p ){
	      if ( !arguments.length ) return linkGroup;
	      linkGroup = p;
	      return this;
	    };
	    
	    this.linkType = function ( p ){
	      if ( !arguments.length ) return linkType;
	      linkType = p;
	      return this;
	    };
	    
	    this.markerElement = function ( p ){
	      if ( !arguments.length ) return markerElement;
	      markerElement = p;
	      return this;
	    };
	    
	    this.markerType = function ( p ){
	      if ( !arguments.length ) return markerType;
	      markerType = p;
	      return this;
	    };
	    
	    this.maxCardinality = function ( p ){
	      if ( !arguments.length ) return maxCardinality;
	      maxCardinality = p;
	      return this;
	    };
	    
	    this.minCardinality = function ( p ){
	      if ( !arguments.length ) return minCardinality;
	      minCardinality = p;
	      return this;
	    };
	    
	    this.range = function ( p ){
	      if ( !arguments.length ) return range;
	      range = p;
	      return this;
	    };
	    
	    this.redundantProperties = function ( p ){
	      if ( !arguments.length ) return redundantProperties;
	      redundantProperties = p;
	      return this;
	    };
	    
	    this.subproperties = function ( p ){
	      if ( !arguments.length ) return subproperties;
	      subproperties = p;
	      return this;
	    };
	    
	    this.superproperties = function ( p ){
	      if ( !arguments.length ) return superproperties;
	      superproperties = p;
	      return this;
	    };
	    
	    
	    // Functions
	    this.distanceToBorder = function ( dx, dy ){
	      return rectangularElementTools.distanceToBorder(that, dx, dy);
	    };
	    
	    this.linkHasMarker = function (){
	      return linkType !== "dashed";
	    };
	    
	    this.markerId = function (){
	      return "marker" + that.id();
	    };
	    
	    this.toggleFocus = function (){
	      that.focused(!that.focused());
	      labelElement.select("rect").classed("focused", that.focused());
	      graph.resetSearchHighlight();
	      graph.options().searchMenu().clearText();
	    };
	    this.getShapeElement = function (){
	      return shapeElement;
	    };
	    
	    this.textBlock = function (){
	      return textElement;
	    };
	    
	    this.redrawElement = function (){
	      shapeElement.remove();
	      textElement.remove();
	      
	      that.drawLabel(that.labelElement());
	      that.animateDynamicLabelWidth(graph.options().dynamicLabelWidth());
	      
	      
	      // shapeElement=this.addRect(that.labelElement());
	      //
	      // var equivalentsString = that.equivalentsString();
	      // var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      //
	      // textElement = new CenteringTextElement(labelContainer, this.backgroundColor());
	      // textElement.addText(this.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      // textElement.addEquivalents(equivalentsString);
	      // textElement.addSubText(this.indicationString());
	      
	    };
	    
	    // Reused functions TODO refactor
	    this.draw = function ( labelGroup ){
	      function attachLabel( property ){
	        var labelContainer = labelGroup.append("g")
	          .datum(property)
	          .classed("label", true)
	          .attr("id", property.id());
	        
	        property.drawLabel(labelContainer);
	        return labelContainer;
	      }
	      
	      if ( !that.labelVisible() ) {
	        return undefined;
	      }
	      if ( graph.options().dynamicLabelWidth() === true ) myWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	      else                              myWidth = defaultWidth;
	      
	      that.labelElement(attachLabel(that));
	      // Draw an inverse label and reposition both labels if necessary
	      if ( that.inverse() ) {
	        var yTransformation = (that.height() / 2) + 1 /* additional space */;
	        that.inverse()
	          .labelElement(attachLabel(that.inverse()));
	        
	        that.labelElement()
	          .attr("transform", "translate(" + 0 + ",-" + yTransformation + ")");
	        that.inverse()
	          .labelElement()
	          .attr("transform", "translate(" + 0 + "," + yTransformation + ")");
	      }
	      
	      if ( that.pinned() ) {
	        that.drawPin();
	      } else if ( that.inverse() && that.inverse().pinned() ) {
	        that.inverse().drawPin();
	      }
	      
	      if ( that.halo() )
	        that.drawHalo(false);
	      
	      return that.labelElement();
	    };
	    
	    this.addRect = function ( labelContainer ){
	      var rect = labelContainer.append("rect")
	        .classed(that.styleClass(), true)
	        .classed("property", true)
	        .attr("x", -that.width() / 2)
	        .attr("y", -that.height() / 2)
	        .attr("width", that.width())
	        .attr("height", that.height())
	        .on("mouseover", function (){
	          onMouseOver();
	        })
	        .on("mouseout", function (){
	          onMouseOut();
	        });
	      
	      rect.append("title")
	        .text(that.labelForCurrentLanguage());
	      
	      if ( that.visualAttributes() ) {
	        rect.classed(that.visualAttributes(), true);
	      }
	      
	      var bgColor = that.backgroundColor();
	      
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	        rect.classed("deprecatedproperty", true);
	      } else {
	        rect.classed("deprecatedproperty", false);
	      }
	      rect.style("fill", bgColor);
	      
	      return rect;
	    };
	    this.drawLabel = function ( labelContainer ){
	      shapeElement = this.addRect(labelContainer);
	      
	      var equivalentsString = that.equivalentsString();
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      textElement = new CenteringTextElement(labelContainer, bgColor);
	      textElement.addText(this.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      textElement.addEquivalents(equivalentsString);
	      textElement.addSubText(this.indicationString());
	    };
	    
	    this.equivalentsString = function (){
	      var equivalentProperties = that.equivalents();
	      if ( !equivalentProperties ) {
	        return;
	      }
	      
	      return equivalentProperties
	        .map(function ( property ){
	          if ( property === undefined || typeof(property) === "string" ) { // @WORKAROUND
	            return "ERROR";
	          }
	          return property.labelForCurrentLanguage();
	        })
	        .join(", ");
	    };
	    
	    this.drawCardinality = function ( container ){
	      var cardinalityText = this.generateCardinalityText();
	      
	      if ( cardinalityText ) {
	        that.cardinalityElement(container);
	        if ( cardinalityText.indexOf("A") === 0 && cardinalityText.length === 1 ) {
	          
	          // replacing text elements to svg elements;
	          container.classed("cardinality", true)
	            .attr("text-anchor", "middle")
	            .append("path")
	            .classed("cardinality", true)
	            .attr("d", "m -8.8832678,-11.303355 -7.97e-4,0 0.717374,1.833297 8.22987151,21.371761 8.66826659,-21.2123526 0.797082,-1.9927054 0.02471,0 -0.8218553,1.9927054 -2.2517565,5.4201577 -12.4444429,8e-6 -2.2019394,-5.5795821 z")
	            .style("fill", "none")
	            .attr("transform", "matrix(0.5,0,0,0.5,0.5,0.5)");
	          return true;
	        } else if ( cardinalityText.indexOf("E") === 0 && cardinalityText.length === 1 ) {
	          container.classed("cardinality", true)
	            .attr("text-anchor", "middle")
	            .append("path")
	            .classed("cardinality", true)
	            .attr("d", "m -5.5788451,-8.0958763 10.8749368,0 0,8.34681523 -9.5707468,0.040132 9.5707468,-0.040132 0,8.42707237 -10.9150654,0")
	            .style("fill", "none")
	            .attr("transform", "matrix(0.5,0,0,0.5,0.5,0.5)");
	          return true;
	        }
	        else {
	          container.append("text")
	            .classed("cardinality", true)
	            .attr("text-anchor", "middle")
	            .attr("dy", "0.5ex")
	            .text(cardinalityText);
	          return true; // drawing successful
	        }
	      } else {
	        return false;
	      }
	    };
	    
	    this.generateCardinalityText = function (){
	      if ( that.cardinality() ) {
	        return that.cardinality();
	      } else if ( that.minCardinality() || that.maxCardinality() ) {
	        var minBoundary = that.minCardinality() || "*";
	        var maxBoundary = that.maxCardinality() || "*";
	        return minBoundary + ".." + maxBoundary;
	      }
	    };
	    
	    that.setHighlighting = function ( enable ){
	      if ( that.labelElement && that.labelElement() ) {
	        that.labelElement().select("rect").classed("hovered", enable);
	      }
	      that.linkGroup().selectAll("path, text").classed("hovered", enable);
	      if ( that.markerElement() ) {
	        that.markerElement().select("path").classed("hovered", enable);
	        if ( that.cardinalityElement() ) {
	          that.cardinalityElement().selectAll("path").classed("hovered-MathSymbol", enable);
	          that.cardinalityElement().classed("hovered", enable);
	        }
	      }
	      var subAndSuperProperties = getSubAndSuperProperties();
	      subAndSuperProperties.forEach(function ( property ){
	        
	        if ( property.labelElement && property.labelElement() ) {
	          property.labelElement().select("rect")
	            .classed("indirect-highlighting", enable);
	        }
	        
	      });
	      var inversed = false;
	      
	      if ( graph.ignoreOtherHoverEvents() === false ) {
	        if ( that.inverse() ) {
	          inversed = true;
	        }
	        
	        if ( graph.isTouchDevice() === false ) {
	          graph.activateHoverElementsForProperties(enable, that, inversed);
	        }
	        else {
	          that.labelElement().select("rect").classed("hovered", false);
	          that.linkGroup().selectAll("path, text").classed("hovered", false);
	          if ( that.markerElement() ) {
	            that.markerElement().select("path").classed("hovered", false);
	            if ( that.cardinalityElement() ) {
	              that.cardinalityElement().classed("hovered", false);
	            }
	          }
	          graph.activateHoverElementsForProperties(enable, that, inversed, true);
	        }
	      }
	    };
	    
	    /**
	     * Combines the sub- and superproperties into a single array, because
	     * they're often used equivalently.
	     * @returns {Array}
	     */
	    function getSubAndSuperProperties(){
	      var properties = [];
	      
	      if ( that.subproperties() ) {
	        properties = properties.concat(that.subproperties());
	      }
	      if ( that.superproperties() ) {
	        properties = properties.concat(that.superproperties());
	      }
	      
	      return properties;
	    }
	    
	    /**
	     * Foregrounds the property, its inverse and the link.
	     */
	    this.foreground = function (){
	      // check for additional objects that we can highlight
	      if ( !that.labelElement() )
	        return;
	      if ( that.labelElement().node().parentNode === null ) {
	        return;
	      }
	      var selectedLabelGroup = that.labelElement().node().parentNode,
	        labelContainer = selectedLabelGroup.parentNode,
	        selectedLinkGroup = that.linkGroup().node(),
	        linkContainer = that.linkGroup().node().parentNode;
	      if ( that.animationProcess() === false ) {
	        labelContainer.appendChild(selectedLabelGroup);
	      }
	      linkContainer.appendChild(selectedLinkGroup);
	    };
	    
	    /**
	     * Foregrounds the sub- and superproperties of this property.
	     * This is separated from the foreground-function to prevent endless loops.
	     */
	    function foregroundSubAndSuperProperties(){
	      var subAndSuperProperties = getSubAndSuperProperties();
	      
	      subAndSuperProperties.forEach(function ( property ){
	        if ( property.foreground ) property.foreground();
	      });
	    }
	    
	    function onMouseOver(){
	      if ( that.mouseEntered() || ignoreLocalHoverEvents === true ) {
	        return;
	      }
	      that.mouseEntered(true);
	      that.setHighlighting(true);
	      that.foreground();
	      foregroundSubAndSuperProperties();
	    }
	    
	    function onMouseOut(){
	      that.mouseEntered(false);
	      that.setHighlighting(false);
	    }
	    
	    this.drawPin = function (){
	      that.pinned(true);
	      if ( graph.options().dynamicLabelWidth() === true ) myWidth = that.getMyWidth();
	      else                              myWidth = defaultWidth;
	      
	      if ( that.inverse() ) {
	        // check which element is rendered on top and add a pin to it
	        var tr_that = that.labelElement().attr("transform");
	        var tr_inv = that.inverse().labelElement().attr("transform");
	        
	        var thatY = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(tr_that)[2];
	        var invY = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(tr_inv)[2];
	        
	        if ( thatY < invY )
	          pinGroupElement = drawTools.drawPin(that.labelElement(), -0.5 * that.width() + 10, -25, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	        else
	          pinGroupElement = drawTools.drawPin(that.inverse().labelElement(), -0.5 * that.inverse().width() + 10, -25, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	        
	      }
	      else {
	        pinGroupElement = drawTools.drawPin(that.labelElement(), -0.5 * that.width() + 10, -25, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	      }
	      
	      
	    };
	    
	    /**
	     * Removes the pin and refreshs the graph to update the force layout.
	     */
	    this.removePin = function (){
	      that.pinned(false);
	      if ( pinGroupElement ) {
	        pinGroupElement.remove();
	      }
	      graph.updateStyle();
	    };
	    
	    this.removeHalo = function (){
	      that.halo(false);
	      if ( haloGroupElement ) {
	        haloGroupElement.remove();
	        haloGroupElement = null;
	      }
	    };
	    
	    this.animationProcess = function (){
	      var animRuns = false;
	      if ( that.getHalos() ) {
	        var haloGr = that.getHalos();
	        var haloEls = haloGr.selectAll(".searchResultA");
	        animRuns = haloGr.attr("animationRunning");
	        
	        if ( typeof animRuns !== "boolean" ) {
	          // parse this to a boolean value
	          animRuns = (animRuns === 'true');
	        }
	        if ( animRuns === false ) {
	          haloEls.classed("searchResultA", false);
	          haloEls.classed("searchResultB", true);
	        }
	      }
	      return animRuns;
	    };
	    
	    this.drawHalo = function ( pulseAnimation ){
	      that.halo(true);
	      var offset = 0;
	      if ( that.labelElement() && that.labelElement().node() ) {
	        var labelNode = that.labelElement().node();
	        var labelContainer = labelNode.parentNode;
	        // do this only if animation is not running
	        if ( that.animationProcess() === false )
	          labelContainer.appendChild(labelNode);
	      }
	      haloGroupElement = drawTools.drawRectHalo(that, that.width(), that.height(), offset);
	      if ( haloGroupElement ) {
	        var haloNode = haloGroupElement.node();
	        var haloContainer = haloNode.parentNode;
	        haloContainer.appendChild(haloNode);
	      }
	      var selectedNode;
	      var nodeContainer;
	      if ( that.pinned() ) {
	        selectedNode = pinGroupElement.node();
	        nodeContainer = selectedNode.parentNode;
	        nodeContainer.appendChild(selectedNode);
	      }
	      if ( that.inverse() && that.inverse().pinned() ) {
	        if ( that.inverse().getPin() ) {
	          selectedNode = that.inverse().getPin().node();
	          nodeContainer = selectedNode.parentNode;
	          nodeContainer.appendChild(selectedNode);
	        }
	      }
	      if ( pulseAnimation === false ) {
	        var pulseItem = haloGroupElement.selectAll(".searchResultA");
	        pulseItem.classed("searchResultA", false);
	        pulseItem.classed("searchResultB", true);
	        pulseItem.attr("animationRunning", false);
	      }
	    };
	    
	    this.getMyWidth = function (){
	      var text = that.labelForCurrentLanguage();
	      myWidth = measureTextWidth(text, "text") + 20;
	      // check for sub names;
	      var indicatorText = that.indicationString();
	      var indicatorWidth = measureTextWidth(indicatorText, "subtext") + 20;
	      if ( indicatorWidth > myWidth )
	        myWidth = indicatorWidth;
	      
	      return myWidth;
	    };
	    
	    function measureTextWidth( text, textStyle ){
	      // Set a default value
	      if ( !textStyle ) {
	        textStyle = "text";
	      }
	      var d = d3.select("body")
	          .append("div")
	          .attr("class", textStyle)
	          .attr("id", "width-test") // tag this element to identify it
	          .attr("style", "position:absolute; float:left; white-space:nowrap; visibility:hidden;")
	          .text(text),
	        w = document.getElementById("width-test").offsetWidth;
	      d.remove();
	      return w;
	    }
	    
	    this.textWidth = function (){
	      return myWidth;
	    };
	    this.width = function (){
	      return myWidth;
	    };
	    
	    this.animateDynamicLabelWidth = function ( dynamic ){
	      that.removeHalo();
	      if ( shapeElement === undefined ) {// this handles setOperatorProperties which dont have a shapeElement!
	        return;
	      }
	      
	      var h = that.height();
	      if ( dynamic === true ) {
	        myWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -myWidth / 2, y: -h / 2, width: myWidth, height: h })
	          .each("end", function (){
	            that.updateTextElement();
	          });
	      } else {
	        // Static width for property labels = 80
	        myWidth = defaultWidth;
	        that.updateTextElement();
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -myWidth / 2, y: -h / 2, width: myWidth, height: h });
	      }
	      if ( that.pinned() === true && pinGroupElement ) {
	        var dx = -0.5 * myWidth + 10,
	          dy = -25;
	        pinGroupElement.transition()
	          .tween("attr.translate", function (){
	          })
	          .attr("transform", "translate(" + dx + "," + dy + ")")
	          .ease('linear')
	          .duration(100);
	      }
	    };
	    
	    this.redrawLabelText = function (){
	      textElement.remove();
	      that.addTextLabelElement();
	      that.animateDynamicLabelWidth(graph.options().dynamicLabelWidth());
	      shapeElement.select("title").text(that.labelForCurrentLanguage());
	    };
	    
	    this.addTextLabelElement = function (){
	      var labelContainer = that.labelElement();
	      
	      var equivalentsString = that.equivalentsString();
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      
	      textElement = new CenteringTextElement(labelContainer, this.backgroundColor());
	      textElement.addText(this.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      textElement.addEquivalents(equivalentsString);
	      textElement.addSubText(this.indicationString());
	    };
	    
	    this.updateTextElement = function (){
	      textElement.updateAllTextElements();
	    };
	    this.enableEditing = function ( autoEditing ){
	      if ( autoEditing === false )
	        return;
	      that.raiseDoubleClickEdit(true);
	    };
	    
	    this.raiseDoubleClickEdit = function ( forceIRISync ){
	      d3.selectAll(".foreignelements").remove();
	      if ( that.labelElement() === undefined || this.type() === "owl:disjointWith" || this.type() === "rdfs:subClassOf" ) {
	        console.log("No Container found");
	        return;
	      }
	      if ( fobj !== undefined ) {
	        that.labelElement().selectAll(".foreignelements").remove();
	      }
	      backupFullIri = undefined;
	      graph.options().focuserModule().handle(undefined);
	      graph.options().focuserModule().handle(that);
	      that.editingTextElement = true;
	      ignoreLocalHoverEvents = true;
	      that.labelElement().selectAll("rect").classed("hoveredForEditing", true);
	      that.frozen(true);
	      graph.killDelayedTimer();
	      graph.ignoreOtherHoverEvents(false);
	      fobj = that.labelElement().append("foreignObject")
	        .attr("x", -0.5 * that.textWidth())
	        .attr("y", -13)
	        .attr("height", 25)
	        .attr("class", "foreignelements")
	        .on("dragstart", function (){
	          return false;
	        }) // remove drag operations of text element)
	        .attr("width", that.textWidth() - 2);
	      // adding a Style to the fObject
	      //
	      //
	      //
	      var editText = fobj.append("xhtml:input")
	        .attr("class", "nodeEditSpan")
	        .attr("id", that.id())
	        .attr("align", "center")
	        .attr("contentEditable", "true")
	        .on("dragstart", function (){
	          return false;
	        }); // remove drag operations of text element)
	      
	      var bgColor = '#f00';
	      var txtWidth = that.textWidth() - 2;
	      editText.style({
	        // 'line-height': '30px',
	        'align': 'center',
	        'color': 'black',
	        'width': txtWidth + "px",
	        'background-color': bgColor,
	        'border-bottom': '2px solid black'
	      });
	      var txtNode = editText.node();
	      txtNode.value = that.labelForCurrentLanguage();
	      txtNode.focus();
	      txtNode.select();
	      if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	      if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	      
	      // add some events that relate to this object
	      editText.on("click", function (){
	        if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	        if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	        
	      });
	      // // remove hover Events for now;
	      editText.on("mouseout", function (){
	        if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	        if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	      });
	      editText.on("mousedown", function (){
	        if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	        if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	      })
	        .on("keydown", function (){
	          
	          if ( d3.event.keyCode === 13 ) {
	            this.blur();
	            that.frozen(false); // << releases the not after selection
	            that.locked(false);
	          }
	        })
	        .on("keyup", function (){
	          if ( forceIRISync ) {
	            var labelName = editText.node().value;
	            var resourceName = labelName.replaceAll(" ", "_");
	            var syncedIRI = that.baseIri() + resourceName;
	            backupFullIri = syncedIRI;
	            
	            d3.select("#element_iriEditor").node().title = syncedIRI;
	            d3.select("#element_iriEditor").node().value = graph.options().prefixModule().getPrefixRepresentationForFullURI(syncedIRI);
	          }
	          d3.select("#element_labelEditor").node().value = editText.node().value;
	          
	        })
	        .on("blur", function (){
	          
	          
	          that.editingTextElement = false;
	          ignoreLocalHoverEvents = false;
	          that.labelElement().selectAll("rect").classed("hoveredForEditing", false);
	          var newLabel = editText.node().value;
	          that.labelElement().selectAll(".foreignelements").remove();
	          // that.setLabelForCurrentLanguage(classNameConvention(editText.node().value));
	          that.label(newLabel);
	          that.backupLabel(newLabel);
	          that.redrawLabelText();
	          updateHoverElements(true);
	          graph.showHoverElementsAfterAnimation(that, false);
	          graph.ignoreOtherHoverEvents(false);
	          
	          
	          that.frozen(graph.paused());
	          that.locked(graph.paused());
	          that.domain().frozen(graph.paused());
	          that.domain().locked(graph.paused());
	          that.range().frozen(graph.paused());
	          that.range().locked(graph.paused());
	          graph.removeEditElements();
	          if ( backupFullIri ) {
	            // console.log("Checking if element is Identical ?");
	            var sanityCheckResult = graph.options().editSidebar().checkProperIriChange(that, backupFullIri);
	            if ( sanityCheckResult !== false ) {
	              graph.options().warningModule().showWarning("Already seen this property",
	                "Input IRI: " + backupFullIri + " for element: " + that.labelForCurrentLanguage() + " already been set",
	                "Continuing with duplicate property!", 1, false, sanityCheckResult);
	            }
	            that.iri(backupFullIri);
	          }
	          graph.options().focuserModule().handle(undefined);
	          graph.options().focuserModule().handle(that);
	          graph.updatePropertyDraggerElements(that);
	          
	          
	        });	// add a foreiner element to this thing;
	      
	    };
	    
	    // update hover elements
	    function updateHoverElements( enable ){
	      if ( graph.ignoreOtherHoverEvents() === false ) {
	        var inversed = false;
	        if ( that.inverse() ) {
	          inversed = true;
	        }
	        if ( enable === true ) {
	          graph.activateHoverElementsForProperties(enable, that, inversed);
	        }
	      }
	    }
	    
	    that.copyInformation = function ( other ){
	      that.label(other.label());
	      that.iri(other.iri());
	      that.baseIri(other.baseIri());
	      if ( other.type() === "owl:ObjectProperty" ||
	        other.type() === "owl:DatatypeProperty" ) {
	        that.backupLabel(other.label());
	        // console.log("copied backup label"+that.backupLabel());
	      }
	      if ( other.backupLabel() !== undefined ) {
	        that.backupLabel(other.backupLabel());
	      }
	    };
	    
	    forceLayoutNodeFunctions.addTo(this);
	  };
	  
	  Base.prototype = Object.create(BaseElement.prototype);
	  Base.prototype.constructor = Base;
	  
	  Base.prototype.height = function (){
	    return labelHeight;
	  };
	  
	  Base.prototype.width = function (){
	    return labelWidth;
	  };
	  
	  Base.prototype.actualRadius = function (){
	    return smallestRadius;
	  };
	  
	  Base.prototype.textWidth = Base.prototype.width;
	  
	  
	  return Base;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains a collection of mathematical functions with some additional data
	 * used for WebVOWL.
	 */
	module.exports = (function (){
	  
	  var math = {},
	    loopFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("cardinal")
	      .tension(-1);
	  
	  
	  /**
	   * Calculates the normal vector of the path between the two nodes.
	   * @param source the first node
	   * @param target the second node
	   * @param length the length of the calculated normal vector
	   * @returns {{x: number, y: number}}
	   */
	  math.calculateNormalVector = function ( source, target, length ){
	    var dx = target.x - source.x,
	      dy = target.y - source.y;
	    
	    var nx = -dy,
	      ny = dx;
	    
	    var vlength = Math.sqrt(nx * nx + ny * ny);
	    
	    var ratio = vlength !== 0 ? length / vlength : 0;
	    
	    return { "x": nx * ratio, "y": ny * ratio };
	  };
	  
	  /**
	   * Calculates the path for a link, if it is a loop. Currently only working for circlular nodes.
	   * @param link the link
	   * @returns {*}
	   */
	  
	  
	  
	  math.getLoopPoints = function ( link ){
	    var node = link.domain(),
	      label = link.label();
	    
	    var fairShareLoopAngle = 360 / link.loops().length,
	      fairShareLoopAngleWithMargin = fairShareLoopAngle * 0.8,
	      loopAngle = Math.min(60, fairShareLoopAngleWithMargin);
	    
	    if ( label.increasedLoopAngle === true )
	      loopAngle = 120;
	    
	    
	    var dx = label.x - node.x,
	      dy = label.y - node.y,
	      labelRadian = Math.atan2(dy, dx),
	      labelAngle = calculateAngle(labelRadian);
	    
	    var startAngle = labelAngle - loopAngle / 2,
	      endAngle = labelAngle + loopAngle / 2;
	    
	    
	    var arcFrom = calculateRadian(startAngle),
	      arcTo = calculateRadian(endAngle),
	      
	      x1 = Math.cos(arcFrom) * node.actualRadius(),
	      y1 = Math.sin(arcFrom) * node.actualRadius(),
	      
	      x2 = Math.cos(arcTo) * node.actualRadius(),
	      y2 = Math.sin(arcTo) * node.actualRadius(),
	      
	      fixPoint1 = { "x": node.x + x1, "y": node.y + y1 },
	      fixPoint2 = { "x": node.x + x2, "y": node.y + y2 };
	    
	    return [fixPoint1, fixPoint2];
	  };
	  math.calculateLoopPath = function ( link ){
	    var node = link.domain(),
	      label = link.label();
	    
	    
	    var fairShareLoopAngle = 360 / link.loops().length,
	      fairShareLoopAngleWithMargin = fairShareLoopAngle * 0.8,
	      loopAngle = Math.min(60, fairShareLoopAngleWithMargin);
	    
	    if ( label.increasedLoopAngle === true )
	      loopAngle = 120;
	    
	    var dx = label.x - node.x,
	      dy = label.y - node.y,
	      labelRadian = Math.atan2(dy, dx),
	      labelAngle = calculateAngle(labelRadian);
	    
	    var startAngle = labelAngle - loopAngle / 2,
	      endAngle = labelAngle + loopAngle / 2;
	    
	    var arcFrom = calculateRadian(startAngle),
	      arcTo = calculateRadian(endAngle),
	      
	      x1 = Math.cos(arcFrom) * node.actualRadius(),
	      y1 = Math.sin(arcFrom) * node.actualRadius(),
	      
	      x2 = Math.cos(arcTo) * node.actualRadius(),
	      y2 = Math.sin(arcTo) * node.actualRadius(),
	      
	      fixPoint1 = { "x": node.x + x1, "y": node.y + y1 },
	      fixPoint2 = { "x": node.x + x2, "y": node.y + y2 };
	    
	    return loopFunction([fixPoint1, link.label(), fixPoint2]);
	  };
	  
	  math.calculateLoopPoints = function ( link ){
	    var node = link.domain(),
	      label = link.label();
	    
	    var fairShareLoopAngle = 360 / link.loops().length,
	      fairShareLoopAngleWithMargin = fairShareLoopAngle * 0.8,
	      loopAngle = Math.min(60, fairShareLoopAngleWithMargin);
	    
	    var dx = label.x - node.x,
	      dy = label.y - node.y,
	      labelRadian = Math.atan2(dy, dx),
	      labelAngle = calculateAngle(labelRadian);
	    
	    var startAngle = labelAngle - loopAngle / 2,
	      endAngle = labelAngle + loopAngle / 2;
	    
	    var arcFrom = calculateRadian(startAngle),
	      arcTo = calculateRadian(endAngle),
	      
	      x1 = Math.cos(arcFrom) * node.actualRadius(),
	      y1 = Math.sin(arcFrom) * node.actualRadius(),
	      
	      x2 = Math.cos(arcTo) * (node.actualRadius()),
	      y2 = Math.sin(arcTo) * (node.actualRadius()),
	      
	      fixPoint1 = { "x": node.x + x1, "y": node.y + y1 },
	      fixPoint2 = { "x": node.x + x2, "y": node.y + y2 };
	    
	    return [fixPoint1, link.label(), fixPoint2];
	  };
	  
	  /**
	   * @param angle
	   * @returns {number} the radian of the angle
	   */
	  function calculateRadian( angle ){
	    angle = angle % 360;
	    if ( angle < 0 ) {
	      angle = angle + 360;
	    }
	    return (Math.PI * angle) / 180;
	  }
	  
	  /**
	   * @param radian
	   * @returns {number} the angle of the radian
	   */
	  function calculateAngle( radian ){
	    return radian * (180 / Math.PI);
	  }
	  
	  /**
	   * Calculates the point where the link between the source and target node
	   * intersects the border of the target node.
	   * @param source the source node
	   * @param target the target node
	   * @param additionalDistance additional distance the
	   * @returns {{x: number, y: number}}
	   */
	  math.calculateIntersection = function ( source, target, additionalDistance ){
	    var dx = target.x - source.x,
	      dy = target.y - source.y,
	      length = Math.sqrt(dx * dx + dy * dy);
	    
	    if ( length === 0 ) {
	      return { x: source.x, y: source.y };
	    }
	    
	    var innerDistance = target.distanceToBorder(dx, dy);
	    
	    var ratio = (length - (innerDistance + additionalDistance)) / length,
	      x = dx * ratio + source.x,
	      y = dy * ratio + source.y;
	    
	    return { x: x, y: y };
	  };
	  
	  /**
	   * Calculates the position between the two points.
	   * @param firstPoint
	   * @param secondPoint
	   * @returns {{x: number, y: number}}
	   */
	  math.calculateCenter = function ( firstPoint, secondPoint ){
	    return {
	      x: (firstPoint.x + secondPoint.x) / 2,
	      y: (firstPoint.y + secondPoint.y) / 2
	    };
	  };
	  
	  
	  return function (){
	    /* Use a function here to keep a consistent style like webvowl.path.to.module()
	     * despite having just a single math object. */
	    return math;
	  };
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["datatype"])
	      .styleClass("datatypeproperty")
	      .type("owl:DatatypeProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["deprecated"])
	      .styleClass("deprecatedproperty")
	      .type("owl:DeprecatedProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);
	var CenteringTextElement = __webpack_require__(14);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var label = "Disjoint With";
	    var shapeElement;
	    // Disallow overwriting the label
	    this.label = function ( p ){
	      if ( !arguments.length ) return label;
	      return this;
	    };
	    
	    this.linkType("dashed")
	      .styleClass("disjointwith")
	      .type("owl:disjointWith");
	    
	    this.drawLabel = function ( labelContainer ){
	      shapeElement = this.addRect(labelContainer);
	      
	      labelContainer.append("circle")
	        .classed("symbol", true)
	        .classed("fineline", true)
	        .classed("embedded", true)
	        .attr("cx", -12.5)
	        .attr("r", 10);
	      
	      labelContainer.append("circle")
	        .classed("symbol", true)
	        .classed("fineline", true)
	        .classed("embedded", true)
	        .attr("cx", 12.5)
	        .attr("r", 10);
	      
	      var textElement = new CenteringTextElement(labelContainer, this.backgroundColor());
	      if ( !graph.options().compactNotation() ) {
	        textElement.addSubText("disjoint");
	      }
	      textElement.translation(0, 20);
	    };
	    this.getShapeElement = function (){
	      return shapeElement;
	    };
	    this.markerElement = function (){
	      return undefined;
	    };
	    
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.styleClass("equivalentproperty")
	      .type("owl:equivalentProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["functional"])
	      .styleClass("functionalproperty")
	      .type("owl:FunctionalProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["inverse functional"])
	      .styleClass("inversefunctionalproperty")
	      .type("owl:InverseFunctionalProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["object"])
	      .styleClass("objectproperty")
	      .type("owl:ObjectProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());




/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var superGenerateCardinalityText = this.generateCardinalityText;
	    
	    this.linkType("values-from")
	      .markerType("filled values-from")
	      .styleClass("somevaluesfromproperty")
	      .type("owl:someValuesFrom");
	    
	    this.generateCardinalityText = function (){
	      var cardinalityText = "E";
	      
	      var superCardinalityText = superGenerateCardinalityText();
	      if ( superCardinalityText ) {
	        cardinalityText += ", " + superCardinalityText;
	      }
	      
	      return cardinalityText;
	    };
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());




/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["symmetric"])
	      .styleClass("symmetricproperty")
	      .type("owl:SymmetricProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["transitive"])
	      .styleClass("transitiveproperty")
	      .type("owl:TransitiveProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["rdf"])
	      .styleClass("rdfproperty")
	      .type("rdf:Property");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw,
	      label = "Subclass of";
	    
	    this.draw = function ( labelGroup ){
	      that.labelVisible(!graph.options().compactNotation());
	      return superDrawFunction(labelGroup);
	    };
	    
	    // Disallow overwriting the label
	    this.label = function ( p ){
	      if ( !arguments.length ) return label;
	      return this;
	    };
	    
	    this.linkType("dotted")
	      .markerType("white")
	      .styleClass("subclass")
	      .type("rdfs:subClassOf");
	    
	    that.baseIri("http://www.w3.org/2000/01/rdf-schema#");
	    that.iri("http://www.w3.org/2000/01/rdf-schema#subClassOf");
	    
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.labelVisible(false)
	      .linkType("dashed")
	      .markerType("white")
	      .styleClass("setoperatorproperty")
	      .type("setOperatorProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var _ = __webpack_require__(58);
	var math = __webpack_require__(43)();
	var linkCreator = __webpack_require__(60)();
	var elementTools = __webpack_require__(63)();
	// add some maps for nodes and properties -- used for object generation
	var nodePrototypeMap = __webpack_require__(5)();
	var propertyPrototypeMap = __webpack_require__(40)();


	module.exports = function ( graphContainerSelector ){
	  var graph = {},
	    CARDINALITY_HDISTANCE = 20,
	    CARDINALITY_VDISTANCE = 10,
	    curveFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("cardinal"),
	    options = __webpack_require__(64)(),
	    parser = __webpack_require__(65)(graph),
	    language = "default",
	    paused = false,
	    // Container for visual elements
	    graphContainer,
	    nodeContainer,
	    labelContainer,
	    cardinalityContainer,
	    linkContainer,
	    // Visual elements
	    nodeElements,
	    initialLoad = true,
	    updateRenderingDuringSimulation = false,
	    labelGroupElements,
	    linkGroups,
	    linkPathElements,
	    cardinalityElements,
	    // Internal data
	    classNodes,
	    labelNodes,
	    links,
	    properties,
	    unfilteredData,
	    // Graph behaviour
	    force,
	    dragBehaviour,
	    zoomFactor = 1.0,
	    centerGraphViewOnLoad = false,
	    transformAnimation = false,
	    graphTranslation = [0, 0],
	    graphUpdateRequired = false,
	    pulseNodeIds = [],
	    nodeArrayForPulse = [],
	    nodeMap = [],
	    locationId = 0,
	    defaultZoom = 1.0,
	    defaultTargetZoom = 0.8,
	    global_dof = -1,
	    touchDevice = false,
	    last_touch_time,
	    originalD3_dblClickFunction = null,
	    originalD3_touchZoomFunction = null,
	    
	    // editing elements
	    deleteGroupElement,
	    addDataPropertyGroupElement,
	    editContainer,
	    draggerLayer = null,
	    draggerObjectsArray = [],
	    delayedHider,
	    nodeFreezer,
	    hoveredNodeElement = null,
	    currentlySelectedNode = null,
	    hoveredPropertyElement = null,
	    draggingStarted = false,
	    frozenDomainForPropertyDragger,
	    frozenRangeForPropertyDragger,
	    
	    eP = 0, // id for new properties
	    eN = 0, // id for new Nodes
	    editMode = true,
	    debugContainer = d3.select("#FPS_Statistics"),
	    finishedLoadingSequence = false,
	    
	    ignoreOtherHoverEvents = false,
	    forceNotZooming = false,
	    now, then, // used for fps computation
	    showFPS = false,
	    seenEditorHint = false,
	    seenFilterWarning = false,
	    showFilterWarning = false,
	    
	    keepDetailsCollapsedOnLoading = true,
	    adjustingGraphSize = false,
	    showReloadButtonAfterLayoutOptimization = false,
	    zoom;
	  //var prefixModule=require("./prefixRepresentationModule")(graph);
	  var NodePrototypeMap = createLowerCasePrototypeMap(nodePrototypeMap);
	  var PropertyPrototypeMap = createLowerCasePrototypeMap(propertyPrototypeMap);
	  var classDragger = __webpack_require__(68)(graph);
	  var rangeDragger = __webpack_require__(69)(graph);
	  var domainDragger = __webpack_require__(70)(graph);
	  var shadowClone = __webpack_require__(71)(graph);
	  
	  graph.math = function (){
	    return math;
	  };
	  /** --------------------------------------------------------- **/
	  /** -- getter and setter definitions                       -- **/
	  /** --------------------------------------------------------- **/
	  graph.isEditorMode = function (){
	    return editMode;
	  };
	  graph.getGlobalDOF = function (){
	    return global_dof;
	  };
	  graph.setGlobalDOF = function ( val ){
	    global_dof = val;
	  };
	  
	  graph.updateZoomSliderValueFromOutside = function (){
	    graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	  };
	  
	  graph.setDefaultZoom = function ( val ){
	    defaultZoom = val;
	    graph.reset();
	    graph.options().zoomSlider().updateZoomSliderValue(defaultZoom);
	  };
	  graph.setTargetZoom = function ( val ){
	    defaultTargetZoom = val;
	  };
	  graph.graphOptions = function (){
	    return options;
	  };
	  
	  graph.scaleFactor = function (){
	    return zoomFactor;
	  };
	  graph.translation = function (){
	    return graphTranslation;
	  };
	  
	  // Returns the visible nodes
	  graph.graphNodeElements = function (){
	    return nodeElements;
	  };
	  // Returns the visible Label Nodes
	  graph.graphLabelElements = function (){
	    return labelNodes;
	  };
	  
	  graph.graphLinkElements = function (){
	    return links;
	  };
	  
	  graph.setSliderZoom = function ( val ){
	    
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    var eP = [cp.x, cp.y, graph.options().height() / val];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(1)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	      });
	  };
	  
	  
	  graph.setZoom = function ( value ){
	    zoom.scale(value);
	  };
	  
	  graph.setTranslation = function ( translation ){
	    zoom.translate([translation[0], translation[1]]);
	  };
	  
	  graph.options = function (){
	    return options;
	  };
	  // search functionality
	  graph.getUpdateDictionary = function (){
	    return parser.getDictionary();
	  };
	  
	  graph.language = function ( newLanguage ){
	    if ( !arguments.length ) return language;
	    
	    // Just update if the language changes
	    if ( language !== newLanguage ) {
	      language = newLanguage || "default";
	      redrawContent();
	      recalculatePositions();
	      graph.options().searchMenu().requestDictionaryUpdate();
	      graph.resetSearchHighlight();
	    }
	    return graph;
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** graph / rendering  related functions                      **/
	  /** --------------------------------------------------------- **/
	  
	  // Initializes the graph.
	  function initializeGraph(){
	    
	    options.graphContainerSelector(graphContainerSelector);
	    var moved = false;
	    force = d3.layout.force()
	      .on("tick", hiddenRecalculatePositions);
	    
	    dragBehaviour = d3.behavior.drag()
	      .origin(function ( d ){
	        return d;
	      })
	      .on("dragstart", function ( d ){
	        d3.event.sourceEvent.stopPropagation(); // Prevent panning
	        graph.ignoreOtherHoverEvents(true);
	        if ( d.type && d.type() === "Class_dragger" ) {
	          classDragger.mouseButtonPressed = true;
	          clearTimeout(delayedHider);
	          classDragger.selectedViaTouch(true);
	          d.parentNode().locked(true);
	          draggingStarted = true;
	        } else if ( d.type && d.type() === "Range_dragger" ) {
	          graph.ignoreOtherHoverEvents(true);
	          clearTimeout(delayedHider);
	          frozenDomainForPropertyDragger = shadowClone.parentNode().domain();
	          frozenRangeForPropertyDragger = shadowClone.parentNode().range();
	          shadowClone.setInitialPosition();
	          shadowClone.hideClone(false);
	          shadowClone.hideParentProperty(true);
	          shadowClone.updateElement();
	          deleteGroupElement.classed("hidden", true);
	          addDataPropertyGroupElement.classed("hidden", true);
	          frozenDomainForPropertyDragger.frozen(true);
	          frozenDomainForPropertyDragger.locked(true);
	          frozenRangeForPropertyDragger.frozen(true);
	          frozenRangeForPropertyDragger.locked(true);
	          domainDragger.updateElement();
	          domainDragger.mouseButtonPressed = true;
	          rangeDragger.updateElement();
	          rangeDragger.mouseButtonPressed = true;
	          //  shadowClone.setPosition(d.x, d.y);
	          
	          
	        } else if ( d.type && d.type() === "Domain_dragger" ) {
	          graph.ignoreOtherHoverEvents(true);
	          clearTimeout(delayedHider);
	          frozenDomainForPropertyDragger = shadowClone.parentNode().domain();
	          frozenRangeForPropertyDragger = shadowClone.parentNode().range();
	          shadowClone.setInitialPosition();
	          shadowClone.hideClone(false);
	          shadowClone.hideParentProperty(true);
	          shadowClone.updateElement();
	          deleteGroupElement.classed("hidden", true);
	          addDataPropertyGroupElement.classed("hidden", true);
	          
	          frozenDomainForPropertyDragger.frozen(true);
	          frozenDomainForPropertyDragger.locked(true);
	          frozenRangeForPropertyDragger.frozen(true);
	          frozenRangeForPropertyDragger.locked(true);
	          domainDragger.updateElement();
	          domainDragger.mouseButtonPressed = true;
	          rangeDragger.updateElement();
	          rangeDragger.mouseButtonPressed = true;
	        }
	        else {
	          d.locked(true);
	          moved = false;
	        }
	      })
	      .on("drag", function ( d ){
	        
	        if ( d.type && d.type() === "Class_dragger" ) {
	          clearTimeout(delayedHider);
	          classDragger.setPosition(d3.event.x, d3.event.y);
	        } else if ( d.type && d.type() === "Range_dragger" ) {
	          clearTimeout(delayedHider);
	          rangeDragger.setPosition(d3.event.x, d3.event.y);
	          shadowClone.setPosition(d3.event.x, d3.event.y);
	          domainDragger.updateElementViaRangeDragger(d3.event.x, d3.event.y);
	        }
	        else if ( d.type && d.type() === "Domain_dragger" ) {
	          clearTimeout(delayedHider);
	          domainDragger.setPosition(d3.event.x, d3.event.y);
	          shadowClone.setPositionDomain(d3.event.x, d3.event.y);
	          rangeDragger.updateElementViaDomainDragger(d3.event.x, d3.event.y);
	        }
	        
	        else {
	          d.px = d3.event.x;
	          d.py = d3.event.y;
	          force.resume();
	          updateHaloRadius();
	          moved = true;
	          if ( d.renderType && d.renderType() === "round" ) {
	            classDragger.setParentNode(d);
	          }
	          
	        }
	      })
	      .on("dragend", function ( d ){
	        graph.ignoreOtherHoverEvents(false);
	        if ( d.type && d.type() === "Class_dragger" ) {
	          var nX = classDragger.x;
	          var nY = classDragger.y;
	          clearTimeout(delayedHider);
	          classDragger.mouseButtonPressed = false;
	          classDragger.selectedViaTouch(false);
	          d.setParentNode(d.parentNode());
	          
	          var draggerEndPos = [nX, nY];
	          var targetNode = graph.getTargetNode(draggerEndPos);
	          if ( targetNode ) {
	            createNewObjectProperty(d.parentNode(), targetNode, draggerEndPos);
	          }
	          if ( touchDevice === false ) {
	            editElementHoverOut();
	          }
	          draggingStarted = false;
	        } else if ( d.type && d.type() === "Range_dragger" ) {
	          graph.ignoreOtherHoverEvents(false);
	          frozenDomainForPropertyDragger.frozen(false);
	          frozenDomainForPropertyDragger.locked(false);
	          frozenRangeForPropertyDragger.frozen(false);
	          frozenRangeForPropertyDragger.locked(false);
	          rangeDragger.mouseButtonPressed = false;
	          domainDragger.mouseButtonPressed = false;
	          domainDragger.updateElement();
	          rangeDragger.updateElement();
	          shadowClone.hideClone(true);
	          var rX = rangeDragger.x;
	          var rY = rangeDragger.y;
	          var rangeDraggerEndPos = [rX, rY];
	          var targetRangeNode = graph.getTargetNode(rangeDraggerEndPos);
	          if ( elementTools.isDatatype(targetRangeNode) === true ) {
	            targetRangeNode = null;
	            console.log("---------------TARGET NODE IS A DATATYPE/ LITERAL ------------");
	          }
	          
	          if ( targetRangeNode === null ) {
	            d.reDrawEverthing();
	            shadowClone.hideParentProperty(false);
	          }
	          else {
	            d.updateRange(targetRangeNode);
	            graph.update();
	            shadowClone.hideParentProperty(false);
	          }
	        } else if ( d.type && d.type() === "Domain_dragger" ) {
	          graph.ignoreOtherHoverEvents(false);
	          frozenDomainForPropertyDragger.frozen(false);
	          frozenDomainForPropertyDragger.locked(false);
	          frozenRangeForPropertyDragger.frozen(false);
	          frozenRangeForPropertyDragger.locked(false);
	          rangeDragger.mouseButtonPressed = false;
	          domainDragger.mouseButtonPressed = false;
	          domainDragger.updateElement();
	          rangeDragger.updateElement();
	          shadowClone.hideClone(true);
	          
	          var dX = domainDragger.x;
	          var dY = domainDragger.y;
	          var domainDraggerEndPos = [dX, dY];
	          var targetDomainNode = graph.getTargetNode(domainDraggerEndPos);
	          if ( elementTools.isDatatype(targetDomainNode) === true ) {
	            targetDomainNode = null;
	            console.log("---------------TARGET NODE IS A DATATYPE/ LITERAL ------------");
	          }
	          shadowClone.hideClone(true);
	          if ( targetDomainNode === null ) {
	            d.reDrawEverthing();
	            shadowClone.hideParentProperty(false);
	          }
	          else {
	            d.updateDomain(targetDomainNode);
	            graph.update();
	            shadowClone.hideParentProperty(false);
	          }
	        }
	        
	        else {
	          d.locked(false);
	          var pnp = graph.options().pickAndPinModule();
	          if ( pnp.enabled() === true && moved === true ) {
	            if ( d.id ) { // node
	              pnp.handle(d, true);
	            }
	            if ( d.property ) {
	              pnp.handle(d.property(), true);
	            }
	          }
	        }
	      });
	    
	    // Apply the zooming factor.
	    zoom = d3.behavior.zoom()
	      .duration(150)
	      .scaleExtent([options.minMagnification(), options.maxMagnification()])
	      .on("zoom", zoomed);
	    
	    draggerObjectsArray.push(classDragger);
	    draggerObjectsArray.push(rangeDragger);
	    draggerObjectsArray.push(domainDragger);
	    draggerObjectsArray.push(shadowClone);
	    force.stop();
	  }
	  
	  graph.lazyRefresh = function (){
	    redrawContent();
	    recalculatePositions();
	  };
	  
	  graph.adjustingGraphSize = function ( val ){
	    adjustingGraphSize = val;
	  };
	  
	  graph.showReloadButtonAfterLayoutOptimization = function ( show ){
	    showReloadButtonAfterLayoutOptimization = show;
	  };
	  
	  
	  function hiddenRecalculatePositions(){
	    finishedLoadingSequence = false;
	    if ( graph.options().loadingModule().successfullyLoadedOntology() === false ) {
	      force.stop();
	      d3.select("#progressBarValue").node().innerHTML = "";
	      graph.updateProgressBarMode();
	      graph.options().loadingModule().showErrorDetailsMessage(hiddenRecalculatePositions);
	      if ( keepDetailsCollapsedOnLoading && adjustingGraphSize === false ) {
	        graph.options().loadingModule().collapseDetails("hiddenRecalculatePositions");
	      }
	      return;
	    }
	    if ( updateRenderingDuringSimulation === false ) {
	      var value = 1.0 - 10 * force.alpha();
	      var percent = parseInt(200 * value) + "%";
	      graph.options().loadingModule().setPercentValue(percent);
	      d3.select("#progressBarValue").style("width", percent);
	      d3.select("#progressBarValue").node().innerHTML = percent;
	      
	      if ( value > 0.49 ) {
	        updateRenderingDuringSimulation = true;
	        // show graph container;
	        if ( graphContainer ) {
	          graphContainer.style("opacity", "1");
	          percent = "100%";
	          d3.select("#progressBarValue").style("width", percent);
	          d3.select("#progressBarValue").node().innerHTML = percent;
	          graph.options().ontologyMenu().append_message_toLastBulletPoint("done");
	          d3.select("#reloadCachedOntology").classed("hidden", !showReloadButtonAfterLayoutOptimization);
	          if ( showFilterWarning === true && seenFilterWarning === false ) {
	            graph.options().warningModule().showFilterHint();
	            seenFilterWarning = true;
	          }
	        }
	        
	        if ( initialLoad ) {
	          if ( graph.paused() === false )
	            force.resume(); // resume force
	          initialLoad = false;
	          
	        }
	        
	        
	        finishedLoadingSequence = true;
	        if ( showFPS === true ) {
	          force.on("tick", recalculatePositionsWithFPS);
	          recalculatePositionsWithFPS();
	        }
	        else {
	          force.on("tick", recalculatePositions);
	          recalculatePositions();
	        }
	        
	        if ( centerGraphViewOnLoad === true && force.nodes().length > 0 ) {
	          if ( force.nodes().length < 10 ) graph.forceRelocationEvent(true); // uses dynamic zoomer;
	          else graph.forceRelocationEvent();
	          centerGraphViewOnLoad = false;
	          // console.log("--------------------------------------")
	        }
	        
	        
	        graph.showEditorHintIfNeeded();
	        
	        if ( graph.options().loadingModule().missingImportsWarning() === false ) {
	          graph.options().loadingModule().hideLoadingIndicator();
	          graph.options().ontologyMenu().append_bulletPoint("Successfully loaded ontology");
	          graph.options().loadingModule().setSuccessful();
	        } else {
	          graph.options().loadingModule().showWarningDetailsMessage();
	          graph.options().ontologyMenu().append_bulletPoint("Loaded ontology with warnings");
	        }
	      }
	    }
	  }
	  
	  graph.showEditorHintIfNeeded = function (){
	    if ( seenEditorHint === false && editMode === true ) {
	      seenEditorHint = true;
	      graph.options().warningModule().showEditorHint();
	    }
	  };
	  
	  graph.setForceTickFunctionWithFPS = function (){
	    showFPS = true;
	    if ( force && finishedLoadingSequence === true ) {
	      force.on("tick", recalculatePositionsWithFPS);
	    }
	    
	  };
	  graph.setDefaultForceTickFunction = function (){
	    showFPS = false;
	    if ( force && finishedLoadingSequence === true ) {
	      force.on("tick", recalculatePositions);
	    }
	  };
	  function recalculatePositionsWithFPS(){
	    // compute the fps
	    
	    recalculatePositions();
	    now = Date.now();
	    var diff = now - then;
	    var fps = (1000 / (diff)).toFixed(2);
	    
	    debugContainer.node().innerHTML = "FPS: " + fps + "<br>" + "Nodes: " + force.nodes().length + "<br>" + "Links: " + force.links().length;
	    then = Date.now();
	    
	  }
	  
	  function recalculatePositions(){
	    // Set node positions
	    
	    
	    // add switch for edit mode to make this faster;
	    if ( !editMode ) {
	      nodeElements.attr("transform", function ( node ){
	        return "translate(" + node.x + "," + node.y + ")";
	      });
	      
	      // Set label group positions
	      labelGroupElements.attr("transform", function ( label ){
	        var position;
	        
	        // force centered positions on single-layered links
	        var link = label.link();
	        if ( link.layers().length === 1 && !link.loops() ) {
	          var linkDomainIntersection = math.calculateIntersection(link.range(), link.domain(), 0);
	          var linkRangeIntersection = math.calculateIntersection(link.domain(), link.range(), 0);
	          position = math.calculateCenter(linkDomainIntersection, linkRangeIntersection);
	          label.x = position.x;
	          label.y = position.y;
	        }
	        return "translate(" + label.x + "," + label.y + ")";
	      });
	      // Set link paths and calculate additional information
	      linkPathElements.attr("d", function ( l ){
	        if ( l.isLoop() ) {
	          return math.calculateLoopPath(l);
	        }
	        var curvePoint = l.label();
	        var pathStart = math.calculateIntersection(curvePoint, l.domain(), 1);
	        var pathEnd = math.calculateIntersection(curvePoint, l.range(), 1);
	        
	        return curveFunction([pathStart, curvePoint, pathEnd]);
	      });
	      
	      // Set cardinality positions
	      cardinalityElements.attr("transform", function ( property ){
	        
	        var label = property.link().label(),
	          pos = math.calculateIntersection(label, property.range(), CARDINALITY_HDISTANCE),
	          normalV = math.calculateNormalVector(label, property.range(), CARDINALITY_VDISTANCE);
	        
	        return "translate(" + (pos.x + normalV.x) + "," + (pos.y + normalV.y) + ")";
	      });
	      
	      
	      updateHaloRadius();
	      return;
	    }
	    
	    // TODO: this is Editor redraw function // we need to make this faster!!
	    
	    
	    nodeElements.attr("transform", function ( node ){
	      return "translate(" + node.x + "," + node.y + ")";
	    });
	    
	    // Set label group positions
	    labelGroupElements.attr("transform", function ( label ){
	      var position;
	      
	      // force centered positions on single-layered links
	      var link = label.link();
	      if ( link.layers().length === 1 && !link.loops() ) {
	        var linkDomainIntersection = math.calculateIntersection(link.range(), link.domain(), 0);
	        var linkRangeIntersection = math.calculateIntersection(link.domain(), link.range(), 0);
	        position = math.calculateCenter(linkDomainIntersection, linkRangeIntersection);
	        label.x = position.x;
	        label.y = position.y;
	        label.linkRangeIntersection = linkRangeIntersection;
	        label.linkDomainIntersection = linkDomainIntersection;
	        if ( link.property().focused() === true || hoveredPropertyElement !== undefined ) {
	          rangeDragger.updateElement();
	          domainDragger.updateElement();
	          // shadowClone.setPosition(link.property().range().x,link.property().range().y);
	          // shadowClone.setPositionDomain(link.property().domain().x,link.property().domain().y);
	        }
	      } else {
	        label.linkDomainIntersection = math.calculateIntersection(link.label(), link.domain(), 0);
	        label.linkRangeIntersection = math.calculateIntersection(link.label(), link.range(), 0);
	        if ( link.property().focused() === true || hoveredPropertyElement !== undefined ) {
	          rangeDragger.updateElement();
	          domainDragger.updateElement();
	          // shadowClone.setPosition(link.property().range().x,link.property().range().y);
	          // shadowClone.setPositionDomain(link.property().domain().x,link.property().domain().y);
	        }
	        
	      }
	      return "translate(" + label.x + "," + label.y + ")";
	    });
	    // Set link paths and calculate additional information
	    linkPathElements.attr("d", function ( l ){
	      if ( l.isLoop() ) {
	        
	        var ptrAr = math.getLoopPoints(l);
	        l.label().linkRangeIntersection = ptrAr[1];
	        l.label().linkDomainIntersection = ptrAr[0];
	        
	        if ( l.property().focused() === true || hoveredPropertyElement !== undefined ) {
	          rangeDragger.updateElement();
	          domainDragger.updateElement();
	        }
	        return math.calculateLoopPath(l);
	      }
	      var curvePoint = l.label();
	      var pathStart = math.calculateIntersection(curvePoint, l.domain(), 1);
	      var pathEnd = math.calculateIntersection(curvePoint, l.range(), 1);
	      l.linkRangeIntersection = pathStart;
	      l.linkDomainIntersection = pathEnd;
	      if ( l.property().focused() === true || hoveredPropertyElement !== undefined ) {
	        domainDragger.updateElement();
	        rangeDragger.updateElement();
	        // shadowClone.setPosition(l.property().range().x,l.property().range().y);
	        // shadowClone.setPositionDomain(l.property().domain().x,l.property().domain().y);
	      }
	      return curveFunction([pathStart, curvePoint, pathEnd]);
	    });
	    
	    // Set cardinality positions
	    cardinalityElements.attr("transform", function ( property ){
	      
	      var label = property.link().label(),
	        pos = math.calculateIntersection(label, property.range(), CARDINALITY_HDISTANCE),
	        normalV = math.calculateNormalVector(label, property.range(), CARDINALITY_VDISTANCE);
	      
	      return "translate(" + (pos.x + normalV.x) + "," + (pos.y + normalV.y) + ")";
	    });
	    
	    if ( hoveredNodeElement ) {
	      setDeleteHoverElementPosition(hoveredNodeElement);
	      setAddDataPropertyHoverElementPosition(hoveredNodeElement);
	      if ( draggingStarted === false ) {
	        classDragger.setParentNode(hoveredNodeElement);
	      }
	    }
	    if ( hoveredPropertyElement ) {
	      setDeleteHoverElementPositionProperty(hoveredPropertyElement);
	    }
	    
	    updateHaloRadius();
	  }
	  
	  graph.updatePropertyDraggerElements = function ( property ){
	    if ( property.type() !== "owl:DatatypeProperty" ) {
	      
	      shadowClone.setParentProperty(property);
	      rangeDragger.setParentProperty(property);
	      rangeDragger.hideDragger(false);
	      rangeDragger.addMouseEvents();
	      domainDragger.setParentProperty(property);
	      domainDragger.hideDragger(false);
	      domainDragger.addMouseEvents();
	      
	    }
	    else {
	      rangeDragger.hideDragger(true);
	      domainDragger.hideDragger(true);
	      shadowClone.hideClone(true);
	    }
	  };
	  
	  function addClickEvents(){
	    function executeModules( selectedElement ){
	      options.selectionModules().forEach(function ( module ){
	        module.handle(selectedElement);
	      });
	    }
	    
	    nodeElements.on("click", function ( clickedNode ){
	      
	      // manaual double clicker // helper for iphone 6 etc...
	      if ( touchDevice === true && doubletap() === true ) {
	        d3.event.stopPropagation();
	        if ( editMode === true ) {
	          clickedNode.raiseDoubleClickEdit(defaultIriValue(clickedNode));
	        }
	      }
	      else {
	        executeModules(clickedNode);
	      }
	    });
	    
	    nodeElements.on("dblclick", function ( clickedNode ){
	      
	      d3.event.stopPropagation();
	      if ( editMode === true ) {
	        clickedNode.raiseDoubleClickEdit(defaultIriValue(clickedNode));
	      }
	    });
	    
	    labelGroupElements.selectAll(".label").on("click", function ( clickedProperty ){
	      executeModules(clickedProperty);
	      
	      // this is for enviroments that do not define dblClick function;
	      if ( touchDevice === true && doubletap() === true ) {
	        d3.event.stopPropagation();
	        if ( editMode === true ) {
	          clickedProperty.raiseDoubleClickEdit(defaultIriValue(clickedProperty));
	        }
	      }
	      
	      // currently removed the selection of an element to invoke the dragger
	      // if (editMode===true && clickedProperty.editingTextElement!==true) {
	      //     return;
	      //      // We say that Datatype properties are not allowed to have domain range draggers
	      //      if (clickedProperty.focused() && clickedProperty.type() !== "owl:DatatypeProperty") {
	      //          shadowClone.setParentProperty(clickedProperty);
	      //          rangeDragger.setParentProperty(clickedProperty);
	      //          rangeDragger.hideDragger(false);
	      //          rangeDragger.addMouseEvents();
	      //          domainDragger.setParentProperty(clickedProperty);
	      //          domainDragger.hideDragger(false);
	      //          domainDragger.addMouseEvents();
	      //
	      //          if (clickedProperty.domain()===clickedProperty.range()){
	      //              clickedProperty.labelObject().increasedLoopAngle=true;
	      //              recalculatePositions();
	      //
	      //          }
	      //
	      //      } else if (clickedProperty.focused() && clickedProperty.type() === "owl:DatatypeProperty") {
	      //          shadowClone.setParentProperty(clickedProperty);
	      //          rangeDragger.setParentProperty(clickedProperty);
	      //          rangeDragger.hideDragger(true);
	      //          rangeDragger.addMouseEvents();
	      //          domainDragger.setParentProperty(clickedProperty);
	      //          domainDragger.hideDragger(false);
	      //          domainDragger.addMouseEvents();
	      //
	      //      }
	      //      else {
	      //          rangeDragger.hideDragger(true);
	      //          domainDragger.hideDragger(true);
	      //          if (clickedProperty.domain()===clickedProperty.range()){
	      //              clickedProperty.labelObject().increasedLoopAngle=false;
	      //              recalculatePositions();
	      //
	      //          }
	      //      }
	      //  }
	    });
	    labelGroupElements.selectAll(".label").on("dblclick", function ( clickedProperty ){
	      d3.event.stopPropagation();
	      if ( editMode === true ) {
	        clickedProperty.raiseDoubleClickEdit(defaultIriValue(clickedProperty));
	      }
	      
	    });
	  }
	  
	  function defaultIriValue( element ){
	    // get the iri of that element;
	    if ( graph.options().getGeneralMetaObject().iri ) {
	      var str2Compare = graph.options().getGeneralMetaObject().iri + element.id();
	      return element.iri() === str2Compare;
	    }
	    return false;
	  }
	  
	  /** Adjusts the containers current scale and position. */
	  function zoomed(){
	    if ( forceNotZooming === true ) {
	      zoom.translate(graphTranslation);
	      zoom.scale(zoomFactor);
	      return;
	    }
	    
	    
	    var zoomEventByMWheel = false;
	    if ( d3.event.sourceEvent ) {
	      if ( d3.event.sourceEvent.deltaY ) zoomEventByMWheel = true;
	    }
	    if ( zoomEventByMWheel === false ) {
	      if ( transformAnimation === true ) {
	        return;
	      }
	      zoomFactor = d3.event.scale;
	      graphTranslation = d3.event.translate;
	      graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	      updateHaloRadius();
	      graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	      return;
	    }
	    /** animate the transition **/
	    zoomFactor = d3.event.scale;
	    graphTranslation = d3.event.translate;
	    graphContainer.transition()
	      .tween("attr.translate", function (){
	        return function ( t ){
	          transformAnimation = true;
	          var tr = d3.transform(graphContainer.attr("transform"));
	          graphTranslation[0] = tr.translate[0];
	          graphTranslation[1] = tr.translate[1];
	          zoomFactor = tr.scale[0];
	          updateHaloRadius();
	          graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	        };
	      })
	      .each("end", function (){
	        transformAnimation = false;
	      })
	      .attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")")
	      .ease('linear')
	      .duration(250);
	  }// end of zoomed function
	  
	  function redrawGraph(){
	    remove();
	    
	    graphContainer = d3.selectAll(options.graphContainerSelector())
	      .append("svg")
	      .classed("vowlGraph", true)
	      .attr("width", options.width())
	      .attr("height", options.height())
	      .call(zoom)
	      .append("g");
	    // add touch and double click functions
	    
	    var svgGraph = d3.selectAll(".vowlGraph");
	    originalD3_dblClickFunction = svgGraph.on("dblclick.zoom");
	    originalD3_touchZoomFunction = svgGraph.on("touchstart");
	    svgGraph.on("touchstart", touchzoomed);
	    if ( editMode === true ) {
	      svgGraph.on("dblclick.zoom", graph.modified_dblClickFunction);
	    }
	    else {
	      svgGraph.on("dblclick.zoom", originalD3_dblClickFunction);
	    }
	    
	  }
	  
	  function generateEditElements(){
	    addDataPropertyGroupElement = editContainer.append('g')
	      .classed("hidden-in-export", true)
	      .classed("hidden", true)
	      .classed("addDataPropertyElement", true)
	      .attr("transform", "translate(" + 0 + "," + 0 + ")");
	    
	    
	    addDataPropertyGroupElement.append("circle")
	    // .classed("deleteElement", true)
	      .attr("r", 12)
	      .attr("cx", 0)
	      .attr("cy", 0)
	      .append("title").text("Add Datatype Property");
	    
	    addDataPropertyGroupElement.append("line")
	    // .classed("deleteElementIcon ",true)
	      .attr("x1", -8)
	      .attr("y1", 0)
	      .attr("x2", 8)
	      .attr("y2", 0)
	      .append("title").text("Add Datatype Property");
	    
	    addDataPropertyGroupElement.append("line")
	    // .classed("deleteElementIcon",true)
	      .attr("x1", 0)
	      .attr("y1", -8)
	      .attr("x2", 0)
	      .attr("y2", 8)
	      .append("title").text("Add Datatype Property");
	    
	    if ( graph.options().useAccuracyHelper() ) {
	      addDataPropertyGroupElement.append("circle")
	        .attr("r", 15)
	        .attr("cx", -7)
	        .attr("cy", 7)
	        .classed("superHiddenElement", true)
	        .classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	    deleteGroupElement = editContainer.append('g')
	      .classed("hidden-in-export", true)
	      .classed("hidden", true)
	      .classed("deleteParentElement", true)
	      .attr("transform", "translate(" + 0 + "," + 0 + ")");
	    
	    deleteGroupElement.append("circle")
	      .attr("r", 12)
	      .attr("cx", 0)
	      .attr("cy", 0)
	      .append("title").text("Delete This Node");
	    
	    var crossLen = 5;
	    deleteGroupElement.append("line")
	      .attr("x1", -crossLen)
	      .attr("y1", -crossLen)
	      .attr("x2", crossLen)
	      .attr("y2", crossLen)
	      .append("title").text("Delete This Node");
	    
	    deleteGroupElement.append("line")
	      .attr("x1", crossLen)
	      .attr("y1", -crossLen)
	      .attr("x2", -crossLen)
	      .attr("y2", crossLen)
	      .append("title").text("Delete This Node");
	    
	    if ( graph.options().useAccuracyHelper() ) {
	      deleteGroupElement.append("circle")
	        .attr("r", 15)
	        .attr("cx", 7)
	        .attr("cy", -7)
	        .classed("superHiddenElement", true)
	        .classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  }
	  
	  graph.getUnfilteredData = function (){
	    return unfilteredData;
	  };
	  
	  graph.getClassDataForTtlExport = function (){
	    var allNodes = unfilteredData.nodes;
	    var nodeData = [];
	    for ( var i = 0; i < allNodes.length; i++ ) {
	      if ( allNodes[i].type() !== "rdfs:Literal" &&
	        allNodes[i].type() !== "rdfs:Datatype" &&
	        allNodes[i].type() !== "owl:Thing" ) {
	        nodeData.push(allNodes[i]);
	      }
	    }
	    return nodeData;
	  };
	  
	  graph.getPropertyDataForTtlExport = function (){
	    var propertyData = [];
	    var allProperties = unfilteredData.properties;
	    for ( var i = 0; i < allProperties.length; i++ ) {
	      // currently using only the object properties
	      if ( allProperties[i].type() === "owl:ObjectProperty" ||
	        allProperties[i].type() === "owl:DatatypeProperty" ||
	        allProperties[i].type() === "owl:ObjectProperty"
	      
	      ) {
	        propertyData.push(allProperties[i]);
	      } else {
	        if ( allProperties[i].type() === "rdfs:subClassOf" ) {
	          allProperties[i].baseIri("http://www.w3.org/2000/01/rdf-schema#");
	          allProperties[i].iri("http://www.w3.org/2000/01/rdf-schema#subClassOf");
	        }
	        if ( allProperties[i].type() === "owl:disjointWith" ) {
	          allProperties[i].baseIri("http://www.w3.org/2002/07/owl#");
	          allProperties[i].iri("http://www.w3.org/2002/07/owl#disjointWith");
	        }
	      }
	    }
	    return propertyData;
	  };
	  
	  graph.getAxiomsForTtlExport = function (){
	    var axioms = [];
	    var allProperties = unfilteredData.properties;
	    for ( var i = 0; i < allProperties.length; i++ ) {
	      // currently using only the object properties
	      if ( allProperties[i].type() === "owl:ObjectProperty" ||
	        allProperties[i].type() === "owl:DatatypeProperty" ||
	        allProperties[i].type() === "owl:ObjectProperty" ||
	        allProperties[i].type() === "rdfs:subClassOf"
	      ) {
	      } else {
	      }
	    }
	    return axioms;
	  };
	  
	  
	  graph.getUnfilteredData = function (){
	    return unfilteredData;
	  };
	  
	  graph.getClassDataForTtlExport = function (){
	    var allNodes = unfilteredData.nodes;
	    var nodeData = [];
	    for ( var i = 0; i < allNodes.length; i++ ) {
	      if ( allNodes[i].type() !== "rdfs:Literal" &&
	        allNodes[i].type() !== "rdfs:Datatype" &&
	        allNodes[i].type() !== "owl:Thing" ) {
	        nodeData.push(allNodes[i]);
	      }
	    }
	    return nodeData;
	  };
	  
	  
	  function redrawContent(){
	    var markerContainer;
	    
	    if ( !graphContainer ) {
	      return;
	    }
	    
	    // Empty the graph container
	    graphContainer.selectAll("*").remove();
	    
	    // Last container -> elements of this container overlap others
	    linkContainer = graphContainer.append("g").classed("linkContainer", true);
	    cardinalityContainer = graphContainer.append("g").classed("cardinalityContainer", true);
	    labelContainer = graphContainer.append("g").classed("labelContainer", true);
	    nodeContainer = graphContainer.append("g").classed("nodeContainer", true);
	    
	    // adding editing Elements
	    var draggerPathLayer = graphContainer.append("g").classed("linkContainer", true);
	    draggerLayer = graphContainer.append("g").classed("editContainer", true);
	    editContainer = graphContainer.append("g").classed("editContainer", true);
	    
	    draggerPathLayer.classed("hidden-in-export", true);
	    editContainer.classed("hidden-in-export", true);
	    draggerLayer.classed("hidden-in-export", true);
	    
	    // Add an extra container for all markers
	    markerContainer = linkContainer.append("defs");
	    var drElement = draggerLayer.selectAll(".node")
	      .data(draggerObjectsArray).enter()
	      .append("g")
	      .classed("node", true)
	      .classed("hidden-in-export", true)
	      .attr("id", function ( d ){
	        return d.id();
	      })
	      .call(dragBehaviour);
	    drElement.each(function ( node ){
	      node.svgRoot(d3.select(this));
	      node.svgPathLayer(draggerPathLayer);
	      if ( node.type() === "shadowClone" ) {
	        node.drawClone();
	        node.hideClone(true);
	      } else {
	        node.drawNode();
	        node.hideDragger(true);
	      }
	    });
	    generateEditElements();
	    
	    
	    // Add an extra container for all markers
	    markerContainer = linkContainer.append("defs");
	    
	    // Draw nodes
	    
	    if ( classNodes === undefined ) classNodes = [];
	    
	    nodeElements = nodeContainer.selectAll(".node")
	      .data(classNodes).enter()
	      .append("g")
	      .classed("node", true)
	      .attr("id", function ( d ){
	        return d.id();
	      })
	      .call(dragBehaviour);
	    nodeElements.each(function ( node ){
	      node.draw(d3.select(this));
	    });
	    
	    
	    if ( labelNodes === undefined ) labelNodes = [];
	    
	    // Draw label groups (property + inverse)
	    labelGroupElements = labelContainer.selectAll(".labelGroup")
	      .data(labelNodes).enter()
	      .append("g")
	      .classed("labelGroup", true)
	      .call(dragBehaviour);
	    
	    labelGroupElements.each(function ( label ){
	      var success = label.draw(d3.select(this));
	      label.property().labelObject(label);
	      // Remove empty groups without a label.
	      if ( !success ) {
	        d3.select(this).remove();
	      }
	    });
	    // Place subclass label groups on the bottom of all labels
	    labelGroupElements.each(function ( label ){
	      // the label might be hidden e.g. in compact notation
	      if ( !this.parentNode ) {
	        return;
	      }
	      
	      if ( elementTools.isRdfsSubClassOf(label.property()) ) {
	        var parentNode = this.parentNode;
	        parentNode.insertBefore(this, parentNode.firstChild);
	      }
	    });
	    if ( properties === undefined ) properties = [];
	    // Draw cardinality elements
	    cardinalityElements = cardinalityContainer.selectAll(".cardinality")
	      .data(properties).enter()
	      .append("g")
	      .classed("cardinality", true);
	    
	    cardinalityElements.each(function ( property ){
	      var success = property.drawCardinality(d3.select(this));
	      
	      // Remove empty groups without a label.
	      if ( !success ) {
	        d3.select(this).remove();
	      }
	    });
	    // Draw links
	    if ( links === undefined ) links = [];
	    linkGroups = linkContainer.selectAll(".link")
	      .data(links).enter()
	      .append("g")
	      .classed("link", true);
	    
	    linkGroups.each(function ( link ){
	      link.draw(d3.select(this), markerContainer);
	    });
	    linkPathElements = linkGroups.selectAll("path");
	    // Select the path for direct access to receive a better performance
	    addClickEvents();
	  }
	  
	  function remove(){
	    if ( graphContainer ) {
	      // Select the parent element because the graph container is a group (e.g. for zooming)
	      d3.select(graphContainer.node().parentNode).remove();
	    }
	  }
	  
	  initializeGraph(); // << call the initialization function
	  
	  graph.updateCanvasContainerSize = function (){
	    if ( graphContainer ) {
	      var svgElement = d3.selectAll(".vowlGraph");
	      svgElement.attr("width", options.width());
	      svgElement.attr("height", options.height());
	      graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	    }
	  };
	  
	  // Loads all settings, removes the old graph (if it exists) and draws a new one.
	  graph.start = function (){
	    force.stop();
	    loadGraphData(true);
	    redrawGraph();
	    graph.update(true);
	    
	    if ( graph.options().loadingModule().successfullyLoadedOntology() === false ) {
	      graph.options().loadingModule().setErrorMode();
	    }
	    
	  };
	  
	  // Updates only the style of the graph.
	  graph.updateStyle = function (){
	    refreshGraphStyle();
	    if ( graph.options().loadingModule().successfullyLoadedOntology() === false ) {
	      force.stop();
	    } else {
	      force.start();
	    }
	  };
	  
	  graph.reload = function (){
	    loadGraphData();
	    graph.update();
	    
	  };
	  
	  graph.load = function (){
	    force.stop();
	    loadGraphData();
	    refreshGraphData();
	    for ( var i = 0; i < labelNodes.length; i++ ) {
	      var label = labelNodes[i];
	      if ( label.property().x && label.property().y ) {
	        label.x = label.property().x;
	        label.y = label.property().y;
	        // also set the prev position of the label
	        label.px = label.x;
	        label.py = label.y;
	      }
	    }
	    graph.update();
	  };
	  
	  graph.fastUpdate = function (){
	    // fast update function for editor calls;
	    // -- experimental ;
	    quick_refreshGraphData();
	    updateNodeMap();
	    force.start();
	    redrawContent();
	    graph.updatePulseIds(nodeArrayForPulse);
	    refreshGraphStyle();
	    updateHaloStyles();
	    
	  };
	  
	  graph.getNodeMapForSearch = function (){
	    return nodeMap;
	  };
	  function updateNodeMap(){
	    nodeMap = [];
	    var node;
	    for ( var j = 0; j < force.nodes().length; j++ ) {
	      node = force.nodes()[j];
	      if ( node.id ) {
	        nodeMap[node.id()] = j;
	        // check for equivalents
	        var eqs = node.equivalents();
	        if ( eqs.length > 0 ) {
	          for ( var e = 0; e < eqs.length; e++ ) {
	            var eqObject = eqs[e];
	            nodeMap[eqObject.id()] = j;
	          }
	        }
	      }
	      if ( node.property ) {
	        nodeMap[node.property().id()] = j;
	        var inverse = node.inverse();
	        if ( inverse ) {
	          nodeMap[inverse.id()] = j;
	        }
	      }
	    }
	  }
	  
	  function updateHaloStyles(){
	    var haloElement;
	    var halo;
	    var node;
	    for ( var j = 0; j < force.nodes().length; j++ ) {
	      node = force.nodes()[j];
	      if ( node.id ) {
	        haloElement = node.getHalos();
	        if ( haloElement ) {
	          halo = haloElement.selectAll(".searchResultA");
	          halo.classed("searchResultA", false);
	          halo.classed("searchResultB", true);
	        }
	      }
	      
	      if ( node.property ) {
	        haloElement = node.property().getHalos();
	        if ( haloElement ) {
	          halo = haloElement.selectAll(".searchResultA");
	          halo.classed("searchResultA", false);
	          halo.classed("searchResultB", true);
	        }
	      }
	    }
	  }
	  
	  // Updates the graphs displayed data and style.
	  graph.update = function ( init ){
	    var validOntology = graph.options().loadingModule().successfullyLoadedOntology();
	    if ( validOntology === false && (init && init === true) ) {
	      graph.options().loadingModule().collapseDetails();
	      return;
	    }
	    if ( validOntology === false ) {
	      return;
	    }
	    
	    keepDetailsCollapsedOnLoading = false;
	    refreshGraphData();
	    // update node map
	    updateNodeMap();
	    
	    force.start();
	    redrawContent();
	    graph.updatePulseIds(nodeArrayForPulse);
	    refreshGraphStyle();
	    updateHaloStyles();
	  };
	  
	  graph.paused = function ( p ){
	    if ( !arguments.length ) return paused;
	    paused = p;
	    graph.updateStyle();
	    return graph;
	  };
	  // resetting the graph
	  graph.reset = function (){
	    // window size
	    var w = 0.5 * graph.options().width();
	    var h = 0.5 * graph.options().height();
	    // computing initial translation for the graph due tue the dynamic default zoom level
	    var tx = w - defaultZoom * w;
	    var ty = h - defaultZoom * h;
	    zoom.translate([tx, ty])
	      .scale(defaultZoom);
	  };
	  
	  
	  graph.zoomOut = function (){
	    
	    var minMag = options.minMagnification(),
	      maxMag = options.maxMagnification();
	    var stepSize = (maxMag - minMag) / 10;
	    var val = zoomFactor - stepSize;
	    if ( val < minMag ) val = minMag;
	    
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    var eP = [cp.x, cp.y, graph.options().height() / val];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(250)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        updateHaloRadius();
	        options.zoomSlider().updateZoomSliderValue(zoomFactor);
	      });
	    
	  };
	  
	  graph.zoomIn = function (){
	    var minMag = options.minMagnification(),
	      maxMag = options.maxMagnification();
	    var stepSize = (maxMag - minMag) / 10;
	    var val = zoomFactor + stepSize;
	    if ( val > maxMag ) val = maxMag;
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    var eP = [cp.x, cp.y, graph.options().height() / val];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(250)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        updateHaloRadius();
	        options.zoomSlider().updateZoomSliderValue(zoomFactor);
	      });
	    
	    
	  };
	  
	  /** --------------------------------------------------------- **/
	  /** -- data related handling                               -- **/
	  /** --------------------------------------------------------- **/
	  
	  var cachedJsonOBJ = null;
	  graph.clearAllGraphData = function (){
	    if ( graph.graphNodeElements() && graph.graphNodeElements().length > 0 ) {
	      cachedJsonOBJ = graph.options().exportMenu().createJSON_exportObject();
	    } else {
	      cachedJsonOBJ = null;
	    }
	    force.stop();
	    if ( unfilteredData ) {
	      unfilteredData.nodes = [];
	      unfilteredData.properties = [];
	    }
	  };
	  graph.getCachedJsonObj = function (){
	    return cachedJsonOBJ;
	  };
	  
	  // removes data when data could not be loaded
	  graph.clearGraphData = function (){
	    force.stop();
	    var sidebar = graph.options().sidebar();
	    if ( sidebar )
	      sidebar.clearOntologyInformation();
	    if ( graphContainer )
	      redrawGraph();
	  };
	  
	  function generateDictionary( data ){
	    var i;
	    var originalDictionary = [];
	    var nodes = data.nodes;
	    for ( i = 0; i < nodes.length; i++ ) {
	      // check if node has a label
	      if ( nodes[i].labelForCurrentLanguage() !== undefined )
	        originalDictionary.push(nodes[i]);
	    }
	    var props = data.properties;
	    for ( i = 0; i < props.length; i++ ) {
	      if ( props[i].labelForCurrentLanguage() !== undefined )
	        originalDictionary.push(props[i]);
	    }
	    parser.setDictionary(originalDictionary);
	    
	    var literFilter = graph.options().literalFilter();
	    var idsToRemove = literFilter.removedNodes();
	    var originalDict = parser.getDictionary();
	    var newDict = [];
	    
	    // go through the dictionary and remove the ids;
	    for ( i = 0; i < originalDict.length; i++ ) {
	      var dictElement = originalDict[i];
	      var dictElementId;
	      if ( dictElement.property )
	        dictElementId = dictElement.property().id();
	      else
	        dictElementId = dictElement.id();
	      // compare against the removed ids;
	      var addToDictionary = true;
	      for ( var j = 0; j < idsToRemove.length; j++ ) {
	        var currentId = idsToRemove[j];
	        if ( currentId === dictElementId ) {
	          addToDictionary = false;
	        }
	      }
	      if ( addToDictionary === true ) {
	        newDict.push(dictElement);
	      }
	    }
	    // tell the parser that the dictionary is updated
	    parser.setDictionary(newDict);
	    
	  }
	  
	  graph.updateProgressBarMode = function (){
	    var loadingModule = graph.options().loadingModule();
	    
	    var state = loadingModule.getProgressBarMode();
	    switch ( state ) {
	      case  0:
	        loadingModule.setErrorMode();
	        break;
	      case  1:
	        loadingModule.setBusyMode();
	        break;
	      case  2:
	        loadingModule.setPercentMode();
	        break;
	      default:
	        loadingModule.setPercentMode();
	    }
	  };
	  
	  graph.setFilterWarning = function ( val ){
	    showFilterWarning = val;
	  };
	  function loadGraphData( init ){
	    // reset the locate button and previously selected locations and other variables
	    
	    var loadingModule = graph.options().loadingModule();
	    force.stop();
	    
	    force.nodes([]);
	    force.links([]);
	    nodeArrayForPulse = [];
	    pulseNodeIds = [];
	    locationId = 0;
	    d3.select("#locateSearchResult").classed("highlighted", false);
	    d3.select("#locateSearchResult").node().title = "Nothing to locate";
	    graph.clearGraphData();
	    
	    if ( init ) {
	      force.stop();
	      return;
	    }
	    
	    showFilterWarning = false;
	    parser.parse(options.data());
	    unfilteredData = {
	      nodes: parser.nodes(),
	      properties: parser.properties()
	    };
	    // fixing class and property id counter for the editor
	    eN = unfilteredData.nodes.length + 1;
	    eP = unfilteredData.properties.length + 1;
	    
	    initialLoad = true;
	    graph.options().warningModule().closeFilterHint();
	    
	    // loading handler
	    updateRenderingDuringSimulation = true;
	    var validOntology = graph.options().loadingModule().successfullyLoadedOntology();
	    if ( graphContainer && validOntology === true ) {
	      
	      updateRenderingDuringSimulation = false;
	      graph.options().ontologyMenu().append_bulletPoint("Generating visualization ... ");
	      loadingModule.setPercentMode();
	      
	      if ( unfilteredData.nodes.length > 0 ) {
	        graphContainer.style("opacity", "0");
	        force.on("tick", hiddenRecalculatePositions);
	      } else {
	        graphContainer.style("opacity", "1");
	        if ( showFPS === true ) {
	          force.on("tick", recalculatePositionsWithFPS);
	        }
	        else {
	          force.on("tick", recalculatePositions);
	        }
	      }
	      
	      force.start();
	    } else {
	      force.stop();
	      graph.options().ontologyMenu().append_bulletPoint("Failed to load ontology");
	      loadingModule.setErrorMode();
	    }
	    // update prefixList(
	    // update general MetaOBJECT
	    graph.options().clearMetaObject();
	    graph.options().clearGeneralMetaObject();
	    graph.options().editSidebar().clearMetaObjectValue();
	    if ( options.data() !== undefined ) {
	      var header = options.data().header;
	      if ( header ) {
	        if ( header.iri ) {
	          graph.options().addOrUpdateGeneralObjectEntry("iri", header.iri);
	        }
	        if ( header.title ) {
	          graph.options().addOrUpdateGeneralObjectEntry("title", header.title);
	        }
	        if ( header.author ) {
	          graph.options().addOrUpdateGeneralObjectEntry("author", header.author);
	        }
	        if ( header.version ) {
	          graph.options().addOrUpdateGeneralObjectEntry("version", header.version);
	        }
	        if ( header.description ) {
	          graph.options().addOrUpdateGeneralObjectEntry("description", header.description);
	        }
	        if ( header.prefixList ) {
	          var pL = header.prefixList;
	          for ( var pr in pL ) {
	            if ( pL.hasOwnProperty(pr) ) {
	              var val = pL[pr];
	              graph.options().addPrefix(pr, val);
	            }
	          }
	        }
	        // get other metadata;
	        if ( header.other ) {
	          var otherObjects = header.other;
	          for ( var name in otherObjects ) {
	            if ( otherObjects.hasOwnProperty(name) ) {
	              var otherObj = otherObjects[name];
	              if ( otherObj.hasOwnProperty("identifier") && otherObj.hasOwnProperty("value") ) {
	                graph.options().addOrUpdateMetaObjectEntry(otherObj.identfier, otherObj.value);
	              }
	            }
	          }
	        }
	      }
	    }
	    // update more meta OBJECT
	    // Initialize filters with data to replicate consecutive filtering
	    var initializationData = _.clone(unfilteredData);
	    options.filterModules().forEach(function ( module ){
	      initializationData = filterFunction(module, initializationData, true);
	    });
	    // generate dictionary here ;
	    generateDictionary(unfilteredData);
	    
	    parser.parseSettings();
	    graphUpdateRequired = parser.settingsImported();
	    centerGraphViewOnLoad = true;
	    if ( parser.settingsImportGraphZoomAndTranslation() === true ) {
	      centerGraphViewOnLoad = false;
	    }
	    graph.options().searchMenu().requestDictionaryUpdate();
	    graph.options().editSidebar().updateGeneralOntologyInfo();
	    graph.options().editSidebar().updatePrefixUi();
	    graph.options().editSidebar().updateElementWidth();
	  }
	  
	  graph.handleOnLoadingError = function (){
	    force.stop();
	    graph.clearGraphData();
	    graph.options().ontologyMenu().append_bulletPoint("Failed to load ontology");
	    d3.select("#progressBarValue").node().innherHTML = "";
	    d3.select("#progressBarValue").classed("busyProgressBar", false);
	    graph.options().loadingModule().setErrorMode();
	    graph.options().loadingModule().showErrorDetailsMessage();
	  };
	  
	  function quick_refreshGraphData(){
	    links = linkCreator.createLinks(properties);
	    labelNodes = links.map(function ( link ){
	      return link.label();
	    });
	    
	    storeLinksOnNodes(classNodes, links);
	    setForceLayoutData(classNodes, labelNodes, links);
	  }
	  
	  //Applies the data of the graph options object and parses it. The graph is not redrawn.
	  function refreshGraphData(){
	    var shouldExecuteEmptyFilter = options.literalFilter().enabled();
	    graph.executeEmptyLiteralFilter();
	    options.literalFilter().enabled(shouldExecuteEmptyFilter);
	    
	    var preprocessedData = _.clone(unfilteredData);
	    
	    // Filter the data
	    options.filterModules().forEach(function ( module ){
	      preprocessedData = filterFunction(module, preprocessedData);
	    });
	    options.focuserModule().handle(undefined, true);
	    classNodes = preprocessedData.nodes;
	    properties = preprocessedData.properties;
	    links = linkCreator.createLinks(properties);
	    labelNodes = links.map(function ( link ){
	      return link.label();
	    });
	    storeLinksOnNodes(classNodes, links);
	    setForceLayoutData(classNodes, labelNodes, links);
	    // for (var i = 0; i < classNodes.length; i++) {
	    //     if (classNodes[i].setRectangularRepresentation)
	    //         classNodes[i].setRectangularRepresentation(graph.options().rectangularRepresentation());
	    // }
	  }
	  
	  function filterFunction( module, data, initializing ){
	    links = linkCreator.createLinks(data.properties);
	    storeLinksOnNodes(data.nodes, links);
	    
	    if ( initializing ) {
	      if ( module.initialize ) {
	        module.initialize(data.nodes, data.properties);
	      }
	    }
	    module.filter(data.nodes, data.properties);
	    return {
	      nodes: module.filteredNodes(),
	      properties: module.filteredProperties()
	    };
	  }
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- force-layout related functions                      -- **/
	  /** --------------------------------------------------------- **/
	  function storeLinksOnNodes( nodes, links ){
	    for ( var i = 0, nodesLength = nodes.length; i < nodesLength; i++ ) {
	      var node = nodes[i],
	        connectedLinks = [];
	      
	      // look for properties where this node is the domain or range
	      for ( var j = 0, linksLength = links.length; j < linksLength; j++ ) {
	        var link = links[j];
	        
	        if ( link.domain() === node || link.range() === node ) {
	          connectedLinks.push(link);
	        }
	      }
	      node.links(connectedLinks);
	    }
	  }
	  
	  function setForceLayoutData( classNodes, labelNodes, links ){
	    var d3Links = [];
	    links.forEach(function ( link ){
	      d3Links = d3Links.concat(link.linkParts());
	    });
	    
	    var d3Nodes = [].concat(classNodes).concat(labelNodes);
	    setPositionOfOldLabelsOnNewLabels(force.nodes(), labelNodes);
	    
	    force.nodes(d3Nodes)
	      .links(d3Links);
	  }
	  
	  // The label nodes are positioned randomly, because they are created from scratch if the data changes and lose
	  // their position information. With this hack the position of old labels is copied to the new labels.
	  function setPositionOfOldLabelsOnNewLabels( oldLabelNodes, labelNodes ){
	    labelNodes.forEach(function ( labelNode ){
	      for ( var i = 0; i < oldLabelNodes.length; i++ ) {
	        var oldNode = oldLabelNodes[i];
	        if ( oldNode.equals(labelNode) ) {
	          labelNode.x = oldNode.x;
	          labelNode.y = oldNode.y;
	          labelNode.px = oldNode.px;
	          labelNode.py = oldNode.py;
	          break;
	        }
	      }
	    });
	  }
	  
	  // Applies all options that don't change the graph data.
	  function refreshGraphStyle(){
	    zoom = zoom.scaleExtent([options.minMagnification(), options.maxMagnification()]);
	    if ( graphContainer ) {
	      zoom.event(graphContainer);
	    }
	    
	    force.charge(function ( element ){
	      var charge = options.charge();
	      if ( elementTools.isLabel(element) ) {
	        charge *= 0.8;
	      }
	      return charge;
	    })
	      .size([options.width(), options.height()])
	      .linkDistance(calculateLinkPartDistance)
	      .gravity(options.gravity())
	      .linkStrength(options.linkStrength()); // Flexibility of links
	    
	    force.nodes().forEach(function ( n ){
	      n.frozen(paused);
	    });
	  }
	  
	  function calculateLinkPartDistance( linkPart ){
	    var link = linkPart.link();
	    
	    if ( link.isLoop() ) {
	      return options.loopDistance();
	    }
	    
	    // divide by 2 to receive the length for a single link part
	    var linkPartDistance = getVisibleLinkDistance(link) / 2;
	    linkPartDistance += linkPart.domain().actualRadius();
	    linkPartDistance += linkPart.range().actualRadius();
	    return linkPartDistance;
	  }
	  
	  function getVisibleLinkDistance( link ){
	    if ( elementTools.isDatatype(link.domain()) || elementTools.isDatatype(link.range()) ) {
	      return options.datatypeDistance();
	    } else {
	      return options.classDistance();
	    }
	  }
	  
	  /** --------------------------------------------------------- **/
	  /** -- animation functions for the nodes --                   **/
	  /** --------------------------------------------------------- **/
	  
	  graph.animateDynamicLabelWidth = function (){
	    var wantedWidth = options.dynamicLabelWidth();
	    var i;
	    for ( i = 0; i < classNodes.length; i++ ) {
	      var nodeElement = classNodes[i];
	      if ( elementTools.isDatatype(nodeElement) ) {
	        nodeElement.animateDynamicLabelWidth(wantedWidth);
	      }
	    }
	    for ( i = 0; i < properties.length; i++ ) {
	      properties[i].animateDynamicLabelWidth(wantedWidth);
	    }
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- halo and localization functions --                     **/
	  /** --------------------------------------------------------- **/
	  function updateHaloRadius(){
	    if ( pulseNodeIds && pulseNodeIds.length > 0 ) {
	      var forceNodes = force.nodes();
	      for ( var i = 0; i < pulseNodeIds.length; i++ ) {
	        var node = forceNodes[pulseNodeIds[i]];
	        if ( node ) {
	          if ( node.property ) {
	            // match search strings with property label
	            if ( node.property().inverse ) {
	              var searchString = graph.options().searchMenu().getSearchString().toLowerCase();
	              var name = node.property().labelForCurrentLanguage().toLowerCase();
	              if ( name === searchString ) computeDistanceToCenter(node);
	              else {
	                node.property().removeHalo();
	                if ( node.property().inverse() ) {
	                  if ( !node.property().inverse().getHalos() )
	                    node.property().inverse().drawHalo();
	                  computeDistanceToCenter(node, true);
	                }
	                if ( node.property().equivalents() ) {
	                  var eq = node.property().equivalents();
	                  for ( var e = 0; e < eq.length; e++ ) {
	                    if ( !eq[e].getHalos() )
	                      eq[e].drawHalo();
	                  }
	                  if ( !node.property().getHalos() )
	                    node.property().drawHalo();
	                  computeDistanceToCenter(node, false);
	                  
	                }
	              }
	            }
	          }
	          computeDistanceToCenter(node);
	        }
	      }
	    }
	  }
	  
	  function getScreenCoords( x, y, translate, scale ){
	    var xn = translate[0] + x * scale;
	    var yn = translate[1] + y * scale;
	    return { x: xn, y: yn };
	  }
	  
	  function getClickedScreenCoords( x, y, translate, scale ){
	    var xn = (x - translate[0]) / scale;
	    var yn = (y - translate[1]) / scale;
	    return { x: xn, y: yn };
	  }
	  
	  
	  function computeDistanceToCenter( node, inverse ){
	    var container = node;
	    var w = graph.options().width();
	    var h = graph.options().height();
	    var posXY = getScreenCoords(node.x, node.y, graphTranslation, zoomFactor);
	    
	    var highlightOfInv = false;
	    
	    if ( inverse && inverse === true ) {
	      highlightOfInv = true;
	      posXY = getScreenCoords(node.x, node.y + 20, graphTranslation, zoomFactor);
	    }
	    var x = posXY.x;
	    var y = posXY.y;
	    var nodeIsRect = false;
	    var halo;
	    var roundHalo;
	    var rectHalo;
	    var borderPoint_x = 0;
	    var borderPoint_y = 0;
	    var defaultRadius;
	    var offset = 15;
	    var radius;
	    
	    if ( node.property && highlightOfInv === true ) {
	      if ( node.property().inverse() ) {
	        rectHalo = node.property().inverse().getHalos().select("rect");
	        
	      } else {
	        if ( node.property().getHalos() )
	          rectHalo = node.property().getHalos().select("rect");
	        else {
	          node.property().drawHalo();
	          rectHalo = node.property().getHalos().select("rect");
	        }
	      }
	      rectHalo.classed("hidden", true);
	      if ( node.property().inverse() ) {
	        if ( node.property().inverse().getHalos() ) {
	          roundHalo = node.property().inverse().getHalos().select("circle");
	        }
	      } else {
	        roundHalo = node.property().getHalos().select("circle");
	      }
	      if ( roundHalo.node() === null ) {
	        radius = node.property().inverse().width() + 15;
	        
	        roundHalo = node.property().inverse().getHalos().append("circle")
	          .classed("searchResultB", true)
	          .classed("searchResultA", false)
	          .attr("r", radius + 15);
	        
	      }
	      halo = roundHalo; // swap the halo to be round
	      nodeIsRect = true;
	      container = node.property().inverse();
	    }
	    
	    if ( node.id ) {
	      if ( !node.getHalos() ) return; // something went wrong before
	      halo = node.getHalos().select("rect");
	      if ( halo.node() === null ) {
	        // this is a round node
	        nodeIsRect = false;
	        roundHalo = node.getHalos().select("circle");
	        defaultRadius = node.actualRadius();
	        roundHalo.attr("r", defaultRadius + offset);
	        halo = roundHalo;
	      } else { // this is a rect node
	        nodeIsRect = true;
	        rectHalo = node.getHalos().select("rect");
	        rectHalo.classed("hidden", true);
	        roundHalo = node.getHalos().select("circle");
	        if ( roundHalo.node() === null ) {
	          radius = node.width();
	          roundHalo = node.getHalos().append("circle")
	            .classed("searchResultB", true)
	            .classed("searchResultA", false)
	            .attr("r", radius + offset);
	        }
	        halo = roundHalo;
	      }
	    }
	    if ( node.property && !inverse ) {
	      if ( !node.property().getHalos() ) return; // something went wrong before
	      rectHalo = node.property().getHalos().select("rect");
	      rectHalo.classed("hidden", true);
	      
	      roundHalo = node.property().getHalos().select("circle");
	      if ( roundHalo.node() === null ) {
	        radius = node.property().width();
	        
	        roundHalo = node.property().getHalos().append("circle")
	          .classed("searchResultB", true)
	          .classed("searchResultA", false)
	          .attr("r", radius + 15);
	        
	      }
	      halo = roundHalo; // swap the halo to be round
	      nodeIsRect = true;
	      container = node.property();
	    }
	    
	    if ( x < 0 || x > w || y < 0 || y > h ) {
	      // node outside viewport;
	      // check for quadrant and get the correct boarder point (intersection with viewport)
	      if ( x < 0 && y < 0 ) {
	        borderPoint_x = 0;
	        borderPoint_y = 0;
	      } else if ( x > 0 && x < w && y < 0 ) {
	        borderPoint_x = x;
	        borderPoint_y = 0;
	      } else if ( x > w && y < 0 ) {
	        borderPoint_x = w;
	        borderPoint_y = 0;
	      } else if ( x > w && y > 0 && y < h ) {
	        borderPoint_x = w;
	        borderPoint_y = y;
	      } else if ( x > w && y > h ) {
	        borderPoint_x = w;
	        borderPoint_y = h;
	      } else if ( x > 0 && x < w && y > h ) {
	        borderPoint_x = x;
	        borderPoint_y = h;
	      } else if ( x < 0 && y > h ) {
	        borderPoint_x = 0;
	        borderPoint_y = h;
	      } else if ( x < 0 && y > 0 && y < h ) {
	        borderPoint_x = 0;
	        borderPoint_y = y;
	      }
	      // kill all pulses of nodes that are outside the viewport
	      container.getHalos().select("rect").classed("searchResultA", false);
	      container.getHalos().select("circle").classed("searchResultA", false);
	      container.getHalos().select("rect").classed("searchResultB", true);
	      container.getHalos().select("circle").classed("searchResultB", true);
	      halo.classed("hidden", false);
	      // compute in pixel coordinates length of difference vector
	      var borderRadius_x = borderPoint_x - x;
	      var borderRadius_y = borderPoint_y - y;
	      
	      var len = borderRadius_x * borderRadius_x + borderRadius_y * borderRadius_y;
	      len = Math.sqrt(len);
	      
	      var normedX = borderRadius_x / len;
	      var normedY = borderRadius_y / len;
	      
	      len = len + 20; // add 20 px;
	      
	      // re-normalized vector
	      var newVectorX = normedX * len + x;
	      var newVectorY = normedY * len + y;
	      // compute world coordinates of this point
	      var wX = (newVectorX - graphTranslation[0]) / zoomFactor;
	      var wY = (newVectorY - graphTranslation[1]) / zoomFactor;
	      
	      // compute distance in world coordinates
	      var dx = wX - node.x;
	      var dy = wY - node.y;
	      if ( highlightOfInv === true )
	        dy = wY - node.y - 20;
	      
	      if ( highlightOfInv === false && node.property && node.property().inverse() )
	        dy = wY - node.y + 20;
	      
	      var newRadius = Math.sqrt(dx * dx + dy * dy);
	      halo = container.getHalos().select("circle");
	      // sanity checks and setting new halo radius
	      if ( !nodeIsRect ) {
	        defaultRadius = node.actualRadius() + offset;
	        if ( newRadius < defaultRadius ) {
	          newRadius = defaultRadius;
	        }
	        halo.attr("r", newRadius);
	      } else {
	        defaultRadius = 0.5 * container.width();
	        if ( newRadius < defaultRadius )
	          newRadius = defaultRadius;
	        halo.attr("r", newRadius);
	      }
	    } else { // node is in viewport , render original;
	      // reset the halo to original radius
	      defaultRadius = node.actualRadius() + 15;
	      if ( !nodeIsRect ) {
	        halo.attr("r", defaultRadius);
	      } else { // this is rectangular node render as such
	        halo = container.getHalos().select("rect");
	        halo.classed("hidden", false);
	        //halo.classed("searchResultB", true);
	        //halo.classed("searchResultA", false);
	        var aCircHalo = container.getHalos().select("circle");
	        aCircHalo.classed("hidden", true);
	        
	        container.getHalos().select("rect").classed("hidden", false);
	        container.getHalos().select("circle").classed("hidden", true);
	      }
	    }
	  }
	  
	  function transform( p, cx, cy ){
	    // one iteration step for the locate target animation
	    zoomFactor = graph.options().height() / p[2];
	    graphTranslation = [(cx - p[0] * zoomFactor), (cy - p[1] * zoomFactor)];
	    updateHaloRadius();
	    // update the values in case the user wants to break the animation
	    zoom.translate(graphTranslation);
	    zoom.scale(zoomFactor);
	    graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	    return "translate(" + graphTranslation[0] + "," + graphTranslation[1] + ")scale(" + zoomFactor + ")";
	  }
	  
	  graph.zoomToElementInGraph = function ( element ){
	    targetLocationZoom(element);
	  };
	  graph.updateHaloRadius = function ( element ){
	    computeDistanceToCenter(element);
	  };
	  
	  function targetLocationZoom( target ){
	    // store the original information
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    
	    var zoomLevel = Math.max(defaultZoom + 0.5 * defaultZoom, defaultTargetZoom);
	    var eP = [target.x, target.y, graph.options().height() / zoomLevel];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    var lenAnimation = pos_intp.duration;
	    if ( lenAnimation > 2500 ) {
	      lenAnimation = 2500;
	    }
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(lenAnimation)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        updateHaloRadius();
	      });
	  }
	  
	  function getWorldPosFromScreen( x, y, translate, scale ){
	    var temp = scale[0], xn, yn;
	    if ( temp ) {
	      xn = (x - translate[0]) / temp;
	      yn = (y - translate[1]) / temp;
	    } else {
	      xn = (x - translate[0]) / scale;
	      yn = (y - translate[1]) / scale;
	    }
	    return { x: xn, y: yn };
	  }
	  
	  graph.locateSearchResult = function (){
	    if ( pulseNodeIds && pulseNodeIds.length > 0 ) {
	      // move the center of the viewport to this location
	      if ( transformAnimation === true ) return; // << prevents incrementing the location id if we are in an animation
	      var node = force.nodes()[pulseNodeIds[locationId]];
	      locationId++;
	      locationId = locationId % pulseNodeIds.length;
	      if ( node.id ) node.foreground();
	      if ( node.property ) node.property().foreground();
	      
	      targetLocationZoom(node);
	    }
	  };
	  
	  graph.resetSearchHighlight = function (){
	    // get all nodes (handle also already filtered nodes )
	    pulseNodeIds = [];
	    nodeArrayForPulse = [];
	    // clear from stored nodes
	    var nodes = unfilteredData.nodes;
	    var props = unfilteredData.properties;
	    var j;
	    for ( j = 0; j < nodes.length; j++ ) {
	      var node = nodes[j];
	      if ( node.removeHalo )
	        node.removeHalo();
	    }
	    for ( j = 0; j < props.length; j++ ) {
	      var prop = props[j];
	      if ( prop.removeHalo )
	        prop.removeHalo();
	    }
	  };
	  
	  graph.updatePulseIds = function ( nodeIdArray ){
	    pulseNodeIds = [];
	    for ( var i = 0; i < nodeIdArray.length; i++ ) {
	      var selectedId = nodeIdArray[i];
	      var forceId = nodeMap[selectedId];
	      if ( forceId !== undefined ) {
	        var le_node = force.nodes()[forceId];
	        if ( le_node.id ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	          }
	        }
	        if ( le_node.property ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	          }
	        }
	      }
	    }
	    locationId = 0;
	    if ( pulseNodeIds.length > 0 ) {
	      d3.select("#locateSearchResult").classed("highlighted", true);
	      d3.select("#locateSearchResult").node().title = "Locate search term";
	    }
	    else {
	      d3.select("#locateSearchResult").classed("highlighted", false);
	      d3.select("#locateSearchResult").node().title = "Nothing to locate";
	    }
	    
	  };
	  
	  graph.highLightNodes = function ( nodeIdArray ){
	    if ( nodeIdArray.length === 0 ) {
	      return; // nothing to highlight
	    }
	    pulseNodeIds = [];
	    nodeArrayForPulse = nodeIdArray;
	    var missedIds = [];
	    
	    // identify the force id to highlight
	    for ( var i = 0; i < nodeIdArray.length; i++ ) {
	      var selectedId = nodeIdArray[i];
	      var forceId = nodeMap[selectedId];
	      if ( forceId !== undefined ) {
	        var le_node = force.nodes()[forceId];
	        if ( le_node.id ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	            le_node.foreground();
	            le_node.drawHalo();
	          }
	        }
	        if ( le_node.property ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	            le_node.property().foreground();
	            le_node.property().drawHalo();
	          }
	        }
	      }
	      else {
	        missedIds.push(selectedId);
	      }
	    }
	    
	    if ( missedIds.length === nodeIdArray.length ) {
	      
	    }
	    // store the highlight on the missed nodes;
	    var s_nodes = unfilteredData.nodes;
	    var s_props = unfilteredData.properties;
	    for ( i = 0; i < missedIds.length; i++ ) {
	      var missedId = missedIds[i];
	      // search for this in the nodes;
	      for ( var n = 0; n < s_nodes.length; n++ ) {
	        var nodeId = s_nodes[n].id();
	        if ( nodeId === missedId ) {
	          s_nodes[n].drawHalo();
	        }
	      }
	      for ( var p = 0; p < s_props.length; p++ ) {
	        var propId = s_props[p].id();
	        if ( propId === missedId ) {
	          s_props[p].drawHalo();
	        }
	      }
	    }
	    if ( missedIds.length === nodeIdArray.length ) {
	      d3.select("#locateSearchResult").classed("highlighted", false);
	    }
	    else {
	      d3.select("#locateSearchResult").classed("highlighted", true);
	    }
	    locationId = 0;
	    updateHaloRadius();
	  };
	  
	  graph.hideHalos = function (){
	    var haloElements = d3.selectAll(".searchResultA,.searchResultB");
	    haloElements.classed("hidden", true);
	    return haloElements;
	  };
	  
	  function nodeInViewport( node, property ){
	    
	    var w = graph.options().width();
	    var h = graph.options().height();
	    var posXY = getScreenCoords(node.x, node.y, graphTranslation, zoomFactor);
	    var x = posXY.x;
	    var y = posXY.y;
	    
	    var retVal = !(x < 0 || x > w || y < 0 || y > h);
	    return retVal;
	  }
	  
	  graph.getBoundingBoxForTex = function (){
	    var halos = graph.hideHalos();
	    var bbox = graphContainer.node().getBoundingClientRect();
	    halos.classed("hidden", false);
	    var w = graph.options().width();
	    var h = graph.options().height();
	    
	    // get the graph coordinates
	    var topLeft = getWorldPosFromScreen(0, 0, graphTranslation, zoomFactor);
	    var botRight = getWorldPosFromScreen(w, h, graphTranslation, zoomFactor);
	    
	    
	    var t_topLeft = getWorldPosFromScreen(bbox.left, bbox.top, graphTranslation, zoomFactor);
	    var t_botRight = getWorldPosFromScreen(bbox.right, bbox.bottom, graphTranslation, zoomFactor);
	    
	    // tighten up the bounding box;
	    
	    var tX = Math.max(t_topLeft.x, topLeft.x);
	    var tY = Math.max(t_topLeft.y, topLeft.y);
	    
	    var bX = Math.min(t_botRight.x, botRight.x);
	    var bY = Math.min(t_botRight.y, botRight.y);
	    
	    
	    // tighten further;
	    var allForceNodes = force.nodes();
	    var numNodes = allForceNodes.length;
	    var visibleNodes = [];
	    var bbx;
	    
	    
	    var contentBBox = { tx: 1000000000000, ty: 1000000000000, bx: -1000000000000, by: -1000000000000 };
	    
	    for ( var i = 0; i < numNodes; i++ ) {
	      var node = allForceNodes[i];
	      if ( node ) {
	        if ( node.property ) {
	          if ( nodeInViewport(node, true) ) {
	            if ( node.property().labelElement() === undefined ) continue;
	            bbx = node.property().labelElement().node().getBoundingClientRect();
	            if ( bbx ) {
	              contentBBox.tx = Math.min(contentBBox.tx, bbx.left);
	              contentBBox.bx = Math.max(contentBBox.bx, bbx.right);
	              contentBBox.ty = Math.min(contentBBox.ty, bbx.top);
	              contentBBox.by = Math.max(contentBBox.by, bbx.bottom);
	            }
	          }
	        } else {
	          if ( nodeInViewport(node, false) ) {
	            bbx = node.nodeElement().node().getBoundingClientRect();
	            if ( bbx ) {
	              contentBBox.tx = Math.min(contentBBox.tx, bbx.left);
	              contentBBox.bx = Math.max(contentBBox.bx, bbx.right);
	              contentBBox.ty = Math.min(contentBBox.ty, bbx.top);
	              contentBBox.by = Math.max(contentBBox.by, bbx.bottom);
	            }
	          }
	        }
	      }
	    }
	    
	    var tt_topLeft = getWorldPosFromScreen(contentBBox.tx, contentBBox.ty, graphTranslation, zoomFactor);
	    var tt_botRight = getWorldPosFromScreen(contentBBox.bx, contentBBox.by, graphTranslation, zoomFactor);
	    
	    tX = Math.max(tX, tt_topLeft.x);
	    tY = Math.max(tY, tt_topLeft.y);
	    
	    bX = Math.min(bX, tt_botRight.x);
	    bY = Math.min(bY, tt_botRight.y);
	    // y axis flip for tex
	    return [tX, -tY, bX, -bY];
	    
	  };
	  
	  var updateTargetElement = function (){
	    var bbox = graphContainer.node().getBoundingClientRect();
	    
	    
	    // get the graph coordinates
	    var bboxOffset = 50; // default radius of a node;
	    var topLeft = getWorldPosFromScreen(bbox.left, bbox.top, graphTranslation, zoomFactor);
	    var botRight = getWorldPosFromScreen(bbox.right, bbox.bottom, graphTranslation, zoomFactor);
	    
	    var w = graph.options().width();
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      w -= 200;
	    var h = graph.options().height();
	    topLeft.x += bboxOffset;
	    topLeft.y -= bboxOffset;
	    botRight.x -= bboxOffset;
	    botRight.y += bboxOffset;
	    
	    var g_w = botRight.x - topLeft.x;
	    var g_h = botRight.y - topLeft.y;
	    
	    // endpoint position calculations
	    var posX = 0.5 * (topLeft.x + botRight.x);
	    var posY = 0.5 * (topLeft.y + botRight.y);
	    var cx = 0.5 * w,
	      cy = 0.5 * h;
	    
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      cx += 200;
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    
	    // zoom factor calculations and fail safes;
	    var newZoomFactor = 1.0; // fail save if graph and window are squares
	    //get the smaller one
	    var a = w / g_w;
	    var b = h / g_h;
	    if ( a < b ) newZoomFactor = a;
	    else      newZoomFactor = b;
	    
	    
	    // fail saves
	    if ( newZoomFactor > zoom.scaleExtent()[1] ) {
	      newZoomFactor = zoom.scaleExtent()[1];
	    }
	    if ( newZoomFactor < zoom.scaleExtent()[0] ) {
	      newZoomFactor = zoom.scaleExtent()[0];
	    }
	    
	    // apply Zooming
	    var sP = [cp.x, cp.y, h / zoomFactor];
	    var eP = [posX, posY, h / newZoomFactor];
	    
	    
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    return [pos_intp, cx, cy];
	    
	  };
	  
	  graph.forceRelocationEvent = function ( dynamic ){
	    // we need to kill the halo to determine the bounding box;
	    var halos = graph.hideHalos();
	    var bbox = graphContainer.node().getBoundingClientRect();
	    halos.classed("hidden", false);
	    
	    // get the graph coordinates
	    var bboxOffset = 50; // default radius of a node;
	    var topLeft = getWorldPosFromScreen(bbox.left, bbox.top, graphTranslation, zoomFactor);
	    var botRight = getWorldPosFromScreen(bbox.right, bbox.bottom, graphTranslation, zoomFactor);
	    
	    var w = graph.options().width();
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      w -= 200;
	    var h = graph.options().height();
	    topLeft.x += bboxOffset;
	    topLeft.y -= bboxOffset;
	    botRight.x -= bboxOffset;
	    botRight.y += bboxOffset;
	    
	    var g_w = botRight.x - topLeft.x;
	    var g_h = botRight.y - topLeft.y;
	    
	    // endpoint position calculations
	    var posX = 0.5 * (topLeft.x + botRight.x);
	    var posY = 0.5 * (topLeft.y + botRight.y);
	    var cx = 0.5 * w,
	      cy = 0.5 * h;
	    
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      cx += 200;
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    
	    // zoom factor calculations and fail safes;
	    var newZoomFactor = 1.0; // fail save if graph and window are squares
	    //get the smaller one
	    var a = w / g_w;
	    var b = h / g_h;
	    if ( a < b ) newZoomFactor = a;
	    else      newZoomFactor = b;
	    
	    
	    // fail saves
	    if ( newZoomFactor > zoom.scaleExtent()[1] ) {
	      newZoomFactor = zoom.scaleExtent()[1];
	    }
	    if ( newZoomFactor < zoom.scaleExtent()[0] ) {
	      newZoomFactor = zoom.scaleExtent()[0];
	    }
	    
	    // apply Zooming
	    var sP = [cp.x, cp.y, h / zoomFactor];
	    var eP = [posX, posY, h / newZoomFactor];
	    
	    
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    var lenAnimation = pos_intp.duration;
	    if ( lenAnimation > 2500 ) {
	      lenAnimation = 2500;
	    }
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(lenAnimation)
	      .attrTween("transform", function (){
	        return function ( t ){
	          if ( dynamic ) {
	            var param = updateTargetElement();
	            var nV = param[0](t);
	            return transform(nV, cx, cy);
	          }
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        if ( dynamic ) {
	          return;
	        }
	        
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	        
	        
	      });
	  };
	  
	  
	  graph.isADraggerActive = function (){
	    if ( classDragger.mouseButtonPressed === true ||
	      domainDragger.mouseButtonPressed === true ||
	      rangeDragger.mouseButtonPressed === true ) {
	      return true;
	    }
	    return false;
	  };
	  
	  /** --------------------------------------------------------- **/
	  /** -- VOWL EDITOR  create/ edit /delete functions --         **/
	  /** --------------------------------------------------------- **/
	  
	  graph.changeNodeType = function ( element ){
	    
	    var typeString = d3.select("#typeEditor").node().value;
	    
	    if ( graph.classesSanityCheck(element, typeString) === false ) {
	      // call reselection to restore previous type selection
	      graph.options().editSidebar().updateSelectionInformation(element);
	      return;
	    }
	    
	    var prototype = NodePrototypeMap.get(typeString.toLowerCase());
	    var aNode = new prototype(graph);
	    
	    aNode.x = element.x;
	    aNode.y = element.y;
	    aNode.px = element.x;
	    aNode.py = element.y;
	    aNode.id(element.id());
	    aNode.copyInformation(element);
	    
	    if ( typeString === "owl:Thing" ) {
	      aNode.label("Thing");
	    }
	    else if ( elementTools.isDatatype(element) === false ) {
	      if ( element.backupLabel() !== undefined ) {
	        aNode.label(element.backupLabel());
	      } else if ( aNode.backupLabel() !== undefined ) {
	        aNode.label(aNode.backupLabel());
	      } else {
	        aNode.label("NewClass");
	      }
	    }
	    
	    if ( typeString === "rdfs:Datatype" ) {
	      if ( aNode.dType() === "undefined" )
	        aNode.label("undefined");
	      else {
	        var identifier = aNode.dType().split(":")[1];
	        aNode.label(identifier);
	      }
	    }
	    var i;
	    // updates the property domain and range
	    for ( i = 0; i < unfilteredData.properties.length; i++ ) {
	      if ( unfilteredData.properties[i].domain() === element ) {
	        //  unfilteredData.properties[i].toString();
	        unfilteredData.properties[i].domain(aNode);
	      }
	      if ( unfilteredData.properties[i].range() === element ) {
	        unfilteredData.properties[i].range(aNode);
	        //  unfilteredData.properties[i].toString();
	      }
	    }
	    
	    // update for fastUpdate:
	    for ( i = 0; i < properties.length; i++ ) {
	      if ( properties[i].domain() === element ) {
	        //  unfilteredData.properties[i].toString();
	        properties[i].domain(aNode);
	      }
	      if ( properties[i].range() === element ) {
	        properties[i].range(aNode);
	        //  unfilteredData.properties[i].toString();
	      }
	    }
	    
	    var remId = unfilteredData.nodes.indexOf(element);
	    if ( remId !== -1 )
	      unfilteredData.nodes.splice(remId, 1);
	    remId = classNodes.indexOf(element);
	    if ( remId !== -1 )
	      classNodes.splice(remId, 1);
	    // very important thing for selection!;
	    addNewNodeElement(aNode);
	    // handle focuser!
	    options.focuserModule().handle(aNode);
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    element = null;
	  };
	  
	  
	  graph.changePropertyType = function ( element ){
	    var typeString = d3.select("#typeEditor").node().value;
	    
	    // create warning
	    if ( graph.sanityCheckProperty(element.domain(), element.range(), typeString) === false ) return false;
	    
	    var propPrototype = PropertyPrototypeMap.get(typeString.toLowerCase());
	    var aProp = new propPrototype(graph);
	    aProp.copyInformation(element);
	    aProp.id(element.id());
	    
	    element.domain().removePropertyElement(element);
	    element.range().removePropertyElement(element);
	    aProp.domain(element.domain());
	    aProp.range(element.range());
	    
	    if ( element.backupLabel() !== undefined ) {
	      aProp.label(element.backupLabel());
	    } else {
	      aProp.label("newObjectProperty");
	    }
	    
	    if ( aProp.type() === "rdfs:subClassOf" ) {
	      aProp.iri("http://www.w3.org/2000/01/rdf-schema#subClassOf");
	    } else {
	      if ( element.iri() === "http://www.w3.org/2000/01/rdf-schema#subClassOf" )
	        aProp.iri(graph.options().getGeneralMetaObjectProperty('iri') + aProp.id());
	      
	    }
	    
	    
	    if ( graph.propertyCheckExistenceChecker(aProp, element.domain(), element.range()) === false ) {
	      graph.options().editSidebar().updateSelectionInformation(element);
	      return;
	    }
	    // // TODO: change its base IRI to proper value
	    // var ontoIRI="http://someTest.de";
	    // aProp.baseIri(ontoIRI);
	    // aProp.iri(aProp.baseIri()+aProp.id());
	    
	    
	    // add this to the data;
	    unfilteredData.properties.push(aProp);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    var remId = unfilteredData.properties.indexOf(element);
	    if ( remId !== -1 )
	      unfilteredData.properties.splice(remId, 1);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    remId = properties.indexOf(element);
	    if ( remId !== -1 )
	      properties.splice(remId, 1);
	    graph.fastUpdate();
	    aProp.domain().addProperty(aProp);
	    aProp.range().addProperty(aProp);
	    if ( element.labelObject() && aProp.labelObject() ) {
	      aProp.labelObject().x = element.labelObject().x;
	      aProp.labelObject().px = element.labelObject().px;
	      aProp.labelObject().y = element.labelObject().y;
	      aProp.labelObject().py = element.labelObject().py;
	    }
	    
	    options.focuserModule().handle(aProp);
	    element = null;
	  };
	  
	  graph.removeEditElements = function (){
	    // just added to be called form outside
	    removeEditElements();
	  };
	  
	  function removeEditElements(){
	    rangeDragger.hideDragger(true);
	    domainDragger.hideDragger(true);
	    shadowClone.hideClone(true);
	    
	    classDragger.hideDragger(true);
	    if ( addDataPropertyGroupElement )
	      addDataPropertyGroupElement.classed("hidden", true);
	    if ( deleteGroupElement )
	      deleteGroupElement.classed("hidden", true);
	    
	    
	    if ( hoveredNodeElement ) {
	      if ( hoveredNodeElement.pinned() === false ) {
	        hoveredNodeElement.locked(graph.paused());
	        hoveredNodeElement.frozen(graph.paused());
	      }
	    }
	    if ( hoveredPropertyElement ) {
	      if ( hoveredPropertyElement.pinned() === false ) {
	        hoveredPropertyElement.locked(graph.paused());
	        hoveredPropertyElement.frozen(graph.paused());
	      }
	    }
	    
	    
	  }
	  
	  graph.editorMode = function ( val ){
	    var create_entry = d3.select("#empty");
	    var create_container = d3.select("#emptyContainer");
	    
	    var modeOfOpString = d3.select("#modeOfOperationString").node();
	    if ( !arguments.length ) {
	      create_entry.node().checked = editMode;
	      if ( editMode === false ) {
	        create_container.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.style("pointer-events", "none");
	      } else {
	        create_container.node().title = "Creates a new empty ontology";
	        create_entry.node().title = "Creates a new empty ontology";
	        d3.select("#useAccuracyHelper").style("color", "#2980b9");
	        d3.select("#useAccuracyHelper").style("pointer-events", "auto");
	        create_entry.node().disabled = false;
	        create_entry.style("pointer-events", "auto");
	      }
	      
	      return editMode;
	    }
	    graph.options().setEditorModeForDefaultObject(val);
	    
	    // if (seenEditorHint===false  && val===true){
	    //     seenEditorHint=true;
	    //     graph.options().warningModule().showEditorHint();
	    // }
	    editMode = val;
	    
	    if ( create_entry ) {
	      create_entry.classed("disabled", !editMode);
	      if ( !editMode ) {
	        create_container.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.node().disabled = true;
	        d3.select("#useAccuracyHelper").style("color", "#979797");
	        d3.select("#useAccuracyHelper").style("pointer-events", "none");
	        create_entry.style("pointer-events", "none");
	      } else {
	        create_container.node().title = "Creates a new empty ontology";
	        create_entry.node().title = "Creates a new empty ontology";
	        d3.select("#useAccuracyHelper").style("color", "#2980b9");
	        d3.select("#useAccuracyHelper").style("pointer-events", "auto");
	        create_entry.style("pointer-events", "auto");
	      }
	    }
	    
	    // adjust compact notation
	    // selector = compactNotationOption;
	    // box =ModuleCheckbox
	    var compactNotationContainer = d3.select("#compactnotationModuleCheckbox");
	    if ( compactNotationContainer ) {
	      compactNotationContainer.classed("disabled", !editMode);
	      if ( !editMode ) {
	        compactNotationContainer.node().title = "";
	        compactNotationContainer.node().disabled = false;
	        compactNotationContainer.style("pointer-events", "auto");
	        d3.select("#compactNotationOption").style("color", "");
	        d3.select("#compactNotationOption").node().title = "";
	        options.literalFilter().enabled(true);
	        graph.update();
	      } else {
	        // if editor Mode
	        //1) uncheck the element
	        d3.select("#compactNotationOption").node().title = "Compact notation can only be used in view mode";
	        compactNotationContainer.node().disabled = true;
	        compactNotationContainer.node().checked = false;
	        options.compactNotationModule().enabled(false);
	        options.literalFilter().enabled(false);
	        graph.executeCompactNotationModule();
	        graph.executeEmptyLiteralFilter();
	        graph.lazyRefresh();
	        compactNotationContainer.style("pointer-events", "none");
	        d3.select("#compactNotationOption").style("color", "#979797");
	      }
	    }
	    
	    if ( modeOfOpString ) {
	      if ( touchDevice === true ) {
	        modeOfOpString.innerHTML = "touch able device detected";
	      } else {
	        modeOfOpString.innerHTML = "point & click device detected";
	      }
	    }
	    var svgGraph = d3.selectAll(".vowlGraph");
	    
	    if ( editMode === true ) {
	      options.leftSidebar().showSidebar(options.leftSidebar().getSidebarVisibility(), true);
	      options.leftSidebar().hideCollapseButton(false);
	      graph.options().editSidebar().updatePrefixUi();
	      graph.options().editSidebar().updateElementWidth();
	      svgGraph.on("dblclick.zoom", graph.modified_dblClickFunction);
	      
	    } else {
	      svgGraph.on("dblclick.zoom", originalD3_dblClickFunction);
	      options.leftSidebar().showSidebar(0);
	      options.leftSidebar().hideCollapseButton(true);
	      // hide hovered edit elements
	      removeEditElements();
	    }
	    options.sidebar().updateShowedInformation();
	    options.editSidebar().updateElementWidth();
	    
	  };
	  
	  function createLowerCasePrototypeMap( prototypeMap ){
	    return d3.map(prototypeMap.values(), function ( Prototype ){
	      return new Prototype().type().toLowerCase();
	    });
	  }
	  
	  function createNewNodeAtPosition( pos ){
	    var aNode, prototype;
	    var forceUpdate = true;
	    // create a node of that id;
	    
	    var typeToCreate = d3.select("#defaultClass").node().title;
	    prototype = NodePrototypeMap.get(typeToCreate.toLowerCase());
	    aNode = new prototype(graph);
	    var autoEditElement = false;
	    if ( typeToCreate === "owl:Thing" ) {
	      aNode.label("Thing");
	    }
	    else {
	      aNode.label("NewClass");
	      autoEditElement = true;
	    }
	    aNode.x = pos.x;
	    aNode.y = pos.y;
	    aNode.px = aNode.x;
	    aNode.py = aNode.y;
	    aNode.id("Class" + eN++);
	    // aNode.paused(true);
	    
	    aNode.baseIri(d3.select("#iriEditor").node().value);
	    aNode.iri(aNode.baseIri() + aNode.id());
	    addNewNodeElement(aNode, forceUpdate);
	    options.focuserModule().handle(aNode, true);
	    aNode.frozen(graph.paused());
	    aNode.locked(graph.paused());
	    aNode.enableEditing(autoEditElement);
	  }
	  
	  
	  function addNewNodeElement( element ){
	    unfilteredData.nodes.push(element);
	    if ( classNodes.indexOf(element) === -1 )
	      classNodes.push(element);
	    
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    graph.fastUpdate();
	  }
	  
	  graph.getTargetNode = function ( position ){
	    var dx = position[0];
	    var dy = position[1];
	    var tN = null;
	    var minDist = 1000000000000;
	    // This is a bit OVERKILL for the computation of one node >> TODO: KD-TREE SEARCH
	    unfilteredData.nodes.forEach(function ( el ){
	      var cDist = Math.sqrt((el.x - dx) * (el.x - dx) + (el.y - dy) * (el.y - dy));
	      if ( cDist < minDist ) {
	        minDist = cDist;
	        tN = el;
	      }
	    });
	    if ( hoveredNodeElement ) {
	      var offsetDist = hoveredNodeElement.actualRadius() + 30;
	      if ( minDist > offsetDist ) return null;
	      if ( tN.renderType() === "rect" ) return null;
	      if ( tN === hoveredNodeElement && minDist <= hoveredNodeElement.actualRadius() ) {
	        return tN;
	      } else if ( tN === hoveredNodeElement && minDist > hoveredNodeElement.actualRadius() ) {
	        return null;
	      }
	      return tN;
	    }
	    else {
	      
	      if ( minDist > (tN.actualRadius() + 30) )
	        return null;
	      else return tN;
	      
	    }
	  };
	  
	  graph.genericPropertySanityCheck = function ( domain, range, typeString, header, action ){
	    if ( domain === range && typeString === "rdfs:subClassOf" ) {
	      graph.options().warningModule().showWarning(header,
	        "rdfs:subClassOf can not be created as loops (domain == range)",
	        action, 1, false);
	      return false;
	    }
	    if ( domain === range && typeString === "owl:disjointWith" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:disjointWith  can not be created as loops (domain == range)",
	        action, 1, false);
	      return false;
	    }
	    // allProps[i].type()==="owl:allValuesFrom"  ||
	    // allProps[i].type()==="owl:someValuesFrom"
	    if ( domain.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:allValuesFrom can not originate from owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    if ( domain.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:someValuesFrom can not originate from owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    
	    if ( range.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:allValuesFrom can not be connected to owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    if ( range.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:someValuesFrom can not be connected to owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    
	    return true; // we can Change the domain or range
	  };
	  
	  graph.checkIfIriClassAlreadyExist = function ( url ){
	    // search for a class node with this url
	    var allNodes = unfilteredData.nodes;
	    for ( var i = 0; i < allNodes.length; i++ ) {
	      if ( elementTools.isDatatype(allNodes[i]) === true || allNodes[i].type() === "owl:Thing" )
	        continue;
	      
	      // now we are a real class;
	      //get class IRI
	      var classIRI = allNodes[i].iri();
	      
	      // this gives me the node for halo
	      if ( url === classIRI ) {
	        return allNodes[i];
	      }
	    }
	    return false;
	  };
	  
	  graph.classesSanityCheck = function ( classElement, targetType ){
	    // this is added due to someValuesFrom properties
	    // we should not be able to change a classElement to a owl:Thing
	    // when it has a property attached to it that uses these restrictions
	    //
	    
	    if ( targetType === "owl:Class" ) return true;
	    
	    else {
	      // collect all properties which have that one as a domain or range
	      var allProps = unfilteredData.properties;
	      for ( var i = 0; i < allProps.length; i++ ) {
	        if ( allProps[i].range() === classElement || allProps[i].domain() === classElement ) {
	          // check for the type of that property
	          if ( allProps[i].type() === "owl:someValuesFrom" ) {
	            graph.options().warningModule().showWarning("Can not change class type",
	              "The element has a property that is of type owl:someValuesFrom",
	              "Element type not changed!", 1, true);
	            return false;
	          }
	          if ( allProps[i].type() === "owl:allValuesFrom" ) {
	            graph.options().warningModule().showWarning("Can not change class type",
	              "The element has a property that is of type owl:allValuesFrom",
	              "Element type not changed!", 1, true);
	            return false;
	          }
	        }
	      }
	      
	      
	    }
	    return true;
	  };
	  
	  graph.propertyCheckExistenceChecker = function ( property, domain, range ){
	    var allProps = unfilteredData.properties;
	    var i;
	    if ( property.type() === "rdfs:subClassOf" || property.type() === "owl:disjointWith" ) {
	      
	      for ( i = 0; i < allProps.length; i++ ) {
	        if ( allProps[i] === property ) continue;
	        if ( allProps[i].domain() === domain && allProps[i].range() === range && allProps[i].type() === property.type() ) {
	          graph.options().warningModule().showWarning("Warning",
	            "This triple already exist!",
	            "Element not created!", 1, false);
	          return false;
	        }
	        if ( allProps[i].domain() === range && allProps[i].range() === domain && allProps[i].type() === property.type() ) {
	          graph.options().warningModule().showWarning("Warning",
	            "Inverse assignment already exist! ",
	            "Element not created!", 1, false);
	          return false;
	        }
	      }
	      return true;
	    }
	    return true;
	  };
	  
	  // graph.checkForTripleDuplicate=function(property){
	  //     var domain=property.domain();
	  //     var range=property.range();
	  //     console.log("checking for duplicates");
	  //     var b1= domain.isPropertyAssignedToThisElement(property);
	  //     var b2= range.isPropertyAssignedToThisElement(property);
	  //
	  //     console.log("test domain results in "+ b1);
	  //     console.log("test range results in "+ b1);
	  //
	  //     if (b1  && b2 ){
	  //         graph.options().warningModule().showWarning("Warning",
	  //             "This triple already exist!",
	  //             "Element not created!",1,false);
	  //         return false;
	  //     }
	  //     return true;
	  // };
	  
	  graph.sanityCheckProperty = function ( domain, range, typeString ){
	    
	    // check for duplicate triple in the element;
	    
	    
	    if ( typeString === "owl:objectProperty" && graph.options().objectPropertyFilter().enabled() === true ) {
	      graph.options().warningModule().showWarning("Warning",
	        "Object properties are filtered out in the visualization!",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    if ( typeString === "owl:disjointWith" && graph.options().disjointPropertyFilter().enabled() === true ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:disjointWith properties are filtered out in the visualization!",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    
	    if ( domain === range && typeString === "rdfs:subClassOf" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "rdfs:subClassOf can not be created as loops (domain == range)",
	        "Element not created!", 1, false);
	      return false;
	    }
	    if ( domain === range && typeString === "owl:disjointWith" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:disjointWith  can not be created as loops (domain == range)",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    if ( domain.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:someValuesFrom can not originate from owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    if ( domain.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:allValuesFrom can not originate from owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    if ( range.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:allValuesFrom can not be connected to owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    if ( range.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:someValuesFrom can not be connected to owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    return true; // we can create a property
	  };
	  
	  function createNewObjectProperty( domain, range, draggerEndposition ){
	    // check type of the property that we want to create;
	    
	    var defaultPropertyName = d3.select("#defaultProperty").node().title;
	    
	    // check if we are allow to create that property
	    if ( graph.sanityCheckProperty(domain, range, defaultPropertyName) === false ) return false;
	    
	    
	    var propPrototype = PropertyPrototypeMap.get(defaultPropertyName.toLowerCase());
	    var aProp = new propPrototype(graph);
	    aProp.id("objectProperty" + eP++);
	    aProp.domain(domain);
	    aProp.range(range);
	    aProp.label("newObjectProperty");
	    aProp.baseIri(d3.select("#iriEditor").node().value);
	    aProp.iri(aProp.baseIri() + aProp.id());
	    
	    // check for duplicate;
	    if ( graph.propertyCheckExistenceChecker(aProp, domain, range) === false ) {
	      // delete aProp;
	      // hope for garbage collection here -.-
	      return false;
	    }
	    
	    var autoEditElement = false;
	    
	    if ( defaultPropertyName === "owl:objectProperty" ) {
	      autoEditElement = true;
	    }
	    var pX = 0.49 * (domain.x + range.x);
	    var pY = 0.49 * (domain.y + range.y);
	    
	    if ( domain === range ) {
	      // we use the dragger endposition to determine an angle to put the loop there;
	      var dirD_x = draggerEndposition[0] - domain.x;
	      var dirD_y = draggerEndposition[1] - domain.y;
	      
	      // normalize;
	      var len = Math.sqrt(dirD_x * dirD_x + dirD_y * dirD_y);
	      // it should be very hard to set the position on the same sport but why not handling this
	      var nx = dirD_x / len;
	      var ny = dirD_y / len;
	      // is Nan in javascript like in c len==len returns false when it is not a number?
	      if ( isNaN(len) ) {
	        nx = 0;
	        ny = -1;
	      }
	      
	      // get domain actual raidus
	      var offset = 2 * domain.actualRadius() + 50;
	      pX = domain.x + offset * nx;
	      pY = domain.y + offset * ny;
	    }
	    
	    // add this property to domain and range;
	    domain.addProperty(aProp);
	    range.addProperty(aProp);
	    
	    
	    // add this to the data;
	    unfilteredData.properties.push(aProp);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    graph.fastUpdate();
	    aProp.labelObject().x = pX;
	    aProp.labelObject().px = pX;
	    aProp.labelObject().y = pY;
	    aProp.labelObject().py = pY;
	    
	    aProp.frozen(graph.paused());
	    aProp.locked(graph.paused());
	    domain.frozen(graph.paused());
	    domain.locked(graph.paused());
	    range.frozen(graph.paused());
	    range.locked(graph.paused());
	    
	    
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    
	    options.focuserModule().handle(aProp);
	    graph.activateHoverElementsForProperties(true, aProp, false, touchDevice);
	    aProp.labelObject().increasedLoopAngle = true;
	    aProp.enableEditing(autoEditElement);
	  }
	  
	  graph.createDataTypeProperty = function ( node ){
	    // random postion issues;
	    clearTimeout(nodeFreezer);
	    // tells user when element is filtered out
	    if ( graph.options().datatypeFilter().enabled() === true ) {
	      graph.options().warningModule().showWarning("Warning",
	        "Datatype properties are filtered out in the visualization!",
	        "Element not created!", 1, false);
	      return;
	    }
	    
	    
	    var aNode, prototype;
	    
	    // create a default datatype Node >> HERE LITERAL;
	    var defaultDatatypeName = d3.select("#defaultDatatype").node().title;
	    if ( defaultDatatypeName === "rdfs:Literal" ) {
	      prototype = NodePrototypeMap.get("rdfs:literal");
	      aNode = new prototype(graph);
	      aNode.label("Literal");
	      aNode.iri("http://www.w3.org/2000/01/rdf-schema#Literal");
	      aNode.baseIri("http://www.w3.org/2000/01/rdf-schema#");
	    } else {
	      prototype = NodePrototypeMap.get("rdfs:datatype");
	      aNode = new prototype(graph);
	      var identifier = "";
	      if ( defaultDatatypeName === "undefined" ) {
	        identifier = "undefined";
	        
	        aNode.label(identifier);
	        // TODO : HANDLER FOR UNDEFINED DATATYPES!!<<<>>>>>>>>>>>..
	        aNode.iri("http://www.undefinedDatatype.org/#" + identifier);
	        aNode.baseIri("http://www.undefinedDatatype.org/#");
	        aNode.dType(defaultDatatypeName);
	      } else {
	        identifier = defaultDatatypeName.split(":")[1];
	        aNode.label(identifier);
	        aNode.dType(defaultDatatypeName);
	        aNode.iri("http://www.w3.org/2001/XMLSchema#" + identifier);
	        aNode.baseIri("http://www.w3.org/2001/XMLSchema#");
	      }
	    }
	    
	    
	    var nX = node.x - node.actualRadius() - 100;
	    var nY = node.y + node.actualRadius() + 100;
	    
	    aNode.x = nX;
	    aNode.y = nY;
	    aNode.px = aNode.x;
	    aNode.py = aNode.y;
	    aNode.id("NodeId" + eN++);
	    // add this property to the nodes;
	    unfilteredData.nodes.push(aNode);
	    if ( classNodes.indexOf(aNode) === -1 )
	      classNodes.push(aNode);
	    
	    
	    // add also the datatype Property to it
	    var propPrototype = PropertyPrototypeMap.get("owl:datatypeproperty");
	    var aProp = new propPrototype(graph);
	    aProp.id("datatypeProperty" + eP++);
	    
	    // create the connection
	    aProp.domain(node);
	    aProp.range(aNode);
	    aProp.label("newDatatypeProperty");
	    
	    
	    // TODO: change its base IRI to proper value
	    var ontoIri = d3.select("#iriEditor").node().value;
	    aProp.baseIri(ontoIri);
	    aProp.iri(ontoIri + aProp.id());
	    // add this to the data;
	    unfilteredData.properties.push(aProp);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    graph.fastUpdate();
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    
	    nodeFreezer = setTimeout(function (){
	      if ( node && node.frozen() === true && node.pinned() === false && graph.paused() === false ) {
	        node.frozen(graph.paused());
	        node.locked(graph.paused());
	      }
	    }, 1000);
	    options.focuserModule().handle(undefined);
	    if ( node ) {
	      node.frozen(true);
	      node.locked(true);
	    }
	  };
	  
	  graph.removeNodesViaResponse = function ( nodesToRemove, propsToRemove ){
	    var i, remId;
	    // splice them;
	    for ( i = 0; i < propsToRemove.length; i++ ) {
	      remId = unfilteredData.properties.indexOf(propsToRemove[i]);
	      if ( remId !== -1 )
	        unfilteredData.properties.splice(remId, 1);
	      remId = properties.indexOf(propsToRemove[i]);
	      if ( remId !== -1 )
	        properties.splice(remId, 1);
	      propsToRemove[i] = null;
	    }
	    for ( i = 0; i < nodesToRemove.length; i++ ) {
	      remId = unfilteredData.nodes.indexOf(nodesToRemove[i]);
	      if ( remId !== -1 ) {
	        unfilteredData.nodes.splice(remId, 1);
	      }
	      remId = classNodes.indexOf(nodesToRemove[i]);
	      if ( remId !== -1 )
	        classNodes.splice(remId, 1);
	      nodesToRemove[i] = null;
	    }
	    graph.fastUpdate();
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    options.focuserModule().handle(undefined);
	    nodesToRemove = null;
	    propsToRemove = null;
	    
	  };
	  
	  graph.removeNodeViaEditor = function ( node ){
	    var propsToRemove = [];
	    var nodesToRemove = [];
	    var datatypes = 0;
	    
	    var remId;
	    
	    nodesToRemove.push(node);
	    for ( var i = 0; i < unfilteredData.properties.length; i++ ) {
	      if ( unfilteredData.properties[i].domain() === node || unfilteredData.properties[i].range() === node ) {
	        propsToRemove.push(unfilteredData.properties[i]);
	        if ( unfilteredData.properties[i].type().toLocaleLowerCase() === "owl:datatypeproperty" &&
	          unfilteredData.properties[i].range() !== node ) {
	          nodesToRemove.push(unfilteredData.properties[i].range());
	          datatypes++;
	        }
	      }
	    }
	    var removedItems = propsToRemove.length + nodesToRemove.length;
	    if ( removedItems > 2 ) {
	      var text = "You are about to delete 1 class and " + propsToRemove.length + " properties";
	      if ( datatypes !== 0 ) {
	        text = "You are about to delete 1 class, " + datatypes + " datatypes  and " + propsToRemove.length + " properties";
	      }
	      
	      
	      graph.options().warningModule().responseWarning(
	        "Removing elements",
	        text,
	        "Awaiting response!", graph.removeNodesViaResponse, [nodesToRemove, propsToRemove], false);
	      
	      
	      //
	      // if (confirm("Remove :\n"+propsToRemove.length + " properties\n"+nodesToRemove.length+" classes? ")===false){
	      //     return;
	      // }else{
	      //     // todo : store for undo delete button ;
	      // }
	    } else {
	      // splice them;
	      for ( i = 0; i < propsToRemove.length; i++ ) {
	        remId = unfilteredData.properties.indexOf(propsToRemove[i]);
	        if ( remId !== -1 )
	          unfilteredData.properties.splice(remId, 1);
	        remId = properties.indexOf(propsToRemove[i]);
	        if ( remId !== -1 )
	          properties.splice(remId, 1);
	        propsToRemove[i] = null;
	      }
	      for ( i = 0; i < nodesToRemove.length; i++ ) {
	        remId = unfilteredData.nodes.indexOf(nodesToRemove[i]);
	        if ( remId !== -1 )
	          unfilteredData.nodes.splice(remId, 1);
	        remId = classNodes.indexOf(nodesToRemove[i]);
	        if ( remId !== -1 )
	          classNodes.splice(remId, 1);
	        nodesToRemove[i] = null;
	      }
	      graph.fastUpdate();
	      generateDictionary(unfilteredData);
	      graph.getUpdateDictionary();
	      options.focuserModule().handle(undefined);
	      nodesToRemove = null;
	      propsToRemove = null;
	    }
	  };
	  
	  graph.removePropertyViaEditor = function ( property ){
	    property.domain().removePropertyElement(property);
	    property.range().removePropertyElement(property);
	    var remId;
	    
	    if ( property.type().toLocaleLowerCase() === "owl:datatypeproperty" ) {
	      var datatype = property.range();
	      remId = unfilteredData.nodes.indexOf(property.range());
	      if ( remId !== -1 )
	        unfilteredData.nodes.splice(remId, 1);
	      remId = classNodes.indexOf(property.range());
	      if ( remId !== -1 )
	        classNodes.splice(remId, 1);
	      datatype = null;
	    }
	    remId = unfilteredData.properties.indexOf(property);
	    if ( remId !== -1 )
	      unfilteredData.properties.splice(remId, 1);
	    remId = properties.indexOf(property);
	    if ( remId !== -1 )
	      properties.splice(remId, 1);
	    if ( property.inverse() ) {
	      // so we have inverse
	      property.inverse().inverse(0);
	      
	    }
	    
	    
	    hoveredPropertyElement = undefined;
	    graph.fastUpdate();
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    options.focuserModule().handle(undefined);
	    property = null;
	  };
	  
	  graph.executeColorExternalsModule = function (){
	    options.colorExternalsModule().filter(unfilteredData.nodes, unfilteredData.properties);
	  };
	  
	  graph.executeCompactNotationModule = function (){
	    if ( unfilteredData ) {
	      options.compactNotationModule().filter(unfilteredData.nodes, unfilteredData.properties);
	    }
	    
	  };
	  graph.executeEmptyLiteralFilter = function (){
	    
	    if ( unfilteredData && unfilteredData.nodes.length > 1 ) {
	      options.literalFilter().filter(unfilteredData.nodes, unfilteredData.properties);
	      unfilteredData.nodes = options.literalFilter().filteredNodes();
	      unfilteredData.properties = options.literalFilter().filteredProperties();
	    }
	    
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- animation functions for the nodes --                   **/
	  /** --------------------------------------------------------- **/
	  
	  graph.animateDynamicLabelWidth = function (){
	    var wantedWidth = options.dynamicLabelWidth();
	    var i;
	    for ( i = 0; i < classNodes.length; i++ ) {
	      var nodeElement = classNodes[i];
	      if ( elementTools.isDatatype(nodeElement) ) {
	        nodeElement.animateDynamicLabelWidth(wantedWidth);
	      }
	    }
	    for ( i = 0; i < properties.length; i++ ) {
	      properties[i].animateDynamicLabelWidth(wantedWidth);
	    }
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- Touch behaviour functions --                   **/
	  /** --------------------------------------------------------- **/
	  
	  graph.setTouchDevice = function ( val ){
	    touchDevice = val;
	  };
	  
	  graph.isTouchDevice = function (){
	    return touchDevice;
	  };
	  
	  graph.modified_dblClickFunction = function (){
	    
	    d3.event.stopPropagation();
	    d3.event.preventDefault();
	    // get position where we want to add the node;
	    var grPos = getClickedScreenCoords(d3.event.clientX, d3.event.clientY, graph.translation(), graph.scaleFactor());
	    createNewNodeAtPosition(grPos);
	  };
	  
	  function doubletap(){
	    var touch_time = d3.event.timeStamp;
	    var numTouchers = 1;
	    if ( d3.event && d3.event.touches && d3.event.touches.length )
	      numTouchers = d3.event.touches.length;
	    
	    if ( touch_time - last_touch_time < 300 && numTouchers === 1 ) {
	      d3.event.stopPropagation();
	      if ( editMode === true ) {
	        //graph.modified_dblClickFunction();
	        d3.event.preventDefault();
	        d3.event.stopPropagation();
	        last_touch_time = touch_time;
	        return true;
	      }
	    }
	    last_touch_time = touch_time;
	    return false;
	  }
	  
	  
	  function touchzoomed(){
	    forceNotZooming = true;
	    
	    
	    var touch_time = d3.event.timeStamp;
	    if ( touch_time - last_touch_time < 300 && d3.event.touches.length === 1 ) {
	      d3.event.stopPropagation();
	      
	      if ( editMode === true ) {
	        //graph.modified_dblClickFunction();
	        d3.event.preventDefault();
	        d3.event.stopPropagation();
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        graph.modified_dblTouchFunction();
	      }
	      else {
	        forceNotZooming = false;
	        if ( originalD3_touchZoomFunction )
	          originalD3_touchZoomFunction();
	      }
	      return;
	    }
	    forceNotZooming = false;
	    last_touch_time = touch_time;
	    // TODO: WORK AROUND TO CHECK FOR ORIGINAL FUNCTION
	    if ( originalD3_touchZoomFunction )
	      originalD3_touchZoomFunction();
	  }
	  
	  graph.modified_dblTouchFunction = function ( d ){
	    d3.event.stopPropagation();
	    d3.event.preventDefault();
	    var xy;
	    if ( editMode === true ) {
	      xy = d3.touches(d3.selectAll(".vowlGraph").node());
	    }
	    var grPos = getClickedScreenCoords(xy[0][0], xy[0][1], graph.translation(), graph.scaleFactor());
	    createNewNodeAtPosition(grPos);
	  };
	  
	  /** --------------------------------------------------------- **/
	  /** -- Hover and Selection functions, adding edit elements --  **/
	  /** --------------------------------------------------------- **/
	  
	  graph.ignoreOtherHoverEvents = function ( val ){
	    if ( !arguments.length ) {
	      return ignoreOtherHoverEvents;
	    }
	    else  ignoreOtherHoverEvents = val;
	  };
	  
	  function delayedHiddingHoverElements( tbh ){
	    if ( tbh === true ) return;
	    if ( hoveredNodeElement ) {
	      if ( hoveredNodeElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        if ( hoveredNodeElement && hoveredNodeElement.pinned() === false && graph.paused() === false && hoveredNodeElement.editingTextElement === false ) {
	          hoveredNodeElement.frozen(false);
	          hoveredNodeElement.locked(false);
	        }
	      }, 1000);
	    }
	    if ( hoveredPropertyElement ) {
	      if ( hoveredPropertyElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        rangeDragger.hideDragger(true);
	        domainDragger.hideDragger(true);
	        shadowClone.hideClone(true);
	        if ( hoveredPropertyElement && hoveredPropertyElement.focused() === true && graph.options().drawPropertyDraggerOnHover() === true ) {
	          hoveredPropertyElement.labelObject().increasedLoopAngle = false;
	          // lazy update
	          recalculatePositions();
	        }
	        
	        if ( hoveredPropertyElement && hoveredPropertyElement.pinned() === false && graph.paused() === false && hoveredPropertyElement.editingTextElement === false ) {
	          hoveredPropertyElement.frozen(false);
	          hoveredPropertyElement.locked(false);
	        }
	      }, 1000);
	    }
	    
	  }
	  
	  
	  // TODO : experimental code for updating dynamic label with and its hover element
	  graph.hideHoverPropertyElementsForAnimation = function (){
	    deleteGroupElement.classed("hidden", true);
	  };
	  graph.showHoverElementsAfterAnimation = function ( property, inversed ){
	    setDeleteHoverElementPositionProperty(property, inversed);
	    deleteGroupElement.classed("hidden", false);
	    
	  };
	  
	  function editElementHoverOnHidden(){
	    classDragger.nodeElement.classed("classDraggerNodeHovered", true);
	    classDragger.nodeElement.classed("classDraggerNode", false);
	    editElementHoverOn();
	  }
	  
	  function editElementHoverOutHidden(){
	    classDragger.nodeElement.classed("classDraggerNodeHovered", false);
	    classDragger.nodeElement.classed("classDraggerNode", true);
	    editElementHoverOut();
	  }
	  
	  function editElementHoverOn( touch ){
	    if ( touch === true ) return;
	    clearTimeout(delayedHider); // ignore touch behaviour
	    
	  }
	  
	  graph.killDelayedTimer = function (){
	    clearTimeout(delayedHider);
	    clearTimeout(nodeFreezer);
	  };
	  
	  
	  function editElementHoverOut( tbh ){
	    if ( hoveredNodeElement ) {
	      if ( graph.ignoreOtherHoverEvents() === true || tbh === true || hoveredNodeElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        if ( graph.isADraggerActive() === true ) return;
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        if ( hoveredNodeElement && hoveredNodeElement.pinned() === false && graph.paused() === false ) {
	          hoveredNodeElement.frozen(false);
	          hoveredNodeElement.locked(false);
	        }
	        
	      }, 1000);
	    }
	    if ( hoveredPropertyElement ) {
	      if ( graph.ignoreOtherHoverEvents() === true || tbh === true || hoveredPropertyElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        if ( graph.isADraggerActive() === true ) return;
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        if ( hoveredPropertyElement && hoveredPropertyElement.pinned() === false && graph.paused() === false ) {
	          hoveredPropertyElement.frozen(false);
	          hoveredPropertyElement.locked(false);
	        }
	        
	      }, 1000);
	    }
	  }
	  
	  graph.activateHoverElementsForProperties = function ( val, property, inversed, touchBehaviour ){
	    if ( editMode === false ) return; // nothing to do;
	    
	    if ( touchBehaviour === undefined )
	      touchBehaviour = false;
	    
	    if ( val === true ) {
	      clearTimeout(delayedHider);
	      if ( hoveredPropertyElement ) {
	        if ( hoveredPropertyElement.domain() === hoveredPropertyElement.range() ) {
	          hoveredPropertyElement.labelObject().increasedLoopAngle = false;
	          recalculatePositions();
	        }
	      }
	      
	      hoveredPropertyElement = property;
	      if ( graph.options().drawPropertyDraggerOnHover() === true ) {
	        
	        
	        if ( property.type() !== "owl:DatatypeProperty" ) {
	          if ( property.domain() === property.range() ) {
	            property.labelObject().increasedLoopAngle = true;
	            recalculatePositions();
	          }
	          shadowClone.setParentProperty(property, inversed);
	          rangeDragger.setParentProperty(property, inversed);
	          rangeDragger.hideDragger(false);
	          rangeDragger.addMouseEvents();
	          domainDragger.setParentProperty(property, inversed);
	          domainDragger.hideDragger(false);
	          domainDragger.addMouseEvents();
	          
	          
	        } else if ( property.type() === "owl:DatatypeProperty" ) {
	          shadowClone.setParentProperty(property, inversed);
	          rangeDragger.setParentProperty(property, inversed);
	          rangeDragger.hideDragger(true);
	          rangeDragger.addMouseEvents();
	          domainDragger.setParentProperty(property, inversed);
	          domainDragger.hideDragger(false);
	          domainDragger.addMouseEvents();
	        }
	      }
	      else { // hide when we dont want that option
	        if ( graph.options().drawPropertyDraggerOnHover() === true ) {
	          rangeDragger.hideDragger(true);
	          domainDragger.hideDragger(true);
	          shadowClone.hideClone(true);
	          if ( property.domain() === property.range() ) {
	            property.labelObject().increasedLoopAngle = false;
	            recalculatePositions();
	          }
	        }
	      }
	      
	      if ( hoveredNodeElement ) {
	        if ( hoveredNodeElement && hoveredNodeElement.pinned() === false && graph.paused() === false ) {
	          hoveredNodeElement.frozen(false);
	          hoveredNodeElement.locked(false);
	        }
	      }
	      hoveredNodeElement = undefined;
	      deleteGroupElement.classed("hidden", false);
	      setDeleteHoverElementPositionProperty(property, inversed);
	      deleteGroupElement.selectAll("*").on("click", function (){
	        if ( touchBehaviour && property.focused() === false ) {
	          graph.options().focuserModule().handle(property);
	          return;
	        }
	        graph.removePropertyViaEditor(property);
	        d3.event.stopPropagation();
	      });
	      classDragger.hideDragger(true);
	      addDataPropertyGroupElement.classed("hidden", true);
	    } else {
	      delayedHiddingHoverElements();
	    }
	  };
	  
	  graph.updateDraggerElements = function (){
	    
	    // set opacity style for all elements
	    
	    rangeDragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    domainDragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    classDragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    
	    nodeContainer.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    labelContainer.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    
	    deleteGroupElement.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    addDataPropertyGroupElement.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    
	    
	  };
	  
	  function setAddDataPropertyHoverElementPosition( node ){
	    var delX, delY = 0;
	    if ( node.renderType() === "round" ) {
	      var scale = 0.5 * Math.sqrt(2.0);
	      var oX = scale * node.actualRadius();
	      var oY = scale * node.actualRadius();
	      delX = node.x - oX;
	      delY = node.y + oY;
	      addDataPropertyGroupElement.attr("transform", "translate(" + delX + "," + delY + ")");
	    }
	  }
	  
	  function setDeleteHoverElementPosition( node ){
	    var delX, delY = 0;
	    if ( node.renderType() === "round" ) {
	      var scale = 0.5 * Math.sqrt(2.0);
	      var oX = scale * node.actualRadius();
	      var oY = scale * node.actualRadius();
	      delX = node.x + oX;
	      delY = node.y - oY;
	    } else {
	      delX = node.x + 0.5 * node.width() + 6;
	      delY = node.y - 0.5 * node.height() - 6;
	    }
	    deleteGroupElement.attr("transform", "translate(" + delX + "," + delY + ")");
	  }
	  
	  function setDeleteHoverElementPositionProperty( property, inversed ){
	    if ( property && property.labelElement() ) {
	      var pos = [property.labelObject().x, property.labelObject().y];
	      var widthElement = parseFloat(property.getShapeElement().attr("width"));
	      var heightElement = parseFloat(property.getShapeElement().attr("height"));
	      var delX = pos[0] + 0.5 * widthElement + 6;
	      var delY = pos[1] - 0.5 * heightElement - 6;
	      // this is the lower element
	      if ( property.labelElement().attr("transform") === "translate(0,15)" )
	        delY += 15;
	      // this is upper element
	      if ( property.labelElement().attr("transform") === "translate(0,-15)" )
	        delY -= 15;
	      deleteGroupElement.attr("transform", "translate(" + delX + "," + delY + ")");
	    } else {
	      deleteGroupElement.classed("hidden", true);// hide when there is no property
	    }
	    
	    
	  }
	  
	  graph.activateHoverElements = function ( val, node, touchBehaviour ){
	    if ( editMode === false ) {
	      return; // nothing to do;
	    }
	    if ( touchBehaviour === undefined ) touchBehaviour = false;
	    if ( val === true ) {
	      if ( graph.options().drawPropertyDraggerOnHover() === true ) {
	        rangeDragger.hideDragger(true);
	        domainDragger.hideDragger(true);
	        shadowClone.hideClone(true);
	      }
	      // make them visible
	      clearTimeout(delayedHider);
	      clearTimeout(nodeFreezer);
	      if ( hoveredNodeElement && node.pinned() === false && graph.paused() === false ) {
	        hoveredNodeElement.frozen(false);
	        hoveredNodeElement.locked(false);
	      }
	      hoveredNodeElement = node;
	      if ( node && node.frozen() === false && node.pinned() === false ) {
	        node.frozen(true);
	        node.locked(false);
	      }
	      if ( hoveredPropertyElement && hoveredPropertyElement.focused() === false ) {
	        hoveredPropertyElement.labelObject().increasedLoopAngle = false;
	        recalculatePositions();
	        // update the loopAngles;
	        
	      }
	      hoveredPropertyElement = undefined;
	      deleteGroupElement.classed("hidden", false);
	      setDeleteHoverElementPosition(node);
	      
	      
	      deleteGroupElement.selectAll("*").on("click", function (){
	        if ( touchBehaviour && node.focused() === false ) {
	          graph.options().focuserModule().handle(node);
	          return;
	        }
	        graph.removeNodeViaEditor(node);
	        d3.event.stopPropagation();
	      })
	        .on("mouseover", function (){
	          editElementHoverOn(node, touchBehaviour);
	        })
	        .on("mouseout", function (){
	          editElementHoverOut(node, touchBehaviour);
	        });
	      
	      addDataPropertyGroupElement.classed("hidden", true);
	      classDragger.nodeElement.on("mouseover", editElementHoverOn)
	        .on("mouseout", editElementHoverOut);
	      classDragger.draggerObject.on("mouseover", editElementHoverOnHidden)
	        .on("mouseout", editElementHoverOutHidden);
	      
	      // add the dragger element;
	      if ( node.renderType() === "round" ) {
	        classDragger.svgRoot(draggerLayer);
	        classDragger.setParentNode(node);
	        classDragger.hideDragger(false);
	        addDataPropertyGroupElement.classed("hidden", false);
	        setAddDataPropertyHoverElementPosition(node);
	        addDataPropertyGroupElement.selectAll("*").on("click", function (){
	          if ( touchBehaviour && node.focused() === false ) {
	            graph.options().focuserModule().handle(node);
	            return;
	          }
	          graph.createDataTypeProperty(node);
	          d3.event.stopPropagation();
	        })
	          .on("mouseover", function (){
	            editElementHoverOn(node, touchBehaviour);
	          })
	          .on("mouseout", function (){
	            editElementHoverOut(node, touchBehaviour);
	          });
	      } else {
	        classDragger.hideDragger(true);
	        
	      }
	      
	    } else {
	      delayedHiddingHoverElements(node, touchBehaviour);
	      
	    }
	  };
	  
	  
	  return graph;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 58 */
/***/ (function(module) {
  // Native replacements for the two operations used by WebVOWL.
  module.exports = {
    clone: function(value) {
      if (Array.isArray(value)) return value.slice();
      if (!value || typeof value !== "object") return value;
      var copy = {};
      Object.keys(value).forEach(function(key) {
        Object.defineProperty(copy,key,{value:value[key],enumerable:true,writable:true,configurable:true});
      });
      return copy;
    },
    find: function(values, predicate) {
      return values.filter(function(value) { return value.type === predicate.type; })[0];
    }
  };
/***/ }),
/* 59 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var ArrowLink = __webpack_require__(61);
	var BoxArrowLink = __webpack_require__(22);
	var PlainLink = __webpack_require__(23);
	var OwlDisjointWith = __webpack_require__(46);
	var SetOperatorProperty = __webpack_require__(56);

	/**
	 * Stores the passed properties in links.
	 * @returns {Function}
	 */
	module.exports = (function (){
	  var linkCreator = {};
	  
	  /**
	   * Creates links from the passed properties.
	   * @param properties
	   */
	  linkCreator.createLinks = function ( properties ){
	    var links = groupPropertiesToLinks(properties);
	    
	    for ( var i = 0, l = links.length; i < l; i++ ) {
	      var link = links[i];
	      
	      countAndSetLayers(link, links);
	      countAndSetLoops(link, links);
	    }
	    
	    return links;
	  };
	  
	  /**
	   * Creates links of properties and - if existing - their inverses.
	   * @param properties the properties
	   * @returns {Array}
	   */
	  function groupPropertiesToLinks( properties ){
	    var links = [],
	      property,
	      addedProperties = __webpack_require__(62)();
	    
	    for ( var i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      
	      if ( !addedProperties.has(property) ) {
	        var link = createLink(property);
	        
	        property.link(link);
	        if ( property.inverse() ) {
	          property.inverse().link(link);
	        }
	        
	        links.push(link);
	        
	        addedProperties.add(property);
	        if ( property.inverse() ) {
	          addedProperties.add(property.inverse());
	        }
	      }
	    }
	    
	    return links;
	  }
	  
	  function countAndSetLayers( link, allLinks ){
	    var layer,
	      layers,
	      i, l;
	    
	    if ( typeof link.layers() === "undefined" ) {
	      layers = [];
	      
	      // Search for other links that are another layer
	      for ( i = 0, l = allLinks.length; i < l; i++ ) {
	        var otherLink = allLinks[i];
	        if ( link.domain() === otherLink.domain() && link.range() === otherLink.range() ||
	          link.domain() === otherLink.range() && link.range() === otherLink.domain() ) {
	          layers.push(otherLink);
	        }
	      }
	      
	      // Set the results on each of the layers
	      for ( i = 0, l = layers.length; i < l; ++i ) {
	        layer = layers[i];
	        
	        layer.layerIndex(i);
	        layer.layers(layers);
	      }
	    }
	  }
	  
	  function countAndSetLoops( link, allLinks ){
	    var loop,
	      loops,
	      i, l;
	    
	    if ( typeof link.loops() === "undefined" ) {
	      loops = [];
	      
	      // Search for other links that are also loops of the same node
	      for ( i = 0, l = allLinks.length; i < l; i++ ) {
	        var otherLink = allLinks[i];
	        if ( link.domain() === otherLink.domain() && link.domain() === otherLink.range() ) {
	          loops.push(otherLink);
	        }
	      }
	      
	      // Set the results on each of the loops
	      for ( i = 0, l = loops.length; i < l; ++i ) {
	        loop = loops[i];
	        
	        loop.loopIndex(i);
	        loop.loops(loops);
	      }
	    }
	  }
	  
	  function createLink( property ){
	    var domain = property.domain();
	    var range = property.range();
	    
	    if ( property instanceof OwlDisjointWith ) {
	      return new PlainLink(domain, range, property);
	    } else if ( property instanceof SetOperatorProperty ) {
	      return new BoxArrowLink(domain, range, property);
	    }
	    return new ArrowLink(domain, range, property);
	  }
	  
	  return function (){
	    // Return a function to keep module interfaces consistent
	    return linkCreator;
	  };
	})();


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var PlainLink = __webpack_require__(23);


	module.exports = ArrowLink;

	function ArrowLink( domain, range, property ){
	  PlainLink.apply(this, arguments);
	}

	ArrowLink.prototype = Object.create(PlainLink.prototype);
	ArrowLink.prototype.constructor = ArrowLink;


	ArrowLink.prototype.draw = function ( linkGroup, markerContainer ){
	  var property = this.label().property();
	  var inverse = this.label().inverse();
	  
	  createPropertyMarker(markerContainer, property);
	  if ( inverse ) {
	    createInverseMarker(markerContainer, inverse);
	  }
	  
	  PlainLink.prototype.draw.apply(this, arguments);
	  
	  // attach the markers to the link
	  linkGroup.attr("marker-end", "url(#" + property.markerId() + ")");
	  if ( inverse ) {
	    linkGroup.attr("marker-start", "url(#" + inverse.markerId() + ")");
	  }
	};

	function createPropertyMarker( markerContainer, property ){
	  var marker = appendBasicMarker(markerContainer, property);
	  //marker.attr("refX", 12);
	  var m1X = -12;
	  var m1Y = 8;
	  var m2X = -12;
	  var m2Y = -8;
	  marker.append("path")
	  //.attr("d", "M0,-8L12,0L0,8Z")
	    .attr("d", "M0,0L " + m1X + "," + m1Y + "L" + m2X + "," + m2Y + "L" + 0 + "," + 0)
	    .classed(property.markerType(), true);
	  
	  property.markerElement(marker);
	}

	function createInverseMarker( markerContainer, inverse ){
	  var m1X = -12;
	  var m1Y = 8;
	  var m2X = -12;
	  var m2Y = -8;
	  var inverseMarker = appendBasicMarker(markerContainer, inverse);
	  inverseMarker.append("path")
	  //.attr("d", "M12,-8L0,0L12,8Z")
	    .attr("d", "M0,0L " + -m1X + "," + -m1Y + "L" + -m2X + "," + -m2Y + "L" + 0 + "," + 0)
	    .classed(inverse.markerType(), true);
	  
	  inverse.markerElement(inverseMarker);
	}

	function appendBasicMarker( markerContainer, property ){
	  return markerContainer.append("marker")
	    .datum(property)
	    .attr("id", property.markerId())
	    
	    .attr("viewBox", "-14 -10 28 20")
	    .attr("markerWidth", 10)
	    .attr("markerHeight", 10)
	    //.attr("markerUnits", "userSpaceOnUse")
	    .attr("orient", "auto");
	}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * A simple incomplete encapsulation of the d3 set, which is able to store webvowl
	 * elements by using their id.
	 */
	module.exports = function ( array ){
	  
	  var set = {},
	    d3Set = d3.set(array);
	  
	  set.has = function ( webvowlElement ){
	    return d3Set.has(webvowlElement.id());
	  };
	  
	  set.add = function ( webvowlElement ){
	    return d3Set.add(webvowlElement.id());
	  };
	  
	  set.remove = function ( webvowlElement ){
	    return d3Set.remove(webvowlElement.id());
	  };
	  
	  set.empty = function (){
	    return d3Set.empty();
	  };
	  
	  set.size = function (){
	    return d3Set.size();
	  };
	  
	  return set;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);
	var BaseNode = __webpack_require__(9);
	var DatatypeNode = __webpack_require__(35);
	var Thing = __webpack_require__(31);
	var ObjectProperty = __webpack_require__(50);
	var DatatypeProperty = __webpack_require__(44);
	var RdfsSubClassOf = __webpack_require__(55);
	var Label = __webpack_require__(24);


	var tools = {};
	module.exports = function (){
	  return tools;
	};

	tools.isLabel = function ( element ){
	  return element instanceof Label;
	};

	tools.isNode = function ( element ){
	  return element instanceof BaseNode;
	};

	tools.isDatatype = function ( node ){
	  return node instanceof DatatypeNode;
	};

	tools.isThing = function ( node ){
	  return node instanceof Thing;
	};

	tools.isProperty = function ( element ){
	  return element instanceof BaseProperty;
	};

	tools.isObjectProperty = function ( element ){
	  return element instanceof ObjectProperty;
	};

	tools.isDatatypeProperty = function ( element ){
	  return element instanceof DatatypeProperty;
	};

	tools.isRdfsSubClassOf = function ( property ){
	  return property instanceof RdfsSubClassOf;
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function (){
	  var options = {},
	    data,
	    graphContainerSelector,
	    classDistance = 200,
	    datatypeDistance = 120,
	    loopDistance = 150,
	    charge = -500,
	    gravity = 0.025,
	    linkStrength = 1,
	    height = 600,
	    width = 800,
	    selectionModules = [],
	    filterModules = [],
	    minMagnification = 0.01,
	    maxMagnification = 4,
	    compactNotation = false,
	    dynamicLabelWidth = true,
	    // some filters
	    literalFilter,
	    // menus
	    gravityMenu,
	    filterMenu,
	    loadingModule,
	    modeMenu,
	    pausedMenu,
	    pickAndPinModule,
	    resetMenu,
	    searchMenu,
	    ontologyMenu,
	    sidebar,
	    leftSidebar,
	    editSidebar,
	    navigationMenu,
	    exportMenu,
	    graphObject,
	    zoomSlider,
	    datatypeFilter,
	    focuserModule,
	    colorExternalsModule,
	    compactNotationModule,
	    objectPropertyFilter,
	    subclassFilter,
	    setOperatorFilter,
	    maxLabelWidth = 120,
	    metadataObject = {},
	    generalOntologyMetaData = {},
	    disjointPropertyFilter,
	    rectangularRep = false,
	    warningModule,
	    prefixModule,
	    drawPropertyDraggerOnHover = true,
	    showDraggerObject = false,
	    directInputModule,
	    scaleNodesByIndividuals = true,
	    useAccuracyHelper = true,
	    showRenderingStatistic = true,
	    showInputModality = false,
	    hideDebugOptions = true,
	    nodeDegreeFilter,
	    debugMenu,
	    
	    supportedDatatypes = ["rdfs:Literal", "xsd:boolean", "xsd:double", "xsd:integer", "xsd:string", "undefined"],
	    supportedClasses = ["owl:Thing", "owl:Class", "owl:DeprecatedClass"],
	    supportedProperties = ["owl:objectProperty",
	      "rdfs:subClassOf",
	      "owl:disjointWith",
	      "owl:allValuesFrom",
	      "owl:someValuesFrom"
	    ],
	    prefixList = {
	      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
	      owl: 'http://www.w3.org/2002/07/owl#',
	      xsd: 'http://www.w3.org/2001/XMLSchema#',
	      dc: 'http://purl.org/dc/elements/1.1/#',
	      xml: 'http://www.w3.org/XML/1998/namespace'
	    };
	  
	  options.clearMetaObject = function (){
	    generalOntologyMetaData = {};
	  };
	  options.clearGeneralMetaObject = function (){
	    generalOntologyMetaData = {};
	  };
	  
	  options.debugMenu = function ( val ){
	    if ( !arguments.length ) return debugMenu;
	    debugMenu = val;
	  };
	  
	  options.getHideDebugFeatures = function (){
	    return hideDebugOptions;
	  };
	  options.executeHiddenDebugFeatuers = function (){
	    hideDebugOptions = !hideDebugOptions;
	    d3.selectAll(".debugOption").classed("hidden", hideDebugOptions);
	    if ( hideDebugOptions === false ) {
	      graphObject.setForceTickFunctionWithFPS();
	    }
	    else {
	      graphObject.setDefaultForceTickFunction();
	    }
	    if ( debugMenu ) {
	      debugMenu.updateSettings();
	    }
	    options.setHideDebugFeaturesForDefaultObject(hideDebugOptions);
	  };
	  
	  
	  options.addOrUpdateGeneralObjectEntry = function ( property, value ){
	    if ( generalOntologyMetaData.hasOwnProperty(property) ) {
	      //console.log("Updating Property:"+ property);
	      if ( property === "iri" ) {
	        if ( validURL(value) === false ) {
	          warningModule.showWarning("Invalid Ontology IRI", "Input IRI does not represent an URL", "Restoring previous IRI for ontology", 1, false);
	          return false;
	        }
	      }
	      generalOntologyMetaData[property] = value;
	    } else {
	      generalOntologyMetaData[property] = value;
	    }
	    return true;
	  };
	  
	  options.getGeneralMetaObjectProperty = function ( property ){
	    if ( generalOntologyMetaData.hasOwnProperty(property) ) {
	      return generalOntologyMetaData[property];
	    }
	  };
	  
	  options.getGeneralMetaObject = function (){
	    return generalOntologyMetaData;
	  };
	  
	  options.addOrUpdateMetaObjectEntry = function ( property, value ){
	    
	    if ( metadataObject.hasOwnProperty(property) ) {
	      metadataObject[property] = value;
	    } else {
	      metadataObject[property] = value;
	    }
	  };
	  
	  options.getMetaObjectProperty = function ( property ){
	    if ( metadataObject.hasOwnProperty(property) ) {
	      return metadataObject[property];
	    }
	  };
	  options.getMetaObject = function (){
	    return metadataObject;
	  };
	  
	  
	  options.prefixList = function (){
	    return prefixList;
	  };
	  options.addPrefix = function ( prefix, url ){
	    prefixList[prefix] = url;
	  };
	  
	  function validURL( str ){
	    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	    return urlregex.test(str);
	  }
	  
	  options.updatePrefix = function ( oldPrefix, newPrefix, oldURL, newURL ){
	    if ( oldPrefix === newPrefix && oldURL === newURL ) {
	      //	console.log("Nothing to update");
	      return true;
	    }
	    if ( oldPrefix === newPrefix && oldURL !== newURL && validURL(newURL) === true ) {
	      //  console.log("Update URL");
	      prefixList[oldPrefix] = newURL;
	    } else if ( oldPrefix === newPrefix && oldURL !== newURL && validURL(newURL) === false ) {
	      if ( validURL(newURL) === false ) {
	        warningModule.showWarning("Invalid Prefix IRI", "Input IRI does not represent an IRI", "You should enter a valid IRI in form of a URL", 1, false);
	        return false;
	      }
	      
	      return false;
	    }
	    if ( oldPrefix !== newPrefix && validURL(newURL) === true ) {
	      
	      // sanity check
	      if ( prefixList.hasOwnProperty(newPrefix) ) {
	        //  console.log("Already have this prefix!");
	        warningModule.showWarning("Prefix Already Exist", "Prefix: " + newPrefix + " is already defined", "You should use an other one", 1, false);
	        return false;
	      }
	      options.removePrefix(oldPrefix);
	      options.addPrefix(newPrefix, newURL);
	      editSidebar.updateEditDeleteButtonIds(oldPrefix, newPrefix);
	      return true;
	    }
	    
	    //	console.log("Is new URL ("+newURL+") valid?  >> "+validURL(newURL));
	    if ( validURL(newURL) === false ) {
	      warningModule.showWarning("Invalid Prefix IRI", "Input IRI does not represent an URL", "You should enter a valid URL", 1, false);
	      
	    }
	    return false;
	  };
	  
	  options.removePrefix = function ( prefix ){
	    delete prefixList[prefix];
	  };
	  
	  
	  options.supportedDatatypes = function (){
	    return supportedDatatypes;
	  };
	  options.supportedClasses = function (){
	    return supportedClasses;
	  };
	  options.supportedProperties = function (){
	    return supportedProperties;
	  };
	  
	  options.datatypeFilter = function ( val ){
	    if ( !arguments.length ) return datatypeFilter;
	    datatypeFilter = val;
	  };
	  
	  options.showDraggerObject = function ( val ){
	    if ( !arguments.length ) {
	      return showDraggerObject;
	    }
	    showDraggerObject = val;
	  };
	  options.useAccuracyHelper = function ( val ){
	    if ( !arguments.length ) {
	      return useAccuracyHelper;
	    }
	    useAccuracyHelper = val;
	  };
	  options.showAccuracyHelper = function ( val ){
	    if ( !arguments.length ) {
	      return options.showDraggerObject();
	    }
	    options.showDraggerObject(val);
	  };
	  options.showRenderingStatistic = function ( val ){
	    if ( !arguments.length ) {
	      return showRenderingStatistic;
	    }
	    showRenderingStatistic = val;
	  };
	  options.showInputModality = function ( val ){
	    if ( !arguments.length ) {
	      return showInputModality;
	    }
	    showInputModality = val;
	  };
	  
	  options.drawPropertyDraggerOnHover = function ( val ){
	    if ( !arguments.length ) return drawPropertyDraggerOnHover;
	    drawPropertyDraggerOnHover = val;
	  };
	  
	  options.warningModule = function ( val ){
	    if ( !arguments.length ) return warningModule;
	    warningModule = val;
	  };
	  options.directInputModule = function ( val ){
	    if ( !arguments.length ) return directInputModule;
	    directInputModule = val;
	  };
	  options.prefixModule = function ( val ){
	    if ( !arguments.length ) return prefixModule;
	    prefixModule = val;
	  };
	  
	  options.focuserModule = function ( val ){
	    if ( !arguments.length ) return focuserModule;
	    focuserModule = val;
	  };
	  options.colorExternalsModule = function ( val ){
	    if ( !arguments.length ) return colorExternalsModule;
	    colorExternalsModule = val;
	  };
	  options.compactNotationModule = function ( val ){
	    if ( !arguments.length ) return compactNotationModule;
	    compactNotationModule = val;
	  };
	  
	  options.maxLabelWidth = function ( val ){
	    if ( !arguments.length ) return maxLabelWidth;
	    maxLabelWidth = val;
	  };
	  options.objectPropertyFilter = function ( val ){
	    if ( !arguments.length ) return objectPropertyFilter;
	    objectPropertyFilter = val;
	  };
	  options.disjointPropertyFilter = function ( val ){
	    if ( !arguments.length ) return disjointPropertyFilter;
	    disjointPropertyFilter = val;
	  };
	  options.subclassFilter = function ( val ){
	    if ( !arguments.length ) return subclassFilter;
	    subclassFilter = val;
	  };
	  options.setOperatorFilter = function ( val ){
	    if ( !arguments.length ) return setOperatorFilter;
	    setOperatorFilter = val;
	  };
	  options.leftSidebar = function ( val ){
	    if ( !arguments.length ) return leftSidebar;
	    leftSidebar = val;
	  };
	  options.editSidebar = function ( val ){
	    if ( !arguments.length ) return editSidebar;
	    editSidebar = val;
	  };
	  
	  options.zoomSlider = function ( val ){
	    if ( !arguments.length ) return zoomSlider;
	    zoomSlider = val;
	  };
	  
	  options.graphObject = function ( val ){
	    if ( !arguments.length ) return graphObject;
	    graphObject = val;
	  };
	  
	  
	  var defaultOptionsConfig = {};
	  defaultOptionsConfig.sidebar = "1";
	  defaultOptionsConfig.doc = -1;
	  defaultOptionsConfig.cd = 200;
	  defaultOptionsConfig.dd = 120;
	  defaultOptionsConfig.editorMode = "false";
	  defaultOptionsConfig.filter_datatypes = "false";
	  defaultOptionsConfig.filter_objectProperties = "false";
	  defaultOptionsConfig.filter_sco = "false";
	  defaultOptionsConfig.filter_disjoint = "true";
	  defaultOptionsConfig.filter_setOperator = "false";
	  defaultOptionsConfig.mode_dynamic = "true";
	  defaultOptionsConfig.mode_scaling = "true";
	  defaultOptionsConfig.mode_compact = "false";
	  defaultOptionsConfig.mode_colorExt = "true";
	  defaultOptionsConfig.mode_multiColor = "false";
	  defaultOptionsConfig.debugFeatures = "false";
	  defaultOptionsConfig.rect = 0;
	  
	  
	  options.initialConfig = function (){
	    var initCfg = {};
	    initCfg.sidebar = "1";
	    initCfg.doc = -1;
	    initCfg.cd = 200;
	    initCfg.dd = 120;
	    initCfg.editorMode = "false";
	    initCfg.filter_datatypes = "false";
	    initCfg.filter_objectProperties = "false";
	    initCfg.filter_sco = "false";
	    initCfg.filter_disjoint = "true";
	    initCfg.filter_setOperator = "false";
	    initCfg.mode_dynamic = "true";
	    initCfg.mode_scaling = "true";
	    initCfg.mode_compact = "false";
	    initCfg.mode_colorExt = "true";
	    initCfg.mode_multiColor = "false";
	    initCfg.mode_pnp = "false";
	    initCfg.debugFeatures = "false";
	    initCfg.rect = 0;
	    return initCfg;
	  };
	  
	  options.setEditorModeForDefaultObject = function ( val ){
	    defaultOptionsConfig.editorMode = String(val);
	  };
	  options.setHideDebugFeaturesForDefaultObject = function ( val ){
	    defaultOptionsConfig.debugFeatures = String(!val);
	  };
	  
	  function updateConfigObject(){
	    defaultOptionsConfig.sidebar = options.sidebar().getSidebarVisibility();
	    defaultOptionsConfig.cd = options.classDistance();
	    defaultOptionsConfig.dd = options.datatypeDistance();
	    defaultOptionsConfig.filter_datatypes = String(options.filterMenu().getCheckBoxValue("datatypeFilterCheckbox"));
	    defaultOptionsConfig.filter_sco = String(options.filterMenu().getCheckBoxValue("subclassFilterCheckbox"));
	    defaultOptionsConfig.filter_disjoint = String(options.filterMenu().getCheckBoxValue("disjointFilterCheckbox"));
	    defaultOptionsConfig.filter_setOperator = String(options.filterMenu().getCheckBoxValue("setoperatorFilterCheckbox"));
	    defaultOptionsConfig.filter_objectProperties = String(options.filterMenu().getCheckBoxValue("objectPropertyFilterCheckbox"));
	    defaultOptionsConfig.mode_dynamic = String(options.dynamicLabelWidth());
	    defaultOptionsConfig.mode_scaling = String(options.modeMenu().getCheckBoxValue("nodescalingModuleCheckbox"));
	    defaultOptionsConfig.mode_compact = String(options.modeMenu().getCheckBoxValue("compactnotationModuleCheckbox"));
	    defaultOptionsConfig.mode_colorExt = String(options.modeMenu().getCheckBoxValue("colorexternalsModuleCheckbox"));
	    defaultOptionsConfig.mode_multiColor = String(options.modeMenu().colorModeState());
	    defaultOptionsConfig.mode_pnp = String(options.modeMenu().getCheckBoxValue("pickandpinModuleCheckbox"));
	    defaultOptionsConfig.rect = 0;
	  }
	  
	  options.defaultConfig = function (){
	    updateConfigObject();
	    return defaultOptionsConfig;
	  };
	  
	  options.exportMenu = function ( val ){
	    if ( !arguments.length ) return exportMenu;
	    exportMenu = val;
	  };
	  
	  options.rectangularRepresentation = function ( val ){
	    if ( !arguments.length ) {
	      return rectangularRep;
	    } else {
	      var intVal = parseInt(val);
	      if ( intVal === 0 ) {
	        rectangularRep = false;
	      } else {
	        rectangularRep = true;
	      }
	    }
	  };
	  
	  options.dynamicLabelWidth = function ( val ){
	    if ( !arguments.length )
	      return dynamicLabelWidth;
	    else {
	      dynamicLabelWidth = val;
	    }
	  };
	  options.sidebar = function ( s ){
	    if ( !arguments.length ) return sidebar;
	    sidebar = s;
	    return options;
	    
	  };
	  
	  options.navigationMenu = function ( m ){
	    if ( !arguments.length ) return navigationMenu;
	    navigationMenu = m;
	    return options;
	    
	  };
	  
	  options.ontologyMenu = function ( m ){
	    if ( !arguments.length ) return ontologyMenu;
	    ontologyMenu = m;
	    return options;
	  };
	  
	  options.searchMenu = function ( m ){
	    if ( !arguments.length ) return searchMenu;
	    searchMenu = m;
	    return options;
	  };
	  
	  options.resetMenu = function ( m ){
	    if ( !arguments.length ) return resetMenu;
	    resetMenu = m;
	    return options;
	  };
	  
	  options.pausedMenu = function ( m ){
	    if ( !arguments.length ) return pausedMenu;
	    pausedMenu = m;
	    return options;
	  };
	  
	  options.pickAndPinModule = function ( m ){
	    if ( !arguments.length ) return pickAndPinModule;
	    pickAndPinModule = m;
	    return options;
	  };
	  
	  options.gravityMenu = function ( m ){
	    if ( !arguments.length ) return gravityMenu;
	    gravityMenu = m;
	    return options;
	  };
	  
	  options.filterMenu = function ( m ){
	    if ( !arguments.length ) return filterMenu;
	    filterMenu = m;
	    return options;
	  };
	  
	  options.modeMenu = function ( m ){
	    if ( !arguments.length ) return modeMenu;
	    modeMenu = m;
	    return options;
	  };
	  
	  options.charge = function ( p ){
	    if ( !arguments.length ) return charge;
	    charge = +p;
	    return options;
	  };
	  
	  options.classDistance = function ( p ){
	    if ( !arguments.length ) return classDistance;
	    classDistance = +p;
	    return options;
	  };
	  
	  options.compactNotation = function ( p ){
	    
	    if ( !arguments.length ) return compactNotation;
	    compactNotation = p;
	    return options;
	  };
	  
	  options.data = function ( p ){
	    if ( !arguments.length ) return data;
	    data = p;
	    return options;
	  };
	  
	  options.datatypeDistance = function ( p ){
	    if ( !arguments.length ) return datatypeDistance;
	    datatypeDistance = +p;
	    return options;
	  };
	  
	  options.filterModules = function ( p ){
	    if ( !arguments.length ) return filterModules;
	    filterModules = p;
	    return options;
	  };
	  
	  options.graphContainerSelector = function ( p ){
	    if ( !arguments.length ) return graphContainerSelector;
	    graphContainerSelector = p;
	    return options;
	  };
	  
	  options.gravity = function ( p ){
	    if ( !arguments.length ) return gravity;
	    gravity = +p;
	    return options;
	  };
	  
	  options.height = function ( p ){
	    if ( !arguments.length ) return height;
	    height = +p;
	    return options;
	  };
	  
	  options.linkStrength = function ( p ){
	    if ( !arguments.length ) return linkStrength;
	    linkStrength = +p;
	    return options;
	  };
	  
	  options.loopDistance = function ( p ){
	    if ( !arguments.length ) return loopDistance;
	    loopDistance = p;
	    return options;
	  };
	  
	  options.minMagnification = function ( p ){
	    if ( !arguments.length ) return minMagnification;
	    minMagnification = +p;
	    return options;
	  };
	  
	  options.maxMagnification = function ( p ){
	    if ( !arguments.length ) return maxMagnification;
	    maxMagnification = +p;
	    return options;
	  };
	  
	  options.scaleNodesByIndividuals = function ( p ){
	    if ( !arguments.length ) return scaleNodesByIndividuals;
	    scaleNodesByIndividuals = p;
	    return options;
	  };
	  
	  options.selectionModules = function ( p ){
	    if ( !arguments.length ) return selectionModules;
	    selectionModules = p;
	    return options;
	  };
	  
	  options.width = function ( p ){
	    if ( !arguments.length ) return width;
	    width = +p;
	    return options;
	  };
	  
	  options.literalFilter = function ( p ){
	    if ( !arguments.length ) return literalFilter;
	    literalFilter = p;
	    return options;
	  };
	  options.nodeDegreeFilter = function ( p ){
	    if ( !arguments.length ) return nodeDegreeFilter;
	    nodeDegreeFilter = p;
	    return options;
	  };
	  
	  options.loadingModule = function ( p ){
	    if ( !arguments.length ) return loadingModule;
	    loadingModule = p;
	    return options;
	  };
	  
	  // define url loadable options;
	  // update all set values in the default object
	  options.setOptionsFromURL = function ( opts, changeEditFlag ){
	    if ( opts.sidebar !== undefined ) sidebar.showSidebar(parseInt(opts.sidebar), true);
	    if ( opts.doc ) {
	      var asInt = parseInt(opts.doc);
	      filterMenu.setDegreeSliderValue(asInt);
	      graphObject.setGlobalDOF(asInt);
	      // reset the value to be -1;
	      defaultOptionsConfig.doc = -1;
	    }
	    var settingFlag = false;
	    if ( opts.editorMode ) {
	      if ( opts.editorMode === "true" ) settingFlag = true;
	      d3.select("#editorModeModuleCheckbox").node().checked = settingFlag;
	      
	      if ( changeEditFlag && changeEditFlag === true ) {
	        graphObject.editorMode(settingFlag);
	      }
	      
	      // update config object
	      defaultOptionsConfig.editorMode = opts.editorMode;
	      
	    }
	    if ( opts.cd ) { // class distance
	      options.classDistance(opts.cd); // class distance
	      defaultOptionsConfig.cd = opts.cd;
	    }
	    if ( opts.dd ) { // data distance
	      options.datatypeDistance(opts.dd);
	      defaultOptionsConfig.cd = opts.cd;
	    }
	    if ( opts.cd || opts.dd ) options.gravityMenu().reset(); // reset the values so the slider is updated;
	    
	    
	    settingFlag = false;
	    if ( opts.filter_datatypes ) {
	      if ( opts.filter_datatypes === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("datatypeFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_datatypes = opts.filter_datatypes;
	    }
	    if ( opts.debugFeatures ) {
	      if ( opts.debugFeatures === "true" ) settingFlag = true;
	      hideDebugOptions = settingFlag;
	      if ( options.getHideDebugFeatures() === false ) {
	        options.executeHiddenDebugFeatuers();
	      }
	      defaultOptionsConfig.debugFeatures = opts.debugFeatures;
	    }
	    
	    settingFlag = false;
	    if ( opts.filter_objectProperties ) {
	      if ( opts.filter_objectProperties === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("objectPropertyFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_objectProperties = opts.filter_objectProperties;
	    }
	    settingFlag = false;
	    if ( opts.filter_sco ) {
	      if ( opts.filter_sco === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("subclassFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_sco = opts.filter_sco;
	    }
	    settingFlag = false;
	    if ( opts.filter_disjoint ) {
	      if ( opts.filter_disjoint === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("disjointFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_disjoint = opts.filter_disjoint;
	    }
	    settingFlag = false;
	    if ( opts.filter_setOperator ) {
	      if ( opts.filter_setOperator === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("setoperatorFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_setOperator = opts.filter_setOperator;
	    }
	    filterMenu.updateSettings();
	    
	    // modesMenu
	    settingFlag = false;
	    if ( opts.mode_dynamic ) {
	      if ( opts.mode_dynamic === "true" ) settingFlag = true;
	      modeMenu.setDynamicLabelWidth(settingFlag);
	      dynamicLabelWidth = settingFlag;
	      defaultOptionsConfig.mode_dynamic = opts.mode_dynamic;
	    }
	    // settingFlag=false;
	    // THIS SHOULD NOT BE SET USING THE OPTIONS ON THE URL
	    // if (opts.mode_picnpin) {
	    //     graph.options().filterMenu().setCheckBoxValue("pickandpin ModuleCheckbox", settingFlag);
	    // }
	    
	    settingFlag = false;
	    if ( opts.mode_pnp ) {
	      if ( opts.mode_pnp === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("pickandpinModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_pnp = opts.mode_pnp;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_scaling ) {
	      if ( opts.mode_scaling === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("nodescalingModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_scaling = opts.mode_scaling;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_compact ) {
	      if ( opts.mode_compact === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("compactnotationModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_compact = opts.mode_compact;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_colorExt ) {
	      if ( opts.mode_colorExt === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("colorexternalsModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_colorExt = opts.mode_colorExt;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_multiColor ) {
	      if ( opts.mode_multiColor === "true" ) settingFlag = true;
	      modeMenu.setColorSwitchStateUsingURL(settingFlag);
	      defaultOptionsConfig.mode_multiColor = opts.mode_multiColor;
	    }
	    modeMenu.updateSettingsUsingURL();
	    options.rectangularRepresentation(opts.rect);
	  };
	  
	  return options;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var OwlDisjointWith = __webpack_require__(46);
	var attributeParser = __webpack_require__(66)();
	var equivalentPropertyMerger = __webpack_require__(67)();
	var nodePrototypeMap = __webpack_require__(5)();
	var propertyPrototypeMap = __webpack_require__(40)();

	/**
	 * Encapsulates the parsing and preparation logic of the input data.
	 * @param graph the graph object that will be passed to the elements
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  var parser = {},
	    nodes,
	    properties,
	    classMap,
	    settingsData,
	    settingsImported = false,
	    settingsImportGraphZoomAndTranslation = false,
	    dictionary = [],
	    propertyMap;
	  
	  parser.getDictionary = function (){
	    return dictionary;
	  };
	  
	  parser.setDictionary = function ( d ){
	    dictionary = d;
	  };
	  
	  parser.settingsImported = function (){
	    return settingsImported;
	  };
	  parser.settingsImportGraphZoomAndTranslation = function (){
	    return settingsImportGraphZoomAndTranslation;
	  };
	  
	  parser.parseSettings = function (){
	    settingsImported = true;
	    settingsImportGraphZoomAndTranslation = false;
	    
	    if ( !settingsData ) {
	      settingsImported = false;
	      return;
	    }
	    /** global settings **********************************************************/
	    if ( settingsData.global ) {
	      if ( settingsData.global.zoom ) {
	        var zoomFactor = settingsData.global.zoom;
	        graph.setZoom(zoomFactor);
	        settingsImportGraphZoomAndTranslation = true;
	      }
	      
	      if ( settingsData.global.translation ) {
	        var translation = settingsData.global.translation;
	        graph.setTranslation(translation);
	        settingsImportGraphZoomAndTranslation = true;
	      }
	      
	      if ( settingsData.global.paused ) {
	        var paused = settingsData.global.paused;
	        graph.options().pausedMenu().setPauseValue(paused);
	      }
	    }
	    /** Gravity Settings  **********************************************************/
	    if ( settingsData.gravity ) {
	      if ( settingsData.gravity.classDistance ) {
	        var classDistance = settingsData.gravity.classDistance;
	        graph.options().classDistance(classDistance);
	      }
	      if ( settingsData.gravity.datatypeDistance ) {
	        var datatypeDistance = settingsData.gravity.datatypeDistance;
	        graph.options().datatypeDistance(datatypeDistance);
	      }
	      graph.options().gravityMenu().reset(); // reads the options values and sets the gui values
	    }
	    
	    
	    // shared variable declaration
	    
	    var i;
	    var id;
	    var checked;
	    /** Filter Settings **********************************************************/
	    if ( settingsData.filter ) {
	      // checkbox settings
	      if ( settingsData.filter.checkBox ) {
	        var filter_cb = settingsData.filter.checkBox;
	        for ( i = 0; i < filter_cb.length; i++ ) {
	          id = filter_cb[i].id;
	          checked = filter_cb[i].checked;
	          graph.options().filterMenu().setCheckBoxValue(id, checked);
	        }
	      }
	      // node degree filter settings
	      if ( settingsData.filter.degreeSliderValue ) {
	        var degreeSliderValue = settingsData.filter.degreeSliderValue;
	        graph.options().filterMenu().setDegreeSliderValue(degreeSliderValue);
	      }
	      graph.options().filterMenu().updateSettings();
	    }
	    
	    /** Modes Setting **********************************************************/
	    if ( settingsData.modes ) {
	      // checkbox settings
	      if ( settingsData.modes.checkBox ) {
	        var modes_cb = settingsData.modes.checkBox;
	        for ( i = 0; i < modes_cb.length; i++ ) {
	          id = modes_cb[i].id;
	          checked = modes_cb[i].checked;
	          graph.options().modeMenu().setCheckBoxValue(id, checked);
	        }
	      }
	      // color switch settings
	      var state = settingsData.modes.colorSwitchState;
	      // state could be undefined
	      if ( state === true || state === false ) {
	        graph.options().modeMenu().setColorSwitchState(state);
	      }
	      graph.options().modeMenu().updateSettings();
	    }
	    graph.updateStyle(); // updates graph representation(setting charges and distances)
	  };
	  
	  
	  /**
	   * Parses the ontology data and preprocesses it (e.g. connecting inverse properties and so on).
	   * @param ontologyData the loaded ontology json file
	   */
	  parser.parse = function ( ontologyData ){
	    if ( !ontologyData ) {
	      nodes = [];
	      properties = [];
	      dictionary = [];
	      return;
	    }
	    dictionary = [];
	    if ( ontologyData.settings ) settingsData = ontologyData.settings;
	    else settingsData = undefined;
	    
	    var classes = combineClasses(ontologyData.class, ontologyData.classAttribute),
	      datatypes = combineClasses(ontologyData.datatype, ontologyData.datatypeAttribute),
	      combinedClassesAndDatatypes = classes.concat(datatypes),
	      unparsedProperties = ontologyData.property || [],
	      combinedProperties;
	    
	    // Inject properties for unions, intersections, ...
	    addSetOperatorProperties(combinedClassesAndDatatypes, unparsedProperties);
	    combinedProperties = combineProperties(unparsedProperties, ontologyData.propertyAttribute);
	    classMap = mapElements(combinedClassesAndDatatypes);
	    propertyMap = mapElements(combinedProperties);
	    mergeRangesOfEquivalentProperties(combinedProperties, combinedClassesAndDatatypes);
	    
	    // Process the graph data
	    convertTypesToIris(combinedClassesAndDatatypes, ontologyData.namespace);
	    convertTypesToIris(combinedProperties, ontologyData.namespace);
	    nodes = createNodeStructure(combinedClassesAndDatatypes, classMap);
	    properties = createPropertyStructure(combinedProperties, classMap, propertyMap);
	  };
	  
	  /**
	   * @return {Array} the preprocessed nodes
	   */
	  parser.nodes = function (){
	    return nodes;
	  };
	  
	  /**
	   * @returns {Array} the preprocessed properties
	   */
	  parser.properties = function (){
	    return properties;
	  };
	  
	  /**
	   * Combines the passed objects with its attributes and prototypes. This also applies
	   * attributes defined in the base of the prototype.
	   */
	  function combineClasses( baseObjects, attributes ){
	    var combinations = [];
	    var prototypeMap = createLowerCasePrototypeMap(nodePrototypeMap);
	    
	    if ( baseObjects ) {
	      baseObjects.forEach(function ( element ){
	        var matchingAttribute;
	        
	        if ( attributes ) {
	          // Look for an attribute with the same id and merge them
	          for ( var i = 0; i < attributes.length; i++ ) {
	            var attribute = attributes[i];
	            if ( element.id === attribute.id ) {
	              matchingAttribute = attribute;
	              break;
	            }
	          }
	          addAdditionalAttributes(element, matchingAttribute);
	        }
	        
	        // Then look for a prototype to add its properties
	        var Prototype = prototypeMap.get(element.type.toLowerCase());
	        
	        if ( Prototype ) {
	          addAdditionalAttributes(element, Prototype); // TODO might be unnecessary
	          
	          var node = new Prototype(graph);
	          node.annotations(element.annotations)
	            .baseIri(element.baseIri)
	            .comment(element.comment)
	            .complement(element.complement)
	            .disjointUnion(element.disjointUnion)
	            .description(element.description)
	            .equivalents(element.equivalent)
	            .id(element.id)
	            .intersection(element.intersection)
	            .label(element.label)
	            // .type(element.type) Ignore, because we predefined it
	            .union(element.union)
	            .iri(element.iri);
	          if ( element.pos ) {
	            node.x = element.pos[0];
	            node.y = element.pos[1];
	            node.px = node.x;
	            node.py = node.y;
	          }
	          //class element pin
	          var elementPinned = element.pinned;
	          if ( elementPinned === true ) {
	            node.pinned(true);
	            graph.options().pickAndPinModule().addPinnedElement(node);
	          }
	          // Create node objects for all individuals
	          if ( element.individuals ) {
	            element.individuals.forEach(function ( individual ){
	              var individualNode = new Prototype(graph);
	              individualNode.label(individual.labels)
	                .iri(individual.iri);
	              
	              node.individuals().push(individualNode);
	            });
	          }
	          
	          if ( element.attributes ) {
	            var deduplicatedAttributes = d3.set(element.attributes.concat(node.attributes()));
	            node.attributes(deduplicatedAttributes.values());
	          }
	          combinations.push(node);
	        } else {
	          console.error("Unknown element type: " + element.type);
	        }
	      });
	    }
	    
	    return combinations;
	  }
	  
	  function combineProperties( baseObjects, attributes ){
	    var combinations = [];
	    var prototypeMap = createLowerCasePrototypeMap(propertyPrototypeMap);
	    
	    if ( baseObjects ) {
	      baseObjects.forEach(function ( element ){
	        var matchingAttribute;
	        
	        if ( attributes ) {
	          // Look for an attribute with the same id and merge them
	          for ( var i = 0; i < attributes.length; i++ ) {
	            var attribute = attributes[i];
	            if ( element.id === attribute.id ) {
	              matchingAttribute = attribute;
	              break;
	            }
	          }
	          addAdditionalAttributes(element, matchingAttribute);
	        }
	        
	        // Then look for a prototype to add its properties
	        var Prototype = prototypeMap.get(element.type.toLowerCase());
	        
	        if ( Prototype ) {
	          // Create the matching object and set the properties
	          var property = new Prototype(graph);
	          property.annotations(element.annotations)
	            .baseIri(element.baseIri)
	            .cardinality(element.cardinality)
	            .comment(element.comment)
	            .domain(element.domain)
	            .description(element.description)
	            .equivalents(element.equivalent)
	            .id(element.id)
	            .inverse(element.inverse)
	            .label(element.label)
	            .minCardinality(element.minCardinality)
	            .maxCardinality(element.maxCardinality)
	            .range(element.range)
	            .subproperties(element.subproperty)
	            .superproperties(element.superproperty)
	            // .type(element.type) Ignore, because we predefined it
	            .iri(element.iri);
	          
	          // adding property position
	          if ( element.pos ) {
	            property.x = element.pos[0];
	            property.y = element.pos[1];
	            property.px = element.pos[0];
	            property.py = element.pos[1];
	          }
	          var elementPinned = element.pinned;
	          if ( elementPinned === true ) {
	            property.pinned(true);
	            graph.options().pickAndPinModule().addPinnedElement(property);
	          }
	          
	          
	          if ( element.attributes ) {
	            var deduplicatedAttributes = d3.set(element.attributes.concat(property.attributes()));
	            property.attributes(deduplicatedAttributes.values());
	          }
	          combinations.push(property);
	        } else {
	          console.error("Unknown element type: " + element.type);
	        }
	        
	      });
	    }
	    
	    return combinations;
	  }
	  
	  function createLowerCasePrototypeMap( prototypeMap ){
	    return d3.map(prototypeMap.values(), function ( Prototype ){
	      return new Prototype().type().toLowerCase();
	    });
	  }
	  
	  function mergeRangesOfEquivalentProperties( properties, nodes ){
	    // pass clones of arrays into the merger to keep the current functionality of this module
	    var newNodes = equivalentPropertyMerger.merge(properties.slice(), nodes.slice(), propertyMap, classMap, graph);
	    
	    // replace all the existing nodes and map the nodes again
	    nodes.length = 0;
	    Array.prototype.push.apply(nodes, newNodes);
	    classMap = mapElements(nodes);
	  }
	  
	  /**
	   * Checks all attributes which have to be rewritten.
	   * For example:
	   * <b>equivalent</b> is filled with only ID's of the corresponding nodes. It would be better to used the
	   * object instead of the ID so we swap the ID's with the correct object reference and can delete it from drawing
	   * because it is not necessary.
	   */
	  function createNodeStructure( rawNodes, classMap ){
	    var nodes = [];
	    
	    // Set the default values
	    var maxIndividualCount = 0;
	    rawNodes.forEach(function ( node ){
	      maxIndividualCount = Math.max(maxIndividualCount, node.individuals().length);
	      node.visible(true);
	    });
	    
	    rawNodes.forEach(function ( node ){
	      // Merge and connect the equivalent nodes
	      processEquivalentIds(node, classMap);
	      
	      attributeParser.parseClassAttributes(node);
	      
	      node.maxIndividualCount(maxIndividualCount);
	    });
	    
	    // Collect all nodes that should be displayed
	    rawNodes.forEach(function ( node ){
	      if ( node.visible() ) {
	        nodes.push(node);
	      }
	    });
	    
	    return nodes;
	  }
	  
	  /**
	   * Sets the disjoint attribute of the nodes if a disjoint label is found.
	   * @param property
	   */
	  function processDisjoints( property ){
	    if ( property instanceof OwlDisjointWith === false ) {
	      return;
	    }
	    
	    var domain = property.domain(),
	      range = property.range();
	    
	    // Check the domain.
	    if ( !domain.disjointWith() ) {
	      domain.disjointWith([]);
	    }
	    
	    // Check the range.
	    if ( !range.disjointWith() ) {
	      range.disjointWith([]);
	    }
	    
	    domain.disjointWith().push(property.range());
	    range.disjointWith().push(property.domain());
	  }
	  
	  /**
	   * Connect all properties and also their sub- and superproperties.
	   * We iterate over the rawProperties array because it is way faster than iterating
	   * over an object and its attributes.
	   *
	   * @param rawProperties the properties
	   * @param classMap a map of all classes
	   * @param propertyMap the properties in a map
	   */
	  function createPropertyStructure( rawProperties, classMap, propertyMap ){
	    var properties = [];
	    // Set default values
	    rawProperties.forEach(function ( property ){
	      property.visible(true);
	    });
	    
	    // Connect properties
	    rawProperties.forEach(function ( property ){
	      var domain,
	        range,
	        domainObject,
	        rangeObject,
	        inverse;
	      
	      /* Skip properties that have no information about their domain and range, like
	       inverse properties with optional inverse and optional domain and range attributes */
	      if ( (property.domain() && property.range()) || property.inverse() ) {
	        
	        var inversePropertyId = findId(property.inverse());
	        // Look if an inverse property exists
	        if ( inversePropertyId ) {
	          inverse = propertyMap[inversePropertyId];
	          if ( !inverse ) {
	            console.warn("No inverse property was found for id: " + inversePropertyId);
	            property.inverse(undefined);
	          }
	        }
	        
	        // Either domain and range are set on this property or at the inverse
	        if ( typeof property.domain() !== "undefined" && typeof property.range() !== "undefined" ) {
	          domain = findId(property.domain());
	          range = findId(property.range());
	          
	          domainObject = classMap[domain];
	          rangeObject = classMap[range];
	        } else if ( inverse ) {
	          // Domain and range need to be switched
	          domain = findId(inverse.range());
	          range = findId(inverse.domain());
	          
	          domainObject = classMap[domain];
	          rangeObject = classMap[range];
	        } else {
	          console.warn("Domain and range not found for property: " + property.id());
	        }
	        
	        // Set the references on this property
	        property.domain(domainObject);
	        property.range(rangeObject);
	        
	        // Also set the attributes of the inverse property
	        if ( inverse ) {
	          property.inverse(inverse);
	          inverse.inverse(property);
	          
	          // Switch domain and range
	          inverse.domain(rangeObject);
	          inverse.range(domainObject);
	        }
	      }
	      // Reference sub- and superproperties
	      referenceSubOrSuperProperties(property.subproperties());
	      referenceSubOrSuperProperties(property.superproperties());
	    });
	    
	    // Merge equivalent properties and process disjoints.
	    rawProperties.forEach(function ( property ){
	      processEquivalentIds(property, propertyMap);
	      processDisjoints(property);
	      
	      attributeParser.parsePropertyAttributes(property);
	    });
	    // Add additional information to the properties
	    rawProperties.forEach(function ( property ){
	      // Properties of merged classes should point to/from the visible equivalent class
	      var propertyWasRerouted = false;
	      
	      if ( property.domain() === undefined ) {
	        console.warn("No Domain was found for id:" + property.id());
	        return;
	      }
	      
	      if ( wasNodeMerged(property.domain()) ) {
	        property.domain(property.domain().equivalentBase());
	        propertyWasRerouted = true;
	      }
	      if ( property.range() === undefined ) {
	        console.warn("No range was found for id:" + property.id());
	        return;
	      }
	      if ( wasNodeMerged(property.range()) ) {
	        property.range(property.range().equivalentBase());
	        propertyWasRerouted = true;
	      }
	      // But there should not be two equal properties between the same domain and range
	      var equalProperty = getOtherEqualProperty(rawProperties, property);
	      
	      if ( propertyWasRerouted && equalProperty ) {
	        property.visible(false);
	        
	        equalProperty.redundantProperties().push(property);
	      }
	      
	      // Hide property if source or target node is hidden
	      if ( !property.domain().visible() || !property.range().visible() ) {
	        property.visible(false);
	      }
	      
	      // Collect all properties that should be displayed
	      if ( property.visible() ) {
	        properties.push(property);
	      }
	    });
	    return properties;
	  }
	  
	  function referenceSubOrSuperProperties( subOrSuperPropertiesArray ){
	    var i, l;
	    
	    if ( !subOrSuperPropertiesArray ) {
	      return;
	    }
	    
	    for ( i = 0, l = subOrSuperPropertiesArray.length; i < l; ++i ) {
	      var subOrSuperPropertyId = findId(subOrSuperPropertiesArray[i]);
	      var subOrSuperProperty = propertyMap[subOrSuperPropertyId];
	      
	      if ( subOrSuperProperty ) {
	        // Replace id with object
	        subOrSuperPropertiesArray[i] = subOrSuperProperty;
	      } else {
	        console.warn("No sub-/superproperty was found for id: " + subOrSuperPropertyId);
	      }
	    }
	  }
	  
	  function wasNodeMerged( node ){
	    return !node.visible() && node.equivalentBase();
	  }
	  
	  function getOtherEqualProperty( properties, referenceProperty ){
	    var i, l, property;
	    
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      
	      if ( referenceProperty === property ) {
	        continue;
	      }
	      if ( referenceProperty.domain() !== property.domain() ||
	        referenceProperty.range() !== property.range() ) {
	        continue;
	      }
	      
	      // Check for an equal IRI, if non existent compare label and type
	      if ( referenceProperty.iri() && property.iri() ) {
	        if ( referenceProperty.iri() === property.iri() ) {
	          return property;
	        }
	      } else if ( referenceProperty.type() === property.type() &&
	        referenceProperty.defaultLabel() === property.defaultLabel() ) {
	        return property;
	      }
	    }
	    
	    return undefined;
	  }
	  
	  /**
	   * Generates and adds properties for links to set operators.
	   * @param classes unprocessed classes
	   * @param properties unprocessed properties
	   */
	  function addSetOperatorProperties( classes, properties ){
	    function addProperties( domainId, rangeIds, operatorType ){
	      if ( !rangeIds ) {
	        return;
	      }
	      
	      rangeIds.forEach(function ( rangeId, index ){
	        var property = {
	          id: "GENERATED-" + operatorType + "-" + domainId + "-" + rangeId + "-" + index,
	          type: "setOperatorProperty",
	          domain: domainId,
	          range: rangeId
	        };
	        
	        properties.push(property);
	      });
	    }
	    
	    classes.forEach(function ( clss ){
	      addProperties(clss.id(), clss.complement(), "COMPLEMENT");
	      addProperties(clss.id(), clss.intersection(), "INTERSECTION");
	      addProperties(clss.id(), clss.union(), "UNION");
	      addProperties(clss.id(), clss.disjointUnion(), "DISJOINTUNION");
	    });
	  }
	  
	  /**
	   * Replaces the ids of equivalent nodes/properties with the matching objects, cross references them
	   * and tags them as processed.
	   * @param element a node or a property
	   * @param elementMap a map where nodes/properties can be looked up
	   */
	  function processEquivalentIds( element, elementMap ){
	    var eqIds = element.equivalents();
	    
	    if ( !eqIds || element.equivalentBase() ) {
	      return;
	    }
	    
	    // Replace ids with the corresponding objects
	    for ( var i = 0, l = eqIds.length; i < l; ++i ) {
	      var eqId = findId(eqIds[i]);
	      var eqObject = elementMap[eqId];
	      
	      if ( eqObject ) {
	        // Cross reference both objects
	        eqObject.equivalents(eqObject.equivalents());
	        eqObject.equivalents().push(element);
	        eqObject.equivalentBase(element);
	        eqIds[i] = eqObject;
	        
	        // Hide other equivalent nodes
	        eqObject.visible(false);
	      } else {
	        console.warn("No class/property was found for equivalent id: " + eqId);
	      }
	    }
	  }
	  
	  /**
	   * Tries to convert the type to an iri and sets it.
	   * @param elements classes or properties
	   * @param namespaces an array of namespaces
	   */
	  function convertTypesToIris( elements, namespaces ){
	    elements.forEach(function ( element ){
	      if ( typeof element.iri() === "string" ) {
	        element.iri(replaceNamespace(element.iri(), namespaces));
	      }
	    });
	  }
	  
	  /**
	   * Creates a map by mapping the array with the passed function.
	   * @param array the array
	   * @returns {{}}
	   */
	  function mapElements( array ){
	    var map = {};
	    for ( var i = 0, length = array.length; i < length; i++ ) {
	      var element = array[i];
	      map[element.id()] = element;
	    }
	    return map;
	  }
	  
	  /**
	   * Adds the attributes of the additional object to the base object, but doesn't
	   * overwrite existing ones.
	   *
	   * @param base the base object
	   * @param addition the object with additional data
	   * @returns the combination is also returned
	   */
	  function addAdditionalAttributes( base, addition ){
	    // Check for an undefined value
	    addition = addition || {};
	    
	    for ( var addAttribute in addition ) {
	      // Add the attribute if it doesn't exist
	      if ( !(addAttribute in base) && addition.hasOwnProperty(addAttribute) ) {
	        base[addAttribute] = addition[addAttribute];
	      }
	    }
	    return base;
	  }
	  
	  /**
	   * Replaces the namespace (and the separator) if one exists and returns the new value.
	   * @param address the address with a namespace in it
	   * @param namespaces an array of namespaces
	   * @returns {string} the processed address with the (possibly) replaced namespace
	   */
	  function replaceNamespace( address, namespaces ){
	    var separatorIndex = address.indexOf(":");
	    if ( separatorIndex === -1 ) {
	      return address;
	    }
	    var namespaceName = address.substring(0, separatorIndex);
	    
	    for ( var i = 0, length = namespaces.length; i < length; ++i ) {
	      var namespace = namespaces[i];
	      if ( namespaceName === namespace.name ) {
	        return namespace.iri + address.substring(separatorIndex + 1);
	      }
	    }
	    
	    return address;
	  }
	  
	  /**
	   * Looks whether the passed object is already the id or if it was replaced
	   * with the object that belongs to the id.
	   * @param object an id, a class or a property
	   * @returns {string} the id of the passed object or undefined
	   */
	  function findId( object ){
	    if ( !object ) {
	      return undefined;
	    } else if ( typeof object === "string" ) {
	      return object;
	    } else if ( "id" in object ) {
	      return object.id();
	    } else {
	      console.warn("No Id was found for this object: " + object);
	      return undefined;
	    }
	  }
	  
	  return parser;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	/**
	 * Parses the attributes an element has and sets the corresponding attributes.
	 * @returns {Function}
	 */
	module.exports = (function (){
	  var attributeParser = {},
	    // Style
	    ANONYMOUS = "anonymous",
	    DATATYPE = "datatype",
	    DEPRECATED = "deprecated",
	    EXTERNAL = "external",
	    OBJECT = "object",
	    RDF = "rdf",
	    // Representations
	    ASYMMETRIC = "asymmetric",
	    FUNCTIONAL = "functional",
	    INVERSE_FUNCTIONAL = "inverse functional",
	    IRREFLEXIVE = "irreflexive",
	    KEY = "key",
	    REFLEXIVE = "reflexive",
	    SYMMETRIC = "symmetric",
	    TRANSITIVE = "transitive",
	    // Attribute groups
	    VISUAL_ATTRIBUTE_GROUPS = [
	      [DEPRECATED, DATATYPE, OBJECT, RDF],
	      [ANONYMOUS]
	    ],
	    CLASS_INDICATIONS = [DEPRECATED, EXTERNAL],
	    PROPERTY_INDICATIONS = [ASYMMETRIC, FUNCTIONAL, INVERSE_FUNCTIONAL, IRREFLEXIVE, KEY, REFLEXIVE, SYMMETRIC,
	      TRANSITIVE];
	  
	  /**
	   * Parses and sets the attributes of a class.
	   * @param clazz
	   */
	  attributeParser.parseClassAttributes = function ( clazz ){
	    if ( !(clazz.attributes() instanceof Array) ) {
	      return;
	    }
	    
	    parseVisualAttributes(clazz);
	    parseClassIndications(clazz);
	  };
	  
	  function parseVisualAttributes( element ){
	    VISUAL_ATTRIBUTE_GROUPS.forEach(function ( attributeGroup ){
	      setVisualAttributeOfGroup(element, attributeGroup);
	    });
	  }
	  
	  function setVisualAttributeOfGroup( element, group ){
	    var i, l, attribute;
	    
	    for ( i = 0, l = group.length; i < l; i++ ) {
	      attribute = group[i];
	      if ( element.attributes().indexOf(attribute) >= 0 ) {
	        element.visualAttributes().push(attribute);
	        
	        // Just a single attribute is possible
	        break;
	      }
	    }
	  }
	  
	  function parseClassIndications( clazz ){
	    var i, l, indication;
	    
	    for ( i = 0, l = CLASS_INDICATIONS.length; i < l; i++ ) {
	      indication = CLASS_INDICATIONS[i];
	      
	      if ( clazz.attributes().indexOf(indication) >= 0 ) {
	        clazz.indications().push(indication);
	      }
	    }
	  }
	  
	  /**
	   * Parses and sets the attributes of a property.
	   * @param property
	   */
	  attributeParser.parsePropertyAttributes = function ( property ){
	    if ( !(property.attributes() instanceof Array) ) {
	      return;
	    }
	    
	    parseVisualAttributes(property);
	    parsePropertyIndications(property);
	  };
	  
	  function parsePropertyIndications( property ){
	    var i, l, indication;
	    
	    for ( i = 0, l = PROPERTY_INDICATIONS.length; i < l; i++ ) {
	      indication = PROPERTY_INDICATIONS[i];
	      
	      if ( property.attributes().indexOf(indication) >= 0 ) {
	        property.indications().push(indication);
	      }
	    }
	  }
	  
	  
	  return function (){
	    // Return a function to keep module interfaces consistent
	    return attributeParser;
	  };
	})();


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var OwlThing = __webpack_require__(31);
	var RdfsLiteral = __webpack_require__(38);
	var elementTools = __webpack_require__(63)();

	var equivalentPropertyMerger = {};
	module.exports = function (){
	  return equivalentPropertyMerger;
	};

	var PREFIX = "GENERATED-MERGED_RANGE-";
	var OBJECT_PROPERTY_DEFAULT_RANGE_TYPE = "owl:Thing";
	var DATA_PROPERTY_DEFAULT_RANGE_TYPE = "rdfs:Literal";


	equivalentPropertyMerger.merge = function ( properties, nodes, propertyMap, nodeMap, graph ){
	  var totalNodeIdsToHide = d3.set();
	  var processedPropertyIds = d3.set();
	  var mergeNodes = [];
	  
	  for ( var i = 0; i < properties.length; i++ ) {
	    var property = properties[i];
	    var equivalents = property.equivalents().map(createIdToPropertyMapper(propertyMap));
	    
	    if ( equivalents.length === 0 || processedPropertyIds.has(property.id()) ) {
	      continue;
	    }
	    
	    var propertyWithEquivalents = equivalents.concat(property);
	    
	    var mergeNode = findMergeNode(propertyWithEquivalents, nodeMap);
	    if ( !mergeNode ) {
	      if ( mergeNode !== undefined ) {
	        mergeNode = createDefaultMergeNode(property, graph);
	        mergeNodes.push(mergeNode);
	      }
	    }
	    
	    var nodeIdsToHide = replaceRangesAndCollectNodesToHide(propertyWithEquivalents, mergeNode, properties,
	      processedPropertyIds);
	    for ( var j = 0; j < nodeIdsToHide.length; j++ ) {
	      totalNodeIdsToHide.add(nodeIdsToHide[j]);
	    }
	  }
	  
	  return filterVisibleNodes(nodes.concat(mergeNodes), totalNodeIdsToHide);
	};


	function createIdToPropertyMapper( propertyMap ){
	  return function ( id ){
	    return propertyMap[id];
	  };
	}

	function findMergeNode( propertyWithEquivalents, nodeMap ){
	  var typeMap = mapPropertiesRangesToType(propertyWithEquivalents, nodeMap);
	  var typeSet = d3.set(typeMap.keys());
	  
	  // default types are the fallback values and should be ignored for the type determination
	  typeSet.remove(OBJECT_PROPERTY_DEFAULT_RANGE_TYPE);
	  typeSet.remove(DATA_PROPERTY_DEFAULT_RANGE_TYPE);
	  
	  // exactly one type to chose from -> take the node of this type as range
	  if ( typeSet.size() === 1 ) {
	    var type = typeSet.values()[0];
	    var ranges = typeMap.get(type);
	    
	    if ( ranges.length === 1 ) {
	      return ranges[0];
	    }
	  }
	}

	function mapPropertiesRangesToType( properties, nodeMap ){
	  var typeMap = d3.map();
	  
	  properties.forEach(function ( property ){
	    if ( property === undefined ) //@ WORKAROUND
	      return;
	    
	    var range = nodeMap[property.range()];
	    var type = range.type();
	    
	    if ( !typeMap.has(type) ) {
	      typeMap.set(type, []);
	    }
	    
	    typeMap.get(type).push(range);
	  });
	  
	  return typeMap;
	}

	function createDefaultMergeNode( property, graph ){
	  var range;
	  
	  if ( elementTools.isDatatypeProperty(property) ) {
	    range = new RdfsLiteral(graph);
	  } else {
	    range = new OwlThing(graph);
	  }
	  range.id(PREFIX + property.id());
	  
	  return range;
	}

	function replaceRangesAndCollectNodesToHide( propertyWithEquivalents, mergeNode, properties, processedPropertyIds ){
	  var nodesToHide = [];
	  
	  propertyWithEquivalents.forEach(function ( property ){
	    
	    if ( property === undefined || mergeNode === undefined ) // @ WORKAROUND
	      return;
	    var oldRangeId = property.range();
	    property.range(mergeNode.id());
	    if ( !isDomainOrRangeOfOtherProperty(oldRangeId, properties) ) {
	      nodesToHide.push(oldRangeId);
	    }
	    
	    processedPropertyIds.add(property.id());
	  });
	  
	  return nodesToHide;
	}

	function isDomainOrRangeOfOtherProperty( nodeId, properties ){
	  for ( var i = 0; i < properties.length; i++ ) {
	    var property = properties[i];
	    if ( property.domain() === nodeId || property.range() === nodeId ) {
	      return true;
	    }
	  }
	  
	  return false;
	}

	function filterVisibleNodes( nodes, nodeIdsToHide ){
	  var filteredNodes = [];
	  
	  nodes.forEach(function ( node ){
	    if ( !nodeIdsToHide.has(node.id()) ) {
	      filteredNodes.push(node);
	    }
	  });
	  
	  return filteredNodes;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** variable defs **/
	  var Class_dragger = {};
	  Class_dragger.nodeId = 10001;
	  Class_dragger.parent = undefined;
	  Class_dragger.x = 0;
	  Class_dragger.y = 0;
	  Class_dragger.rootElement = undefined;
	  Class_dragger.rootNodeLayer = undefined;
	  Class_dragger.pathLayer = undefined;
	  Class_dragger.mouseEnteredVar = false;
	  Class_dragger.mouseButtonPressed = false;
	  Class_dragger.nodeElement = undefined;
	  Class_dragger.draggerObject = undefined;
	  Class_dragger.pathElement = undefined;
	  Class_dragger.typus = "Class_dragger";
	  
	  Class_dragger.type = function (){
	    return Class_dragger.typus;
	  };
	  
	  Class_dragger.parentNode = function (){
	    return Class_dragger.parent;
	  };
	  
	  Class_dragger.hideClass_dragger = function ( val ){
	    Class_dragger.pathElement.classed("hidden", val);
	    Class_dragger.nodeElement.classed("hidden", val);
	    Class_dragger.draggerObject.classed("hidden", val);
	  };
	  
	  Class_dragger.setParentNode = function ( parentNode ){
	    Class_dragger.parent = parentNode;
	    
	    if ( Class_dragger.mouseButtonPressed === false ) {
	      if ( Class_dragger.parent.actualRadius && Class_dragger.parent.actualRadius() ) {
	        Class_dragger.x = Class_dragger.parent.x + 10 + Class_dragger.parent.actualRadius();
	        Class_dragger.y = Class_dragger.parent.y + 10 + Class_dragger.parent.actualRadius();
	      } else {
	        Class_dragger.x = Class_dragger.parent.x + 60;
	        Class_dragger.y = Class_dragger.parent.y + 60;
	      }
	    }
	    Class_dragger.updateElement();
	  };
	  
	  Class_dragger.hideDragger = function ( val ){
	    if ( Class_dragger.pathElement ) Class_dragger.pathElement.classed("hidden", val);
	    if ( Class_dragger.nodeElement ) Class_dragger.nodeElement.classed("hidden", val);
	    if ( Class_dragger.draggerObject ) Class_dragger.draggerObject.classed("hidden", val);
	    
	  };
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  Class_dragger.id = function ( index ){
	    if ( !arguments.length ) {
	      return Class_dragger.nodeId;
	    }
	    Class_dragger.nodeId = index;
	  };
	  
	  Class_dragger.svgPathLayer = function ( layer ){
	    Class_dragger.pathLayer = layer.append('g');
	  };
	  
	  Class_dragger.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return Class_dragger.rootElement;
	    Class_dragger.rootElement = root;
	    Class_dragger.rootNodeLayer = Class_dragger.rootElement.append('g');
	    Class_dragger.addMouseEvents();
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  Class_dragger.drawNode = function (){
	    Class_dragger.pathElement = Class_dragger.pathLayer.append('line')
	      .classed("classNodeDragPath", true);
	    Class_dragger.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	    // var lineData = [
	    //     {"x": 0, "y": 0},
	    //     {"x": 0, "y": 40},
	    //     {"x": -40, "y": 0},
	    //     {"x": 0, "y": -40},
	    //     {"x": 0, "y": 0}
	    // ];
	    
	    var lineData = [
	      { "x": -40, "y": 0 }, // start
	      { "x": -20, "y": -10 },
	      { "x": 20, "y": -50 },
	      { "x": -10, "y": 0 }, // center
	      { "x": 20, "y": 50 },
	      { "x": -20, "y": 10 },
	      { "x": -40, "y": 0 }
	    ];
	    
	    
	    var lineFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("basis-closed");
	    var pathData = "M 20,40 C 0,15 0,-15 20,-40 L -40,0 Z";
	    // var pathData="M 20,40 C 0,15 0,-15 20,-40 20,-40 -35.22907,-23.905556 -45.113897,0.06313453 -35.22907,20.095453 20,40 20,40 Z";
	    // var pathData="M 39.107144,51.25 C 0,17.362169 0,-13.75 39.285715,-49.821429 c 0,0 -69.58321,34.511175 -100.714286,50.35714329 C -22.96643,20.324376 39.107144,51.25 39.107144,51.25 Z";
	    
	    Class_dragger.nodeElement = Class_dragger.rootNodeLayer.append('path').attr("d", pathData);
	    Class_dragger.nodeElement.classed("classDraggerNode", true);
	    Class_dragger.draggerObject = Class_dragger.rootNodeLayer.append("circle");
	    if ( graph.options().useAccuracyHelper() ) {
	      Class_dragger.draggerObject.attr("r", 40)
	        .attr("cx", 0)
	        .attr("cy", 0)
	        .classed("superHiddenElement", true);
	      Class_dragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  };
	  
	  Class_dragger.updateElement = function (){
	    
	    // Class_dragger.pathLayer.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")");
	    // Class_dragger.rootElement.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")");
	    if ( Class_dragger.pathElement ) {
	      
	      // compute start point ;
	      
	      
	      var sX = Class_dragger.parent.x,
	        sY = Class_dragger.parent.y,
	        eX = Class_dragger.x,
	        eY = Class_dragger.y;
	      
	      
	      // this is used only when you dont have a proper layout ordering;
	      var dirX = eX - sX;
	      var dirY = eY - sY;
	      var len = Math.sqrt((dirX * dirX) + (dirY * dirY));
	      
	      var nX = dirX / len;
	      var nY = dirY / len;
	      
	      var ppX = sX + nX * Class_dragger.parent.actualRadius();
	      var ppY = sY + nY * Class_dragger.parent.actualRadius();
	      
	      var ncx = nX * 15;
	      var ncy = nY * 15;
	      Class_dragger.draggerObject.attr("cx", ncx)
	        .attr("cy", ncy);
	      
	      Class_dragger.pathElement.attr("x1", ppX)
	        .attr("y1", ppY)
	        .attr("x2", eX)
	        .attr("y2", eY);
	    }
	    var angle = Math.atan2(Class_dragger.parent.y - Class_dragger.y, Class_dragger.parent.x - Class_dragger.x) * 180 / Math.PI;
	    
	    Class_dragger.nodeElement.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")" + "rotate(" + angle + ")");
	    Class_dragger.draggerObject.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")");
	    // console.log("update Elmenent root element"+Class_dragger.x + "," + Class_dragger.y );
	    //
	    // Class_dragger.nodeElement.attr("transform", function (d) {
	    //     return "rotate(" + angle + ")";
	    // });
	  };
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  Class_dragger.addMouseEvents = function (){
	    // console.log("adding mouse events");
	    Class_dragger.rootNodeLayer.selectAll("*").on("mouseover", Class_dragger.onMouseOver)
	      .on("mouseout", Class_dragger.onMouseOut)
	      .on("click", function (){
	      })
	      .on("dblclick", function (){
	      })
	      .on("mousedown", Class_dragger.mouseDown)
	      .on("mouseup", Class_dragger.mouseUp);
	  };
	  
	  Class_dragger.mouseDown = function (){
	    Class_dragger.nodeElement.style("cursor", "move");
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    Class_dragger.mouseButtonPressed = true;
	    console.log("Mouse DOWN from Dragger");
	  };
	  
	  Class_dragger.mouseUp = function (){
	    Class_dragger.nodeElement.style("cursor", "auto");
	    Class_dragger.mouseButtonPressed = false;
	    console.log("Mouse UP from Dragger");
	  };
	  
	  
	  Class_dragger.mouseEntered = function ( p ){
	    if ( !arguments.length ) return Class_dragger.mouseEnteredVar;
	    Class_dragger.mouseEnteredVar = p;
	    return Class_dragger;
	  };
	  
	  Class_dragger.selectedViaTouch = function ( val ){
	    Class_dragger.nodeElement.classed("classDraggerNode", !val);
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", val);
	    
	  };
	  
	  Class_dragger.onMouseOver = function (){
	    if ( Class_dragger.mouseEntered() ) {
	      return;
	    }
	    Class_dragger.nodeElement.classed("classDraggerNode", false);
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    var selectedNode = Class_dragger.rootElement.node(),
	      nodeContainer = selectedNode.parentNode;
	    nodeContainer.appendChild(selectedNode);
	    
	    Class_dragger.mouseEntered(true);
	    
	  };
	  Class_dragger.onMouseOut = function (){
	    if ( Class_dragger.mouseButtonPressed === true )
	      return;
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Class_dragger.nodeElement.classed("classDraggerNode", true);
	    Class_dragger.mouseEntered(false);
	  };
	  
	  Class_dragger.setPosition = function ( x, y ){
	    
	    Class_dragger.x = x;
	    Class_dragger.y = y;
	    Class_dragger.updateElement();
	  };
	  
	  Class_dragger.setAdditionalClassForClass_dragger = function ( name, val ){
	    // console.log("Class_dragger should sett the class here")
	    // Class_dragger.nodeElement.classed(name,val);
	    
	  };
	  return Class_dragger;
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** variable defs **/
	  var Range_dragger = {};
	  Range_dragger.nodeId = 10002;
	  Range_dragger.parent = undefined;
	  Range_dragger.x = 0;
	  Range_dragger.y = 0;
	  Range_dragger.rootElement = undefined;
	  Range_dragger.rootNodeLayer = undefined;
	  Range_dragger.pathLayer = undefined;
	  Range_dragger.mouseEnteredVar = false;
	  Range_dragger.mouseButtonPressed = false;
	  Range_dragger.nodeElement = undefined;
	  Range_dragger.draggerObject = undefined;
	  
	  Range_dragger.pathElement = undefined;
	  Range_dragger.typus = "Range_dragger";
	  
	  Range_dragger.type = function (){
	    return Range_dragger.typus;
	  };
	  
	  // TODO: We need the endPoint of the Link here!
	  Range_dragger.parentNode = function (){
	    return Range_dragger.parent;
	  };
	  
	  Range_dragger.hide_dragger = function ( val ){
	    Range_dragger.pathElement.classed("hidden", val);
	    Range_dragger.nodeElement.classed("hidden", val);
	    Range_dragger.draggerObject.classed("hidden", val);
	  };
	  Range_dragger.hideDragger = function ( val ){
	    if ( Range_dragger.pathElement ) Range_dragger.pathElement.classed("hidden", val);
	    if ( Range_dragger.nodeElement ) Range_dragger.nodeElement.classed("hidden", val);
	    if ( Range_dragger.draggerObject ) Range_dragger.draggerObject.classed("hidden", val);
	    
	    
	  };
	  
	  Range_dragger.reDrawEverthing = function (){
	    Range_dragger.setParentProperty(Range_dragger.parent);
	  };
	  Range_dragger.updateRange = function ( newRange ){
	    
	    if ( graph.genericPropertySanityCheck(Range_dragger.parent.domain(), newRange,
	        Range_dragger.parent.type(),
	        "Could not update range", "Restoring previous range") === false ) return;
	    
	    // check for triple duplicates!
	    
	    if ( graph.propertyCheckExistenceChecker(Range_dragger.parent, Range_dragger.parent.domain(), newRange) === false )
	      return;
	    if ( Range_dragger.parent.labelElement() === undefined ) return;
	    if ( Range_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ||
	      Range_dragger.parent.labelElement().attr("transform") === "translate(0,-15)" ) {
	      var prop = Range_dragger.parent;
	      Range_dragger.parent.inverse().inverse(null);
	      Range_dragger.parent.inverse(null);
	      prop.range(newRange);
	    }
	    
	    else {
	      Range_dragger.parent.range(newRange);
	    }
	    // update the position of the new range
	    var rX = newRange.x;
	    var rY = newRange.y;
	    
	    var dX = Range_dragger.parent.domain().x;
	    var dY = Range_dragger.parent.domain().y;
	    
	    
	    // center
	    var cX = 0.49 * (dX + rX);
	    var cY = 0.49 * (dY + rY);
	    // put position there;
	    Range_dragger.parent.labelElement().x = cX;
	    Range_dragger.parent.labelElement().px = cX;
	    Range_dragger.parent.labelElement().y = cY;
	    Range_dragger.parent.labelElement().py = cY;
	    
	  };
	  
	  Range_dragger.setParentProperty = function ( parentProperty, inversed ){
	    Range_dragger.parent = parentProperty;
	    var iP;
	    var renElem;
	    Range_dragger.isLoopProperty = false;
	    if ( parentProperty.domain() === parentProperty.range() ) Range_dragger.isLoopProperty = true;
	    Range_dragger.parent = parentProperty;
	    renElem = parentProperty.labelObject();
	    if ( inversed === true ) {
	      if ( parentProperty.labelElement() && parentProperty.labelElement().attr("transform") === "translate(0,15)" ) {
	        iP = renElem.linkDomainIntersection;
	        if ( renElem.linkDomainIntersection ) {
	          Range_dragger.x = iP.x;
	          Range_dragger.y = iP.y;
	        }
	      } else {
	        iP = renElem.linkRangeIntersection;
	        if ( renElem.linkRangeIntersection ) {
	          Range_dragger.x = iP.x;
	          Range_dragger.y = iP.y;
	        }
	      }
	    }
	    else {
	      iP = renElem.linkRangeIntersection;
	      if ( renElem.linkRangeIntersection ) {
	        Range_dragger.x = iP.x;
	        Range_dragger.y = iP.y;
	      }
	    }
	    
	    Range_dragger.updateElement();
	  };
	  
	  
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  Range_dragger.id = function ( index ){
	    if ( !arguments.length ) {
	      return Range_dragger.nodeId;
	    }
	    Range_dragger.nodeId = index;
	  };
	  
	  Range_dragger.svgPathLayer = function ( layer ){
	    Range_dragger.pathLayer = layer.append('g');
	  };
	  
	  Range_dragger.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return Range_dragger.rootElement;
	    Range_dragger.rootElement = root;
	    Range_dragger.rootNodeLayer = Range_dragger.rootElement.append('g');
	    Range_dragger.addMouseEvents();
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  Range_dragger.drawNode = function (){
	    Range_dragger.pathElement = Range_dragger.pathLayer.append('line')
	      .classed("classNodeDragPath", true);
	    Range_dragger.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	    // var lineData = [
	    //     {"x": 0, "y": 0},
	    //     {"x": 0, "y": 40},
	    //     {"x": -40, "y": 0},
	    //     {"x": 0, "y": -40},
	    //     {"x": 0, "y": 0}
	    // ];
	    
	    var lineData = [
	      { "x": -40, "y": 0 }, // start
	      { "x": -20, "y": -10 },
	      { "x": 20, "y": -50 },
	      { "x": -10, "y": 0 }, // center
	      { "x": 20, "y": 50 },
	      { "x": -20, "y": 10 },
	      { "x": -40, "y": 0 }
	    ];
	    
	    
	    var lineFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("basis-closed");
	    var pathData = "M 61,40 C 41,15 41,-15 61,-40 L 1,0 Z";
	    
	    Range_dragger.nodeElement = Range_dragger.rootNodeLayer.append('path').attr("d", pathData);
	    Range_dragger.nodeElement.classed("classDraggerNode", true);
	    if ( graph.options().useAccuracyHelper() ) {
	      Range_dragger.draggerObject = Range_dragger.rootNodeLayer.append("circle");
	      Range_dragger.draggerObject.attr("r", 40)
	        .attr("cx", 0)
	        .attr("cy", 0)
	        .classed("superHiddenElement", true);
	      Range_dragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  };
	  
	  Range_dragger.updateElementViaDomainDragger = function ( x, y ){
	    
	    var range_x = x;
	    var range_y = y;
	    
	    var dex = Range_dragger.parent.range().x;
	    var dey = Range_dragger.parent.range().y;
	    
	    var dir_X = x - dex;
	    var dir_Y = y - dey;
	    
	    var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	    
	    var nX = dir_X / len;
	    var nY = dir_Y / len;
	    
	    
	    var ep_range_x = dex + nX * Range_dragger.parent.range().actualRadius();
	    var ep_range_y = dey + nY * Range_dragger.parent.range().actualRadius();
	    
	    
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    len = Math.sqrt(dx * dx + dy * dy);
	    nX = dx / len;
	    nY = dy / len;
	    
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI + 180;
	    Range_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    var doX = ep_range_x + nX * 40;
	    var doY = ep_range_y + nY * 40;
	    Range_dragger.draggerObject.attr("transform", "translate(" + doX + "," + doY + ")");
	    
	  };
	  
	  
	  Range_dragger.updateElement = function (){
	    if ( Range_dragger.mouseButtonPressed === true || Range_dragger.parent === undefined ) return;
	    
	    var range = Range_dragger.parent.range();
	    var iP = Range_dragger.parent.labelObject().linkRangeIntersection;
	    if ( Range_dragger.parent.labelElement() === undefined ) return;
	    var offsetForLoop = 48;
	    if ( Range_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ) {
	      range = Range_dragger.parent.inverse().domain();
	      iP = Range_dragger.parent.labelObject().linkDomainIntersection;
	      offsetForLoop = -48;
	    }
	    
	    if ( iP === undefined ) return;
	    var range_x = range.x;
	    var range_y = range.y;
	    
	    var ep_range_x = iP.x;
	    var ep_range_y = iP.y;
	    // offset for dragger object
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    var len = Math.sqrt(dx * dx + dy * dy);
	    var nX = dx / len;
	    var nY = dy / len;
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI;
	    
	    var doX = ep_range_x - nX * 40;
	    var doY = ep_range_y - nY * 40;
	    
	    if ( Range_dragger.isLoopProperty === true )
	      angle -= offsetForLoop;
	    
	    
	    Range_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Range_dragger.draggerObject.attr("transform", "translate(" + doX + "," + doY + ")");
	    
	    
	  };
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  Range_dragger.addMouseEvents = function (){
	    var rootLayer = Range_dragger.rootNodeLayer.selectAll("*");
	    rootLayer.on("mouseover", Range_dragger.onMouseOver)
	      .on("mouseout", Range_dragger.onMouseOut)
	      .on("click", function (){
	      })
	      .on("dblclick", function (){
	      })
	      .on("mousedown", Range_dragger.mouseDown)
	      .on("mouseup", Range_dragger.mouseUp);
	  };
	  
	  Range_dragger.mouseDown = function (){
	    Range_dragger.nodeElement.style("cursor", "move");
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    Range_dragger.mouseButtonPressed = true;
	  };
	  
	  Range_dragger.mouseUp = function (){
	    Range_dragger.nodeElement.style("cursor", "auto");
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Range_dragger.mouseButtonPressed = false;
	  };
	  
	  
	  Range_dragger.mouseEntered = function ( p ){
	    if ( !arguments.length ) return Range_dragger.mouseEnteredVar;
	    Range_dragger.mouseEnteredVar = p;
	    return Range_dragger;
	  };
	  
	  Range_dragger.selectedViaTouch = function ( val ){
	    Range_dragger.nodeElement.classed("classDraggerNode", !val);
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", val);
	    
	  };
	  
	  Range_dragger.onMouseOver = function (){
	    if ( Range_dragger.mouseEntered() ) {
	      return;
	    }
	    Range_dragger.nodeElement.classed("classDraggerNode", false);
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    var selectedNode = Range_dragger.rootElement.node(),
	      nodeContainer = selectedNode.parentNode;
	    nodeContainer.appendChild(selectedNode);
	    
	    Range_dragger.mouseEntered(true);
	    
	  };
	  Range_dragger.onMouseOut = function (){
	    if ( Range_dragger.mouseButtonPressed === true )
	      return;
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Range_dragger.nodeElement.classed("classDraggerNode", true);
	    Range_dragger.mouseEntered(false);
	  };
	  
	  Range_dragger.setPosition = function ( x, y ){
	    var range_x = Range_dragger.parent.domain().x;
	    var range_y = Range_dragger.parent.domain().y;
	    
	    // var position of the rangeEndPoint
	    var ep_range_x = x;
	    var ep_range_y = y;
	    
	    // offset for dragger object
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    
	    var len = Math.sqrt(dx * dx + dy * dy);
	    
	    var nX = dx / len;
	    var nY = dy / len;
	    
	    
	    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
	    var doX = ep_range_x + nX * 40;
	    var doY = ep_range_y + nY * 40;
	    Range_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Range_dragger.draggerObject.attr("transform", "translate(" + doX + "," + doY + ")");
	    Range_dragger.x = x;
	    Range_dragger.y = y;
	    
	  };
	  
	  Range_dragger.setAdditionalClassForClass_dragger = function ( name, val ){
	    
	  };
	  return Range_dragger;
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = function ( graph ){
	  /** variable defs **/
	  var Domain_dragger = {};
	  Domain_dragger.nodeId = 10002;
	  Domain_dragger.parent = undefined;
	  Domain_dragger.x = 0;
	  Domain_dragger.y = 0;
	  Domain_dragger.rootElement = undefined;
	  Domain_dragger.rootNodeLayer = undefined;
	  Domain_dragger.pathLayer = undefined;
	  Domain_dragger.mouseEnteredVar = false;
	  Domain_dragger.mouseButtonPressed = false;
	  Domain_dragger.nodeElement = undefined;
	  Domain_dragger.draggerObject = undefined;
	  
	  Domain_dragger.pathElement = undefined;
	  Domain_dragger.typus = "Domain_dragger";
	  
	  Domain_dragger.type = function (){
	    return Domain_dragger.typus;
	  };
	  
	  
	  // TODO: We need the endPoint of the Link here!
	  Domain_dragger.parentNode = function (){
	    return Domain_dragger.parent;
	  };
	  
	  Domain_dragger.hide_dragger = function ( val ){
	    Domain_dragger.pathElement.classed("hidden", val);
	    Domain_dragger.nodeElement.classed("hidden", val);
	    Domain_dragger.draggerObject.classed("hidden", val);
	  };
	  
	  Domain_dragger.reDrawEverthing = function (){
	    Domain_dragger.setParentProperty(Domain_dragger.parent);
	  };
	  Domain_dragger.updateDomain = function ( newDomain ){
	    
	    if ( graph.genericPropertySanityCheck(Domain_dragger.parent.range(), newDomain, Domain_dragger.parent.type(),
	        "Could not update domain", "Restoring previous domain") === false ) {
	      Domain_dragger.updateElement();
	      return;
	    }
	    
	    if ( graph.propertyCheckExistenceChecker(Domain_dragger.parent, newDomain, Domain_dragger.parent.range()) === false )
	      return;
	    
	    
	    if ( Domain_dragger.parent.labelElement() === undefined ) {
	      Domain_dragger.updateElement();
	      return;
	    }
	    if ( Domain_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ||
	      Domain_dragger.parent.labelElement().attr("transform") === "translate(0,-15)" ) {
	      var prop = Domain_dragger.parent;
	      Domain_dragger.parent.inverse().inverse(null);
	      Domain_dragger.parent.inverse(null);
	      console.log("SPLITTING ITEMS!");
	      prop.domain(newDomain);
	    }
	    else {
	      Domain_dragger.parent.domain(newDomain);
	    }
	    
	    // update the position of the new range
	    var rX = Domain_dragger.parent.range().x;
	    var rY = Domain_dragger.parent.range().y;
	    var dX = newDomain.x;
	    var dY = newDomain.y;
	    
	    // center
	    var cX = 0.49 * (dX + rX);
	    var cY = 0.49 * (dY + rY);
	    // put position there;
	    Domain_dragger.parent.labelObject().x = cX;
	    Domain_dragger.parent.labelObject().px = cX;
	    Domain_dragger.parent.labelObject().y = cY;
	    Domain_dragger.parent.labelObject().py = cY;
	    Domain_dragger.updateElement();
	    
	  };
	  
	  Domain_dragger.setParentProperty = function ( parentProperty, inverted ){
	    Domain_dragger.invertedProperty = inverted;
	    var renElem;
	    var iP;
	    Domain_dragger.isLoopProperty = false;
	    if ( parentProperty.domain() === parentProperty.range() )
	      Domain_dragger.isLoopProperty = true;
	    
	    Domain_dragger.parent = parentProperty;
	    renElem = parentProperty.labelObject();
	    if ( inverted === true ) {
	      
	      // this is the lower element
	      if ( parentProperty.labelElement() && parentProperty.labelElement().attr("transform") === "translate(0,15)" ) {
	        // console.log("This is the lower element!");
	        iP = renElem.linkRangeIntersection;
	        if ( renElem.linkRangeIntersection ) {
	          Domain_dragger.x = iP.x;
	          Domain_dragger.y = iP.y;
	        }
	      }
	      else {
	        // console.log("This is the upper  element");
	        iP = renElem.linkDomainIntersection;
	        if ( renElem.linkDomainIntersection ) {
	          Domain_dragger.x = iP.x;
	          Domain_dragger.y = iP.y;
	        }
	      }
	    }
	    else {
	      // console.log("This is single element");
	      iP = renElem.linkDomainIntersection;
	      if ( renElem.linkDomainIntersection ) {
	        Domain_dragger.x = iP.x;
	        Domain_dragger.y = iP.y;
	      }
	    }
	    Domain_dragger.updateElement();
	    
	  };
	  
	  Domain_dragger.hideDragger = function ( val ){
	    if ( Domain_dragger.pathElement ) Domain_dragger.pathElement.classed("hidden", val);
	    if ( Domain_dragger.nodeElement ) Domain_dragger.nodeElement.classed("hidden", val);
	    if ( Domain_dragger.draggerObject ) Domain_dragger.draggerObject.classed("hidden", val);
	    
	    
	  };
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  Domain_dragger.id = function ( index ){
	    if ( !arguments.length ) {
	      return Domain_dragger.nodeId;
	    }
	    Domain_dragger.nodeId = index;
	  };
	  
	  Domain_dragger.svgPathLayer = function ( layer ){
	    Domain_dragger.pathLayer = layer.append('g');
	  };
	  
	  Domain_dragger.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return Domain_dragger.rootElement;
	    Domain_dragger.rootElement = root;
	    Domain_dragger.rootNodeLayer = Domain_dragger.rootElement.append('g');
	    Domain_dragger.addMouseEvents();
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  Domain_dragger.drawNode = function (){
	    Domain_dragger.pathElement = Domain_dragger.pathLayer.append('line')
	      .classed("classNodeDragPath", true);
	    Domain_dragger.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	    var pathData = "M 10,40 C -10,15 -10,-15 10,-40 -8.8233455,-13.641384 -36.711107,-5.1228436 -50,0 -36.696429,4.9079017 -8.6403157,13.745728 10,40 Z";
	    Domain_dragger.nodeElement = Domain_dragger.rootNodeLayer.append('path').attr("d", pathData);
	    Domain_dragger.nodeElement.classed("classDraggerNode", true);
	    if ( graph.options().useAccuracyHelper() ) {
	      Domain_dragger.draggerObject = Domain_dragger.rootNodeLayer.append("circle");
	      Domain_dragger.draggerObject.attr("r", 40)
	        .attr("cx", 0)
	        .attr("cy", 0)
	        .classed("superHiddenElement", true);
	      Domain_dragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  };
	  Domain_dragger.updateElementViaRangeDragger = function ( x, y ){
	    var range_x = x;
	    var range_y = y;
	    
	    var dex = Domain_dragger.parent.domain().x;
	    var dey = Domain_dragger.parent.domain().y;
	    
	    var dir_X = x - dex;
	    var dir_Y = y - dey;
	    
	    var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	    
	    var nX = dir_X / len;
	    var nY = dir_Y / len;
	    
	    
	    var ep_range_x = dex + nX * Domain_dragger.parent.domain().actualRadius();
	    var ep_range_y = dey + nY * Domain_dragger.parent.domain().actualRadius();
	    
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI;
	    
	    Domain_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    var dox = ep_range_x + nX * 20;
	    var doy = ep_range_y + nY * 20;
	    Domain_dragger.draggerObject.attr("transform", "translate(" + dox + "," + doy + ")");
	  };
	  
	  
	  Domain_dragger.updateElement = function (){
	    if ( Domain_dragger.mouseButtonPressed === true || Domain_dragger.parent === undefined ) return;
	    
	    var domain = Domain_dragger.parent.domain();
	    var iP = Domain_dragger.parent.labelObject().linkDomainIntersection;
	    if ( Domain_dragger.parent.labelElement() === undefined ) return;
	    if ( Domain_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ) {
	      Domain_dragger.parent.inverse().domain();
	      iP = Domain_dragger.parent.labelObject().linkRangeIntersection;
	      
	    }
	    var range_x = domain.x;
	    var range_y = domain.y;
	    
	    
	    if ( iP === undefined ) return;
	    var ep_range_x = iP.x;
	    var ep_range_y = iP.y;
	    
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    var len = Math.sqrt(dx * dx + dy * dy);
	    
	    var nX = dx / len;
	    var nY = dy / len;
	    
	    var dox = ep_range_x - nX * 20;
	    var doy = ep_range_y - nY * 20;
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI + 180;
	    
	    Domain_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Domain_dragger.draggerObject.attr("transform", "translate(" + dox + "," + doy + ")");
	  };
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  Domain_dragger.addMouseEvents = function (){
	    var rootLayer = Domain_dragger.rootNodeLayer.selectAll("*");
	    rootLayer.on("mouseover", Domain_dragger.onMouseOver)
	      .on("mouseout", Domain_dragger.onMouseOut)
	      .on("click", function (){
	      })
	      .on("dblclick", function (){
	      })
	      .on("mousedown", Domain_dragger.mouseDown)
	      .on("mouseup", Domain_dragger.mouseUp);
	  };
	  
	  Domain_dragger.mouseDown = function (){
	    Domain_dragger.nodeElement.style("cursor", "move");
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    Domain_dragger.mouseButtonPressed = true;
	  };
	  
	  Domain_dragger.mouseUp = function (){
	    Domain_dragger.nodeElement.style("cursor", "auto");
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Domain_dragger.mouseButtonPressed = false;
	  };
	  
	  
	  Domain_dragger.mouseEntered = function ( p ){
	    if ( !arguments.length ) return Domain_dragger.mouseEnteredVar;
	    Domain_dragger.mouseEnteredVar = p;
	    return Domain_dragger;
	  };
	  
	  Domain_dragger.selectedViaTouch = function ( val ){
	    Domain_dragger.nodeElement.classed("classDraggerNode", !val);
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", val);
	    
	  };
	  
	  Domain_dragger.onMouseOver = function (){
	    if ( Domain_dragger.mouseEntered() ) {
	      return;
	    }
	    Domain_dragger.nodeElement.classed("classDraggerNode", false);
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    var selectedNode = Domain_dragger.rootElement.node(),
	      nodeContainer = selectedNode.parentNode;
	    nodeContainer.appendChild(selectedNode);
	    
	    Domain_dragger.mouseEntered(true);
	    
	  };
	  Domain_dragger.onMouseOut = function (){
	    if ( Domain_dragger.mouseButtonPressed === true )
	      return;
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Domain_dragger.nodeElement.classed("classDraggerNode", true);
	    Domain_dragger.mouseEntered(false);
	  };
	  
	  Domain_dragger.setPosition = function ( x, y ){
	    var range_x = Domain_dragger.parent.range().x;
	    var range_y = Domain_dragger.parent.range().y;
	    
	    // var position of the rangeEndPoint
	    var ep_range_x = x;
	    var ep_range_y = y;
	    
	    // offset for dragger object
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    
	    var len = Math.sqrt(dx * dx + dy * dy);
	    
	    var nX = dx / len;
	    var nY = dy / len;
	    var dox = ep_range_x + nX * 20;
	    var doy = ep_range_y + nY * 20;
	    
	    var angle = Math.atan2(range_y - ep_range_y, range_x - ep_range_x) * 180 / Math.PI + 180;
	    
	    Domain_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Domain_dragger.draggerObject.attr("transform", "translate(" + dox + "," + doy + ")");
	    
	    Domain_dragger.x = x;
	    Domain_dragger.y = y;
	    
	  };
	  
	  Domain_dragger.setAdditionalClassForClass_dragger = function ( name, val ){
	    // console.log("Class_dragger should sett the class here")
	    // Class_dragger.nodeElement.classed(name,val);
	    
	  };
	  return Domain_dragger;
	};




/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var CenteringTextElement = __webpack_require__(14);
	var elementTools = __webpack_require__(63)();
	var math = __webpack_require__(43)();
	module.exports = function ( graph ){
	  /** variable defs **/
	  var ShadowClone = {};
	  ShadowClone.nodeId = 10003;
	  ShadowClone.parent = undefined;
	  ShadowClone.s_x = 0;
	  ShadowClone.s_y = 0;
	  ShadowClone.e_x = 0;
	  ShadowClone.e_y = 0;
	  ShadowClone.rootElement = undefined;
	  ShadowClone.rootNodeLayer = undefined;
	  ShadowClone.pathLayer = undefined;
	  ShadowClone.nodeElement = undefined;
	  ShadowClone.pathElement = undefined;
	  ShadowClone.typus = "shadowClone";
	  
	  
	  ShadowClone.type = function (){
	    return ShadowClone.typus;
	  };
	  
	  // TODO: We need the endPoint of the Link here!
	  ShadowClone.parentNode = function (){
	    return ShadowClone.parent;
	  };
	  
	  ShadowClone.setParentProperty = function ( parentProperty, inverted ){
	    ShadowClone.invertedProperty = inverted;
	    ShadowClone.parent = parentProperty;
	    var renElment;
	    if ( inverted === true ) {
	      renElment = parentProperty.inverse().labelObject();
	      if ( renElment.linkRangeIntersection && renElment.linkDomainIntersection ) {
	        var iiP_range = renElment.linkDomainIntersection;
	        var iiP_domain = renElment.linkRangeIntersection;
	        ShadowClone.s_x = iiP_domain.x;
	        ShadowClone.s_y = iiP_domain.y;
	        ShadowClone.e_x = iiP_range.x;
	        ShadowClone.e_y = iiP_range.y;
	      }
	    }
	    else {
	      renElment = parentProperty.labelObject();
	      
	      if ( renElment.linkRangeIntersection && renElment.linkDomainIntersection ) {
	        var iP_range = renElment.linkRangeIntersection;
	        var iP_domain = renElment.linkDomainIntersection;
	        ShadowClone.s_x = iP_domain.x;
	        ShadowClone.s_y = iP_domain.y;
	        ShadowClone.e_x = iP_range.x;
	        ShadowClone.e_y = iP_range.y;
	      }
	      
	    }
	    
	    ShadowClone.rootNodeLayer.remove();
	    ShadowClone.rootNodeLayer = ShadowClone.rootElement.append('g');
	    ShadowClone.rootNodeLayer.datum(parentProperty);
	    
	    // ShadowClone.pathElement.remove();
	    // ShadowClone.pathElement = ShadowClone.pathLayer.append('line');
	    //
	    // ShadowClone.pathElement.attr("x1", ShadowClone.s_x)
	    //     .attr("y1", ShadowClone.s_y)
	    //     .attr("x2", ShadowClone.e_x)
	    //     .attr("y2", ShadowClone.e_y);
	    ShadowClone.pathElement.remove();
	    ShadowClone.pathElement = ShadowClone.pathLayer.append('line');
	    ShadowClone.markerElement = ShadowClone.pathLayer.append("marker");
	    ShadowClone.markerElement.attr("id", "shadowCloneMarker");
	    ShadowClone.pathElement.attr("x1", ShadowClone.e_x)
	      .attr("y1", ShadowClone.e_y)
	      .attr("x2", ShadowClone.s_x)
	      .attr("y2", ShadowClone.s_y);
	    ShadowClone.pathElement.classed(parentProperty.linkType(), true);
	    
	    if ( parentProperty.markerElement() ) {
	      ShadowClone.markerElement.attr("viewBox", parentProperty.markerElement().attr("viewBox"))
	        .attr("markerWidth", parentProperty.markerElement().attr("markerWidth"))
	        .attr("markerHeight", parentProperty.markerElement().attr("markerHeight"))
	        .attr("orient", parentProperty.markerElement().attr("orient"));
	      
	      var markerPath = parentProperty.markerElement().select("path");
	      ShadowClone.markerElement.append("path")
	        .attr("d", markerPath.attr("d"))
	        .classed(parentProperty.markerType(), true);
	      
	      ShadowClone.pathElement.attr("marker-end", "url(#" + "shadowCloneMarker" + ")");
	      ShadowClone.markerElement.classed("hidden", !elementTools.isDatatypeProperty(parentProperty));
	    }
	    var rect = ShadowClone.rootNodeLayer.append("rect")
	      .classed(parentProperty.styleClass(), true)
	      .classed("property", true)
	      .attr("x", -parentProperty.width() / 2)
	      .attr("y", -parentProperty.height() / 2)
	      .attr("width", parentProperty.width())
	      .attr("height", parentProperty.height());
	    
	    if ( parentProperty.visualAttributes() ) {
	      rect.classed(parentProperty.visualAttributes(), true);
	    }
	    rect.classed("datatype", false);
	    var bgColor = parentProperty.backgroundColor();
	    
	    if ( parentProperty.attributes().indexOf("deprecated") > -1 ) {
	      bgColor = undefined;
	      rect.classed("deprecatedproperty", true);
	    } else {
	      rect.classed("deprecatedproperty", false);
	    }
	    rect.style("fill", bgColor);
	    
	    // add Text;
	    var equivalentsString = parentProperty.equivalentsString();
	    var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	    
	    
	    var textElement = new CenteringTextElement(ShadowClone.rootNodeLayer, bgColor);
	    textElement.addText(parentProperty.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	    textElement.addEquivalents(equivalentsString);
	    textElement.addSubText(parentProperty.indicationString());
	    
	    
	    var cx = 0.5 * (ShadowClone.s_x + ShadowClone.e_x);
	    var cy = 0.5 * (ShadowClone.s_y + ShadowClone.e_y);
	    ShadowClone.rootNodeLayer.attr("transform", "translate(" + cx + "," + cy + ")");
	    ShadowClone.rootNodeLayer.classed("hidden", true);
	    ShadowClone.pathElement.classed("hidden", true);
	    
	    
	  };
	  
	  ShadowClone.hideClone = function ( val ){
	    if ( ShadowClone.rootNodeLayer ) ShadowClone.rootNodeLayer.classed("hidden", val);
	    if ( ShadowClone.pathElement ) ShadowClone.pathElement.classed("hidden", val);
	  };
	  
	  ShadowClone.hideParentProperty = function ( val ){
	    
	    var labelObj = ShadowClone.parent.labelObject();
	    if ( labelObj ) {
	      if ( ShadowClone.parent.labelElement().attr("transform") === "translate(0,15)" ||
	        ShadowClone.parent.labelElement().attr("transform") === "translate(0,-15)" )
	        ShadowClone.parent.inverse().hide(val);
	      
	      
	    }
	    ShadowClone.parent.hide(val);
	    
	    
	  };
	  
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  ShadowClone.id = function ( index ){
	    if ( !arguments.length ) {
	      return ShadowClone.nodeId;
	    }
	    ShadowClone.nodeId = index;
	  };
	  
	  ShadowClone.svgPathLayer = function ( layer ){
	    ShadowClone.pathLayer = layer.append('g');
	  };
	  
	  ShadowClone.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return ShadowClone.rootElement;
	    ShadowClone.rootElement = root;
	    ShadowClone.rootNodeLayer = ShadowClone.rootElement.append('g');
	    
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  ShadowClone.drawClone = function (){
	    ShadowClone.pathElement = ShadowClone.pathLayer.append('line');
	    
	    ShadowClone.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	  };
	  
	  
	  ShadowClone.updateElement = function (){
	    ShadowClone.pathElement.attr("x1", ShadowClone.e_x)
	      .attr("y1", ShadowClone.e_y)
	      .attr("x2", ShadowClone.s_x)
	      .attr("y2", ShadowClone.s_y);
	    
	    var cx = 0.5 * (ShadowClone.s_x + ShadowClone.e_x);
	    var cy = 0.5 * (ShadowClone.s_y + ShadowClone.e_y);
	    ShadowClone.rootNodeLayer.attr("transform", "translate(" + cx + "," + cy + ")");
	  };
	  
	  ShadowClone.setInitialPosition = function (){
	    
	    var renElment = ShadowClone.parent.labelObject();
	    if ( renElment.linkRangeIntersection && renElment.linkDomainIntersection ) {
	      var iP_range = renElment.linkRangeIntersection;
	      var iP_domain = renElment.linkDomainIntersection;
	      ShadowClone.e_x = iP_domain.x;
	      ShadowClone.e_y = iP_domain.y;
	      ShadowClone.s_x = iP_range.x;
	      ShadowClone.s_y = iP_range.y;
	    }
	    ShadowClone.updateElement();
	    return;
	    //
	    // var rex=ShadowClone.parent.range().x;
	    // var rey=ShadowClone.parent.range().y;
	    //
	    //
	    // var dex=ShadowClone.parent.domain().x;
	    // var dey=ShadowClone.parent.domain().y;
	    //
	    //
	    // var dir_X= rex-dex;
	    // var dir_Y= rey-dey;
	    //
	    // var len=Math.sqrt(dir_X*dir_X+dir_Y*dir_Y);
	    // var nX=dir_X/len;
	    // var nY=dir_Y/len;
	    // ShadowClone.s_x=rex-nX*ShadowClone.parent.range().actualRadius();
	    // ShadowClone.s_y=rey-nY*ShadowClone.parent.range().actualRadius();
	    //
	    // ShadowClone.e_x=dex+nX*ShadowClone.parent.domain().actualRadius();
	    // ShadowClone.e_y=dey+nY*ShadowClone.parent.domain().actualRadius();
	    // ShadowClone.updateElement();
	    
	  };
	  ShadowClone.setPositionDomain = function ( e_x, e_y ){
	    
	    var rex = ShadowClone.parent.range().x;
	    var rey = ShadowClone.parent.range().y;
	    
	    
	    if ( elementTools.isDatatype(ShadowClone.parent.range()) === true ) {
	      var intersection = math.calculateIntersection({ x: e_x, y: e_y }, ShadowClone.parent.range(), 0);
	      ShadowClone.s_x = intersection.x;
	      ShadowClone.s_y = intersection.y;
	    } else {
	      var dir_X = rex - e_x;
	      var dir_Y = rey - e_y;
	      
	      var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	      
	      var nX = dir_X / len;
	      var nY = dir_Y / len;
	      ShadowClone.s_x = rex - nX * ShadowClone.parent.range().actualRadius();
	      ShadowClone.s_y = rey - nY * ShadowClone.parent.range().actualRadius();
	      
	    }
	    
	    
	    ShadowClone.e_x = e_x;
	    ShadowClone.e_y = e_y;
	    ShadowClone.updateElement();
	  };
	  
	  ShadowClone.setPosition = function ( s_x, s_y ){
	    ShadowClone.s_x = s_x;
	    ShadowClone.s_y = s_y;
	    
	    // add normalized dir;
	    
	    var dex = ShadowClone.parent.domain().x;
	    var dey = ShadowClone.parent.domain().y;
	    
	    var dir_X = s_x - dex;
	    var dir_Y = s_y - dey;
	    
	    var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	    
	    var nX = dir_X / len;
	    var nY = dir_Y / len;
	    
	    
	    ShadowClone.e_x = dex + nX * ShadowClone.parent.domain().actualRadius();
	    ShadowClone.e_y = dey + nY * ShadowClone.parent.domain().actualRadius();
	    
	    
	    ShadowClone.updateElement();
	    
	    
	  };
	  
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  return ShadowClone;
	};




/***/ }),
/* 72 */
/***/ (function(module, exports) {

	module.exports = function ( graph ){
	  /** variable defs **/
	  var prefixRepresentationModule = {};
	  
	  var currentPrefixModel;
	  
	  prefixRepresentationModule.updatePrefixModel = function (){
	    currentPrefixModel = graph.options().prefixList();
	  };
	  
	  
	  prefixRepresentationModule.validURL = function ( url ){
	    return validURL(url);
	  };
	  function validURL( str ){
	    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	    return urlregex.test(str);
	  }
	  
	  function splitURLIntoBaseAndResource( fullURL ){
	    var splitedURL = { base: "", resource: "" };
	    if ( fullURL === undefined ) {
	      splitedURL = { base: "ERROR", resource: "NOT FOUND" };
	      return splitedURL;
	    }
	    
	    var resource, base;
	    // check if there is a last hashTag
	    if ( fullURL.indexOf("#") > -1 ) {
	      resource = fullURL.substring(fullURL.lastIndexOf('#') + 1);
	      base = fullURL.substring(0, fullURL.length - resource.length);
	      // overwrite base if it is ontologyIri;
	      if ( base === graph.options().getGeneralMetaObjectProperty('iri') ) {
	        base = ":";
	      }
	      splitedURL.base = base;
	      splitedURL.resource = resource;
	    } else {
	      resource = fullURL.substring(fullURL.lastIndexOf('/') + 1);
	      base = fullURL.substring(0, fullURL.length - resource.length);
	      // overwrite base if it is ontologyIri;
	      if ( base === graph.options().getGeneralMetaObjectProperty('iri') ) {
	        base = ":";
	      }
	      splitedURL.base = base;
	      splitedURL.resource = resource;
	    }
	    return splitedURL;
	  }
	  
	  prefixRepresentationModule.getPrefixRepresentationForFullURI = function ( fullURL ){
	    prefixRepresentationModule.updatePrefixModel();
	    var splittedURL = splitURLIntoBaseAndResource(fullURL);
	    
	    // lazy approach , for
	    // loop over prefix model
	    for ( var name in currentPrefixModel ) {
	      if ( currentPrefixModel.hasOwnProperty(name) ) {
	        // THIS IS CASE SENSITIVE!
	        if ( currentPrefixModel[name] === splittedURL.base ) {
	          return name + ":" + splittedURL.resource;
	        }
	      }
	    }
	    
	    if ( splittedURL.base === ":" ) {
	      return ":" + splittedURL.resource;
	    }
	    
	    return fullURL;
	  };
	  
	  
	  return prefixRepresentationModule;
	};




/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var _ = __webpack_require__(58);

	module.exports = function (){
	  
	  var DEFAULT_STATE = true;
	  var COLOR_MODES = [
	    { type: "same", range: [d3.rgb("#36C"), d3.rgb("#36C")] },
	    { type: "gradient", range: [d3.rgb("#36C"), d3.rgb("#EE2867")] } // taken from LD-VOWL
	  ];
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = DEFAULT_STATE,
	    filteredNodes,
	    filteredProperties,
	    colorModeType = "same";
	  
	  
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    var externalElements = filterExternalElements(nodes.concat(properties));
	    
	    if ( enabled ) {
	      setColorsForExternals(externalElements);
	    } else {
	      resetBackgroundColors(externalElements);
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function filterExternalElements( elements ){
	    return elements.filter(function ( element ){
	      if ( element.visualAttributes().indexOf("deprecated") >= 0 ) {
	        // deprecated is the only attribute which has preference over external
	        return false;
	      }
	      
	      return element.attributes().indexOf("external") >= 0;
	    });
	  }
	  
	  function setColorsForExternals( elements ){
	    var iriMap = mapExternalsToBaseUri(elements);
	    var entries = iriMap.entries();
	    
	    var colorScale = d3.scale.linear()
	      .domain([0, entries.length - 1])
	      .range(_.find(COLOR_MODES, { type: colorModeType }).range)
	      .interpolate(d3.interpolateHsl);
	    
	    for ( var i = 0; i < entries.length; i++ ) {
	      var groupedElements = entries[i].value;
	      setBackgroundColorForElements(groupedElements, colorScale(i));
	    }
	  }
	  
	  function mapExternalsToBaseUri( elements ){
	    var map = d3.map();
	    
	    elements.forEach(function ( element ){
	      var baseIri = element.baseIri();
	      
	      if ( !map.has(baseIri) ) {
	        map.set(baseIri, []);
	      }
	      map.get(baseIri).push(element);
	    });
	    
	    return map;
	  }
	  
	  function setBackgroundColorForElements( elements, backgroundColor ){
	    elements.forEach(function ( element ){
	      element.backgroundColor(backgroundColor);
	    });
	  }
	  
	  function resetBackgroundColors( elements ){
	    console.log("Resetting color");
	    elements.forEach(function ( element ){
	      element.backgroundColor(null);
	    });
	  }
	  
	  filter.colorModeType = function ( p ){
	    if ( !arguments.length ) return colorModeType;
	    colorModeType = p;
	    return filter;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  filter.reset = function (){
	    enabled = DEFAULT_STATE;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	/**
	 * This module abuses the filter function a bit like the statistics module. Nothing is filtered.
	 *
	 * @returns {{}}
	 */


	module.exports = function ( graph ){
	  
	  var DEFAULT_STATE = false;
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = DEFAULT_STATE,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, redundant details won't be drawn anymore.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    graph.options().compactNotation(enabled);
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  filter.reset = function (){
	    enabled = DEFAULT_STATE;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();
	var filterTools = __webpack_require__(76)();

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, all datatypes and literals including connected properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeDatatypesAndLiterals();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeDatatypesAndLiterals(){
	    var filteredData = filterTools.filterNodesAndTidy(nodes, properties, isNoDatatypeOrLiteral);
	    
	    nodes = filteredData.nodes;
	    properties = filteredData.properties;
	  }
	  
	  function isNoDatatypeOrLiteral( node ){
	    return !elementTools.isDatatype(node);
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();

	module.exports = (function (){
	  
	  var tools = {};
	  
	  /**
	   * Filters the passed nodes and removes dangling properties.
	   * @param nodes
	   * @param properties
	   * @param shouldKeepNode function that returns true if the node should be kept
	   * @returns {{nodes: Array, properties: Array}} the filtered nodes and properties
	   */
	  tools.filterNodesAndTidy = function ( nodes, properties, shouldKeepNode ){
	    var removedNodes = __webpack_require__(62)(),
	      cleanedNodes = [],
	      cleanedProperties = [];
	    
	    nodes.forEach(function ( node ){
	      if ( shouldKeepNode(node) ) {
	        cleanedNodes.push(node);
	      } else {
	        removedNodes.add(node);
	      }
	    });
	    
	    properties.forEach(function ( property ){
	      if ( propertyHasVisibleNodes(removedNodes, property) ) {
	        cleanedProperties.push(property);
	      } else if ( elementTools.isDatatypeProperty(property) ) {
	        // Remove floating datatypes/literals, because they belong to their datatype property
	        var index = cleanedNodes.indexOf(property.range());
	        if ( index >= 0 ) {
	          cleanedNodes.splice(index, 1);
	        }
	      }
	    });
	    
	    return {
	      nodes: cleanedNodes,
	      properties: cleanedProperties
	    };
	  };
	  
	  /**
	   * Returns true, if the domain and the range of this property have not been removed.
	   * @param removedNodes
	   * @param property
	   * @returns {boolean} true if property isn't dangling
	   */
	  function propertyHasVisibleNodes( removedNodes, property ){
	    return !removedNodes.has(property.domain()) && !removedNodes.has(property.range());
	  }
	  
	  
	  return function (){
	    return tools;
	  };
	})();


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var OwlDisjointWith = __webpack_require__(46);

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    // According to the specification enabled by default
	    enabled = true,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, all disjoint with properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeDisjointWithProperties();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeDisjointWithProperties(){
	    var cleanedProperties = [],
	      i, l, property;
	    
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      
	      if ( !(property instanceof OwlDisjointWith) ) {
	        cleanedProperties.push(property);
	      }
	    }
	    
	    properties = cleanedProperties;
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  var focuser = {},
	    focusedElement;
	  var elementTools = webvowl.util.elementTools();
	  focuser.handle = function ( selectedElement, forced ){
	    // Don't display details on a drag event, which will be prevented
	    if ( d3.event && d3.event.defaultPrevented && forced === undefined ) {
	      return;
	    }
	    
	    if ( focusedElement !== undefined ) {
	      focusedElement.toggleFocus();
	    }
	    
	    if ( focusedElement !== selectedElement && selectedElement ) {
	      selectedElement.toggleFocus();
	      focusedElement = selectedElement;
	    } else {
	      focusedElement = undefined;
	    }
	    if ( focusedElement && focusedElement.focused() ) {
	      graph.options().editSidebar().updateSelectionInformation(focusedElement);
	      if ( elementTools.isProperty(selectedElement) === true ) {
	        var inversed = false;
	        if ( selectedElement.inverse() ) {
	          inversed = true;
	        }
	        graph.activateHoverElementsForProperties(true, selectedElement, inversed, graph.isTouchDevice());
	      }
	      else {
	        graph.activateHoverElements(true, selectedElement, graph.isTouchDevice());
	      }
	    }
	    else {
	      graph.options().editSidebar().updateSelectionInformation(undefined);
	      graph.removeEditElements();
	    }
	  };
	  
	  /**
	   * Removes the focus if an element is focussed.
	   */
	  focuser.reset = function (){
	    if ( focusedElement ) {
	      focusedElement.toggleFocus();
	      focusedElement = undefined;
	    }
	  };
	  
	  return focuser;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	/** @WORKAROUND CODE:
	 * clears empty literals that are provided by owl2vowl: 0.2.2x*/


	module.exports = function (){
	  
	  var filter = {},
	    enabled = true,
	    filteredNodes,
	    removedNodes,
	    filteredProperties;
	  
	  filter.enabled = function ( val ){
	    if ( !arguments.length ) {
	      return enabled;
	    }
	    enabled = val;
	  };
	  
	  filter.filter = function ( nodes, properties ){
	    if ( enabled === false ) {
	      filteredNodes = nodes;
	      filteredProperties = properties;
	      removedNodes = [];
	      return;
	    }
	    var literalUsageMap = [];
	    var thingUsageMap = [];
	    var node;
	    for ( var i = 0; i < properties.length; i++ ) {
	      // get property range;
	      var prop = properties[i];
	      
	      // checking for literals
	      if ( prop.range() ) {
	        node = prop.range();
	        if ( node.type() === "rdfs:Literal" ) {
	          literalUsageMap[node.id()] = 1;
	        }
	      }
	      // checking for thing
	      if ( prop.range() ) {
	        node = prop.range();
	        if ( node.type() === "owl:Thing" ) {
	          thingUsageMap[node.id()] = 1;
	        }
	      }
	      if ( prop.domain() ) {
	        node = prop.domain();
	        if ( node.type() === "owl:Thing" ) {
	          thingUsageMap[node.id()] = 1;
	        }
	      }
	      
	    }
	    var nodesToRemove = [];
	    var newNodes = [];
	    // todo: test and make it faster
	    for ( i = 0; i < nodes.length; i++ ) {
	      var nodeId = nodes[i].id();
	      if ( nodes[i].type() === "rdfs:Literal" ) {
	        if ( literalUsageMap[nodeId] === undefined ) {
	          nodesToRemove.push(nodeId);
	        }
	        else {
	          newNodes.push(nodes[i]);
	        }
	        // check for node type == OWL:THING
	      } else if ( nodes[i].type() === "owl:Thing" ) {
	        if ( thingUsageMap[nodeId] === undefined ) {
	          nodesToRemove.push(nodeId);
	        }
	        else {
	          newNodes.push(nodes[i]);
	        }
	      } else {
	        newNodes.push(nodes[i]);
	      }
	    }
	    
	    filteredNodes = newNodes;
	    filteredProperties = properties;
	    removedNodes = nodesToRemove;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.removedNodes = function (){
	    return removedNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();
	var filterTools = __webpack_require__(76)();

	module.exports = function ( menu ){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = true,
	    filteredNodes,
	    filteredProperties,
	    maxDegreeSetter,
	    degreeGetter,
	    lastFiltedDegree,
	    degreeSetter;
	  
	  
	  var NODE_COUNT_LIMIT_FOR_AUTO_ENABLING = 50;
	  
	  
	  filter.initialize = function ( nodes, properties ){
	    lastFiltedDegree = -1;
	    var maxLinkCount = findMaxLinkCount(nodes);
	    if ( maxDegreeSetter instanceof Function ) {
	      maxDegreeSetter(maxLinkCount);
	    }
	    
	    menu.setDefaultDegreeValue(findAutoDefaultDegree(nodes, properties, maxLinkCount));
	    var defaultDegree = findDefaultDegree(maxLinkCount);
	    if ( degreeSetter instanceof Function ) {
	      degreeSetter(defaultDegree);
	      if ( defaultDegree > 0 ) {
	        menu.highlightForDegreeSlider(true);
	        menu.getGraphObject().setFilterWarning(true);
	        
	      }
	    } else {
	      console.error("No degree setter function set.");
	    }
	  };
	  
	  function findAutoDefaultDegree( nodes, properties, maxDegree ){
	    for ( var degree = 0; degree < maxDegree; degree++ ) {
	      var filteredData = filterByNodeDegree(nodes, properties, degree);
	      
	      if ( filteredData.nodes.length <= NODE_COUNT_LIMIT_FOR_AUTO_ENABLING ) {
	        return degree;
	      }
	    }
	    return 0;
	  }
	  
	  function findDefaultDegree( maxDegree ){
	    var globalDegOfFilter = menu.getGraphObject().getGlobalDOF();
	    if ( globalDegOfFilter >= 0 ) {
	      if ( globalDegOfFilter <= maxDegree ) {
	        return globalDegOfFilter;
	      } else {
	        menu.getGraphObject().setGlobalDOF(maxDegree);
	        return maxDegree;
	      }
	    }
	    return menu.getDefaultDegreeValue();
	  }
	  
	  /**
	   * If enabled, all nodes are filter by their node degree.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      if ( degreeGetter instanceof Function ) {
	        filterByNodeDegreeAndApply(degreeGetter());
	      } else {
	        console.error("No degree query function set.");
	      }
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	    
	    if ( filteredNodes.length === 0 ) {
	      degreeSetter(0);
	      filteredNodes = untouchedNodes;
	      filteredProperties = untouchedProperties;
	    }
	    lastFiltedDegree = degreeGetter();
	  };
	  
	  function findMaxLinkCount( nodes ){
	    var maxLinkCount = 0;
	    for ( var i = 0, l = nodes.length; i < l; i++ ) {
	      var linksWithoutDatatypes = filterOutDatatypes(nodes[i].links());
	      
	      maxLinkCount = Math.max(maxLinkCount, linksWithoutDatatypes.length);
	    }
	    return maxLinkCount;
	  }
	  
	  function filterOutDatatypes( links ){
	    return links.filter(function ( link ){
	      return !elementTools.isDatatypeProperty(link.property());
	    });
	  }
	  
	  function filterByNodeDegreeAndApply( minDegree ){
	    var filteredData = filterByNodeDegree(nodes, properties, minDegree);
	    nodes = filteredData.nodes;
	    properties = filteredData.properties;
	  }
	  
	  function filterByNodeDegree( nodes, properties, minDegree ){
	    return filterTools.filterNodesAndTidy(nodes, properties, hasRequiredDegree(minDegree));
	  }
	  
	  function hasRequiredDegree( minDegree ){
	    return function ( node ){
	      return filterOutDatatypes(node.links()).length >= minDegree;
	    };
	  }
	  
	  filter.setMaxDegreeSetter = function ( _maxDegreeSetter ){
	    maxDegreeSetter = _maxDegreeSetter;
	  };
	  
	  filter.setDegreeGetter = function ( _degreeGetter ){
	    degreeGetter = _degreeGetter;
	  };
	  
	  filter.setDegreeSetter = function ( _degreeSetter ){
	    degreeSetter = _degreeSetter;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	/**
	 * This module abuses the filter function a bit like the statistics module. Nothing is filtered.
	 *
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var DEFAULT_STATE = true;
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = DEFAULT_STATE,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, the scaling of nodes according to individuals will be enabled.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    graph.options().scaleNodesByIndividuals(enabled);
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  filter.reset = function (){
	    enabled = DEFAULT_STATE;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();


	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, all object properties and things without any other property are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeObjectProperties();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeObjectProperties(){
	    properties = properties.filter(isNoObjectProperty);
	    nodes = nodes.filter(isNoFloatingThing);
	  }
	  
	  function isNoObjectProperty( property ){
	    return !elementTools.isObjectProperty(property);
	  }
	  
	  function isNoFloatingThing( node ){
	    var isNoThing = !elementTools.isThing(node);
	    var hasNonFilteredProperties = hasPropertiesOtherThanObjectProperties(node, properties);
	    return isNoThing || hasNonFilteredProperties;
	  }
	  
	  function hasPropertiesOtherThanObjectProperties( node, properties ){
	    for ( var i = 0; i < properties.length; i++ ) {
	      var property = properties[i];
	      if ( property.domain() !== node && property.range() !== node ) {
	        continue;
	      }
	      
	      if ( isNoObjectProperty(property) ) {
	        return true;
	      }
	    }
	    
	    return false;
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {
	var elementTools = __webpack_require__(63)();

	module.exports = function (){
	  var pap = {},
	    enabled = false,
	    pinnedElements = [];
	  
	  pap.addPinnedElement = function ( element ){
	    // check if element is already in list
	    var indexInArray = pinnedElements.indexOf(element);
	    if ( indexInArray === -1 ) {
	      pinnedElements.push(element);
	    }
	  };
	  
	  pap.handle = function ( selection, forced ){
	    if ( !enabled ) {
	      return;
	    }
	    
	    if ( !forced ) {
	      if ( wasNotDragged() ) {
	        return;
	      }
	    }
	    if ( elementTools.isProperty(selection) ) {
	      if ( selection.inverse() && selection.inverse().pinned() ) {
	        return;
	      } else if ( hasNoParallelProperties(selection) ) {
	        return;
	      }
	    }
	    
	    if ( !selection.pinned() ) {
	      selection.drawPin();
	      pap.addPinnedElement(selection);
	    }
	  };
	  
	  function wasNotDragged(){
	    return !d3.event.defaultPrevented;
	  }
	  
	  function hasNoParallelProperties( property ){
	    var rangeLinks = property.range().links();
    var shared = property.domain().links().filter(function(link, index, links) {
      return links.indexOf(link) === index && rangeLinks.indexOf(link) !== -1;
    });
    return shared.length === 1;
	  }
	  
	  pap.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return pap;
	  };
	  
	  pap.reset = function (){
	    pinnedElements.forEach(function ( element ){
	      element.removePin();
	    });
	    // Clear the array of stored nodes
	    pinnedElements.length = 0;
	  };
	  
	  return pap;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* Unused Lodash modules 84 through 314 removed. */
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
undefined,
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( handlerFunction ){
	  var viewer = {},
	    lastSelectedElement;
	  
	  viewer.handle = function ( selectedElement ){
	    // Don't display details on a drag event, which will be prevented
	    if ( d3.event.defaultPrevented ) {
	      return;
	    }
	    
	    var isSelection = true;
	    
	    // Deselection of the focused element
	    if ( lastSelectedElement === selectedElement ) {
	      isSelection = false;
	    }
	    
	    if ( handlerFunction instanceof Function ) {
	      if ( isSelection ) {
	        handlerFunction(selectedElement);
	      } else {
	        handlerFunction(undefined);
	      }
	    }
	    
	    if ( isSelection ) {
	      lastSelectedElement = selectedElement;
	    } else {
	      lastSelectedElement = undefined;
	    }
	  };
	  
	  /**
	   * Resets the displayed information to its default.
	   */
	  viewer.reset = function (){
	    if ( lastSelectedElement ) {
	      handlerFunction(undefined);
	      lastSelectedElement = undefined;
	    }
	  };
	  
	  return viewer;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties,
	    filterTools = __webpack_require__(76)();
	  
	  
	  /**
	   * If enabled, all set operators including connected properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeSetOperators();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeSetOperators(){
	    var filteredData = filterTools.filterNodesAndTidy(nodes, properties, isNoSetOperator);
	    
	    nodes = filteredData.nodes;
	    properties = filteredData.properties;
	  }
	  
	  function isNoSetOperator( node ){
	    return !(node instanceof SetOperatorNode);
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var SetOperatorNode = __webpack_require__(20);
	var OwlThing = __webpack_require__(31);
	var OwlNothing = __webpack_require__(30);
	var elementTools = __webpack_require__(63)();

	module.exports = function (){
	  
	  var statistics = {},
	    nodeCount,
	    occurencesOfClassAndDatatypeTypes = {},
	    edgeCount,
	    occurencesOfPropertyTypes = {},
	    classCount,
	    datatypeCount,
	    datatypePropertyCount,
	    objectPropertyCount,
	    propertyCount,
	    totalIndividualCount,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  statistics.filter = function ( classesAndDatatypes, properties ){
	    resetStoredData();
	    
	    storeTotalCounts(classesAndDatatypes, properties);
	    storeClassAndDatatypeCount(classesAndDatatypes);
	    storePropertyCount(properties);
	    
	    storeOccurencesOfTypes(classesAndDatatypes, occurencesOfClassAndDatatypeTypes);
	    storeOccurencesOfTypes(properties, occurencesOfPropertyTypes);
	    
	    storeTotalIndividualCount(classesAndDatatypes);
	    
	    filteredNodes = classesAndDatatypes;
	    filteredProperties = properties;
	  };
	  
	  function resetStoredData(){
	    nodeCount = 0;
	    edgeCount = 0;
	    classCount = 0;
	    datatypeCount = 0;
	    datatypePropertyCount = 0;
	    objectPropertyCount = 0;
	    propertyCount = 0;
	    totalIndividualCount = 0;
	  }
	  
	  function storeTotalCounts( classesAndDatatypes, properties ){
	    nodeCount = classesAndDatatypes.length;
	    
	    var seenProperties = __webpack_require__(62)(), i, l, property;
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      if ( !seenProperties.has(property) ) {
	        edgeCount += 1;
	      }
	      
	      seenProperties.add(property);
	      if ( property.inverse() ) {
	        seenProperties.add(property.inverse());
	      }
	    }
	  }
	  
	  function storeClassAndDatatypeCount( classesAndDatatypes ){
	    // Each datatype should be counted just a single time
	    var datatypeSet = d3.set(),
	      hasThing = false,
	      hasNothing = false;
	    classCount = 0;
	    var old = 0, newcc = 0;
	    classesAndDatatypes.forEach(function ( node ){
	      if ( elementTools.isDatatype(node) ) {
	        datatypeSet.add(node.defaultLabel());
	      } else if ( !(node instanceof SetOperatorNode) ) {
	        if ( node instanceof OwlThing ) {
	          hasThing = true;
	        } else if ( node instanceof OwlNothing ) {
	          hasNothing = true;
	        } else {
	          old = classCount;
	          var adds = 1 + countElementArray(node.equivalents());
	          classCount += adds;
	          newcc = classCount;
	        }
	      } else if ( node instanceof SetOperatorNode ) {
	        old = classCount;
	        classCount += 1;
	        newcc = classCount;
	      }
	    });
	    
	    // count things and nothings just a single time
	    // classCount += hasThing ? 1 : 0;
	    // classCount += hasNothing ? 1 : 0;
	    
	    datatypeCount = datatypeSet.size();
	  }
	  
	  function storePropertyCount( properties ){
	    for ( var i = 0, l = properties.length; i < l; i++ ) {
	      var property = properties[i];
	      var attr;
	      var result = false;
	      if ( property.attributes ) {
	        attr = property.attributes();
	        if ( attr && attr.indexOf("datatype") !== -1 ) {
	          result = true;
	        }
	      }
	      if ( result === true ) {
	        datatypePropertyCount += getExtendedPropertyCount(property);
	      } else if ( elementTools.isObjectProperty(property) ) {
	        objectPropertyCount += getExtendedPropertyCount(property);
	      }
	    }
	    propertyCount = objectPropertyCount + datatypePropertyCount;
	  }
	  
	  function getExtendedPropertyCount( property ){
	    // count the property itself
	    var count = 1;
	    
	    // and count properties this property represents
	    count += countElementArray(property.equivalents());
	    count += countElementArray(property.redundantProperties());
	    
	    return count;
	  }
	  
	  function countElementArray( properties ){
	    if ( properties ) {
	      return properties.length;
	    }
	    return 0;
	  }
	  
	  function storeOccurencesOfTypes( elements, storage ){
	    elements.forEach(function ( element ){
	      var type = element.type(),
	        typeCount = storage[type];
	      
	      if ( typeof typeCount === "undefined" ) {
	        typeCount = 0;
	      } else {
	        typeCount += 1;
	      }
	      storage[type] = typeCount;
	    });
	  }
	  
	  function storeTotalIndividualCount( nodes ){
	    var sawIndividuals = {};
	    var totalCount = 0;
	    for ( var i = 0, l = nodes.length; i < l; i++ ) {
	      var individuals = nodes[i].individuals();
	      
	      var tempCount = 0;
	      for ( var iA = 0; iA < individuals.length; iA++ ) {
	        if ( sawIndividuals[individuals[iA].iri()] === undefined ) {
	          sawIndividuals[individuals[iA].iri()] = 1; // this iri for that individual is now set to 1 >> seen it
	          tempCount++;
	        }
	      }
	      totalCount += tempCount;
	    }
	    totalIndividualCount = totalCount;
	    sawIndividuals = {}; // clear the object
	    
	  }
	  
	  
	  statistics.nodeCount = function (){
	    return nodeCount;
	  };
	  
	  statistics.occurencesOfClassAndDatatypeTypes = function (){
	    return occurencesOfClassAndDatatypeTypes;
	  };
	  
	  statistics.edgeCount = function (){
	    return edgeCount;
	  };
	  
	  statistics.occurencesOfPropertyTypes = function (){
	    return occurencesOfPropertyTypes;
	  };
	  
	  statistics.classCount = function (){
	    return classCount;
	  };
	  
	  statistics.datatypeCount = function (){
	    return datatypeCount;
	  };
	  
	  statistics.datatypePropertyCount = function (){
	    return datatypePropertyCount;
	  };
	  
	  statistics.objectPropertyCount = function (){
	    return objectPropertyCount;
	  };
	  
	  statistics.propertyCount = function (){
	    return propertyCount;
	  };
	  
	  statistics.totalIndividualCount = function (){
	    return totalIndividualCount;
	  };
	  
	  
	  // Functions a filter must have
	  statistics.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  statistics.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return statistics;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled subclasses that have only subclass properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      hideSubclassesWithoutOwnProperties();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function hideSubclassesWithoutOwnProperties(){
	    var unneededProperties = [],
	      unneededClasses = [],
	      subclasses = [],
	      connectedProperties,
	      subclass,
	      property,
	      i, // index,
	      l; // length
	    
	    
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      if ( elementTools.isRdfsSubClassOf(property) ) {
	        subclasses.push(property.domain());
	      }
	    }
	    
	    for ( i = 0, l = subclasses.length; i < l; i++ ) {
	      subclass = subclasses[i];
	      connectedProperties = findRelevantConnectedProperties(subclass, properties);
	      
	      // Only remove the node and its properties, if they're all subclassOf properties
	      if ( areOnlySubclassProperties(connectedProperties) &&
	        doesNotInheritFromMultipleClasses(subclass, connectedProperties) ) {
	        
	        unneededProperties = unneededProperties.concat(connectedProperties);
	        unneededClasses.push(subclass);
	      }
	    }
	    
	    nodes = removeUnneededElements(nodes, unneededClasses);
	    properties = removeUnneededElements(properties, unneededProperties);
	  }
	  
	  /**
	   * Looks recursively for connected properties. Because just subclasses are relevant,
	   * we just look recursively for their properties.
	   *
	   * @param node
	   * @param allProperties
	   * @param visitedNodes a visited nodes which is used on recursive invocation
	   * @returns {Array}
	   */
	  function findRelevantConnectedProperties( node, allProperties, visitedNodes ){
	    var connectedProperties = [],
	      property,
	      i,
	      l;
	    
	    for ( i = 0, l = allProperties.length; i < l; i++ ) {
	      property = allProperties[i];
	      if ( property.domain() === node ||
	        property.range() === node ) {
	        
	        connectedProperties.push(property);
	        
	        
	        /* Special case: SuperClass <-(1) Subclass <-(2) Subclass ->(3) e.g. Datatype
	         * We need to find the last property recursively. Otherwise, we would remove the subClassOf
	         * property (1) because we didn't see the datatype property (3).
	         */
	        
	        // Look only for subclass properties, because these are the relevant properties
	        if ( elementTools.isRdfsSubClassOf(property) ) {
	          var domain = property.domain();
	          visitedNodes = visitedNodes || __webpack_require__(62)();
	          
	          // If we have the range, there might be a nested property on the domain
	          if ( node === property.range() && !visitedNodes.has(domain) ) {
	            visitedNodes.add(domain);
	            var nestedConnectedProperties = findRelevantConnectedProperties(domain, allProperties, visitedNodes);
	            connectedProperties = connectedProperties.concat(nestedConnectedProperties);
	          }
	        }
	      }
	    }
	    
	    return connectedProperties;
	  }
	  
	  function areOnlySubclassProperties( connectedProperties ){
	    var onlySubclassProperties = true,
	      property,
	      i,
	      l;
	    
	    for ( i = 0, l = connectedProperties.length; i < l; i++ ) {
	      property = connectedProperties[i];
	      
	      if ( !elementTools.isRdfsSubClassOf(property) ) {
	        onlySubclassProperties = false;
	        break;
	      }
	    }
	    
	    return onlySubclassProperties;
	  }
	  
	  function doesNotInheritFromMultipleClasses( subclass, connectedProperties ){
	    var superClassCount = 0;
	    
	    for ( var i = 0, l = connectedProperties.length; i < l; i++ ) {
	      var property = connectedProperties[i];
	      
	      if ( property.domain() === subclass ) {
	        superClassCount += 1;
	      }
	      
	      if ( superClassCount > 1 ) {
	        return false;
	      }
	    }
	    
	    return true;
	  }
	  
	  function removeUnneededElements( array, removableElements ){
	    var disjoint = [],
	      element,
	      i,
	      l;
	    
	    for ( i = 0, l = array.length; i < l; i++ ) {
	      element = array[i];
	      if ( removableElements.indexOf(element) === -1 ) {
	        disjoint.push(element);
	      }
	    }
	    return disjoint;
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ })
/******/ ]);