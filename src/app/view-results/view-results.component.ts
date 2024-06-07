import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SparkService } from '../services/spark.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent {
  results: any[] = []; // Define results property

  constructor(private router: Router, private sparkService: SparkService) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  downloadResults(): void {
    this.sparkService.downloadResults().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analysis_results.zip'; // Specify the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Download error:', error);
      alert('An error occurred while downloading the results.');
    });
  }
}

