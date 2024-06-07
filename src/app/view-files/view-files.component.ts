import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {
  files: any[] = [];
  selectedFiles: string[] = [];

  constructor(private metadataService: MetadataService, private router: Router) {}

  ngOnInit(): void {
    this.metadataService.getAllMetadata().subscribe(data => {
      this.files = data;
    });
  }

  selectFile(id: string): void {
    this.selectedFiles.push(id);
  }

  navigateTo(path: string): void {
    this.router.navigate([path], { state: { selectedFiles: this.selectedFiles } });
  }
}

