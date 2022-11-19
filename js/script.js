
// variables 
console.log(data);
const studentList = document.querySelector('.student-list');
const searchField = document.querySelector('.header');
const studentData = data;


// function to create pages and lists of students from data.js file 
function showPage(list, page) {
  let startIndex = (page * 9) - 9;
  let endIndex = page * 9;
  studentList.innerHTML = ''; 
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         // HTML for students
         let studentItem = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
           <h3>${list[i]["name"].first} ${list[i]["name"].last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i]["registered"].date}</span>
         </div>
       </li>`;
       studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
 }



// function to create pagination for the student list
function addPagination(list) {
     // amount per page
     let numOfPages = Math.ceil( list.length / 9);
     let linkList = document.querySelector('.link-list');
     linkList.innerHTML = '';
     for ( let i = 1; i <= numOfPages; i++) {
       let button = `
       <li>
         <button type="button">${i}</button>
       </li>
       `;
       linkList.insertAdjacentHTML('beforeend', button);
     }
     // shows which page button is active
     let buttonClass = document.querySelector('button');
     buttonClass.className = 'active';

     linkList.addEventListener('click', (e) => {
      if ( e.target.getAttribute('type') === 'button') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         let text = e.target.textContent;
         showPage(data, text);
      }
     });
 }


// Call functions
showPage(data, 1);
addPagination(data);

// function to create and utilize the search bar

function searchStudents() {
   // search bar HTML
   const searchBar = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   // append bar
   searchField.insertAdjacentHTML('beforeend', searchBar)
   // event listener for searching plus results
   const searching = document.getElementById('search')
   searching.addEventListener('keyup', (e) => {
      let matches = []
      for (const student of studentData) {
         const fullName = `${student.name.first} ${student.name.last}`.toLowerCase()
         if (fullName.includes(searching.value.toLowerCase())) {
            matches.push(student)
         }
      }
      showPage(matches, 1);
      addPagination(matches);
      // showing "no results"
      if (matches.length === 0) {
         studentList.insertAdjacentHTML('beforeend', `<h1>No Results</h1>`)
      }
   })
}
searchStudents();