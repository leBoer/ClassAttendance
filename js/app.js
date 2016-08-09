/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */


$(function(){
    // The Model
    var model = {
        'students': [
            {
                name: 'Slappy the Frog',
                id: 'Student1',
                daysmissed: 0
            },
            {
                name: 'Lilly the Lizard',
                id: 'Student2',
                daysmissed: 0
            },
            {
                name: 'Paulrus the Walrus',
                id: 'Student3',
                daysmissed: 0
            },
            {
                name: 'Gregory the Goat',
                id: 'Student4',
                daysmissed: 0
            },
            {
                name: 'Adam the Anaconda',
                id: 'Student5',
                daysmissed: 0
            }
        ],
        'days': 12,
        init: function(){
            var t = 0;
            model.students.forEach(function(i){
                model.students[t].daysmissed = model.days;
                t++;
            });
            // Creates the attendance property of the students
            for (i = 0; i < model.students.length; i++){
                model.students[i].attendance = [0,0,0,0,0,0,0,0,0,0,0,0];
            }
        }
    };

    // The View
    var view = {
        init: function() {

            // Listener for toggling checkboxes

            this.render();
            $('input:checkbox').click(function(e){
                octupus.checkCheckbox();
                octupus.calculateDays();
                octupus.updateDays();
                octupus.saveLocal();
            })
        },

        render: function(){
            // Creates the header row
            var studentsObject = octupus.getStudents();
            var days = octupus.getDays();

            $('#studentTable').append('<thead class="tableheader"><tr class="toprow"></tr></thead>');
            $('#studentTable').append('<tbody class="tablebody"/>');
            $('.toprow').append('<th class="name-col">Student Name</th>');

            for(i = 0; i < days; i++){
                $('.toprow').append('<th>' + i + '</th>');
            }
            $('.toprow').append('<th class="missed-col-head">Days Missed-col</th>');

            // Creates the rest of the table
            var t = 0;
            studentsObject.forEach(function(i){
                $('.tablebody').append('<tr class="student" id="student' + t + '"/>');
                $('.student:last').append('<td class="name-col">' + studentsObject[t].name + '');
                for (k = 0; k < days; k++){
                    $('.student:last').append('<td class="attend-col' + t + '"><input type="checkbox" name="chk[' + t + '.' + k + ']"></td>');
                }
                $('.student:last').append('<td class="missed-col" id="' + studentsObject[t].id + '">0</td>');
                t++;
            })
        }
    };

    // The Octupus
    var octupus = {
        init: function(){
            model.init();
            view.init();
            octupus.loadLocal();
            octupus.updateDays();
            octupus.calculateDays();

        },
        getStudents: function(){
            return model.students;
        },
        getDays: function(){
            return model.days;
        },
        updateDays: function(){
            var students = octupus.getStudents();
            $('.missed-col').each(function(i, elem){
                $(elem).text( + students[i].daysmissed);
            })
        },
        calculateDays: function(){
            var students = octupus.getStudents();
            var daysArray = [];
            var total = [];
            var missed = [];
            for(i = 0; i < students.length; i++){
                daysArray[i] = students[i].attendance;
                total[i] = daysArray[i].reduce(function(a, b){
                    missed[i] = a + b;
                    return missed[i];
                },0);
            }
            for(i = 0; i < students.length; i++){
                model.students[i].daysmissed = 12 - missed[i];
            }
        },
        checkCheckbox: function(){
            var students = octupus.getStudents();
            var days = octupus.getDays();

            for(k = 0; k < students.length; k++){
                for(i = 0; i < days; i++){
                    if ($('input[name="chk[' + k + '.' + i + ']"]').is(':checked')){
                        model.students[k].attendance[i] = 1;
                    } else if (!$('input[name="chk[' + k + '.' + i + ']"]').is(':checked')){
                        model.students[k].attendance[i] = 0;
                    }
                }
            }
        },
        saveLocal: function(){
            var students = octupus.getStudents();
            console.log(students);
            localStorage.setItem('students', JSON.stringify(students));
            //var test = localStorage.getItem('students');
            //console.log('test', JSON.parse(test));

        },
        loadLocal: function () {
            //var retrievedObject = localStorage.getItem('students');
            var test = JSON.parse(localStorage.students);
            console.log(test);
            model.students = test;
            console.log(model.students);
            octupus.populateChecks();
        },
        populateChecks: function(){
            var students = octupus.getStudents();
            var days = octupus.getDays();
            for(k = 0; k < students.length; k++){
                for(i = 0; i < days; i++){
                    if (model.students[k].attendance[i] = 1){
                        $('input[name="chk[' + k + '.' + i + ']"]').attr('checked',true);
                        console.log('true');
                    } else if (model.students[k].attendance[i] = 0){
                        $('input[name="chk[' + k + '.' + i + ']"]').attr('checked', false);
                        console.log("false");
                    }
                }
            }
        }
    };
    octupus.init();

});





//(function() {
//    if (!localStorage.attendance) {
//        console.log('Creating attendance records...');
//        function getRandom() {
//            return (Math.random() >= 0.5);
//        }
//
//        var nameColumns = $('tbody .name-col'),
//            attendance = {};
//
//        nameColumns.each(function() {
//            var name = this.innerText;
//            attendance[name] = [];
//
//            for (var i = 0; i <= 11; i++) {
//                attendance[name].push(getRandom());
//            }
//        });
//
//        localStorage.attendance = JSON.stringify(attendance);
//    }
//}());


///* STUDENT APPLICATION */
//$(function() {
//    var attendance = JSON.parse(localStorage.attendance),
//        $allMissed = $('tbody .missed-col'),
//        $allCheckboxes = $('tbody input');
//
//    // Count a student's missed days
//    function countMissing() {
//        $allMissed.each(function() {
//            var studentRow = $(this).parent('tr'),
//                dayChecks = $(studentRow).children('td').children('input'),
//                numMissed = 0;
//
//            dayChecks.each(function() {
//                if (!$(this).prop('checked')) {
//                    numMissed++;
//                }
//            });
//
//            $(this).text(numMissed);
//        });
//    }
//
//    // Check boxes, based on attendace records
//    $.each(attendance, function(name, days) {
//        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//            dayChecks = $(studentRow).children('.attend-col').children('input');
//
//        dayChecks.each(function(i) {
//            $(this).prop('checked', days[i]);
//        });
//    });
//
//    // When a checkbox is clicked, update localStorage
//    $allCheckboxes.on('click', function() {
//        var studentRows = $('tbody .student'),
//            newAttendance = {};
//
//        studentRows.each(function() {
//            var name = $(this).children('.name-col').text(),
//                $allCheckboxes = $(this).children('td').children('input');
//
//            newAttendance[name] = [];
//
//            $allCheckboxes.each(function() {
//                newAttendance[name].push($(this).prop('checked'));
//            });
//        });
//
//        countMissing();
//        localStorage.attendance = JSON.stringify(newAttendance);
//    });
//
//    countMissing();
//}());
