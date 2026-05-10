import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MyDialogData} from "../../../types/mydialog-data.type";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../services/request.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'dialog-elements',
  template: '<button class={{data.style}} matButton (click)="openDialog()">' +
    '{{data.buttonText}}</button>\n',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsComponent {

  @Input() data!: MyDialogData;
  @Input() dataService!: string;
  readonly dialog = inject(MatDialog);

  constructor() {

  }

  openDialog() {
    this.dialog.open(ModalDialogComponent, {
      panelClass: 'custom-overlay-pane',
      data: this.data
    });
  }
}

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ModalDialogComponent {

  isSubmitted: boolean = false;
  errorMessage: string = '';

  requestForm = this.fb.group({
    name: ['', [Validators.required], ],
    phoneNumber: ['', Validators.required],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: MyDialogData,
                      private fb: FormBuilder,
                      private requestService: RequestService,
                      private cdr: ChangeDetectorRef ) {
  }

  onSubmit()  {
    if (this.requestForm.valid) {
      const serviceName = this.data.mode === 'order'?  this.data.serviceName : undefined;

      this.requestService.sendRequest(
        this.requestForm.get('name')?.value || '',
        this.requestForm.get('phoneNumber')?.value || '',
        serviceName,
        this.data.mode).subscribe({
           next: (response) => {
              this.isSubmitted = true;
              this.cdr.markForCheck();
            },
           error: (errorResponse: HttpErrorResponse) => {
             console.log(errorResponse)
             this.isSubmitted = false;
             if (errorResponse.error) {
               if (errorResponse.error.message) {
                 this.errorMessage = errorResponse.error.message;
               }
             }
             this.cdr.markForCheck();
           }
        })
    }
  }

}
