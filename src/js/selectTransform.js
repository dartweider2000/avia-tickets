const formHeader = document.forms[0];
const headerSelect = formHeader.elements['select'];

initCustomSelect();

const customSelect = document.querySelector('.custom-select');
const line = customSelect.firstElementChild;

console.dir(headerSelect);

customSelect.addEventListener('click', e => {
   customSelect.classList.toggle('_active');

   if(!e.target.closest('.custom-select__option'))
      return;

   const option = e.target;

   line.dataset.value = option.dataset.value;
   line.textContent = option.textContent;

   headerSelect.value = line.dataset.value;
   
   console.dir(headerSelect.value);
});

function initCustomSelect(){
   headerSelect.hidden = true;

   const {options, selected} = [...headerSelect.options].reduce((result, option) => {
      const obj = {
         'value': option.value,
         'text': option.textContent
      }

      result.options.push(obj);

      if(option.selected)
         result.selected = obj;

      return result;
   }, {'options': [], 'selected': {}});

   const bodyHTML = options.map(option => getOptionHTML(option));
   const selectHTML = getSelectHTML(selected, bodyHTML);

   formHeader.insertAdjacentHTML('beforeend', selectHTML);
}

function getSelectHTML({value, text}, bodyHTML){
   return `<div class="custom-select">
      <div data-value="${value}" class="custom-select__line">${text}</div>
      <ul class="custom-select__list">${bodyHTML.join('')}</ul>
   </div>`;
}

function getOptionHTML({value, text}){
   return `<li data-value="${value}" class="custom-select__option">${text}</li>`;
}

const searchForm = document.forms[1];
searchForm.addEventListener('submit', e => {
   e.preventDefault();

   const obj = {
      'origin': searchForm['origin'].value,
      'destination': searchForm['destination'].value,
      'depart_time': searchForm['depart_time'].value,
      'return_time': searchForm['return_time'].value,
      'money': headerSelect.value
   }

   console.log(obj);
})

const inputsList = searchForm.querySelectorAll('input[type="text"]');
console.log(inputsList);

inputsList.forEach(input => input.addEventListener('input', autoComplete));

function autoComplete(e){
   const el = e.target;

   
}