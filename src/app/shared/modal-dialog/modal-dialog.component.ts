import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-elements',
  template: '<button class="button btn-main" matButton (click)="openDialog()">' +
    'Подробнее</button>\n',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(ModalDialogComponent, {
      panelClass: 'custom-overlay-pane'
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

}
