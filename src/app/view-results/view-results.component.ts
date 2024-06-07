import { Component, OnInit } from '@angular/core';
import { SparkService } from '../services/spark.service';
import { FileUploadService } from '../services/file-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {
  results: any[] = [];

  constructor(private sparkService: SparkService, private fileUploadService: FileUploadService, private router: Router) {}

  ngOnInit(): void {
    this.sparkService.getAnalysisResults().subscribe(data => {
      this.results = data;
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  downloadResults(): void {
    this.fileUploadService.downloadFile('output-file-name').subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analysis-results.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}

