
// define Global Variables
const ul = document.querySelector('ul');   //select unOrdered list from html
const sections = document.querySelectorAll('section');   //select all sections from html
const topButton = document.getElementById("topBtn");    //get top button from html


// use document fragment to enhance performance which reduce reflows and repaints
let fragment = document.createDocumentFragment();

////////////////////// build nav bar consists of new list items and new anchors/////////
//loop over sections to add items dynamically to navbar
sections.forEach((section) => {
    const li = document.createElement('li');    //create new list element
    const anchor = document.createElement('a');  //create new anchor element
    anchor.textContent = section.getAttribute('data-nav');   //put names of items in navbar 
    //click event on navbar to smoothly scrolling to specific section
    anchor.addEventListener('click', function () {
        section.scrollIntoView({ 'behavior': 'smooth' });
    });
    li.appendChild(anchor);  //add each anchor element into list items

    li.setAttribute('style', 'margin-right: 40px;');
    //add each li to fragment to reduce reflows and repaints of DOM
    fragment.appendChild(li);   
})
//add whole fragment at once to unOrdered List
ul.appendChild(fragment);


////////////////////////// control active class in navbar //////////

const li = document.querySelectorAll('li'); // select all List items that inserted in list
// loop over each item in list to control active class in navbar
li.forEach(function (lisItem) {
    // make function when click on any item to remove/add active class according to every item
    lisItem.addEventListener('click', function () {
        if (ul.querySelector('.active') !== null) {
            ul.querySelector('.active').classList.remove('active');
        }
        lisItem.classList.add('active');
    })
})

////// add active class to showen section in view port /////
sections.forEach((section) => {
    ///////////////// show top button when scrolling bottom /////
    document.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.setAttribute('style', 'position: fixed; bottom: 20px; right: 30px; z-index: 99; padding: 15px;')
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }

        let rect = section.getBoundingClientRect(); //get position of every section according to view port
        if (rect.top >= 0 && rect.bottom <= window.innerHeight + 200) {
            sections.forEach((section) => {
                if (section.classList.contains('active')) {
                    section.classList.remove('active');
                }
            })
            section.classList.add('active');
            activeListItem(section);
        }
    });
})


///////// active state of nav bar when scrolling according to section active state ////
function activeListItem(activeSection) {
    const navData = activeSection.getAttribute('data-nav');
    li.forEach((lisItem) => {
        if (lisItem.textContent === navData) {
            if (ul.querySelector('.active') !== null) {
                ul.querySelector('.active').classList.remove('active');
            }
            lisItem.classList.add('active');
        }

    })
}

//root element of the document. We need it to get the offset values.
var rootElement = document.documentElement

//click event for scrolling to top of the page smoothly
topButton.addEventListener('click', function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});






