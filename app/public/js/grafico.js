desenharGraficos() {
    google
        .charts
        .load('current', {
            'packages': ['corechart'],
            'language': 'pt'
        });

    var dados = $.ajax({
        cache: false,
        method: "get",
        url: "/dados",
        success: (data) => {
            return data;
        },
        error: (e) => {
            console.log("Erro: ", e);
            return;
        }
    });

    var tabela = new google
        .visualization
        .DataTable(dados);
    tabela.sort([
        {
            column: 1,
            desc: true
        }
    ]);
    var conversao = tabela.toJSON();
    console.log(conversao);
    var opcoes = {
        title: 'dados',
        height: 400,
        width: 800,
        legend: 'none',
        hAxis: {
            gridlines: {
                color: 'transparent'
            },
            textPosition: 'none'
        },
        annotations: {
            alwaysOutside: true
        }
    }
    var grafico = new google
        .visualization
        .LineChart(document.getElementById("graficoArea"));
    grafico.draw(tabela, opcoes);

};