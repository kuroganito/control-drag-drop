import { ConfigDash } from './Config'
import Chart from 'chart.js';

export class LinearChartDash {
    static getId() {
        return 'addLinearChart'
    };

    static controlProperties() {
        return [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' }
        ];
    }

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Grafica linear</label>
                    <button type="button" id="${LinearChartDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1 text-center"><h3>
                       <div>
                           <img height="65px" src="linearchart.png"/>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${LinearChartDash.getId()}`).click(function () {
            LinearChartDash.addControl(null, callback);
        })
    }
    static updateControl(control) {
        console.log(control)
        /*$(`#control-id-${control.id} .box-label`).html(control.name)
        $(`#control-id-${control.id} .button-control`).data("topic",control.topic)
        $(`#control-id-${control.id} .button-control`).data("msg",control.msg)*/
    }
    static addControl(control, callback) {
        var close = false;
        console.log()
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'LinearChart',
                class: ConfigDash.controlersClass().indexOf(LinearChartDash),
                name: 'Grafica',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 2,
                w: 2,
                msg: 'on',
                val: 'Hola mundo'
            }
            close = true;
        }
        $('.gridster ul').gridster().data('gridster').
            add_widget(`
        <li id="control-id-${control.id}">
            <div class="box">
                <button data-id="${control.id}" type="button"  
                class="btn btn-sm float-right btn-outline-primary btn-control-delete" 
                data-toggle="modal" data-target="#deleteControlModal">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button data-id="${control.id}" type="button"  
                class="btn btn-sm float-right btn-outline-primary btn-control-edit" 
                data-toggle="modal" data-target="#editControlModal">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <label class="box-label">${control.name}</label>
                <div class="chart-container" style="position: relative; height:100%; width:100%">
                        <canvas class="control-linear-chart" id="chart-${control.id}"></canvas>
                </div>

            </div>
        </li>`, control.w, control.h, control.x, control.y)
        //setTimeout(()=>{
        var myChart = new Chart($(`#chart-${control.id}`), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Data',
                    data: [],


                    borderWidth: 1
                }]
            }
        });
        /////// Coneccion con Cloudion io
        setInterval(() => {
            myChart.data.labels.push('');
            myChart.data.datasets.forEach((dataset) => {
                dataset.data.push(Math.random() * 50);
            });
            myChart.update();
            if (myChart.data.labels.length > 15) {
                myChart.data.labels.shift();
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data.shift();
                });
                myChart.update();
            }
        }, 500)


        if (close) {
            $('#addControlModal').modal('hide')
            callback(control, true)
        }
    }
}