import { inject, Injectable } from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { User } from '../pages/models/user.models';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(Auth);


  login(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
}
