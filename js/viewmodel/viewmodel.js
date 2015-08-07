/*View Model using knockout.js library, which connects different parts of the UI with the corresponding data*/

var ListViewModel = function() {
    var self = this;

/*Create the observable markers array, show them in the map and trigger the variable that handles the display of items in the list view*/
    self.markers = ko.observableArray(myNeighborhood.myMarkers);
    for (i = 0, len = self.markers().length; i<len; i++) {
        self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myNeighborhood.map);
        addMarkerListener(self.markers()[i]);
    }
/*For each marker, create the event listener when clicked*/
    function addMarkerListener(marker) {
        google.maps.event.addListener(marker, 'click', function() {
            self.showInfoWindow(marker);
        });
    }

/*Info window observable and its content variable*/
    self.infoWindow = ko.observable(myNeighborhood.infoWindow);
    var infoWindowContent = "";

/*Observable that handles the input form*/
    self.searchInput = ko.observable();

/*Handler event that displays the list view menu when the hamburger button is clicked*/
    self.listMenuVisible = ko.observable(false);
    self.showListView = function() {
        if(self.listMenuVisible()) {
            self.listMenuVisible(false);
        } else {
            self.listMenuVisible(true);
        }
    };

/*Handler event that opens infoWindow on each marker with the corresponding data from Wikipedia*/
    self.showInfoWindow = function(marker) {
        var selected_marker = marker;
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=1&search=' + selected_marker.title,
            dataType: 'jsonp',
            success: function(data) {
                var wikiTitle = data[1];
                var wikiSnippet = data[2];
                var wikiLink = data[3];
                if (wikiLink.length !== 0) {
                    infoWindowContent = '<a href="' + wikiLink + '">' + wikiTitle + '</a><br>' + '<p>' + wikiSnippet + '</p>' +
                    '<br><a href="' + wikiLink + '">' + wikiLink + '</a>';
                } else {
                    infoWindowContent = '<p>' + data[0] + '</p>' + '<br>' + '<p>No Wikipedia articles were found</p>';
                }
                self.infoWindow().setContent(infoWindowContent);
                self.infoWindow().open(myNeighborhood.map, selected_marker);
            },
            error: function(data2) {
                alert("Wikipedia data could not be retrieved");
            }
        });
    };


/*Function executed when the search button is clicked or the search input form is typed*/
    self.searchFilter = function() {
        var value = self.searchInput() || "";
// Loop to hide/show each item in the list view and each marker on the map depending on the
// characters typed in the input form
        for (var i in self.markers()) {
            if(self.markers()[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.markers()[i].showItem(true);
                self.markers()[i].setVisible(true);
            } else {
                self.markers()[i].showItem(false);
                self.markers()[i].setVisible(false);
                self.infoWindow().close();
            }
        }
    };
};

/*Activate knockout.js library*/
ko.applyBindings(ListViewModel);