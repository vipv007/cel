import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OptionsService } from 'src/app/Services/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  options: any;
  constructor(private optionsService: OptionsService,private http: HttpClient) {}


  ngOnInit() {
  this.optionsService.getOptions().subscribe((options: any) => {
  this.options = options;
  console.log(this.options);
  }
 );
}
}