
window.onload = function() {
    var formEL = document.getElementById('form')
    var infoDiv = document.getElementById('infoDiv')
    var btn = document.getElementById('btn')
    var sectLeft = document.getElementById('sectLeft')


    formEL.addEventListener('submit', function(e){
        e.preventDefault()

        var empName = document.getElementById('name').value

        var empId = document.getElementById('id').value

        var empEmail = document.getElementById('email').value

        var empPhone = document.getElementById('number').value

        var empAd = document.getElementById('address').value

        var empLevel = document.getElementById('level').value


        if(empName == '' || empId == '' || empEmail == '' || empPhone == '' || empAd == '' || empLevel == '' ){
            UI.message('All input fields must be filled', 'danger')
            return
        }else{
            var book = new Book(empName,empId,empEmail,empPhone,empAd,empLevel)

            console.log(book)

            UI.displayData(book)

            store.setstored(book)

            UI.clearFields()

            UI.message('data inserted', 'success')
        }
        console.log(empName, empId, empEmail,empPhone,empAd,empLevel)

    })

    infoDiv.addEventListener('click', function(e){
        e.target.classList.contains('remove')

        UI.removeIt(e.target)
    })

    class Book{
        constructor (empName, empId,empEmail,empPhone,empAd,empLevel){
            this.empName = empName

            this.empId = empId

            this.empEmail = empEmail

            this.empPhone = empPhone

            this.empAd = empAd

            this.empLevel = empLevel

        }
    }

    class UI {
        static clearFields() {
            document.getElementById('name').value = ''

            document.getElementById('id').value = ''

            document.getElementById('email').value =''

            document.getElementById('number').value = ''

            document.getElementById('address').value = ''

            document.getElementById('level').value =''
        }

        static displayData(book){
            // get data from local storage here
            let books = store.getStore()
            books.push(book)

            UI.populateData(books)
        }

        static populateData(books){
            while(infoDiv.firstChild){
                infoDiv.firstChild.remove(infoDiv.firstChild)
            }
            books.forEach(eachData => {
            infoDiv.innerHTML += `
                <div>
                <div class="info"> Name: <span id="empName">${eachData.empName}</span></div>
                <div class="info"> Employee ID: <span id="empName">${eachData.empId}</span></div>
                <div class="info">Email: <span id="empEmail">${eachData.empEmail}</span></div>
                <div class="info"> Phone: <span id="empNum">${eachData.empPhone}</span></div>
                <div class="info">Address: <span id="empAd">${eachData.empAd}</span></div>
                <div class="info"> Level: <span id="empLev">${eachData.empLevel}</span></div>
                <button class='remove'>clear</button>
               
                </div>
                <hr>
            `
            });
            
        }

        static  message(txt, className) {
            let div = document.createElement('div')
            div.className = `${className}`
            div.innerText = txt
            sectLeft.insertBefore(div, formEL)


            setTimeout(function(){
                div.remove()
            },2000)
        }

        static removeIt(element){
            if(element.classList.contains('remove')){
               let empName = element.parentElement.firstElementChild.innerText
               console.log(empName)
                store.removeStoredValue(empName)
                element.parentElement.remove()
            }
        }

    }

    class store{
        static getStore(){
            let books = ''
            if (localStorage.getItem('book') == null){
                 books = []
            }else{
                 books = JSON.parse(localStorage.getItem('book'))
            }
            return books
        }

        static setstored(obj){
            let dataFromLocalStorage = store.getStore()
            dataFromLocalStorage.push(obj)
            localStorage.setItem('book', JSON.stringify(dataFromLocalStorage))
        }

        static removeStoredValue(empName){
            let emp = store.getStore()
            emp.forEach(function(eachData, index){
                if(eachData.empName == empName){
                    emp.splice(index, 1)
                }
            })
            localStorage.removeItem('book', JSON.stringify(emp))
        }
    }

    UI.populateData(store.getStore())
}
