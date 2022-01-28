import { Dashboard } from "../pages/Dashboard";


export function DynamicDashboard() {

    console.log('DynamicDashboard');

    return <section>
        <h1>Dashboards</h1>
        <div>
            <Dashboard labelType={"status"} />
        </div>
        <div>
            <Dashboard labelType={"priority"} />
        </div>
        {/* <div>
            <Dashboard labels={{ labelType: "role", labels: ["Dev", "Product", "Working on it"] }} />
        </div>
        <div>
            <Dashboard labels={{ labelType: "status", labels: ["Done", "Stuck", "Working on it"] }} />
        </div> */}
    </section>
}
