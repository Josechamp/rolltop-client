import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit {

  allTheNotes: Array<Object> = [];
  listError: String = '';
  logoutError: String = '';
  theUser: any = {};


  constructor( private myNotesService: NotesService,
               private myAuthService: AuthService,
               private myRouter: Router) { }

  ngOnInit() {
    this.myAuthService.checklogin()
    .toPromise()
    .then( resFromDB => {
      console.log('user in notes: ', resFromDB)
      this.theUser = resFromDB;
    } )
    this.showNoteList();
  }


  showNoteList(){
    this.myNotesService.getAllNotes()
    .subscribe( allNotes => {
      // console.log('in the component: ', allEntries);
      this.allTheNotes = allNotes;
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }


  logMeOut() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()

}