import { Fragment } from "react/jsx-runtime"
import Header from "../components/header/Header"
import "./AdminHomePage.css"
import StatsGrid from "../components/stats_grid/StatsGrid"
import Toolbar from "../components/toolbar/Toolbar"
import Table from "../components/table/Table"

function AdminHomePage() {
    return (
        <Fragment>
            <Header></Header>
            <main className="admin-container">
                <StatsGrid></StatsGrid>
                <Toolbar></Toolbar>
                <Table></Table>
            </main>
        </Fragment>
    )
}

export default AdminHomePage
