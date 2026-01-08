import {ChangeDetectionStrategy, Component, Inject, inject, Input} from '@angular/core';
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

@Component({
  selector: 'dialog-elements',
  template: '<button class={{data.style}} matButton (click)="openDialog()">' +
    '{{data.buttonText}}</button>\n',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsComponent {

  @Input() data!: MyDialogData;
  readonly dialog = inject(MatDialog);

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: MyDialogData) {
  }

}
