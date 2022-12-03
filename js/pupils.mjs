import {CRUD} from './crud.mjs';

const pupilName  = document.getElementById('name');
const birthday = document.getElementById('birth');
const pupilGender = document.getElementById('gender');
const pupilsTable = document.querySelector('.pupilsTable');
const pupilId = document.getElementById('pupilId');
const findPupil = document.getElementById('findPupil');
const foundPupil = document.getElementById('foundPupil');
const pupilForm = document.querySelector('.pupil-form');

class Pupils extends CRUD{

  populateTable(data){
     
    
    // helper function        
    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
  
    // insert data
    data.forEach(item => {
        var row = pupilsTable.insertRow();
        addCell(row, item.id);
        addCell(row, item.name);
        addCell(row, item.birth);
        addCell(row, item.gender);
        const del = document.createElement('button');
        del.innerHTML = '<i class="fa-solid fa-trash"></i>';
        row.appendChild(del);
        del.addEventListener('click',()=>{
          pupil.deleteData(`http://localhost:3000/pupils/${item.id}`)
          .then(getData())
          .catch(err=>console.log(err.message));
        })
    });
  };



}



const pupil = new Pupils();




  window.addEventListener('load', ()=>{
    pupil.getData('http://localhost:3000/pupils')
    .then(data=>{pupil.populateTable(data);
    console.log(data);})
    .catch(err=>console.log(err.message));
    console.log('hi');
  })
  
  pupilForm.addEventListener('submit', ()=>{
    if(pupilName.value && birthday.value){
      pupil.postData('http://localhost:3000/pupils', {name:pupilName.value, birth:birthday.value, gender: pupilGender.value})
      .then(data=>console.log(data))
      .catch(err=>console.log(err.message));}

  })
  

  
  findPupil.addEventListener('click', ()=>{
    pupil.findOne(pupilId.value, 'http://localhost:3000/pupils')
    .then(data=>foundPupil.innerHTML = `Name: ${data.name}, Date of Birth: ${data.birth}, Gender: ${data.gender}` )
    .catch(err=>foundPupil.innerHTML = 'There are no registered pupils with given ID')
  });
  
  
  
  
  
  





