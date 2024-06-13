import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { MetadataService } from '../services/metadata.service';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  metadataFiles: any[] = [];
  selectedFiles: any[] = [];
  fileToUpload: File | null = null;
  fileTitle: string = '';
  fileAuthors: string[] = [];
  showModal: boolean = false;

  constructor(
    private fileUploadService: FileUploadService,
    private metadataService: MetadataService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.metadataService.getAllMetadata().subscribe(data => {
      this.metadataFiles = data;
    });
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.fileToUpload = null;
    this.fileTitle = '';
    this.fileAuthors = [];
  }

  addAuthor(author: string): void {
    if (author && !this.fileAuthors.includes(author)) {
      this.fileAuthors.push(author);
    }
  }

  removeAuthor(author: string): void {
    this.fileAuthors = this.fileAuthors.filter(a => a !== author);
  }

  uploadFile(): void {
    if (this.fileToUpload && this.fileTitle && this.fileAuthors.length > 0) {
      this.fileUploadService.uploadFile(this.fileToUpload, this.fileTitle, this.fileAuthors).subscribe(() => {
        alert('File uploaded successfully');
        this.closeModal();
      }, error => {
        console.error('Upload error:', error);
        alert('An error occurred while uploading the file.');
      });
    } else {
      alert('Title and at least one author are required.');
    }
  }

  selectFile(file: any): void {
    const index = this.selectedFiles.findIndex(selectedFile => selectedFile.id === file.id);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    } else {
      this.selectedFiles.push(file);
    }
  }

  isSelected(file: any): boolean {
    return this.selectedFiles.some(selectedFile => selectedFile.id === file.id);
  }

  navigateTo(path: string): void {
    this.router.navigate([path], { state: { selectedFiles: this.selectedFiles.map(file => file.id) } });
  }

  uploadSelectedFilesToHDFS(): void {
    const ids = this.selectedFiles.map(file => file.id);
    this.dataTransferService.uploadSelectedFilesToHDFS(ids).subscribe(() => {
      alert('Selected metadata files uploaded to HDFS successfully');
    }, error => {
      console.error('Upload error:', error);
      // alert('An error occurred while uploading the files to HDFS.');
    });
  }
}

