import { FormControl } from "@angular/forms";


export function restrictedWords(words: string[]) {
  return (control: FormControl): {[key: string]: any} => {
    if (!words) {
      return null!;
    }
    //words.some(x=>control.value.includes(x))
    let invalidWords = words.map(x => control.value.includes(x) ? x : null!).filter(x=>x != null);
    return invalidWords && invalidWords.length > 0 ? {'restrictedWords': invalidWords}: null!;
  };
}
