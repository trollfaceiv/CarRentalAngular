import { Component, OnInit } from '@angular/core';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { User } from '../../models/user';
import { MyTableActionEnum } from 'src/app/shared/components/my-table/my-table.actionenum';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  usersArray!: User[];

  usersTabHeaders: MyTableConfig<User> = new MyTableConfig(
    ['Id', 'Nome', 'Cognome', 'Email','Password', 'Ruolo', 'Data di nascita'],
    User,
    { defaultColumn: 'id', orderType: 'asc' },
    { columns: ['Email'] },
    { itemPerPage: 5, itemPerPageOptions: [5, 10, 20, 50] },
    [{ type: MyTableActionEnum.DELETE, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Elimina', image: '' } },
    { type: MyTableActionEnum.EDIT, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Modifica', image: '' } },
    { type: MyTableActionEnum.NEW_ROW, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Aggiungi utente', image: '' } },
    ]);
    
  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers().subscribe ( users => 
      { 
        this.usersArray = users; 
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe( () => {
      this.getUsers();
    });
  }

  handleNewPerformedAction(action: MyTableActionEnum) {
    if (action === MyTableActionEnum.NEW_ROW) {
      this.router.navigate(['/user-info/']);
    }
  }

  handlePerformedAction(action: { action: MyTableActionEnum; rowData: any }) {
    if (action.action === MyTableActionEnum.EDIT) {
      this.router.navigate(['/user-info/' + action.rowData.id]);
    } else if (action.action === MyTableActionEnum.DELETE) {
      this.deleteUser(action.rowData.id);
    }
  }

}
