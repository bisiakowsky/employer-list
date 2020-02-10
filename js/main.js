//fetching employer list
async function getUserAsync() 
{
  let response = await fetch(`http://my-json-server.typicode.com/bisiakowsky/employer-list/employers`);
  let employers = await response.json();
  return employers;
}

//generating table with employers
getUserAsync()
  .then(employers => employers.map((emp) => {
      const panel = document.createElement('div')
      panel.classList.add('panel-info')
    document.querySelector("aside").appendChild(panel);
    panel.innerHTML = `
    <div class="panel-heading">
                    <h3 class="panel-title">${emp.name} ${emp.surename}</h3>
                </div>
                <div class="panel-body">
                    <p>${emp.email}</p>
                    <p>${emp.phone}</p>
                    <button type="button" class="btn-info" onclick="getUserDetails(${emp.id})">Click to View Details</button>
                </div>
    `
   })); 

//generating table for choosen employer


   const  getUserDetails = (id) => {
    console.log(id)
    return "Hello World!";
  }
