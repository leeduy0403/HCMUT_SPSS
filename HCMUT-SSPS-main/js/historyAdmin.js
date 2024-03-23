conf = sharedConfig

filter_history = admin_history

// console.log(filter_history)

function split_IDs(str) {

    arr = []

    if (str != "")
        arr = str.split(",")
    
    for (idx in arr)
        arr[idx] = arr[idx].replace(/\s+/g, '') 

    return arr
}

function all_IDs(str){
    let ids = []

    for (ele of admin_history) {
        id = ele[str]
        if (ids.includes(id) == false)
            ids.push(id)
    }

    return ids
}


function filter() {
    const filter = document.getElementById("filter-button");
    const stuStr = document.getElementById("student-filter");
    const printStr = document.getElementById("printer-filter");

    filter_history = []
    
    let students = split_IDs(stuStr.value)
    if (students.length == 0)
        students = all_IDs("studentID")
    let printers = split_IDs(printStr.value)
    if (printers.length == 0)
        printers = all_IDs("printer_num")

    // console.log(students)
    // console.log(printers)

    // for (ele of admin_history) {
    //     if (!students.includes(ele.studentID) || !printers.includes(ele.printer_num))
    //         filter_history.push(ele)
    // }

    filter_history = admin_history.filter(ele => students.includes(ele.studentID) && printers.includes(ele.printer_num))
    render_admin_history(filter_history, months)

    // console.log(filter_history)

    // table = document.getElementById('admin_history_table') ? document.getElementById('admin_history_table') : null;
    // if (!table) return;

    // var addEle = '';
    // filter_history.map((item) => {
    //     addEle += '<div class="orders-status-table-row">'
    //     addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283433-4528342e" class="flex align-center"><div class="paragraph-small color-neutral-100">' +
    //                 + item.pid
    //                 + '</div> </div>'
    //     addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283446-4528342e"> <div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283447-4528342e" class="paragraph-small color-neutral-100 mg-bottom-2px">'
    //                 + item.printer_num
    //                 + '</div>'
    //                 + '<div class="paragraph-small">' + item.venue + '</div>'
    //                 + '</div>'
    //     addEle += '<div class="paragraph-small color-neutral-100">' + item.studentID + '</div>'
    //     addEle += '<div class="paragraph-small color-neutral-100">' + item.time + '</div>'
    //     addEle += '<div class="paragraph-small color-neutral-100">' + item.date + '</div>'
    //     addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283455-4528342e">'
    //                 + '<div><div class="status-badge '+ (item.status == 'Completed'? 'green':'red') + '"><div class="flex align-center gap-column-4px"><div class="small-dot _4px bg-'+ (item.status == 'Completed'? 'green':'red') + '-300"></div>'
    //                 + '<div class="paragraph-small">' + item.status + '</div>'
    //                 + '</div></div></div></div>'
        
    //     addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283466-4528342e"  class="paragraph-small color-neutral-100">' + item.printed + '</div>'
    //     addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a2624528346c-4528342e" class="flex align-center gap-column-6px"> </div>'
    //     addEle += '</div>'
    // })

    // table.innerHTML = addEle;
}


var month_admin = [];
var printer_admin = [];
var months = month_admin

var getMonth_Printer = (history) => {
    history.map((item) => {
        var date = item.date;
        let month_name = date.substr(0, 3) + ' ' + date.substr(8, 12)
        if (!month_admin.includes(month_name)) month_admin.push(month_name);

        var printer = item.printer_num;
        if (!printer_admin.includes(printer)) printer_admin.push(printer);
    })
}
getMonth_Printer(admin_history);

current_history = admin_history;


var render_monthsort_menu = (month_list) => {
    const div = document.getElementById('admin-sort-by-month') ? document.getElementById('admin-sort-by-month') : null;
    if (!div) return;

    var addEle = '<a href="#" class="small-dropdown-link w-dropdown-link admin-month-sort">' + 'All' + '</a>'
    month_list.map((month) => {
        addEle += '<a href="#" class="small-dropdown-link w-dropdown-link admin-month-sort">' + month + '</a>'
    })

    div.innerHTML = addEle;
}
render_monthsort_menu(month_admin)



var render_printersort_menu = (printer_list) => {
    const div = document.getElementById('admin-sort-by-printer') ? document.getElementById('admin-sort-by-printer') : null;
    if (!div) return;

    var addEle = '<a href="#" class="small-dropdown-link w-dropdown-link admin-printer-sort">' + 'All' + '</a>'
    printer_list.map((printer) => {
        addEle += '<a href="#" class="small-dropdown-link w-dropdown-link admin-printer-sort">' + printer + '</a>'
    })

    div.innerHTML = addEle;
}
render_printersort_menu(printer_admin)


function admin_sort () {
    const month_ele = document.getElementsByClassName('admin-month-sort') ? document.getElementsByClassName('admin-month-sort') : null;
    if (!month_ele) return;

    

    for (let i = 0; i < month_ele.length; i++) {
        month_ele[i].addEventListener('click', function (event) {
            months = month_admin;

            month_text = event.target.innerText;
            const month_menu = document.getElementById('monthsort-menu') ? document.getElementById('monthsort-menu') : null;
            if (month_menu)  month_menu.innerText = month_text;

            if (month_text == 'All' || month_text == 'Sort by month') months = month_admin;
            else months = [month_text];

            render_admin_history(filter_history, months)
        })
    }
}
admin_sort()

function render_admin_history (history, months) {
    table = document.getElementById('admin_history_table') ? document.getElementById('admin_history_table') : null;
    if (!table) return;

    tmp = history.filter(ele => months.includes(ele.date.substr(0, 3) + ' ' + ele.date.substr(8, 12)))
    


    var addEle = '';
    tmp.map((item) => {
        addEle += '<div class="orders-status-table-row">'
        addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283433-4528342e" class="flex align-center"><div class="paragraph-small color-neutral-100">' +
                    + item.pid
                    + '</div> </div>'
        addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283446-4528342e"> <div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283447-4528342e" class="paragraph-small color-neutral-100 mg-bottom-2px">'
                    + item.printer_num
                    + '</div>'
                    + '<div class="paragraph-small">' + item.venue + '</div>'
                    + '</div>'
        addEle += '<div class="paragraph-small color-neutral-100">' + item.studentID + '</div>'
        addEle += '<div class="paragraph-small color-neutral-100">' + item.time + '</div>'
        addEle += '<div class="paragraph-small color-neutral-100">' + item.date + '</div>'
        addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283455-4528342e">'
                    + '<div><div class="status-badge '+ (item.status == 'Completed'? 'green':'red') + '"><div class="flex align-center gap-column-4px"><div class="small-dot _4px bg-'+ (item.status == 'Completed'? 'green':'red') + '-300"></div>'
                    + '<div class="paragraph-small">' + item.status + '</div>'
                    + '</div></div></div></div>'
        
        addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283466-4528342e"  class="paragraph-small color-neutral-100">' + item.printed + '</div>'
        addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a2624528346c-4528342e" class="flex align-center gap-column-6px"> </div>'
        addEle += '</div>'
    })

    table.innerHTML = addEle;
}

// console.log(admin_history)
// console.log(month_admin)
render_admin_history(admin_history, month_admin);


// var render_admin_history = (history, month = '', year = '', printer = '') => {
//     table = document.getElementById('admin_history_table') ? document.getElementById('admin_history_table') : null;
//     if (!table) return;

//     var addEle = '';
//     history.map((item) => {

//         if ((month == '' && year == '' && printer == '') 
//             || (month == item.date.substr(0, 3) && year == item.date.substr(8, 12) && printer == '') 
//             || (month == item.date.substr(0, 3) && year == item.date.substr(8, 12) && printer == item.printer_num)
//             || (month == '' && year == '' && printer == item.printer_num)) {
//             addEle += '<div class="orders-status-table-row">'
//             addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283433-4528342e" class="flex align-center"><div class="paragraph-small color-neutral-100">' +
//                         + item.pid
//                         + '</div> </div>'
//             addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283446-4528342e"> <div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283447-4528342e" class="paragraph-small color-neutral-100 mg-bottom-2px">'
//                         + item.printer_num
//                         + '</div>'
//                         + '<div class="paragraph-small">' + item.venue + '</div>'
//                         + '</div>'
//             addEle += '<div class="paragraph-small color-neutral-100">' + item.studentID + '</div>'
//             addEle += '<div class="paragraph-small color-neutral-100">' + item.time + '</div>'
//             addEle += '<div class="paragraph-small color-neutral-100">' + item.date + '</div>'
//             addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283455-4528342e">'
//                         + '<div><div class="status-badge '+ (item.status == 'Completed'? 'green':'red') + '"><div class="flex align-center gap-column-4px"><div class="small-dot _4px bg-'+ (item.status == 'Completed'? 'green':'red') + '-300"></div>'
//                         + '<div class="paragraph-small">' + item.status + '</div>'
//                         + '</div></div></div></div>'
            
//             addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a26245283466-4528342e"  class="paragraph-small color-neutral-100">' + item.printed + '</div>'
//             addEle += '<div id="w-node-ffe664cd-effd-fb9f-b3b2-a2624528346c-4528342e" class="flex align-center gap-column-6px"> </div>'
//             addEle += '</div>'
//         }
//     })

//     table.innerHTML = addEle;
// }
// render_admin_history(admin_history);


// var admin_sort = (history) => {
//     const month_ele = document.getElementsByClassName('admin-month-sort') ? document.getElementsByClassName('admin-month-sort') : null;
//     if (!month_ele) return;
//     const printer_ele = document.getElementsByClassName('admin-printer-sort') ? document.getElementsByClassName('admin-printer-sort') : null;
//     if (!printer_ele) return;

//     for (let i = 0; i < month_ele.length; i++) {
//         month_ele[i].addEventListener('click', function (event) {
//             month_text = event.target.innerText;
//             const month_menu = document.getElementById('monthsort-menu') ? document.getElementById('monthsort-menu') : null;
//             if (month_menu)  month_menu.innerText = month_text;

//             // const printer_menu = document.getElementById('printersort-menu') ? document.getElementById('printersort-menu') : null;
//             // if (printer_menu)  printer_text = printer_menu.innerText;
//             printer_text = 'All';

//             if ((month_text == 'All' || month_text == 'Sort by month') && (printer_text == 'All' || printer_text == 'Sort by printer'))
//                 render_admin_history(history);
//             else if (month_text == 'All' || month_text == 'Sort by month')
//                 render_admin_history(history, '', '', printer_text);
//             else if (printer_text == 'All' || printer_text == 'Sort by printer')
//                 render_admin_history(history, month_text.substr(0, 3), month_text.substr(4, 8), '');                
//             else render_admin_history(history, month_text.substr(0, 3), month_text.substr(4, 8), printer_text);
//         })
//     }

//     for (let i = 0; i < printer_ele.length; i++) {
//         printer_ele[i].addEventListener('click', function (event) {
//             printer_text = event.target.innerText;
//             const printer_menu = document.getElementById('printersort-menu') ? document.getElementById('printersort-menu') : null;
//             if (printer_menu)  printer_menu.innerText = printer_text;

//             const month_menu = document.getElementById('monthsort-menu') ? document.getElementById('monthsort-menu') : null;
//             if (month_menu)  month_text = month_menu.innerText;


//             if ((month_text == 'All' || month_text == 'Sort by month') && (printer_text == 'All' || printer_text == 'Sort by printer'))
//                 render_admin_history(history);
//             else if (month_text == 'All' || month_text == 'Sort by month')
//                 render_admin_history(history, '', '', printer_text);
//             else if (printer_text == 'All' || printer_text == 'Sort by printer')
//                 render_admin_history(history, month_text.substr(0, 3), month_text.substr(4, 8), '');                
//             else render_admin_history(history, month_text.substr(0, 3), month_text.substr(4, 8), printer_text);
//         })
//     }


// }
// admin_sort(admin_history)


