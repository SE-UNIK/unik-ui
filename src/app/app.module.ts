import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { SelectAnalysisComponent } from './select-analysis/select-analysis.component';
import { ViewResultsComponent } from './view-results/view-results.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ViewFilesComponent,
    UploadFilesComponent,
    SelectAnalysisComponent,
    ViewResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

