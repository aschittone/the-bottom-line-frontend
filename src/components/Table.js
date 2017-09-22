import 'bootstrap/dist/css/bootstrap.css';
import update from 'immutability-helper';
import CountTo from 'react-count-to';
const ReactDataGrid = require('react-data-grid');
const React = require('react');

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns:
			[
				{
					key: 'Month',
					name: 'Month',
					editable: false
				},
				{
					key: 'Rent',
					name: 'Rent',
					editable: true
				},
				{
					key: 'HOA',
					name: 'HOA Fee',
					editable: true
				},
				{
					key: 'Taxes',
					name: 'Taxes',
					editable: true
				},
				{
					key: 'MFee',
					name: 'Management Fees',
					editable: true
				},
				{
					key: 'MI',
					name: 'Mortgage Insurance',
					editable: true
				},
				{
					key: 'HOI',
					name: 'HOI',
					editable: true
				},
				{
					key: 'Mortgage',
					name: 'Mortgage',
					editable: true
				},
				{
					key: 'CashFlow',
					name: 'Cash flow/month',
					editable: false
				}
			],
			rows: this.createRows(12, this.props)
		}
		this.rowGetter = this.rowGetter.bind(this)
		this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this)
		this.createRows = this.createRows.bind(this)


	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			rows: this.createRows(12, nextProps)
		})
	}

	createRows(numberOfRows, props) {
		let rows = [];
		if (props.rowData.length < 1) {
			for (let i = 0; i < numberOfRows; i++) {
				rows.push({
					Month: i + 1,
					Rent: "-",
					HOA: "-",
					Taxes: "-",
					MFee: "-",
					MI: "-",
					HOI: "-",
					Mortgage: "-",
					CashFlow: "-"
				});
			}
		} else {
			for (let i = 0; i < numberOfRows; i++) {
				rows.push({
					Month: i + 1,
					Rent: props.rent,
					HOA: props.rowData[5],
					Taxes: props.rowData[0],
					MFee: 0,
					MI: props.rowData[2],
					HOI: props.rowData[4],
					Mortgage: props.rowData[3],
					CashFlow: props.rent - (props.rowData[0] + props.rowData[2] + props.rowData[3] + props.rowData[4] + props.rowData[5])
				});
			}
		}
		return rows;
	}

	rowGetter(i) {
		this.props.dataChange(this.state.rows)
		return this.state.rows[i];
	}

	handleGridRowsUpdated({ fromRow, toRow, updated }) {
		let rows = this.state.rows;

		for (let i = fromRow; i <= toRow; i++) {
			let rowToUpdate = rows[i];
			let updatedRow = update(rowToUpdate, { $merge: updated });
			for (let key in updated) {
				let num = parseInt(updated[key])
				if (rowToUpdate[key] < num && key === "Rent") {
					updatedRow.CashFlow += num - rowToUpdate[key]
				} else if (rowToUpdate[key] > num && key === "Rent") {
					updatedRow.CashFlow -= rowToUpdate[key] - num
				} else if (rowToUpdate[key] < num && key !== "Rent") {
					updatedRow.CashFlow -= num - rowToUpdate[key]
				} else if (rowToUpdate[key] > num && key !== "Rent") {
					updatedRow.CashFlow += rowToUpdate[key] - num
				}
				rows[i] = updatedRow;
			}
		}
		this.setState({ rows });
	}

	render() {

		return (
			<ReactDataGrid
				enableCellSelect={true}
				columns={this.state.columns}
				rowGetter={this.rowGetter}
				rowsCount={this.state.rows.length}
				minHeight={500}
				onGridRowsUpdated={this.handleGridRowsUpdated} />);
	}
}


export default Table