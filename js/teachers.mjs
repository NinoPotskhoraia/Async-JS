import {LMS} from './lms.mjs';

class Teachers extends LMS{
    
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
        addCell(row, item.name);
        addCell(row, item.birth);
        addCell(row, item.teachingSubject);
        addCell(row, item.experience);
    });
  }

  async findOne(id=0, url=''){
    const response = await fetch(url + `/${id}`);
    if(response.status !== 200){
      throw new Error('could not fetch data');
    }
  
    const data = await response.json();
    return data;
  }


}


const teacher = new Teachers();

const teacherName  = document.getElementById('name');
const birthDay = document.getElementById('birth');
const teaching = document.getElementById('teaching');
const years = document.getElementById('years');
const subBtn = document.getElementById('sub');
const table = document.querySelector('.teachersTable');
const readData = document.querySelector('.read');
const update = document.querySelector('.update');
const del = document.querySelector('.del');
const teacherId = document.getElementById('teacherId');
const findBtn = document.getElementById('findTeacher');
const found = document.getElementById('foundTeacher');
const idToUpdate = document.getElementById('idToUpdate');
const idToDelete = document.getElementById('idToDelete');
const updatedName = document.getElementById('updatedName');
const updatedBirth = document.getElementById('updatedBirth');
const updatedTeaching = document.getElementById('updatedTeach');
const updatedYears = document.getElementById('updatedYears');

subBtn.addEventListener('click', (event)=>{
  event.preventDefault();
   teacher.postData('http://localhost:3000/teachers', {name:teacherName.value, birth:birthDay.value, teachingSubject:teaching.value, experience:years.value })
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message));

});

readData.addEventListener('click', ()=>{
 teacher.getData('http://localhost:3000/teachers')
  .then(data=>teacher.populateTable(data))
  .catch(err=>console.log(err.message))
});

findBtn.addEventListener('click', ()=>{
  let id = Number(teacherId.value);
  teacher.findOne(id, 'http://localhost:3000/teachers')
  .then(data=>found.innerHTML = `Name: ${data.name}, Date of Birth: ${data.birth}, Subject: ${data.teachingSubject}, Experience: ${data.experience}`)
  .catch(err=>found.innerHTML = 'There are no registered teachers with given ID')
})


update.addEventListener('click', ()=>{
  const id = Number(idToUpdate.value);
  teacher.updateData(`http://localhost:3000/teachers/${id}`, {name:updatedName.value, birth: updatedBirth.value, teachingSubject:updatedTeaching.value, experience:updatedYears.value})
  .then(getData('http://localhost:3000/teachers'))
  .catch(err=>console.log(err.message));
});

del.addEventListener('click', ()=>{
  const id = Number(idToDelete.value);
  teacher.deleteData(`http://localhost:3000/teachers/${id}`)
  .then(getData('http://localhost:3000/teachers'))
  .catch(err=>console.log(err.message));
});

