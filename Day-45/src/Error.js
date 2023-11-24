import image from "./assets/images/404-page-best-practice.png.webp"

function Error() {
    console.log('test')
    return `<img src="${image}" alt="" style="display: block; margin: auto; width: 95%; height: 80%;"/>`;
}

export default Error;