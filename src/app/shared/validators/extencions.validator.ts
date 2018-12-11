import { AbstractControl } from '@angular/forms';

export function extensionsValidator(control: AbstractControl) {
    let extension = ['png', 'jpeg', 'gif'];
    console.log(control.value);
    //return null;
    return ((new RegExp('(' + extension.join('|').replace(/\./g, '\\.') + ')$')).test(control.value)) ? null : { extensions: true }
} 