import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Admin } from '../admin.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html'
})
export class AdminListPage implements OnInit, OnDestroy {
  subscription: Subscription;
  admins: Admin[];

  constructor(
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit() {
    this.subscription = this.store
    .select('admins')
    .pipe(map(usersState => usersState.admins))
    .subscribe((admins: Admin[]) => {
        if(admins){
          this.admins = _.cloneDeep(admins);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
