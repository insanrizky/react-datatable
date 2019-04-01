import { Component } from "react";
import PropTypes from 'prop-types';
import { errorNotif } from "../../../utils/notification";

class Pagination extends Component {
    state = {
        ...this.props.meta
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.meta })
    }

    renderPages = () => {
        const { meta } = this.props;
        const showPages = 5;
        const page = Number(meta.page);
        const min = page - 2 >= 1 ? page - 2 : 1;
        const max = meta.total_page > showPages ? (page + 2 > showPages ? page + 2 : showPages) : meta.total_page;

        let list = [];
        if (min > 1) {
            list.push(<li key={min-1} className='page-item disabled'>
                <a className="page-link" href="#">...</a>
            </li>);
        }
        for (let i = min; i <= max; i++) {
            list.push(<li className={ i === page ? 'page-item active' : 'page-item' } key={i}>
                <a className="page-link" href="#" onClick={ this.goToPage.bind(null, i)}>{ i }</a>
            </li>);
        }
        if (meta.total_page > max) {
            list.push(<li key={max+1} className='page-item disabled'>
                <a className="page-link" href="#">...</a>
            </li>);
        }
        return list;
    }

    goToPage = page => {
        this.setState({ page }, () => this.props.updateMeta(this.state))
    }

    handlePagination = type => {
        let page = Number(this.state.page);
        if (type === 'next') {
            page += 1;
        } else if (type === 'prev') {
            page -= 1;
        } else {
            errorNotif('Page number is not valid!');
        }
        this.setState({ page }, () => this.props.updateMeta(this.state))
    }

    render() {
        const {
            meta,
            dataLength,
            nextLabel,
            prevLabel,
            showLabel,
            fromLabel,
            dataLabel,
            pageLabel,
        } = this.props;
        return (
            <div className="form-inline d-flex justify-content-between">
                <div className="form-group">
                    <label>{ showLabel } { meta.limit > dataLength ? dataLength : meta.limit } { fromLabel } { meta.total_data } { dataLabel } | Total { meta.total_page } { pageLabel }</label>
                </div>
                <div className="form-group ml-auto text-right">
                    <nav>
                        <ul className="pagination">
                            <li className={ Number(meta.page) === 1 ? 'page-item disabled' : 'page-item'}>
                                <a className="page-link" href="#" onClick={ this.handlePagination.bind(null, 'prev') }>{ prevLabel }</a>
                            </li>
                            { this.renderPages() }
                            <li className={ Number(meta.page) === meta.total_page ? 'page-item disabled' : 'page-item'}>
                                <a className="page-link" href="#" onClick={ this.handlePagination.bind(null, 'next') }>{ nextLabel }</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

Pagination.propTypes = {
    meta: PropTypes.object,
    dataLength: PropTypes.number,
    updateMeta: PropTypes.func,
    nextLabel: PropTypes.string,
    prevLabel: PropTypes.string,
    showLabel: PropTypes.string,
    fromLabel: PropTypes.string,
    dataLabel: PropTypes.string,
    pageLabel: PropTypes.string,
}

Pagination.defaultProps = {
    meta: {
        page: 1,
        limit: 10,
        search: '',
        total_data: 0,
        total_page: 1
    },
    dataLength: 10,
    updateMeta: () => {},
    nextLabel: 'Berikutnya',
    prevLabel: 'Sebelumnya',
    showLabel: 'Menampilkan',
    fromLabel: 'dari',
    dataLabel: 'data',
    pageLabel: 'halaman',
}

export default Pagination;