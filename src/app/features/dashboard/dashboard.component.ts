import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CardComponent, LineChartComponent, PieChartComponent],
})
export class DashboardComponent {
  summaryCards = [
    {
      title: 'Ratings',
      subtitle: 'Year of 2024',
      value: '13k',
      growth: '+15.6%',
      icon: 'star',
    },
    {
      title: 'Sessions',
      subtitle: 'Last Week',
      value: '24.5k',
      growth: '-20%',
      icon: 'user',
    },
    {
      title: 'Transactions',
      subtitle: 'This Month',
      value: '245k',
      growth: '+48.5%',
      icon: 'money-bill',
    },
  ];

  totalSalesLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  totalSalesData = [2000, 3000, 4000, 2500, 4500, 5500];

  salesOverviewLabels = ['Apparel', 'Electronics', 'FMCG', 'Other Sales'];
  salesOverviewData = [12150, 24900, 12750, 50200];

  lineChartData = [10, 20, 30, 40, 50, 60];
  lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  pieChartData = [40, 30, 20, 10];
  pieChartLabels = ['Apparel', 'Electronics', 'FMCG', 'Other Sales'];
}
