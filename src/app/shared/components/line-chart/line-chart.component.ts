import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `<div class="bg-white rounded-lg shadow-md p-4">
    <canvas #lineChartCanvas></canvas>
  </div>`,
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = 'Line Chart';

  ngAfterViewInit() {
    new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            data: this.data,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
