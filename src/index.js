import { Component } from "react";
import PropTypes from 'prop-types';
import Pagination from "./components/Pagination";
import Search from "./components/Search";

class DataTable extends Component {
    splitKey = (row, col) => {
        let value = '';
        const split = col.key.split('.');
        switch (split.length) {
            case 1:
                value = row[split[0]];
                break;
            case 2:
                value = row[split[0]][split[1]] || '-';
                break;
            default:
                break;
        }
        return value;
    }

    renderTable = () => {
        const {
            columns,
            rows,
            customs,
            autoIncrement,
            meta,
            noDataLabel,
            loading,
            loadingLabel
        } = this.props;

        let dt = [];
        if (loading) {
            dt = <tr>
                <td className="text-center" colSpan={columns.length + customs.length + (autoIncrement || 0)}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    &nbsp; { loadingLabel }
                </td>
            </tr>
        } else if (rows.length) {
            dt = rows.map((row, id) => <tr key={id}>
                { autoIncrement ? <td>{ Number(meta.page) > 1 ? Number(meta.limit) * (Number(meta.page)-1) + (id+1) : (id+1)}</td> : null}
                { columns.map((col, id) => <td key={id}>{ this.splitKey(row, col) }</td> )}
                { customs.map((custom, id) => <td key={id}>{ custom.element(row) }</td>) }
            </tr>);
        } else {
            dt = <tr>
                <td className="text-center" colSpan={columns.length + customs.length + (autoIncrement || 0)}>{ noDataLabel }</td>
            </tr>
        }
        return dt;
    }

    render() {
        const {
            columns,
            rows,
            customs,
            autoIncrement,
            autoIncrementLabel,
            meta,
        } = this.props;
        return <div className="m-t-10" style={{ overflowX: "auto" }}>
            <Search updateMeta={this.props.updateMeta}/>
            <hr/>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        { autoIncrement ? <th>{ autoIncrementLabel }</th> : null}
                        { columns.map((col, id) => <th key={id}>{ col.name }</th> )}
                        { customs.map((custom, id) => <th key={id}>{ custom.columnName }</th>) }
                    </tr>
                </thead>
                <tbody>
                    { this.renderTable() }
                </tbody>
                <tfoot>
                    <tr>
                        { autoIncrement ? <th>{ autoIncrementLabel }</th> : null}
                        { columns.map((col, id) => <th key={id}>{ col.name }</th> )}
                        { customs.map((custom, id) => <th key={id}>{ custom.columnName }</th>) }
                    </tr>
                </tfoot>
            </table>
            <hr/>
            <Pagination meta={meta} dataLength={rows.length} updateMeta={this.props.updateMeta}/>
        </div>;
    }
}

DataTable.propTypes = {
    loading: PropTypes.bool,
    loadingLabel: PropTypes.string,
    autoIncrement: PropTypes.bool,
    autoIncrementLabel: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    customs: PropTypes.array,
    meta: PropTypes.object,
    noDataLabel: PropTypes.string,

    updateMeta: PropTypes.func,
}

DataTable.defaultProps = {
    loading: false,
    loadingLabel: 'Sedang memuat...',
    autoIncrement: false,
    autoIncrementLabel: 'No',
    columns: [],
    rows: [],
    customs: [],
    meta: {
        page: 1,
        limit: 10,
        search: '',
        total_data: 0,
        total_page: 1
    },
    noDataLabel: 'Tidak ada data untuk ditampilkan',
    
    updateMeta: () => {},
}

export default DataTable;