import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'ionic-task-manager';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_task(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_tasks() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_task(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_task(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

}
