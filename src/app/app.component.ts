import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm:FormGroup;

  forbiddenUserNames = ['Anna','Cate']

  ngOnInit(){
      this.signUpForm = new FormGroup({
                'userData':new FormGroup({  //form groups //Below:Constructor Params: default value, validators, AsyncValidator
                    'username': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),  //bind(this) eliminates perenial this problem in js 
                    'email':new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
                }),
              
              'gender':new FormControl('female'),
              'hobbies':new FormArray([])
      });

      //observe value changes
      this.signUpForm.valueChanges.subscribe(
          (value) => {
             // console.log(value);
          }
      );

      //observe form status changes
      this.signUpForm.statusChanges.subscribe(
           (status) => {
                //console.log(status);
           }
      )

      //possible to setValues like in Template Driven Approach
      this.signUpForm.setValue({
          'userData':{
              'username':'Kennna',
              'email':'mangotto@gmail.com'
          },
          'gender':'female',
          'hobbies':[]
       } );

        //possible to patchValues like in Template Driven Approach
      this.signUpForm.patchValue({
      
        'gender':'male',
        
     } );
  }



  onSubmit(){
       console.log(this.signUpForm)

       //possible to reset the form like in Template Driven Approach
      this.signUpForm.reset()
  }

  addHobbies(){
       const control = new FormControl(null, Validators.required); //added control
       
       (<FormArray>this.signUpForm.get('hobbies')).push(control) //Explictly typecast as FormArray
       
      // (this.signUpForm.get('hobbies') as FormArray).push(control) //Explictly typecast as FormArray
  }
   



  //custom validator -- in this case it detects forbidden usernames above and show an error
  forbiddenNames(control: FormControl): {[s:string]:boolean}{
     if(this.forbiddenUserNames.indexOf(control.value) !== -1){ //normally indexOf returns -1 if element is not present, therefore this executes if return value other than -1 which means its present in the array
       return {isInvalidName:true}
     }

     return null;
  }



  //Async Validator
  forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{
       const promise = new Promise(
            (resolve, reject ) =>{
               setTimeout(  //enables ng-pending class
                 ()=>{
                    if(control.value === 'test@gmail.com'){
                                      resolve( {isInvalidEmail:true} );
                        }else{
                                      resolve( null );
                      }
                 }
                ,1500)
              
            }
       );

       return promise;
  }

}
