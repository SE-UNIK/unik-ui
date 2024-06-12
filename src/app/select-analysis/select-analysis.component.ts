import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SparkService } from '../services/spark.service';
import { HdfsFileService } from '../services/hdfs-file.service';

@Component({
  selector: 'app-select-analysis',
  templateUrl: './select-analysis.component.html',
  styleUrls: ['./select-analysis.component.css']
})
export class SelectAnalysisComponent implements OnInit {
  analysisTechniques = ['wordcount', 'kmeans', 'lda'];
  selectedTechnique: string | null = null;
  hdfsFiles: any[] = [];
  selectedFiles: string[] = [];

  constructor(private sparkService: SparkService, private hdfsFileService: HdfsFileService, private router: Router) {}

  ngOnInit(): void {
    this.hdfsFileService.getFilesByDirectory('/user/hadoop/inputs/').subscribe(data => {
      console.log('Files fetched:', data);
      this.hdfsFiles = data;
    }, error => {
      console.error('Error fetching files:', error);
    });
  }

  toggleFileSelection(filePath: string): void {
    if (this.selectedFiles.includes(filePath)) {
      this.selectedFiles = this.selectedFiles.filter(path => path !== filePath);
    } else {
      this.selectedFiles.push(filePath);
    }
  }

  isSelected(filePath: string): boolean {
    return this.selectedFiles.includes(filePath);
  }

  analyzeFiles(): void {
    if (this.selectedTechnique && this.selectedFiles.length > 0) {
      const sparkModel = {
        inputFileName: this.selectedFiles,
        // other properties as needed
      };
      this.sparkService.submitSparkJob(sparkModel, this.selectedTechnique).subscribe(() => {
        this.router.navigate(['view-results']);
      });
    } else {
      alert('Please select an analysis technique and files');
    }
  }
}

