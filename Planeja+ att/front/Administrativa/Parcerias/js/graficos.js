
var disponivel = [20, 80]
var disponivelVeiculos = 2

Graficos()
GraficoDeLinha()

function Graficos(disponivel, disponivelVeiculos) {

    var ctx = document.getElementById('myChart').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Operações em Andamento ', 'Operações Finalizadas'],
            datasets: [{
                data: [20, 80],
                backgroundColor: [
                    // 'rgb(54, 162, 235)',
                    '#009CE6',
                    '#212124'
                ]
            }]
        },
        options: {
            cutoutPercentage: 50
        }

    });


}

//     // var ctx = document.getElementById('myChartMotorista').getContext('2d');
//     // var myDoughnutChart = new Chart(ctx, {
//     //     type: 'doughnut',
//     //     data: {
//     //         labels: ['Motoristas Disponiveis', 'Motoristas Em Operação'],
//     //         datasets: [{
//     //             data: disponivelMotorista,
//     //             backgroundColor: [
//     //                 // 'rgb(54, 162, 235)',
//     //                 '#90ee90',
//     //                 '#009CE6'
//     //             ]
//     //         }]
//     //     },
//     //     options: {
//     //         cutoutPercentage: 50
//     //     }
//     // });


//     var ctx = document.getElementById('myDonultVeiculo').getContext('2d');
//     var myDoughnutChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['Veiculos Disponiveis ', 'Veiculos Em Operação', 'Veiculos Na Manutenção'],
//             datasets: [{
//                 data: disponivelVeiculos,
//                 backgroundColor: [
//                     // 'rgb(54, 162, 235)',
//                     '#90ee90',
//                     '#009CE6',
//                     'Yellow'
//                 ]
//             }]
//         },
//         options: {
//             cutoutPercentage: 50
//         }
//     });



// }

function GraficoDeLinha() {

    const manutencoesPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // const manutencoesValorPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const operacoesPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // manutencao.forEach(m => {
    //     const dataDaManutencao = new Date(m.data_inicio)
    //     const mesDaManutencao = dataDaManutencao.getMonth()
    //     manutencoesPorMes[mesDaManutencao]++

    //     console.log(dataDaManutencao);
    //     console.log(manutencoesPorMes);
    // })

    // operacoes.forEach(o => {

    //     const dataDaOperacao = new Date(o.data_saida)
    //     const mesDaOperacao = dataDaOperacao.getMonth()

    //     operacoesPorMes[mesDaOperacao]++

    //     console.log(operacoesPorMes);
    // })

    var ctx = document.getElementById('meuGrafico').getContext('2d');
    var meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Manutenções',
                data: manutencoesPorMes,
                backgroundColor: '#0178AC',
                borderColor: '#0178AC',
                borderWidth: 1
            }
            ],

        },

        options: {}
    });



}