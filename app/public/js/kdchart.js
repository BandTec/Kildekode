    

        $(document).ready(()=>{
            // create initial empty chart
            var ram_canvas = document.getElementById("ramChart");
            var ramChart = new Chart(ram_canvas,{
                "type": "line",
                "data": {
                  "labels": [],
                  "datasets": [{
                    "label": "Gráfico de RAM",
                    "data": [],
                    "fill": false,
                    "borderColor": "#e74a3b",
                    "lineTension": 0.1
                  }]
                },
                "options": {}
              });
    
            var cpu_canvas = document.getElementById("cpuChart");
            var cpuChart = new Chart(cpu_canvas,{
                "type": "line",
                "data": {
                  "labels": [],
                  "datasets": [{
                    "label": "Gráfico de CPU",
                    "data": [],
                    "fill": false,
                    "borderColor": "#f6c23e",
                    "lineTension": 0.1
                  }]
                },
                "options": {}
              });
    
            var processos_canvas = document.getElementById("processosChart");
            var processosChart = new Chart(processos_canvas,{
                "type": "line",
                "data": {
                  "labels": [],
                  "datasets": [{
                    "label": "Gráfico de Processos",
                    "data": [],
                    "fill": false,
                    "borderColor": "#4e73df",
                    "lineTension": 0.1
                  }]
                },
                "options": {}
              });
    
            var disco_canvas = document.getElementById("discoChart");
            var discoChart = new Chart(disco_canvas,{
                "type": "line",
                "data": {
                  "labels": [],
                  "datasets": [{
                    "label": "Gráfico de Disco",
                    "data": [],
                    "fill": false,
                    "borderColor": "#1cc88a",
                    "lineTension": 0.1
                  }]
                },
                "options": {}
              });
    
            // this post id drives the example data
            var postId = 1;
    
            // logic to get new data
            var getData = function() {
            $.ajax({
              url: 'http://localhost:3333/api/getchart',
              success: function(data) {
          
            
    
              ramChart.data.labels=data.ram.label;
              ramChart.data.datasets[0].data=data.ram.data;
    
              cpuChart.data.labels=data.cpu.label;
              cpuChart.data.datasets[0].data=data.cpu.data;
    
              processosChart.data.labels=data.processos.label;
              processosChart.data.datasets[0].data=data.processos.data;
    
              discoChart.data.labels=data.disco.label;
              discoChart.data.datasets[0].data=data.disco.data;
    
              // re-render the chart
              ramChart.update();
              cpuChart.update();
              processosChart.update();
              discoChart.update();
            }
            });
            };
    
            // get new data every 10 seconds
            setInterval(getData, 3000);
            })