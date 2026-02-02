import { Fragment } from "react/jsx-runtime"
import Header from "../components/header/Header"
import "./AdminHomePage.css"
import StatsGrid from "../components/stats_grid/StatsGrid"
import Toolbar from "../components/toolbar/Toolbar"
import Table from "../components/table/Table"
import FormModal from "../components/form_modal/FormModal"
import ViewModal from "../components/view_modal/ViewModal"
import { useAppContext } from "../hooks/useAppContext"
import Pagination from "../components/pagination/Pagination"

function AdminHomePage() {
    const contextValue = useAppContext()

    const { isEditModalOpen, isViewModalOpen } = contextValue

    return (
        <Fragment>
            <Header></Header>
            <main className="admin-container">
                <StatsGrid></StatsGrid>
                <Toolbar></Toolbar>
                <Table></Table>
                <Pagination></Pagination>
            </main>
            {isEditModalOpen && <FormModal></FormModal>}
            {isViewModalOpen && <ViewModal></ViewModal>}
        </Fragment>
    )
}

export default AdminHomePage
