import { Fragment } from "react/jsx-runtime"
import Header from "../components/header/Header"
import "./AdminHomePage.css"
import StatsGrid from "../components/stats_grid/StatsGrid"
import Toolbar from "../components/toolbar/Toolbar"
import Table from "../components/table/Table"
import FormModal from "../components/from_modal/FormModal"
import { useContext } from "react"
import AppContext from "../context/AppContext"

function AdminHomePage() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("erorr");

    const { isEditModalOpen } = contextValue

    return (
        <Fragment>
            <Header></Header>
            <main className="admin-container">
                <StatsGrid></StatsGrid>
                <Toolbar></Toolbar>
                <Table></Table>
            </main>
            {isEditModalOpen && <FormModal></FormModal>}
        </Fragment>
    )
}

export default AdminHomePage
