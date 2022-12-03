
import {CRUD} from './crud.mjs';


const subject = document.getElementById('subject');
const lessonNum = document.getElementById('num');
const findSubj = document.getElementById('findSubject');
const foundSubject = document.getElementById('foundSubject');
const subjectId = document.getElementById('subjectId');
const lmsTable = document.querySelector('.lmsTable');
const subjForm = document.querySelector('.subject-form');

export class LMS extends CRUD{
  populateTable(data){
     
    
    // helper function        
    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        
        return td;
    }
  
    // insert data
    data.forEach(item => {
        var row = lmsTable.insertRow();
        addCell(row, item.id);
        addCell(row, item.subject);
        addCell(row, item.num);
        const del = document.createElement('button');
        del.innerHTML = '<i class="fa-solid fa-trash"></i>';
        row.appendChild(del);
        del.addEventListener('click',()=>{
          lms.deleteData(`http://localhost:3000/subjects/${item.id}`)
          .then(getData())
          .catch(err=>console.log(err.message));
        })

    });
  }
}

const lms = new LMS();



window.addEventListener('load', ()=>{
  lms.getData('http://localhost:3000/subjects')
  .then(data=>{lms.populateTable(data);
  console.log(data);})
  .catch(err=>console.log(err.message));
  console.log('hi');
})

subjForm.addEventListener('submit', ()=>{
   if(subject.value && lessonNum.value){
   lms.postData('http://localhost:3000/subjects', {subject:subject.value, num: lessonNum.value})
   .then(data=>console.log(data))
   .catch(err=>console.log(err.message));}
 

})

findSubj.addEventListener('click', ()=>{
     lms.findOne(subjectId.value, 'http://localhost:3000/subjects')
     .then(data=>foundSubject.innerHTML = `Subject: ${data.subject}, Number of Lessons: ${data.num}` )
    .catch(err=>foundSubject.innerHTML = 'There is no registered lesson plan with given ID')
})



  

// update.addEventListener('click', ()=>{
//   const id = Number(idToUpdate.value);
//   lms.updateData(`http://localhost:3000/subjects/${id}`, {subject:updatedName.value, num: updatedNum.value})
//   .then(getData())
//   .catch(err=>console.log(err.message));
// });



