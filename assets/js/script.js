var present = "";

//creating a live clock on app using momem
setInterval(() => {
  $("#currentDay")
    .addClass("bg-light text-dark p-2 text-center")
    .text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}, 1000);

//Generating timeblocks for 8hr work day
const workDay = [
  "9:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "1:00 pm",
  "2:00 pm",
  "3:00 pm",
  "4:00 pm",
  "5:00 pm",
];

//looping through array to create planner rows
for (let i = 0; i < workDay.length; i++) {
  let hourBlock = $("<div>").addClass("row");
  let hourBlockTime = $("<div id='hour" + i + "'>")
    .addClass("col-2 text-center pt-4 border time")
    .text(workDay[i]);
  let hourBlockTask = $("<textarea id='text" + i + "'>").addClass(
    "col-8 text form-control pt-4 text-white font-weight-bold text-uppercase"
  );
  let hourBlockSave = $("<div>").addClass("col-2 text-center pt-3 border btn");
  //creating save button for each hourBlock and applying on click event function to save task and send to local storage
  let saveBtn = $("<button id='saveBtn" + i + "'>")
    .addClass("savebtn btn btn-outline-secondary")
    .text("Save")
    .on("click", function () {
      console.log("clicked " + i + "button");
      //capturing timeslot by id eg. hour0 and task details from the respective text area 
      var taskTime = $(`#hour${i}`).attr("id");
      var taskDetail = $(`#text${i}`).val();
      console.log(taskDetail);
      console.log(taskTime);
      //sending to local storage
      localStorage.setItem(taskTime, taskDetail);
    });
  $(hourBlockSave).append(saveBtn);
  $(hourBlock).append(hourBlockTime, hourBlockTask, hourBlockSave);
  $(".container").append(hourBlock);
}

//creating a function to check for current time Hours
var currentHour = function () {
  //using getHours to represent in in 24hr format ie. 9 am = 9 and 5 pm =17
  present = new Date().getHours();
  //console.log(present);
};

//creating function to audit hourBlocks and change bg-color based on the currentHour
var hourBlockAudit = function () {
  //getting present value
  currentHour();
  //setting i to 9 initially to represent 9am 6pm to 18 for if comparision unsing i
  for (let i = 9; i <= 17; i++) {
    //currentHour();
    //present = 10; for testing purposes hard coding present value to ensure the correct bg colors apply
    // pm not reflected when sliced so all pm times will potentially be less than present hr due to 24 hr format
    // console.log(typeof $(`#hour${i}`).text().slice(0,-6));
    // console.log(i);
    // since i was increased to 9 to match 9 am we have to reduce i by 9 to equal the correect textarea id.
    if (i < present) {
      $(`#text${i - 9}`).addClass("bg-danger");
    }
    if (i > present) {
      $(`#text${i - 9}`).addClass("bg-success");
    } else {
      //at this point only option less is i === present
      $(`#text${i - 9}`).addClass("bg-warning");
    }
  }
  console.log(present + " is it time to change color?");
};
//get present time on page load to evaluate rows
hourBlockAudit();
//setting interval for audit function to run every min to evaluate
setInterval(hourBlockAudit, 60000);

//creating function to load task saved in local storage
var loadTasks = function () {
  //for loop to check each timeslot by id and see if there is a matching task to load
  for (let i = 0; i < workDay.length; i++)  {
    //retreiving information from local storage using attr(id) key used to save
    var tasks = localStorage.getItem($(`#hour${i}`).attr("id"));
    console.log(tasks);
    //update text area with task if there is a matching
    $(`#text${i}`).val(tasks);
  }
};
loadTasks();
