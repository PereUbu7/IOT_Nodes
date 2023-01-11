function LogPost(data) {
    let self = this;
    
    self.tidsstämpel = data.dateTime.substring(0, 10);
    self.temp = data.value0;

    self.humidity = data.value1;
}

let NewLogPostViewModel = function() {
    let self = this;

    self.diagram = document.getElementById("diagram");
    self.chart = null;

    // View logs
    self.chosenStartDate = ko.observable();
    self.chosenEndDate = ko.observable();

    self.logs = ko.observableArray([]);

    self.filteredLogs = ko.computed(function () {
        let start = self.chosenStartDate();
        let end = self.chosenEndDate();
        
        let filteredLogs = ko.utils.arrayFilter(self.logs(), function(row) {
            return (!start || row.tidsstämpel > start) && 
                   (!end   || row.tidsstämpel < end);
        });
        
        return filteredLogs;
    });


    self.loadLogs = () => {
        $.getJSON(window.urlApi + "?data=true&node=2&from=" + self.chosenStartDate()).then(function (allData) {
            let mappedLogs = $.map(allData, function (item) { 
                try
                {
                    return new LogPost(JSON.parse(item.value)); 
                }
                catch(ex) { 
                    console.error(ex);
                }
            });

            mappedLogs.sort((a, b) => {
                return a.tidsstämpel > b.tidsstämpel;
            })

            self.chart = new Chart(
                self.diagram,
                self.createChartConfig()
            );
        });
    }


    self.createChartConfig = () => {
        let labels = self.filteredLogs().map(l => l.tidsstämpel);
        let temp = self.filteredLogs().map(l => l.temp);
        let humidity = self.filteredLogs().map(l => l.humidity);

        return {
            type: 'line',
            parsing: false,
            data: {
                labels: labels,
                datasets: [temp, humidity],
            }
        };
    }

    self.loadLogs();
};

ko.applyBindings(new NewLogPostViewModel());
