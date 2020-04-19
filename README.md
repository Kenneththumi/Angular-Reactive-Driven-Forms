# Angular Forms: Reactive Driven Approach

The project explores creation of forms using Reactive Driven Approach.
In this approach a form is created programmatically and synchronized with the DOM.
It is based on Maximilian Schwarzmüller's Angular Tutorial on Udemy.

## Installation
Below are steps to follow:
1. Open cli, navigate to your project folder and clone the project: 
    `git  clone https://github.com/Kenneththumi/Angular-Forms-Template-Driven-.git`
2. Install Node Modules:
    `npm install`
3. Run:
    `ng serve`
4. In your browser open:
    `http:://localhost:4200`

## More: Async Validation

One might encounter an error while displaying error message via  asynchronous validation. 
Error:
   `Cannot read property 'isInvalidControlName' of null `
Changed it to:
   `<span class="help-block" *ngIf="statusForm.hasError('isInvalidControlName','controlname')">`
From:
   `<span class="help-block" *ngIf="statusForm.get('controlname').errors['isInvalidControlName']"> `

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).