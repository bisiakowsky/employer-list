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
                        <p>Name : ${employers[id].name}</p>
                        <p>Surename: ${employers[id].surename}</p>
                        <p>Pesel : ${employers[id].pesel}</p>
                        <p>Email : ${employers[id].email}</p>
                        <p>Phone : ${employers[id].phone}</p>
                        <p>Team : ${employers[id].team}</p>
                        <p>Job Profile : ${employers[id].jobProfile}</p>
                    </div>
        `
        }
    }))