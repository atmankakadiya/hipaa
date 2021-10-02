import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consents',
  templateUrl: './consents.component.html',
  styleUrls: ['./consents.component.css']
})
export class ConsentsComponent implements OnInit {
  // consents icon
  paperclip = "assets/images/paperclip.png"
  view = "assets/images/view.png"
  pencil = "assets/images/pencil.png"
  deleteimg = "assets/images/delete.png"

  // date formate
  datesigned = 'yyyy/MM/dd';
  dateexpires = 'yyyy/MM/dd';

  // modal boolean
  isVisibleTop = false;
  isVisibleMiddle = false;
  isVisibleConsent = false;
  isVisiblePreview = false;


  // variable
  selectedRow : any;
  selectedIndex : any;
  selectedImg : any;
  hipaacreatedate:any;
  hipaacreateexpire:any;


  constructor() { }

  ngOnInit(): void {

  }

  //  toastMixin for alert msg
  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });


  // serve side data
  dataSet = [
    {
      status: 'Active',
      signed: '04/26/2021',
      expires: '04/24/2021',
      img:'',
    },
    {
      status: 'Active',
      signed: '04/28/2021',
      expires: '04/22/2021',
      img:'',
    },
    {
      status: 'Active',
      signed: '04/30/2021',
      expires: '04/31/2021',
      img:'',
    },
  ];
  
  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(data:any,index:any): void {
    this.isVisibleMiddle = true;
    this.selectedRow = {...data};
    this.selectedIndex = index;
  }

  showpreview(img:any){
    this.isVisiblePreview = true;
    this.selectedImg = img;
  }

  handleCancelPreview(){
    this.isVisiblePreview = false;
  }

  showModalDelete(index:any): void {
    this.dataSet.splice(index,1);
    this.toastMixin.fire({
      title: 'A record was delete successfully'
    });
  }

  showModalhipaa(){
    this.isVisibleConsent = true;
    this.hipaacreatedate = "",
    this.hipaacreateexpire = ""
  }

  handleOkMiddle(): void {
    this.isVisibleMiddle = false;
    this.selectedRow.signed=moment(this.selectedRow.signed).format('MM/DD/YYYY');
    this.selectedRow.expires=moment(this.selectedRow.expires).format('MM/DD/YYYY');
    if(this.selectedRow.expires != "Invalid date" && this.selectedRow.signed != "Invalid date"){
      this.dataSet[this.selectedIndex] = this.selectedRow;
      this.toastMixin.fire({
        title: 'A record was update successfully'
      });
    }else{
      this.toastMixin.fire({
        title: "validation require",
        icon: 'error'
      });
    }
  }

  hipaaOkCreate():void{
    this.isVisibleConsent = false;
    const data = {
      status: 'Active',
      signed: moment(this.hipaacreatedate).format('MM/DD/YYYY'),
      expires: moment(this.hipaacreateexpire).format('MM/DD/YYYY'),
      img:'',
    }
    console.log(data.signed);
    if(data.signed != "Invalid date" && data.signed != "Invalid date"){
      this.dataSet.push(data);
      this.hipaacreatedate = null,
      this.hipaacreateexpire = null
      this.toastMixin.fire({
        title: 'A record was saved successfully'
      });
    }else{
      this.toastMixin.fire({
        title: "validation require",
        icon: 'error'
      });
    }
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
    this.isVisibleConsent = false;
  }

  url:any = '';
  onSelectFile(event:any,index:any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.dataSet[index].img=event.currentTarget['result'];
        this.toastMixin.fire({
          title: 'file upload successful'
        });
      }
    }
  }
}
