import {CRUD} from './crud.mjs';

const teacherName  = document.getElementById('name');
const birthDay = document.getElementById('birthday');
const teaching = document.getElementById('teaching');
const years = document.getElementById('years');
const teachersTable = document.querySelector('.teachersTable');
const teacherId = document.getElementById('teacherId');
const findTeacher = document.getElementById('findTeacher');
const foundTeacher = document.getElementById('foundTeacher');
const teacherForm = document.querySelector('.teacher-form');

class Teachers extends CRUD{
    
  populateTable(data){
     
    
    // helper function        
    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
  
    // insert data
    data.forEach(item => {
        var row = teachersTable.insertRow();
        addCell(row, item.id);
        addCell(row, item.name);
        addCell(row, item.birth);
        addCell(row, item.teachingSubject);
        addCell(row, item.experience);
        const del = document.createElement('button');
        del.innerHTML = '<i class="fa-solid fa-trash"></i>';
        row.appendChild(del);
        del.addEventListener('click',()=>{
          teacher.deleteData(`http://localhost:3000/teachers/${item.id}`)
          .then(getData())
          .catch(err=>console.log(err.message));
        })
    });
  }




}


const teacher = new Teachers();



window.addEventListener('load', ()=>{
  teacher.getData('http://localhost:3000/teachers')
  .then(data=>{teacher.populateTable(data);
  console.log(data);})
  .catch(err=>console.log(err.message));
  console.log('hi');
})

teacherForm.addEventListener('submit', ()=>{
  if(teacherName.value && teaching.value){
    teacher.postData('http://localhost:3000/teachers', {name:teacherName.value, birth:birthDay.value, teachingSubject:teaching.value, experience:years.value })
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message));}
   
})

 
findTeacher.addEventListener('click', ()=>{
  teacher.findOne(teacherId.value, 'http://localhost:3000/teachers')
  .then(data=>foundTeacher.innerHTML = `Name: ${data.name}, Date of Birth: ${data.birth}, Subject: ${data.teachingSubject}, Experience: ${data.experience}` )
  .catch(err=>foundTeacher.innerHTML = 'There are no registered teachers with given ID')
});



