export function addClass(el: HTMLElement, classname: string) {
  if (hasClass(el, classname)) {
    return;
  }

  let newClass = el.className.split(' ');
  newClass.push(classname);
  el.className = newClass.join(' ');
}

export function removeClass(el: HTMLElement, classname: string) {
  if (hasClass(el, classname)) {
    return;
  }

  let arr = el.className.split(' ');
  let newArr = arr.filter(i => {
    return i !== classname;
  });
  el.className = newArr.join(' ');
}

export function hasClass(el: HTMLElement, classname: string) {
  let reg = new RegExp('(^|\\S)' + classname + '(\\s|$)');
  return reg.test(el.className);
}
