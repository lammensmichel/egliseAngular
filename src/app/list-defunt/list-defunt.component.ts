import { Component, OnInit } from '@angular/core';
import { Defunt } from '../models/Defunt';
import { DefuntSearch } from '../models/DefuntSearch';
import { DefuntService } from '../service/defunt.service';
import { MatDialog, DateAdapter } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-list-defunt',
  templateUrl: './list-defunt.component.html',
  styleUrls: ['./list-defunt.component.css']
})
export class ListDefuntComponent implements OnInit {

   defunts: Array<Defunt> = [];
   searchText: DefuntSearch;
   p = 1;

  constructor(private defuntService: DefuntService, public dialog: MatDialog, private adapter: DateAdapter<any>) {
     this.adapter.setLocale('fr');
     this.searchText = new DefuntSearch();
   }


  ngOnInit() {
    this.defuntService.getHttp().subscribe((results) => {
      this.defunts = results;
    });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
     if (result && result.id) {
        const defunt: Defunt = new Defunt(result.id) ;
        this.defuntService.deleteHttp(defunt).subscribe((results) => {
          this.defunts = this.defunts.filter((e) => e._id !== id);
          console.log(results);
        });
     }
    });
  }

  deleteDefunt (id: string) {
   this.openDialog(id);
  }

}
