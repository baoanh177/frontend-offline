import "bootstrap/dist/css/bootstrap.min.css";

function DefaultLayout() {
    return `
        <div class="container">
            <header>
                <h1>HEADER</h1>
            </header>
            <main class="d-flex align-items-center">
                <nav class="">
                    <ul>
                        <li>
                            <a href="/" data-navigo>Home</a>
                        </li>
                        <li>
                            <a href="/about" data-navigo>About</a>
                        </li>
                        <li>
                            <a href="/product" data-navigo>Product</a>
                        </li>
                    </ul>
                </nav>
                <div class="px-5">
                    {body}
                </div>
            </main>
            <footer>
                <h1>FOOTER</h1>
            </footer>
        </div>
    `;
}

export default DefaultLayout;