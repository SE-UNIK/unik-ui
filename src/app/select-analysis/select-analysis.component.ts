import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SparkService } from '../services/spark.service';

@Component({
  selector: 'app-select-analysis',
  templateUrl: './select-analysis.component.html',
  styleUrls: ['./select-analysis.component.css']
})
export class SelectAnalysisComponent {
  analysisTechniques = ['Technique 1', 'Technique 2', 'Technique 3'];
  selectedTechnique: string | null = null;
  selectedFiles: string[] = [];

  constructor(private sparkService: SparkService, private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path], { state: { selectedFiles: this.selectedFiles } });
  }

  analyzeFiles(): void {
    const sparkModel = {
      inputDirectoryPath: '/user/hadoop/inputs/',
      inputFileName: 'input-file-name',
      outputDirectoryPath: '/user/hadoop/outputs/',
      outputFileName: 'output-file-name',
      algorithmName: this.selectedTechnique
    };
    this.sparkService.submitSparkJob(sparkModel, 'input-file-name', '/user/hadoop/inputs/input-file-name').subscribe(() => {
      this.router.navigate(['view-results']);
    });
  }
}

