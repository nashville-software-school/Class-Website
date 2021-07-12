
// initialize the tool-tip plugin for Bootstrap4
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//DEFINE SHUFFLE FUNCTION
const shuffle = (arr) => {
  //start at the end of the list...
  let currentIndex = arr.length, holdThisForASec, numberOutOfAHat;
  //as long as there are still more to choose from...
  while (0 !== currentIndex) {
      //get a random index, rounding down
      //bc math.random produces an int between 0 & 1.
      numberOutOfAHat = Math.floor(Math.random() * currentIndex);
      //decrement
      currentIndex -= 1;
      //let's say our current index is 25 right now
      // store the value of the object at index 25 in the var tempvalue
      holdThisForASec = arr[currentIndex];
      //then you can set the val of the object at the current index position
      //equal to the val of the object at the random index position
      arr[currentIndex] = arr[numberOutOfAHat];
      //then we can se the val of the object that used to be at our random index
      //equal to the value of the object at index 25 which we stored in the temp var
      arr[numberOutOfAHat] = holdThisForASec;
      // and we'll keep switchin em around until we get to index 0,
  }
  //then return the array!
  return arr;
}

$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort;
  data = shuffle(data)
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.personalwebsite != null) {

      studentContact += `<a href=${item.personalwebsite} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != null) {

      studentContact += `<a href=${item.linkedin} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div class="col-md-3 cohortMems">
          // <img class="card-img-top" src="images/classmates/${item.proImg}" alt="${item.name}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <div class="card-body">
            <h4 class="card-title title-font">${item.name}</h4>`
    //if student didn't provide a reelthemin quote then nothing is displayed
    if (item.funfact != null) {
      studentInfo += `<p class="card-text">${item.funfact}</p>`
    }
    studentInfo += studentContact

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if(item.bio != null){

    studentInfo += `
            <center><button type="button" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortMember${item.id}">
           Learn More!
          </button></center>
          </div>
        </div>`
    //modal info
    studentInfo +=`
        <div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
           <h5 class="modal-title title-font" id="cohortMember${item.id}Label">${item.name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            // <center><img src="images/classmates/${item.funImg}" alt="${item.name} fun"/></center><br>

            `

    studentInfo += studentContact


    studentInfo += `
      
    ${item.bio}
    </div>
    <center><button type="button" data-dismiss="modal" class="backButton btn btn-outline-primary title-font bottom" aria-label="Close">
      Back
              </button></center>
            
          </div >
        </div >
      </div > `;
    } else {
      studentInfo += `
      </div>
        </div>
        `
    }
    document.getElementById("cohort").innerHTML += studentInfo;

  });
};


$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-sm-2 technologies">
         <center><a href="${item.link}" target="_blank"><img class="techs" src="images/techs/${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
};


const getJoke = () => {
  return fetch("https://icanhazdadjoke.com/", {
    method: "Get",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json())
  //*  BELOW NOT NEEDED if not using parsed data
  .then(parsedResponse => {
      console.log(parsedResponse);
      return parsedResponse;
  })
};

const Joke = (jokeObject) => {
  return `
      <section class="joke">
       
            <h2>${jokeObject.joke}</h2>
        
      </section>
    `;
};
const dadJoke = () => {
  const postElement = document.querySelector(".joke");
  getJoke().then(joke => {
      
      postElement.innerHTML = Joke(joke);
  });
}
document.querySelector(".joke-button")
.addEventListener("click", dadJoke);