import {LMS} from './lms.mjs';

class Pupils extends LMS{

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
        addCell(row, item.gender);
    });
  };

  async findOne(id=0, url=''){
    const response = await fetch(url + `/${id}`);
    if(response.status !== 200){
      throw new Error('could not fetch data');
    }
  
    const data = await response.json();
    return data;
  }

}



const pupil = new Pupils();


  const pupilName  = document.getElementById('name');
  const birthday = document.getElementById('birth');
  const pupilGender = document.getElementById('gender');
  const subBtn = document.getElementById('sub');
  const table = document.querySelector('.pupilsTable');
  const readData = document.querySelector('.read');
  const update = document.querySelector('.update');
  const del = document.querySelector('.del');
  const pupilId = document.getElementById('pupilId');
  const findBtn = document.getElementById('find');
  const found = document.getElementById('foundPupil');
  const idToUpdate = document.getElementById('idToUpdate');
  const idToDelete = document.getElementById('idToDelete');
  const updatedName = document.getElementById('updatedName');
  const updatedBirth = document.getElementById('updatedBirth');
  const updatedGender = document.getElementById('updatedGender');
  
  subBtn.addEventListener('click', (event)=>{
    event.preventDefault();
     pupil.postData('http://localhost:3000/pupils', {name:pupilName.value, birth:birthday.value, gender:pupilGender.value})
      .then(data=>console.log(data))
      .catch(err=>console.log(err.message));
  
  });
  
  readData.addEventListener('click', ()=>{
   pupil.getData('http://localhost:3000/pupils')
    .then(data=>pupil.populateTable(data))
    .catch(err=>console.log(err.message))
  });
  
  findBtn.addEventListener('click', ()=>{
    let id = Number(pupilId.value);
    pupil.findOne(id, 'http://localhost:3000/pupils')
    .then(data=>found.innerHTML = `Name: ${data.name}, Date of Birth: ${data.birth}, Gender: ${data.gender}` )
    .catch(err=>found.innerHTML = 'There are no registered pupils with given ID')
  });
  
  
  update.addEventListener('click', ()=>{
    const id = Number(idToUpdate.value);
    pupil.updateData(`http://localhost:3000/pupils/${id}`, {name:updatedName.value, birth: updatedBirth.value, gender:updatedGender.value})
    .then(getData('http://localhost:3000/pupils'))
    .catch(err=>console.log(err.message));
  });
  
  del.addEventListener('click', ()=>{
    const id = Number(idToDelete.value);
    pupil.deleteData(`http://localhost:3000/pupils/${id}`)
    .then(getData('http://localhost:3000/pupils'))
    .catch(err=>console.log(err.message));
  });
  





