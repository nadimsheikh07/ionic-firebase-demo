import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface taskData {
  Name: string;
  Details: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  taskList = [];
  taskData: taskData;
  taskForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.taskData = {} as taskData;
  }

  ngOnInit() {

    this.taskForm = this.fb.group({
      Name: ['', [Validators.required]],
      Details: ['', [Validators.required]]
    })

    this.firebaseService.read_tasks().subscribe(data => {

      this.taskList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Details: e.payload.doc.data()['Details'],
        };
      })
    });
  }

  CreateRecord() {    
    this.firebaseService.create_task(this.taskForm.value).then(resp => {
      this.taskForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_task(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditDetails = record.Details;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Details'] = recordRow.EditDetails;
    this.firebaseService.update_task(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
