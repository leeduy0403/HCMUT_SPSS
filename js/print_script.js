// file_valid = 0;  // 0: not uploaded, -1: wrong type of files 1: uploaded

conf = sharedConfig


const toggleVisibility = () => {
    const selectElement = document.getElementById('selectMenu');
    const selectedOptionValue = selectElement.value;

    const divElement = document.getElementById('custom_field');


    if (selectedOptionValue === 'Custom') {
        // console.log('custom');
        divElement.style.display = 'flex';
    } else {
        // console.log('no-custom');
        divElement.style.display = 'none';
    }
}



const checkPrinting = async () => {
    const selectElement = document.getElementById('fileInput');

    const fileInput = document.getElementById('fileInput');
    let fileName = '';

    // Check if files were selected
    if (fileInput.files.length > 0) {
        const uploadedFile = fileInput.files[0];
        fileName = uploadedFile.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();

        if (fileExtension === 'pdf' ||
            fileExtension === 'docx' || fileExtension === 'doc' ||
            fileExtension === 'pptx' || fileExtension === 'ppt' ||
            fileExtension === 'xlsx' || fileExtension === 'xls' ||
            fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
            console.log('valid file')  

            var reader = new FileReader();
            let pagesCount = 0;

            reader.readAsBinaryString(fileInput.files[0]);
            reader.onloadend = (pagesCount) => {
                pagesCount = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                console.log(`Not enough paper (${pagesCount} pages > ${conf.current_paper} pages)`);
                
                if (pagesCount > conf.current_paper)
                    openCustomAlert(2, 12)
                else openCustomConfirm(1)
            }                
            
        } else {
            // file_valid = -1
            openCustomAlert(-1)
            // console.log('invalid file')
        }
    } else {
        openCustomAlert(0)
        console.log('no file')
    }        
}

function openCustomAlert(file_valid, pages = 0) {
    const modal = document.getElementById('customAlert');
    const overlay = document.getElementById('modalOverlay');
    const pEle = document.getElementById('pEle-alert');

    modal.style.display = 'block';
    overlay.style.display = 'block';


    console.log(conf.current_paper)

    if (file_valid === 0) pEle.textContent  = 'Your file has not been uploaded!';
    else if (file_valid === -1) pEle.textContent  = 'Please upload a valid file!';
    else if (file_valid === 2) pEle.textContent  = `Need ${pages - conf.current_paper} more pages to print`;
}


function closeCustomAlert() {
    // Hide the modal and overlay
    const modal = document.getElementById('customAlert');
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}


function openCustomConfirm(fileName) {
    const modal = document.getElementById('customConfirm');
    const overlay = document.getElementById('modalOverlay');

    const content = document.getElementById('confirm-content');
    


    const pages = document.getElementById('confirm-pages');
    const copies = document.getElementById('confirm-copies');
    const layout = document.getElementById('confirm-layout');
    const paper = document.getElementById('confirm-paper');
    const printer = document.getElementById('confirm-printer');
    const file = document.getElementById('confirm-file');


    modal.style.display = 'block';
    overlay.style.display = 'block';


    content.innerHTML = '<div id="confirm-pages" class="cofirm-text"><b>Pages:   </b><em>' + 
                            document.getElementById('selectMenu').value + '</em></div>';
    content.innerHTML += '<div id="confirm-copies" class="cofirm-text"><b>Copies     :   </b><em>' + 
                            document.getElementById('copies_num').value + '</em></div>';
    content.innerHTML += '<div id="confirm-layout" class="cofirm-text"><b>Layout     :   </b><em>' + 
                            document.getElementById('layoutMenu').value + '</em></div>';
    content.innerHTML += '<div id="confirm-paper" class="cofirm-text"><b>Paper    :    </b><em>' + 
                            document.getElementById('paperMenu').value + '</em></div>';
    content.innerHTML += '<div id="confirm-printer" class="cofirm-text"><b>Printer ID : </b><em>' +
                            document.getElementById('printerMenu').value + '</em></div>';  
    content.innerHTML += '<div id="confirm-file" class="cofirm-text"><b>File    : </b><em>' + 
                            fileName + '</em></div>';     
    


}

function closeCustomConfirm() {
    // Hide the modal and overlay
    const modal = document.getElementById('customConfirm');
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

function confirmDone() {
    window.location.href = "../print.html"
}