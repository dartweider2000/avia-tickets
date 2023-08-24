class SelectFromUI{
   constructor(){
      this._form = document.forms['form-header'];
      this.select = this._form.elements['select'];

      this.initSelect();

      this.customSelect = this._form.querySelector('.custom-select');
      this.initEvents();
   }

   get selectValue(){
      return this.select.value;
   }

   initSelect(){
      this.select.hidden = true;

      const {options, selected} = [...this.select.options].reduce((result, option) => {
         const obj = {
            'value': option.value,
            'text': option.textContent
         }

         result.options.push(obj);

         if(option.selected)
            result.selected = obj;

         return result;
      }, {'options': [], 'selected': {}});

      const bodyHTML = options.map(option => this.getOptionHTML(option));
      const selectHTML = this.getSelectHTML(selected, bodyHTML);

      this._form.insertAdjacentHTML('beforeend', selectHTML);
   }

   getOptionHTML({value, text}){
      return `<li data-value="${value}" class="custom-select__option">${text}</li>`;
   }

   getSelectHTML({value, text}, bodyHTML){
      return `<div class="custom-select">
         <div data-value="${value}" class="custom-select__line">${text}</div>
         <ul class="custom-select__list">${bodyHTML.join('')}</ul>
      </div>`;
   }

   initEvents(){
      const line = this.customSelect.firstElementChild;

      this.customSelect.addEventListener('click', e => {
         this.customSelect.classList.toggle('_active');
      
         if(!e.target.closest('.custom-select__option'))
            return;
      
         const option = e.target;
      
         line.dataset.value = option.dataset.value;
         line.textContent = option.textContent;
      
         this.select.value = line.dataset.value;
      });
   }
}

const selectFormUI = new SelectFromUI();

export default selectFormUI;