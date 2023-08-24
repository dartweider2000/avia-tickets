class SearchFormUI{
   constructor(){
      this._form = document.forms['search-form'];
      this.origin = this._form.elements['origin'];
      this.destination = this._form.elements['destination'];
      this.departTime = this._form.elements['depart_time'];
      this.returnTime = this._form.elements['return_time'];
      this.shortCitiesList = null;

      this.initEvents();
   }

   get originValue(){
      return this.origin.value;
   }

   get destinationValue(){
      return this.destination.value;
   }

   get departTimeValue(){
      return this.departTime.value;
   }

   get returnTimeValue(){
      return this.returnTime.value;
   }

   get form(){
      return this._form;
   }

   initEvents(){
      [this.origin, this.destination].forEach(input => {
         input.addEventListener('input', this.autoComplete.bind(this));
         input.addEventListener('focusin', this.focusInHandler.bind(this));
         input.addEventListener('focusout', this.focusOutHandler.bind(this));
      });

      document.addEventListener('keydown', this.keyDownHandler.bind(this));
   }

   keyDownHandler(e){
      const el = e.target;

      if(!el.closest('.search-form__input-place'))
         return;

      const code = e.code;
      const input = el.closest('input');
      const parent = el.closest('.search-form__input-place');
      const autoComplete = parent.lastElementChild;

      const close = () => input.dispatchEvent(new FocusEvent('focusout'));

      if(code === 'Escape'){
         close();
      }else if(code === 'ArrowUp' || code === 'ArrowDown'){
         const children = [...autoComplete.children];
         let index;

         let activeChild = children.find(child => child.classList.contains('_active'));
         if(!activeChild){
            index = -1;
         }else{
            index = children.indexOf(activeChild);
         }

         activeChild?.classList.remove('_active');

         if(code === 'ArrowUp'){
            index--;

            if(index < 0)
               return;
         }else if(code === 'ArrowDown'){
            index++;

            if(index >= children.length){
               activeChild?.classList.add('_active');
               return;
            }
         }
         children[index].classList.add('_active');

         const act = children[index];

         const autoRect = autoComplete.getBoundingClientRect();
         const activeRect = act.getBoundingClientRect();

         if(code === 'ArrowDown'){
            if(activeRect.top - autoRect.top < autoComplete.offsetHeight - act.offsetHeight)
               return;

            autoComplete.scrollTo({
               'top': act.offsetTop - (autoComplete.offsetHeight - act.offsetHeight) + 5 ,
               'left': 0,
               'bahavior': 'smooth'
            });
         }else{
            if(activeRect.top - autoRect.top > act.offsetHeight)
               return;

            autoComplete.scrollTo({
               'top': act.offsetTop - 5,
               'left': 0,
               'bahavior': 'smooth'
            });
         }

      }else if(code === 'Enter'){
         e.preventDefault();
         const parent = el.parentElement; 

         const item = parent.querySelector('._active');
         const value = item.textContent;

         el.value = value;
         close();
         parent.querySelector('.auto-complete').remove();
      }

      
   }

   focusInHandler(e){
      const parent = e.target.parentElement;
      parent.querySelector('.auto-complete') && (parent.querySelector('.auto-complete').hidden = false); 
   }

   focusOutHandler(e){
      const parent = e.target.parentElement;

      if(parent.querySelector('.auto-complete')){
         const aciveComplete = parent.querySelector('.auto-complete');

         aciveComplete.scrollTo(0, 0); 
         aciveComplete.hidden = true;
      }

      parent.querySelector('.auto-complete__item._active') && parent.querySelector('.auto-complete__item._active').classList.remove('_active');
   }

   autoComplete(e){
      const el = e.target;
      const value = el.value.trim();
      const parent = el.parentElement;

      parent.querySelector('.auto-complete') && parent.querySelector('.auto-complete').remove();

      if(!value.length || !this.shortCitiesList)
         return;

      const {list} = Object.keys(this.shortCitiesList).reduce((result, key) => {
         // if(result.counter >= 15)
         //    return result;

         if(key.includes(value)){
            result.list.push(key);
            result.counter++;
         }

         return result;
      }, {'list': [], 'counter': 0});
      
      if(!list.length) 
         return;

      const bodyHTML = list.map(key => this.getItemHTML(key, value));
      const autoCompleteHTML = this.getAutoCompleteHTML(bodyHTML);

      parent.insertAdjacentHTML('beforeend', autoCompleteHTML);
   }

   getAutoCompleteHTML(bodyHTML){
      return `<ul class="auto-complete">${bodyHTML.join('')}</ul>`
   }

   getItemHTML(key, value){
      const index = key.indexOf(value);
      const startParth = key.slice(0, index);
      const endParth = key.slice(index + value.length, key.length);

      return `<li class="auto-complete__item">${startParth}<span>${value}</span>${endParth}</li>`;
   }

   setAutoCompleteData(data){
      this.shortCitiesList = data;
   }
}

const searchFormUI = new SearchFormUI();

export default searchFormUI;