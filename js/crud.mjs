export class CRUD {
    constructor(){
        
    };

    async postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if(response.status !== 201){
          throw new Error('could not post data');
        }
        const resData = await response.json();
    
      return resData;
      }
    
    async getData(url=''){
      const response = await fetch(url);
      if(response.status !== 200){
        throw new Error('could not fetch data');
      }
    
      const data = await response.json();
      return data;
    }

    async findOne(id=0, url=''){
      const response = await fetch(url + `/${id}`);
      if(response.status !== 200){
        throw new Error('could not fetch data');
      }
    
      const data = await response.json();
      return data;
    }
    
    async updateData(url='', data={}) {
     
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    
      if(response.status !== 200){
        throw new Error('could not fetch data');
      }
       
      const resData = await response.json();
    
      return resData;
    }
    
    async deleteData(url=''){
    
       fetch(url, { method: 'DELETE' });
       if(response.status !== 200){
        throw new Error('could not fetch data');
      }
    }
    
   
}

