assignmentName = "";

function goBack () {
    window.history.back();
}

const classworkPopup = (act) => {
    if (act) {
        var pop = document.getElementById("popup-container");
        pop.style.visibility = "visible";
        act.classList.add("active");
        
        var rect = act.getBoundingClientRect();
        var offsetTop = rect.top - 192 + 75 + "px";
        pop.style.top = offsetTop;
        var offsetLeft = rect.right + "px";
        pop.style.left = offsetLeft;


        document.getElementById("cover").style.visibility = "visible";
    }
}

const cancelActive = () => {
    var currentActive = document.querySelector("#rooms a.active");
    var pop = document.getElementById("popup-container");
    pop.style.visibility = "hidden";
    currentActive.classList.remove("active");

    document.getElementById("cover").style.visibility = "hidden";
}



const setActiveAssignment = (assignment) => {
    assignment.classList.add("active");
    
    var name  = document.querySelector("a.active h5").innerHTML.toLowerCase();
    var names = name.split(" ");

    for (let i = 0; i< names.length; i++) {
        names[i] = names[i][0].toUpperCase() + names[i].substr(1);
    }

    assignmentName = names.join(" "); 
    
    
}    

// window.onload = changeAssignmentName = () => {
//     if(document.getElementById("assignmentName")) {
//         document.getElementById("assignmentName").innerHTML = assignmentName;
//         alert(assignmentName);
//     }
// }


// Calendar
const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let displayedMonth = month;
let displayedYear = year;

if (mth_element) {
    mth_element.textContent = months[month] + " " + year;
}
if (selected_date_element) {
    selected_date_element.textContent = formatDate(date);
    selected_date_element.dataset.value = selectedDate;
}

populateDates();



// date_picker_element.addEventListener('click', toggleDatePicker);
if (next_mth_element) {
    next_mth_element.addEventListener('click', goToNextMonth);
}
if (prev_mth_element) {
    prev_mth_element.addEventListener('click', goToPrevMonth);
}
document.addEventListener('click', toggleDatePicker);

function toggleDatePicker (e) {
    if (checkEventPathForClass(e.path, 'selected-date')) {
        dates_element.classList.toggle('active');
    }
    
    if (!checkEventPathForClass(e.path, 'date-picker')) {
        if (dates_element && dates_element.classList.contains('active')) {
            dates_element.classList.toggle('active');
        }
    }

    

    if (document.querySelector('a.active')) {
        
        if (!checkEventPathForClass(e.path, 'room') && !checkEventPathForClass(e.path, 'popup-container')) {    
            cancelActive();
        }
    }

}


function goToNextMonth (e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + " " + year;
    displayedMonth = month;
    displayedYear = year;
    populateDates();
}

function goToPrevMonth (e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + " " + year;
    displayedMonth = month;
    displayedYear = year;
    populateDates();
}

function getNumberOfDaysInMonth (mt, yr) {
    return new Date(yr, mt + 1, 0).getDate();
}


function populateDates () {
    if (days_element) {
        days_element.innerHTML = '';
    

        for (let j = 0; j < (new Date(displayedYear, displayedMonth, 1).getDay()); j++) {
            const day_element = document.createElement('div');
            day_element.classList.add('day');
            day_element.textContent = "";

            days_element.appendChild(day_element);
        }

        for (let i = 0; i < getNumberOfDaysInMonth(displayedMonth, displayedYear); i++) {
            const day_element = document.createElement('div');
            day_element.classList.add('day');
            day_element.textContent = i + 1;

            if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
                day_element.classList.add('selected');
            }

            day_element.addEventListener('click', function () {
                selectedDate = new Date(year, month, (i + 1)); // don't use (year + "-" + (month + 1) + "-" + (i+1)) since it gives one less day for days
                                                                // larger than 9 in months starting with October ????
                selectedDay = i + 1;
                selectedMonth = month;
                selectedYear = year;
            
                selected_date_element.textContent = formatDate(selectedDate);
                selected_date_element.dataset.value = selectedDate;

                populateDates();
            });

            days_element.appendChild(day_element);
        }
    }
}

function checkEventPathForClass (path, selector) {
    for (let i=0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }

    return false;
}

function formatDate (dt) {
    let d = (dt.getDate()).toString();
    let m = (dt.getMonth() + 1).toString();
    let y = dt.getFullYear();

    d = d.length==1 ? 0+d : d;
    m = m.length==1 ? 0+m : m;

   
    return m + " / " + d + " / " + y;
    
}

const nextDate = () => {
    selectedDate.setDate(selectedDate.getDate() + 1);    
    selectedDay = selectedDate.getDate();
    if ((selectedDate.getMonth() - selectedMonth) > 0) {
        goToNextMonth();
    }
    selectedMonth = selectedDate.getMonth();
    if ((selectedDate.getFullYear() - selectedYear) > 0) {
        goToNextMonth();
    }
    selectedYear = selectedDate.getFullYear();
    
    selected_date_element.textContent = formatDate(selectedDate);
    displayedMonth = selectedDate.getMonth();
    displayedYear = selectedDate.getFullYear();
    populateDates();
}

const prevDate = () => {
    selectedDate.setDate(selectedDate.getDate() - 1);    
    selectedDay = selectedDate.getDate();
    if ((selectedDate.getMonth() - selectedMonth) < 0) {
        goToPrevMonth();
    }
    selectedMonth = selectedDate.getMonth();
    if ((selectedDate.getFullYear() - selectedYear) < 0) {
        goToPrevMonth();
    }
    selectedYear = selectedDate.getFullYear();
    
    selected_date_element.textContent = formatDate(selectedDate);
    displayedMonth = selectedDate.getMonth();
    displayedYear = selectedDate.getFullYear();
    populateDates();
}

const todaysDate = () => {
    selectedDate = new Date();
    selectedDay = selectedDate.getDate();
    selectedMonth = selectedDate.getMonth();
    selectedYear = selectedDate.getFullYear();
    selected_date_element.textContent = formatDate(selectedDate);
    displayedMonth = selectedDate.getMonth();
    displayedYear = selectedDate.getFullYear();
    month = selectedMonth;
    year = selectedYear;
    mth_element.textContent = months[selectedMonth] + " " + selectedYear;
    populateDates();
}

// const setDate = () => {
//     y = selectedDate.getFullYear();
//     m = (selectedDate.getMonth() + 1).toString();
//     d = selectedDate.getDate().toString();

//     m = m.length==1 ? 0+m : m;
//     d = d.length==1 ? 0+d : d;

//     document.querySelector('input[type="date"]').value = y + "-" + m + "-" + d; // m + "/" + d + "/" + y;

//     currentTime();
// }

window.onload = currentTime = () => {
    var today = new Date();
    var hour = today.getHours();
    var suffix = " AM";

    if (hour >= 12) {
        suffix = " PM";
        if(hour != 12) {
            hour = hour - 12;
        }
    }

    var min = today.getMinutes().toString();
    min = min.length==1 ? 0+min : min;

    var time = hour + ":" + min + suffix;
    if (document.getElementById("time")) {
        document.getElementById("time").innerHTML = time;
    }

    mytime = setTimeout('currentTime()', 1000);
}