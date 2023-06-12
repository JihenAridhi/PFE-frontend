import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  constructor(private http: HttpClient) {
  }

  selectedYear?: number ;
  checkboxes = [
    {label: 'Articles', checked: false},
    {label: 'Members', checked: false},
    {label: 'Projects', checked: false},
    {label: 'Events', checked: false},
    {label: 'News', checked: false},
    {label: 'Partners', checked: false}
  ];

  submitForm(): void {
    const selectedCheckboxes = this.checkboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.label);

    // Send the data to the backend
    const formData = new FormData();
    formData.append('year', this.selectedYear!.toString());
    formData.append('checkboxes', JSON.stringify(selectedCheckboxes));

    // Make an HTTP request to the backend
    this.http.post('http://127.0.0.1:8000/generate-pdf', formData, {responseType: 'blob'})
      .subscribe(response => {
        // Create a blob URL from the response
        const blobUrl = URL.createObjectURL(response);

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'reporting.pdf';
        link.click();

        // Clean up the blob URL
        URL.revokeObjectURL(blobUrl);

        console.log('PDF generated successfully');
      }, error => {
        console.error('Error occurred while generating PDF:', error);
      });
  }
}
