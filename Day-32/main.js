const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const input = $(".input")
const toolBtns = $$(".text-style")
const fileName = $(".file-name")
const fileMngBtn = $(".file-manager-toggle")
const fileMng = $("#file-manager")

input.focus()

// File manager toggle
const handleShowFileManager = () => fileMng.classList.toggle("show")
fileMngBtn.onclick = handleShowFileManager

$(".color").onchange = function () {
    document.execCommand("foreColor", false, this.value)
}

// Active
toolBtns.forEach((btn) => {
    const handleActive = (type) => {
        if (document.queryCommandState(`${type}`)) {
            btn.classList.add("active")
        } else {
            btn.classList.remove("active")
        }
        input.focus()
    }
    btn.onclick = () => {
        document.execCommand(btn.classList[0])
        handleActive(btn.classList[0])
    }
})

// Handle Count
const handleCount = () => {
    let wordCount = (characterCount = 0)
    const content = input.innerText

    characterCount = content
        .trim()
        .replaceAll("\n\n", " ")
        .split("").length

    content
        .trim()
        .replaceAll("\n", " ")
        .split(" ")
        .forEach((word) => {
            word && wordCount++
        })

    $(".characters b").innerText = characterCount
    $(".words b").innerText = wordCount
}

input.oninput = handleCount

const handleReset = () => {
    handleShowFileManager()
    input.innerText = ""
    fileName.value = "untitled"
    document.execCommand("")
    toolBtns.forEach((btn) => btn.classList.remove("active"))
    $(".color").value = "#000000"
    $(".characters b").innerText = 0
    $(".words b").innerText = 0
}

$(".new-file").onclick = handleReset

const saveAsTXTBtn = $(".save-as-txt")

// Save to TXT
saveAsTXTBtn.onclick = () => {
    saveAsTXTBtn.download = $(".file-name").value

    function typedArrayToURL(typedArray, mimeType) {
        return URL.createObjectURL(
            new Blob([typedArray], { type: mimeType })
        )
    }

    const url = typedArrayToURL(
        new TextEncoder().encode(input.textContent),
        "text/plain"
    )

    saveAsTXTBtn.href = url
}


// Save to PDF
$('.save-as-pdf').onclick = () => {
    const opt = {
        filename: $(".file-name").value
    }
    html2pdf(input, opt)
}