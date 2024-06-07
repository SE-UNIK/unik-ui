import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { MetadataService } from '../services/metadata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  selectedFiles: any[] = [];
  fileToUpload: File | null = null;

  constructor(private fileUploadService: FileUploadService,
              private metadataService: MetadataService,
              private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['selectedFiles']) {
      const selectedFileIds = navigation.extras.state['selectedFiles'];
      selectedFileIds.forEach((id: string) => {
        this.metadataService.getFileById(id).subscribe(file => {
          this.selectedFiles.push(file);
        });
      });
    }
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  uploadFile(): void {
    if (this.fileToUpload) {
      const title = prompt('Enter the title of the file') || '';
      const authorsPrompt = prompt('Enter the authors of the file (comma-separated)');
      const authors = authorsPrompt ? authorsPrompt.split(',') : [];
      if (title && authors.length > 0) {
        this.fileUploadService.uploadFile(this.fileToUpload, title, authors).subscribe(() => {
          alert('File uploaded successfully');
        });
      } else {
        alert('Title and authors are required.');
      }
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path], { state: { selectedFiles: this.selectedFiles.map(file => file.id) } });
  }
}

