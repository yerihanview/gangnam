const logEvent=(event,properties={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,...properties});console.info('[감자쌤 event]',event,properties)};

const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el)=>observer.observe(el));

document.querySelectorAll('[data-event]').forEach((el)=>el.addEventListener('click',()=>logEvent(el.dataset.event,{button_label:el.textContent.trim(),section:el.closest('section')?.id||'navigation'})));

document.querySelectorAll('.quiz-options button').forEach((button)=>button.addEventListener('click',()=>{
  const correct=button.dataset.answer==='true';
  document.querySelectorAll('.quiz-options button').forEach((item)=>item.classList.remove('correct','wrong'));
  button.classList.add(correct?'correct':'wrong');
  document.querySelector('.quiz-feedback').textContent=correct?'정답이에요! 明의 핵심은 ‘밝고 또렷하게 드러남’이에요.':'아쉬워요. ‘흐릿한 것이 또렷해지는 느낌’을 골라보세요.';
  logEvent('sample_quiz_select',{selected_option:button.textContent.trim(),is_correct:correct});
}));

document.querySelectorAll('.accordion details').forEach((detail)=>detail.addEventListener('toggle',()=>{if(detail.open)logEvent('faq_open',{question:detail.querySelector('summary').textContent.trim()})}));

const form=document.querySelector('#sample-form');
const success=document.querySelector('#form-success');
const error=document.querySelector('.form-error');
form.querySelectorAll('input,select').forEach((field)=>field.addEventListener('focus',()=>logEvent('form_start',{field_name:field.name}),{once:true}));
form.addEventListener('submit',(event)=>{
  event.preventDefault();error.textContent='';
  if(!form.checkValidity()){
    error.textContent='필수 항목을 확인해 주세요.';form.reportValidity();logEvent('form_submit_error',{error_type:'validation'});return;
  }
  const data=new FormData(form);
  logEvent('form_submit_success',{interest:data.get('interest'),child_grade:data.get('grade')});
  form.hidden=true;success.hidden=false;success.focus();
});
document.querySelector('#reset-form').addEventListener('click',()=>{form.reset();success.hidden=true;form.hidden=false;form.querySelector('input').focus()});

const privacyButton=document.querySelector('.privacy-toggle');
privacyButton.addEventListener('click',()=>{const detail=document.querySelector('.privacy-detail');detail.hidden=!detail.hidden;privacyButton.textContent=detail.hidden?'자세히':'닫기'});

document.querySelector('.purchase-link').addEventListener('click',()=>alert('정식 구매 링크는 출시 시 연결됩니다. 지금은 무료 샘플을 먼저 신청해 주세요.'));
