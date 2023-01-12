window.urlApi = "http://" + window.location.hostname + "/IOT_Nodes/api.php";

ko.bindingHandlers.date = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {    
        ko.utils.registerEventHandler(element, 'change', function () {
            var value = valueAccessor();

            if (element.value !== null && element.value !== undefined && element.value.length > 0) {
                value(element.value);
            }
            else {
                value('');
            }
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);

        var output = '';

        if ($(element).is('input') === true) {
            $(element).val(output);
        } else {
            $(element).text(output);
        }
    }
};

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
        console.log(window.urlApi);
        $.getJSON(window.urlApi + "?data=true&node=2&from=" + self.chosenStartDate()).then(function (allData) {
            let mappedLogs = $.map(allData, function (item) { 
                try
                {
                    return new LogPost(item); 
                }
                catch(ex) { 
                    console.error(ex);
                }
            });

            mappedLogs.sort((a, b) => {
                return a.tidsstämpel > b.tidsstämpel;
            });

            self.logs(mappedLogs);

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
                datasets: [
                    {label: 'Temperatur', 
                    data: temp }, 
                    {label: 'Relativ luftfuktighet',
                    data: humidity}
                ],
            }
        };
    }

    self.loadLogs();
};

ko.applyBindings(new NewLogPostViewModel());
