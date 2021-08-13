import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import PersonIcon from '!!raw-loader!svgo-loader!../assets/person.svg';
// @ts-ignore
import CallIcon from '!!raw-loader!svgo-loader!../assets/call.svg';
// @ts-ignore
import EmailIcon from '!!raw-loader!svgo-loader!../assets/email.svg';
// @ts-ignore
import CrossIcon from '!!raw-loader!svgo-loader!../assets/cross.svg';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
// we should not write any logical code in this file
export class AppComponent implements OnInit{
  constructor(
    private sanitizer: DomSanitizer,
  ) {}
  title = 'ANGULAR DEMO APP';
  personIcon = this.sanitizer.bypassSecurityTrustHtml(PersonIcon);
  callIcon = this.sanitizer.bypassSecurityTrustHtml(CallIcon);
  emailIcon = this.sanitizer.bypassSecurityTrustHtml(EmailIcon);
  crossIcon = this.sanitizer.bypassSecurityTrustHtml(CrossIcon);

  ngOnInit() {}

}
