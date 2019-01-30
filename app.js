const URL = 'https://www.hatchways.io/api/assessment/students';
let list = document.getElementById('list');
fetch(URL)
  .then(response => response.json())
  .then(myJson => {
    for (let i of myJson.students) {
      // console.log(i);
      let ul = document.createElement('ul');
      let li = document.createElement('li');
      let grades = [];
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
                          <p class="desc">Average: ${avg.toFixed(2)}%</p>
                          <div class="plus accordion" onmouseover="toggleAccordion()">  
                        </div>
                        <div class="panel">
                          <p class="desc">Test1: ${grades[0]}%</p>
                          <p class="desc">Test2: ${grades[1]}%</p>
                          <p class="desc">Test3: ${grades[2]}%</p>
                          <p class="desc">Test4: ${grades[3]}%</p>
                          <p class="desc">Test5: ${grades[4]}%</p>
                          <p class="desc">Test6: ${grades[5]}%</p>
                          <p class="desc">Test7: ${grades[6]}%</p>
                          <p class="desc">Test8: ${grades[7]}%</p>

                          <div  id="" class="tags-box">

                          </div>
                          <div class="input-box">
                            <input type="text" id="" class="desc input input-tag" onkeypress="addTag()" value="" placeholder="Add tag" />
                          </div>   
                        </div>
                                      
                      </div>                  
        `;
    }
  });

function search() {
  let input = document.getElementById('input');
  let filter = input.value.toUpperCase(); // I spent almost 2 hours strugling with because thar I forgot parentesis
  let li = document.getElementsByTagName('li');
  let name, textValue;
  for (let l of li) {
    // console.log(i);
    name = l.getElementsByTagName('p')[0];
    console.log(name.textContent);
    if (name.textContent.toUpperCase().indexOf(filter) > -1) {
      l.style.display = '';
    } else {
      l.style.display = 'none';
    }
  }
}
// function searchTag() {
//   let input = document.getElementById('input');
//   let filter = input.value.toUpperCase(); // I spent almost 2 hours strugling with because thar I forgot parentesis
//   let li = document.getElementsByTagName('li');
//   let name, textValue;
//   for (let l of li) {
//     // console.log(i);
//     name = l.getElementsByTagName('p')[0];
//     console.log(name.textContent);
//     if (name.textContent.toUpperCase().indexOf(filter) > -1) {
//       l.style.display = '';
//     } else {
//       l.style.display = 'none';
//     }
//   }
// }

function addTag() {
  let inputTag = document.getElementsByClassName('input-tag');
  let getValue = '';

  for (let i = 0; i < inputTag.length; i++) {
    console.log(inputTag.length);
    inputTag[i].addEventListener('keypress', function(event) {
      if (event.which === 13) {
        getValue = this.value;
        this.value = '';

        if (getValue.length > 0) {
          let tags = document.getElementsByClassName('tags-box');
          let span = document.createElement('span');
          tags[i].appendChild(span);
          span.innerHTML = getValue;
          getValue = '';
        }
      }
    });
  }
}

function toggleAccordion() {
  let acc = document.querySelectorAll('.accordion');

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function() {
      let panel = acc[i].nextElementSibling;
      this.classList.toggle('active');
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }
}
