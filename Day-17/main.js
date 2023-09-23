const root = document.querySelector('h3')
const para = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, quisquam!
Nihil, nulla similique! Itaque ipsa illum cumque incidunt magni explicabo.`



function handleHighlight(para) {
    let preStr = "" 
    let curStr = "" 
    let nexStr = "" 

    const first = para.slice(0, para.indexOf(" "))
    let newPara = para.replace(first, `<span style='color: red;'>${first}</span>`)
    console.log(newPara)
    console.log(para.length)
    root.innerHTML = newPara
}

handleHighlight(para)
