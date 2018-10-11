import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

const jsonData = {
  consultas: [
    { description: 'Selic ao Dia' }
    , { description: 'Selic ao Mes' }
    , { description: 'Selic ao Ano' }
  ]
};


@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {
  dummyJson = {
    days: [
      { description: 'Mon' },
      { description: 'Tue' },
      { description: 'Wed' },
      { description: 'Thu' },
      { description: 'Fri' }
    ],
    people: [
      { description: 'Mike' },
      { description: 'Max' },
      { description: 'Adam' },
      { description: 'Brandy' },
      { description: 'Ben' }
    ]
  }
  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private toastCtrl: ToastController
    , private http: HttpClient
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultaPage');
  }

/*  
  openPicker() {
    this.selector.show({
      title: 'Select Your Contact',
      items: [
        this.dummyJson.days,
        this.dummyJson.people
      ],
      positiveButtonText: 'Choose',
      negativeButtonText: 'Nah',
      defaultItems: [
        { index: 0, value: this.dummyJson.days[4].description },
        { index: 1, value: this.dummyJson.people[1].description }
      ]
    }).then(
      result => {
        let msg = `Selected ${result[0].description} with ${result[1].description}`;
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 4000
        });
        toast.present();
      },
      err => console.log('Error: ', err)
    );
  }

  openRemotePicker() {
    this.http.get('https://randomuser.me/api/?results=5').subscribe(res => {
      this.selector.show({
        title: 'Select Your Contact',
        items: [
          res['results']
        ],
        displayKey: 'email'
      }).then(
        result => {
          let msg = `Selected ${result[0].email}`;
          let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000
          });
          toast.present();
        },
        err => console.log('Error: ', err)
      );

    });
  }
*/

}
