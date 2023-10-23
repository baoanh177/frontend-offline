const $ = document.querySelector.bind(document)

const content = $('.content')

console.log(content.firstElementChild)
console.log(content.lastElementChild)

// for(const node of content.childNodes) {
//   console.log(node)
// }