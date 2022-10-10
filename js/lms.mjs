
import {CRUD} from './crud.mjs';

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
        var row = table.insertRow();
        addCell(row, item.id);
        addCell(row, item.subject);
        addCell(row, item.num);
    });
  }
}

const lms = new LMS();


const subject = document.getElementById('subject');
const lessonNum = document.getElementById('num');
const subBtn = document.getElementById('sub');
const table = document.querySelector('.lmsTable');
const readData = document.querySelector('.read');
const update = document.querySelector('.update');
const del = document.querySelector('.del');
const idToUpdate = document.getElementById('idToUpdate');
const idToDelete = document.getElementById('idToDelete');
const updatedName = document.getElementById('updatedName');
const updatedNum = document.getElementById('updatedNum');




subBtn.addEventListener('click', (event)=>{
  event.preventDefault();
   lms.postData('http://localhost:3000/subjects', {subject:subject.value, num: lessonNum.value})
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message));

    

});

readData.addEventListener('click', ()=>{
 lms.getData('http://localhost:3000/subjects')
  .then(data=>lms.populateTable(data))
  .catch(err=>console.log(err.message))
});

update.addEventListener('click', ()=>{
  const id = Number(idToUpdate.value);
  lms.updateData(`http://localhost:3000/subjects/${id}`, {subject:updatedName.value, num: updatedNum.value})
  .then(getData())
  .catch(err=>console.log(err.message));
});

del.addEventListener('click', ()=>{
  const id = Number(idToDelete.value);
  lms.deleteData(`http://localhost:3000/subjects/${id}`)
  .then(getData())
  .catch(err=>console.log(err.message));
});

