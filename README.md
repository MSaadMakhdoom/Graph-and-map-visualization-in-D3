# Graph-and-map-visualization-in-D3
a graph and map visualization solution. As the data consists of geo-spatial and temporal data, therefore three visualizations are necessary requirement in your solution i.e.
1. Map visualization (to represent geo-spatial data)
2. Graph Visualization (to represent geo-spatial data)
3. Timeline visualization (to represent temporal data)

The below sample visualization (consisting of a sketch of the three visualizations) consists of one map visualization located at top left, one graph visualization of your choice at the top right and one timeline visualization located at bottom center. Map visualization (to represent geo-spatial data)
For this map visualization, you will need to first render the GeoJson data file to be able to draw underlying map of London suburbs. After you draw the map, you need to represent all the stations as points (using their Lat-longs) and lines/edges to represent
start-end stations. How you channelize the points and lines is your own choice. Graph Visualization (to represent geo-spatial data)

There is no requirement about how you visualize the graph data in this visualization. You cannot use underlying map visualization. But you need to represent the same
graph data you used in the last visualization. As there is no restriction of using underlying maps in this part, you can layout the nodes in any fashion you deem better.
In this part you can aggregate nodes under some criteria (e.g. all stations in a suburb)
or all stations in the north, south etc. This aggregation of nodes will let you achieve
semantic zooming in this visualization.
Timeline visualization (to represent temporal data)
This is a simple visualization that represents the timeline of the current provided data.
This timeline visualization will also act as a visual filter to let the user select timeline.

1. All the visualizations in the dashboard needs to be fully interactive (i.e. panning,
zooming, selection etc.)
2. The visualizations need to be linked via brushing and linking.

3. In the graph visualization, there must be semantic zooming implemented.


The Datasets:
GeoJson files of London:
https://github.com/radoi90/housequest-data/blob/master/london_boroughs.geojson
https://github.com/taskrabbit/geojson/blob/master/shape/uk/london/src/london
The Spatio-temporal network/graph Data to overlay in visualization (1/2). The time
information from this dataset will feed the 3rd visualization of timeline.

https://www.kaggle.com/ajohrn/bikeshare-usage-in-london-and-taipei-
network?select=london_stations.csv
