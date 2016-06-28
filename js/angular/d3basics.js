angular.module('bookKeepingApp')
    .directive('d3Bars', function() {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function(scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0])
                    .append("svg")
                    .attr("width", "100%");

                // on window resize, re-render d3 canvas
                window.onresize = function() {
                    return scope.$apply();
                };
                scope.$watch(function() {
                    return angular.element(window)[0].innerWidth;
                }, function() {
                    return scope.render(scope.data);
                });

                // watch for data changes and re-render
                scope.$watch('data', function(newVals, oldVals) {
                    return scope.render(newVals);
                }, true);

                // define render function
                scope.render = function(data) {
                    // remove all previous items before render
                    svg.selectAll("*").remove();

                    // setup variables
                    // data[0] array of data values data[1] total amount
                    var margin = { top: 20, right: 30, bottom: 40, left: 100 },
                        width = 960 - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom;
                    var w = 1000;
                    var h = 500;
                    var barPadding = 10;

                    var scale = d3.scale.linear()
                        .domain([0, 10000])
                        .range([0, h - 150]);

                    var tip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([-10, 0])
                        .html(function(d) {
                            return "<strong>Amount:</strong> <span style='color:red'>" + d.amount + "</span>";
                        });


                    var xCenter = function(i) {
                            return i * w / data[0].length + (w / data[0].length - barPadding) / 2 + barPadding + margin.left
                        }
                        // Need to check if data is defined (is not in the beginning)
                    if (data != undefined) {
                        //console.log(data[1]);
                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");

                        var x = d3.scale.ordinal()
                            .domain(data[0].map(function(d) {
                                return d.company;
                            }))
                            .rangeRoundBands([0, w], .5);

                        svg.attr("height", 2000)
                            .attr("width", 2000)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                            .call(tip);


                        // Rectangular Bars
                        svg.selectAll(".bar")
                            .data(data[0])
                            .enter()
                            .append("rect")
                            .attr("class", "bar")
                            .attr("x", function(d, i) {
                                //console.log(i * (w / data[0].length) + barPadding);
                                return i * (w / data[0].length) + barPadding + margin.left;

                            })
                            .attr("y", function(d) {
                                return h - scale(d.amount);
                            })
                            .attr("width", w / data[0].length - barPadding)
                            .attr("height", function(d) {
                                return scale(d.amount);
                            })
                            .attr("fill", "#3498db")
                            .on('mouseover', tip.show)
                            .on('mouseout', tip.hide);


                        svg.selectAll("text.percentage")
                            .data(data[0])
                            .enter()
                            .append("text")
                            .attr("text-anchor", "middle")
                            .text(function(d) {
                                return (d.amount / data[1] * 100).toFixed(2).toString() + "%";
                            })
                            .attr("x", function(d, i) {
                                return xCenter(i);
                            })
                            .attr("y", function(d) {

                                return (h - scale(d.amount) - 5);
                            });


                        svg.selectAll("text.name")
                            .data(data[0])
                            .enter()
                            .append("text")
                            .attr("text-anchor", "middle")
                            .text(function(d) {
                                return d.company;
                            })
                            .attr("x", function(d, i) {
                                return xCenter(i);
                            })
                            .attr("y", function(d) {
                                return h + 20;
                            });




                        // Y-Axis
                        var y = d3.scale.linear()
                            .domain([0, d3.max(data[0], function(d) {
                                //console.log(d.amount);
                                return d.amount;
                            })])
                            .range([h, 0 + 20]);

                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left")
                            .tickFormat(function(d) {
                                return "$" + d;
                            });

                        svg.append("g")
                            .attr("class", "y axis")
                            .attr("transform", "translate(" + margin.left + ", 0)")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("x", -h / 2)
                            .attr("y", -(margin.left - 30))
                            .attr("dy", ".71em")
                            .style("text-anchor", "middle")
                            .text("Amount");

                        /*svg.append("g")
                            .attr("class", "y axis")
                            .attr("transform", "translate(100,0)")
                            .call(yAxis);*/


                        var axisScale = d3.scale.linear()
                            .domain([20, 1000])
                            .range([h, 400]);

                        //Create the Axis
                        var xAxis = d3.svg.axis()
                            .scale(axisScale)
                            .orient("left");


                        //Create an SVG group Element for the Axis elements and call the xAxis function
                        /*var xAxisGroup = svg.append("g")
                            .call(xAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("x", -h / 2)
                            .attr("y", 50)
                            //.attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text("YAxis");*/
                    }


                    /*
                                        var width, height, max;
                                        width = d3.select(iElement[0])[0][0].offsetWidth - 20;
                                        // 20 is for margins and can be changed
                                        height = scope.data.length * 35;
                                        // 35 = 30(bar height) + 5(margin between bars)
                                        max = 98;
                                        // this can also be found dynamically when the data is not static
                                        // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

                                        // set the height based on the calculations above
                                       // svg.attr('height', height);
                                                            //.attr("width", $rootScope.w)
                                            //.attr("height", $rootScope.h);
                                        scale = d3.scale.linear()
                                            .domain([0, 2000])
                                            .range([0, scope.h]);
                                        //create the rectangles for the bar chart
                                        svg.selectAll("rect")
                                            .data(data.Expenditures)




                                        .enter()
                                            .append("rect")
                                            .attr("x", function(d, i) {
                                                return i * (scope.w / scope.data.Expenditures.length);
                                            })
                                            .attr("y", function(d) {
                                                return scope.h - scale(d.amount);
                                            })
                                            .attr("width", scope.w / scope.data.Expenditures.length - scope.barPadding)
                                            .attr("height", function(d) {
                                                return scope.scale(d.amount);
                                            })
                                            .attr("fill", "teal");

                                        /*
                                  .enter()
                                    .append("rect")
                                    .on("click", function(d, i){return scope.onClick({item: d});})
                                    .attr("height", 30) // height of each bar
                                    .attr("width", 0) // initial width of 0 for transition
                                    .attr("x", 10) // half of the 20 side margin specified above
                                    .attr("y", function(d, i){
                                      return i * 35;
                                    }) // height + margin between bars
                                    .transition()
                                      .duration(1000) // time of duration
                                      .attr("width", function(d){
                                        return d.score/(max/width);
                                      }); // width based on scale

                                svg.selectAll("text")
                                  .data(data)
                                  .enter()
                                    .append("text")
                                    .attr("fill", "#fff")
                                    .attr("y", function(d, i){return i * 35 + 22;})
                                    .attr("x", 15)
                                    .text(function(d){return d[scope.label];});
                    */


                }
            }
        }
    });
