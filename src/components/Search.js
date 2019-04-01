import { Component } from "react";
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        page: 1,
        limit: this.props.limit,
        search: ''
    }

    handleShowPerPage = e => {
        this.setState({ limit: e.target.value }, () => this.props.updateMeta(this.state));
    }

    handleSearch = e => {
        this.setState({ search: e.target.value }, () => this.props.updateMeta(this.state));
    }

    render() {
        const { options } = this.props;
        return (
            <div className="form-inline d-flex justify-content-between">
                <div className="form-group">
                    <label htmlFor="search" className="m-r-10">Tampilkan: </label>
                    <select className="form-control" value={ this.state.limit } onChange={ this.handleShowPerPage }>
                        { options.map((opt, id) => <option key={id} value={opt}>{opt}</option>) }
                    </select>
                </div>
                <div className="form-group ml-auto text-right">
                    <label htmlFor="search" className="m-r-10">Pencarian: </label>
                    <input type="text" className="form-control" id="search" onChange={ this.handleSearch } placeholder="Kata kunci"/>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    limit: PropTypes.number,
    options: PropTypes.array,
    updateMeta: PropTypes.func
}

Search.defaultProps = {
    limit: 10,
    options: ['5', '10', '25', '50', '100'],
    updateMeta: () => {},
}

export default Search;