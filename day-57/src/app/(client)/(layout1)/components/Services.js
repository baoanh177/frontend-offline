import Card from "./Card"

function Services() {
    return (
        <div>
            <h2
                className="text-3xl font-bold text-center"
                id="dich-vu"
            >
                Dịch vụ
            </h2>
            <div className="grid grid-cols-4 gap-4 mt-14">
                <Card name="Mumbai" price="17.000.000" />
                <Card name="Hanoi" price="30.000.000" />
                <Card name="Paries" price="32.000.000" />
                <Card name="Berlin" price="40.000.000" />
                <Card name="Beijing" price="43.000.000" />
                <Card name="Jakarta" price="37.000.000" />
                <Card name="Tokyo" price="26.000.000" />
                <Card name="Ottawa" price="33.000.000" />
            </div>
        </div>
    )
}

export default Services
