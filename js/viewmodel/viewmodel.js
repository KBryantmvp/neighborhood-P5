/*View Model*/

var ListViewModel = function() {
    var self = this;

/*Create the observable markers array, show them in the map and trigger the variable that handles the display of items in the list view*/
    self.markers = ko.observableArray(myNeighborhood.myMarkers);
    for (i = 0; i<self.markers().length; i++) {
        self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myNeighborhood.map);
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

/*Wikipedia ajax request*/
    function doAnAjax(marker) {
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=1&search=' + marker.title,
            // url: 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json',
            dataType: 'jsonp',
            // headers: { 'Api-User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' },
            success: showWikiData,
            error: function(data2) {
                // console.log('error: ' + data2);
                alert("Wikipedia data could not be retrieved");
            }
        });
    }

/*Function executed when the Wikipedia ajax request is successful*/
    var showWikiData = function(data) {
        // console.log('this is my data: ' + data);
        var wikiTitle = data[1];
        var wikiSnippet = data[2];
        var wikiLink = data[3];
        if (wikiLink.length !== 0) {
            // console.log(wikiLink[0]);
            infoWindowContent = '<a href="' + wikiLink + '">' + wikiTitle + '</a><br>' + '<p>' + wikiSnippet + '</p>' +
            '<br><a href="' + wikiLink + '">' + wikiLink + '</a>';
            // console.log(infoWindowContent);
        } else {
            // console.log('wikiTitle: ' + data[0]);
            infoWindowContent = '<p>' + data[0] + '</p>' + '<br>' + '<p>No Wikipedia articles were found</p>';
        }
        // showInfoWindow(infoWindowContent);
    };

/*Function executed when each item in the list view is clicked*/
    self.showInfoWindow = function(marker) {
        doAnAjax(marker);
        self.infoWindow().setContent(infoWindowContent);
        console.log(infoWindowContent);
        self.infoWindow().open(myNeighborhood.map, marker);
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

ko.applyBindings(ListViewModel);