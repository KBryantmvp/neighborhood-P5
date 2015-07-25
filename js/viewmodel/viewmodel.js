var ListViewModel = function() {
    self = this;

    self.listMenuVisible = ko.observable(false);

    self.markers = ko.observableArray(myNeighborhood.markers);

    self.showListView = function() {
        if(self.listMenuVisible()) {
            self.listMenuVisible(false);
        } else {
            self.listMenuVisible(true);
        }
    };
};

ko.applyBindings(ListViewModel);