import { Component } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // en tu componente (ej: AppComponent o DashboardComponent)
  userName = localStorage.getItem('user_name');
  userRole = localStorage.getItem('user_role');
  deptChartSeries: ApexAxisChartSeries = [];
  deptChartOptions: any;

  monthChartSeries: ApexAxisChartSeries = [];
  monthChartOptions: any;

  constructor(private dashboardService: AuthService) { }
  ngOnInit() {
    this.dashboardService.getStatsByDepartment().subscribe((data: { _id: string, count: number }[]) => {
      this.deptChartSeries = [{ name: 'Personas', data: data.map(d => d.count) }];
      this.deptChartOptions = {
        chart: { type: 'bar' },
        xaxis: { categories: data.map(d => d._id) },
        title: { text: 'Distribución por Departamento' }
      };
    });

    this.dashboardService.getStatsByHireDate().subscribe((data: { _id: string, count: number }[]) => {
      this.monthChartSeries = [{ name: 'Contrataciones', data: data.map(d => d.count) }];
      this.monthChartOptions = {
        chart: { type: 'line' },
        xaxis: { categories: data.map(d => d._id) },
        title: { text: 'Contrataciones por Mes' }
      };
    });
  }

}
