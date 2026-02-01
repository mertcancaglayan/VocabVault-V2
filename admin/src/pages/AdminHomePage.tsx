import { Fragment } from "react/jsx-runtime"
import Header from "../components/header/Header"
import "./AdminHomePage.css"
import StatsGrid from "../components/stats_grid/StatsGrid"
import Toolbar from "../components/toolbar/Toolbar"
import Table from "../components/table/Table"
import FormModal from "../components/form_modal/FormModal"
import { useContext } from "react"
import AppContext from "../context/AppContext"
import ViewModal from "../components/view_modal/ViewModal"

function AdminHomePage() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("erorr");

    const { isEditModalOpen, isViewModalOpen } = contextValue

    return (
        <Fragment>
            <Header></Header>
            <main className="admin-container">
                <StatsGrid></StatsGrid>
                <Toolbar></Toolbar>
                <Table></Table>
            </main>
            {isEditModalOpen && <FormModal></FormModal>}
            {isViewModalOpen && <ViewModal></ViewModal>}
        </Fragment>
    )
}

export default AdminHomePage
