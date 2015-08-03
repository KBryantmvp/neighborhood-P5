var ListViewModel = function() {
    var self = this;

    self.markers = ko.observableArray(myNeighborhood.myMarkers);
    for (i = 0; i<self.markers().length; i++) {
        self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myNeighborhood.map);
    }

    self.listMenuVisible = ko.observable(false);
    self.showListView = function() {
        if(self.listMenuVisible()) {
            self.listMenuVisible(false);
        } else {
            self.listMenuVisible(true);
        }
    };

    self.infoWindow = ko.observable(myNeighborhood.infoWindow);
    var infoWindowContent = "";

    
        // wikiData(marker);
    function doAnAjax(marker) {
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=1&search=' + marker.title,
            // url: 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json',
            dataType: 'jsonp',
            // headers: { 'Api-User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' },
            success: showWikiData,
            error: function(data2) {
                console.log('error: ' + data2);
            }
        });
    }

    var showWikiData = function(data) {
        console.log('this is my data: ' + data);
        var wikiTitle = data[1];
        var wikiSnippet = data[2];
        var wikiLink = data[3];
        if (wikiLink.length !== 0) {
            console.log(wikiLink[0]);
            infoWindowContent = '<a href="' + wikiLink + '">' + wikiTitle + '</a><br>' + '<p>' + wikiSnippet + '</p>' +
            '<br><a href="' + wikiLink + '">' + wikiLink + '</a>';
            console.log(infoWindowContent);
        } else {
            console.log('wikiTitle: ' + data[0]);
            infoWindowContent = '<p>' + data[0] + '</p>' + '<br>' + '<p>No Wikipedia articles were found</p>';
        }
        // showInfoWindow(infoWindowContent);
    };

    self.showInfoWindow = function(marker) {
        doAnAjax(marker);
        self.infoWindow().setContent(infoWindowContent);
        console.log(infoWindowContent);
        self.infoWindow().open(myNeighborhood.map, marker);
    };


    self.searchInput = ko.observable();

    self.searchFilter = function() {
        var value = self.searchInput() || "";
        // self.listMenuVisible(false);

        for (var i in self.markers()) {
            if(self.markers()[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                // console.log(self.markers()[i].visible());
                self.markers()[i].showItem(true);
                self.markers()[i].setVisible(true);
                // myNeighborhood.map.setCenter(self.markers()[i].getPosition());
                // self.showItem(true);
                // console.log(i);
            } else {
                // console.log(self.markers()[i].visible());
                self.markers()[i].showItem(false);
                self.markers()[i].setVisible(false);
                self.infoWindow().close();
                // self.showItem(false);
            }
        }
    };
};

ko.applyBindings(ListViewModel);