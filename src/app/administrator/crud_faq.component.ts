
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { FAQ } from '../_models';
import { FAQService, AuthenticationService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'crud_faq.component.html',
    styleUrls: ['./ss_administrator.component.css'] 
})

export class CRUD_FAQComponent implements OnInit {
  
  dataSaved = false;  
  faqForm: any;
  faq: FAQ[] = [];

  faqIdUpdate = null;  
  massage = null;

  constructor(
      private faqService: FAQService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() { 
      this.loadAllFAQ();
  }

  private loadAllFAQ() {
    this.faqService.getAllFAQ()
    .pipe(first())
    .subscribe(
      faq => {
        //this.faq = faq;
        this.faq = faq;
        console.log(this.faq);
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );
  }

    newFAQClicked = false;

  color;

  model: any = {};
  model2: any = {}; 

  //Remove this bad boy
  testData() {
    this.faq.push(
      { Faqid: 1, Faqdescription: 'Where is x page', Faqanswer: 'In y page'},
      { Faqid: 2, Faqdescription: 'Where is y page', Faqanswer: 'In x page'},
      { Faqid: 3, Faqdescription: 'What is z', Faqanswer: 'It is Z'},
      { Faqid: 4, Faqdescription: 'When is q', Faqanswer: 'It is Q'},
    )
  }
  model3:FAQ = {
    Faqanswer: '',
    Faqdescription:'',
    Faqid:1
  };
  // public string Faqdescription { get; set; }
  // public string Faqanswer { get; set; }
  addFAQ() { 
   
    this.model3.Faqanswer=this.model.Faqanswer;
    this.model3.Faqdescription = this.model.Faqdescription;
    // this.model3.Faqanswer = this.model.question;

    if(Object.keys(this.model).length < 2)
    {
      this.alertService.error("Error, you have an empty feild");
      console.log('Empty');
      this.newFAQClicked = !this.newFAQClicked;
      this.model = {};
    }
    else if((Object.keys(this.model).length>=2))
    {
      this.faqService.create(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Creation was successful', true);
                    this.faq.push(this.model3);
                    this.newFAQClicked = !this.newFAQClicked;
                    this.model = {};
                },
                error => {
                  this.alertService.error('Error, Creation was unsuccesful');
              });
    }
  }
    
  
  deleteFAQ(i:number) {

 
    this.faqService.delete(Number(i))
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion was successful', true);

                    this.faq.splice(i, 1);
                    console.log(i);
                },
                error => {
                    this.alertService.error('Error, Deletion was unsuccesful');
                });
  }

  myValue;

  editFAQ(editFAQInfo) {
    this.model2.Faqdescription = this.faq[editFAQInfo].Faqdescription;
    this.model2.Faqanswer = this.faq[editFAQInfo].Faqanswer;
    this.myValue = editFAQInfo;
  }

  updateFAQ() {
    let editFAQInfo = this.myValue;

    this.model3.Faqanswer=this.model2.answer;
    this.model3.Faqdescription = this.model2.question;

    for(let i = 0; i < this.faq.length; i++) {

      if(i == editFAQInfo) 
      {
        this.faqService.update(editFAQInfo+1, this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update was successful', true);

                    this.faq[i] = this.model2;
                    this.model2 = {};
                },
                error => {
                    this.alertService.error('Error, Update was unsuccesful');
                });
      }
    }
    }

    addNewFAQBtn() {
        this.newFAQClicked = !this.newFAQClicked;
      }

}