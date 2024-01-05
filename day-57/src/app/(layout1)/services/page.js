import { servicesData } from "~/servicesData"
import Card from "../Card"

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
                {servicesData.map(service => <Card key={service.id} {...service}/>)}
            </div>
        </div>
    )
}

export default Services
