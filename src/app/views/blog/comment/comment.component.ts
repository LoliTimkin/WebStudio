import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../../shared/services/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentType | null = null;

  constructor(private commentService: CommentService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  toggleReaction(comment: CommentType, action: 'like' | 'dislike') {

    this.commentService.setReaction(comment.id, action)
      .subscribe(() => {

        const current = comment.userReaction;

        if (current === action) {
          comment.userReaction = null;

          if (action === 'like') comment.likesCount--;
          else comment.dislikesCount--;

          return;
        }

        if (current === 'like') comment.likesCount--;
        if (current === 'dislike') comment.dislikesCount--;

        comment.userReaction = action;

        if (action === 'like') comment.likesCount++;
        else comment.dislikesCount++;
      });
  }


  sendComplaint() {
    this._snackBar.open("Жалоба отправлена")
  }

}
