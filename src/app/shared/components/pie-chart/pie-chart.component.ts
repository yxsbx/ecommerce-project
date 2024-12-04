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
  selector: 'app-pie-chart',
  standalone: true,
  template: `<div class="bg-white rounded-lg shadow-md p-4">
    <canvas #pieChartCanvas></canvas>
  </div>`,
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = 'Pie Chart';

  ngAfterViewInit() {
    new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
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
