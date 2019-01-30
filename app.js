const URL = 'https://www.hatchways.io/api/assessment/students';
let list = document.getElementById('list');
let robot = document.getElementById('robot');

function requestFetch() {
  fetch(URL)
    .then(response => response.json())
    .then(myJson => {
      for (let i of myJson.students) {
        console.log(i);
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var grades = [];
        for (let j = 0; j < i.grades.length; j++) {
          grades.push(Number(i.grades[j]));
        }
        let avg = grades.reduce((acc, grade) => grade + acc) / i.grades.length;
        list.appendChild(ul);
        ul.appendChild(li);
        li.innerHTML = `
                        <div><img class="img" src="${i.pic}"></img></div>
                        <div class="description">
                          <p class="name">${i.firstName} ${i.lastName}</p>
                          <p class="desc">Email: ${i.email}</p>
                          <p class="desc">Company:${i.company}</p>
                          <p class="desc">Skill: ${i.skill}</p>
                          <p class="desc">Average: ${avg.toFixed(2)}</p>
                        </div>
                        
        `;
      }
    });
}

requestFetch();
