document.addEventListener('DOMContentLoaded',(event)=>{
    let words = []
    document.getElementById('file').addEventListener('change', readFile, false)

    document.getElementById('gen').addEventListener('click', function(event){createPhrases(words)}, false)


    function readFile(event) {
        let files = event.target.files
        let file = files[0]
        let reader = new FileReader()
        reader.onload = function(event){
            console.log("success")
            let data = event.target.result
            // console.log(data)
            words = dataToArray(data)
            console.log(words)
        }
        reader.readAsText(file)
    }

    function dataToArray(data){
        let newArray = data.split('\n')
        for (let i=0; i<newArray.length; i++){
                newArray[i] = newArray[i].replace(/[\n\r]+/g, '')
        }
        return newArray
    }

    function createPhrases(data){
        console.log(data)
        let phraseArr = []
        for (let i=0; i<10; i++){
            let tempArr = []
            for (let j=0; j<3; j++){
                let rand = Math.floor(Math.random() * data.length)
                if (tempArr.indexOf(data[rand]) > -1){
                  j--
                } else {
                    tempArr.push(data[rand])
                }
            }
            phraseArr.push(tempArr)
        }
        // console.log(phraseArr)
        downloadCSV(phraseArr)
    }

    function downloadCSV(data){
        let csv = "phrases\n"
        for (let i=0; i<data.length; i++){
            for (let j=0; j<data[i].length; j++){
                    csv += data[i][j]
                    csv += ' '
            }
            csv += '\n'
            // console.log("csv added new line\n" + csv)
        }
        console.log(csv)
        var blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
        var link = document.createElement('a')
        if(link.download !== undefined){
            var url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'export.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
})