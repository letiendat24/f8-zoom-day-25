const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const checkAll = $("#checkAll");
const checkChild = $$(".child");
const counter = $("#counter");

// console.log(checkChild);

let countResult = 0;
function count() {
    countResult = 0;
    let checkArray = [];
    checkChild.forEach(element => {
        checkArray.push(element.checked);
    });

    checkArray.filter((item) => {
        if (item === true) {
            countResult++;
        }

    })
    counter.textContent = `Đã chọn ${countResult} / ${checkChild.length} dòng`;
    console.log(countResult);

}
checkChild.forEach(item => item.addEventListener('change', count));


function handleCheckAll() {
    if (countResult === 0) {
        checkAll.checked = false;
        checkAll.indeterminate = false;
    } else if (countResult === 10) {
        checkAll.checked = true;
        checkAll.indeterminate = false;
    } else {
        checkAll.checked = false;
        checkAll.indeterminate = true;
    }
    console.log(countResult)
}
checkChild.forEach(item => item.addEventListener('change', handleCheckAll));

checkAll.addEventListener("change", function () {
    if (checkAll.checked) {
        checkChild.forEach((item) => {
            item.checked = true;
            count();
        })
    } else {
        checkChild.forEach((item) => {
            item.checked =false;
            count();
        })
    }

})