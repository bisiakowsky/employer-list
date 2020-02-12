//fetching employer list
async function getEmployersAsync() {
    let response = await fetch(`http://my-json-server.typicode.com/bisiakowsky/employer-list/employers`);
    let employers = await response.json();
    return employers;
}

//generating table with employers
getEmployersAsync()
    .then(employers => employers.map((emp) => {
        const panel = document.createElement('div')
        panel.classList.add('panel-info')
        document.querySelector('aside').appendChild(panel);
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

        //generating table for choosen employer
        getUserDetails = (id) => {
            document.querySelector('section').innerHTML = '';
            const details = document.createElement('div')
            details.classList.add('employer-details')
            document.querySelector('section').appendChild(details);
            details.innerHTML = `
        <div class="panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">${employers[id].name} ${employers[id].surename}</h3>
                    </div>
                    <div class="panel-body">
                        <p>Name : <input class="employer-detail" id="name" autocomplete="off" onClick="wasClicked(this)" value="${employers[id].name}" ></p>
                        <p>Surename: <input  class="employer-detail" id="surename" autocomplete="off" onClick="wasClicked(this)" value="${employers[id].surename}"></p>
                        <p>Pesel : <input  class="employer-detail" id="pesel" autocomplete="off" onClick="wasClicked(this)" value="${employers[id].pesel}"></p>
                        <p>Email : <input  class="employer-detail" id="email" autocomplete="off" onClick="wasClicked(this)" value="${employers[id].email}"></p>
                        <p>Phone : <input  class="employer-detail" id="phone" autocomplete="off" onClick="wasClicked(this)" value="${employers[id].phone}"></p>
                        <p>Team : <input  class="employer-detail" id="team" autocomplete="off" onClick="wasClicked(this)" value="${employers[id].team}"></p>
                        <p>Job Profile : <input  class="employer-detail" autocomplete="off" onClick="wasClicked(this)" id="profile" value="${employers[id].jobProfile}"></p>
                        <button type="button" class="btn-info" onclick="editUserDetails(${employers[id].id})">Click to Update</button>
                    </div>
        `
        }
    }))

    function wasClicked(e) {
       e.classList.add('clicked')
    }


    const editUserDetails = (id) =>{
        
        const clicked = document.getElementsByClassName('clicked')
        let obj = {}

        for (let i = 0; i < clicked.length; i++) {
            if(clicked[i].value != clicked[i].defaultValue){
                console.log('nie')
                console.log(clicked[i].value)

                obj[clicked[i].id] = clicked[i].value;

            }else{
                console.log('tak')
            }
         
          console.log(obj)
            
        }
        


        if (id === undefined) {
            id = '';
        };
  
        fetch(`http://my-json-server.typicode.com/bisiakowsky/employer-list/employers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    }