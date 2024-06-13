import { Component, OnInit } from '@angular/core';
import { SparkService } from '../services/spark.service';

@Component({
  selector: 'app-wordcount-results',
  templateUrl: './wordcount-results.component.html',
  styleUrls: ['./wordcount-results.component.css']
})
export class WordcountResultsComponent implements OnInit {
  results: any[] = [];

  constructor(private sparkService: SparkService) { }

  ngOnInit(): void {
    this.sparkService.getWordCountResults().subscribe(data => {
      this.results = data;
    }, error => {
      console.error('Error fetching word count results:', error);
    });
  }
}
