import {ConfigDash} from './Config'
import Chart from 'chart.js';

export class LinearChartDash {
    static getId() {
        return 'addLinearChart'
    };

    static controlProperties(){
        return  [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' }
        ];
    }

    static getLayout() {
        var myChart = new Chart($("#sampleChart"),
         {type:'line',
          data:{
               labels: ["January", "February", "March", "April", "May", "June", "July"],
              data: [0,1,2,3,4,2,1,2,3],
          }  });
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Grafica linear</label>
                    <button type="button" id="${LinearChartDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1 text-center"><h3>
                       <div class="chart-container" style="position: relative; height:40vh; width:80vw">
                            <canvas id="sampleChart"></canvas>
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
                h: 1,
                w: 2,
                msg: 'on',
                val:'Hola mundo'
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
                <div class="chart-container" style="position: relative; height:40vh; width:80vw">
                        <canvas id="chart-${control.id}"></canvas>
                </div>

            </div>
        </li>`, control.w, control.h, control.x, control.y)
         var myChart = new Chart($(`#chart-${control.id}`),
         {type:'line',
          data:{
              data: [0,1,2,3,4,2,1,2,3],
          }  });
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control,true)
        }
    }
}