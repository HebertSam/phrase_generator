document.addEventListener('DOMContentLoaded',(event)=>{
    
    let words = []
    document.getElementById('file').addEventListener('change', readFile, false)
    document.getElementById('gen').addEventListener('click', function(event){downloadCSV(words)}, false)


    function readFile(event) {
        let files = event.target.files
        // console.log(files)
        let file = files[0]
        // console.log(file)
        let reader = new FileReader()
        reader.onload = function(event){
            console.log("success")
            let data = event.target.result
            words = dataToArray(data)
        }
        reader.readAsText(file)
    }

    function dataToArray(data){
        let newArray = data.split(',')
        // console.log(newArray)
        return newArray
    }

    function downloadCSV(data){
        let csv = "phrases\n"
        for (let i=0; i<10; i++){
            for (let j=0; j<3; j++){
                let rand = Math.floor(Math.random() * Math.floor(data.length))
                csv += data[rand]
                csv += ' '
            }
            csv += '\n'
        }
        console.log(csv)
    }
})