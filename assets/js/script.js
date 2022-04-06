var tasks = [];

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
  "6:00 pm",
];
//looping through array to create planner rows
for (let i = 0; i < workDay.length; i++) {
  let hourBlock = $("<div>").addClass("row");
  let hourBlockTime = $("<div>")
    .addClass("col-2 text-center pt-4 border time")
    .text(workDay[i]);
  let hourBlockTask = $("<textarea>").addClass("col-8 text form-control");
  let hourBlockSave = $("<div>").addClass("col-2 text-center pt-3 border btn");
  let saveBtn = $("<button>")
    .addClass("savebtn btn btn-outline-secondary")
    .text("Save");
  $(hourBlockSave).append(saveBtn);
  $(hourBlock).append(hourBlockTime, hourBlockTask, hourBlockSave);
  $(".container").append(hourBlock);
}
