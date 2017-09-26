import 'bootstrap/dist/css/bootstrap.css';
import update from 'immutability-helper';
import CountTo from 'react-count-to';
import { Grid } from 'semantic-ui-react'
const ReactDataGrid = require('react-data-grid');
const React = require('react');

const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	}
};

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
					editable: false
				},
				{
					key: 'CashFlow',
					name: 'Cash flow/month',
					editable: false
				}
			],
			rows: this.createRows(12, this.props)[0].newRows,
			totals: this.createRows(12, this.props)[1].newTotals
		}

		this.rowGetter = this.rowGetter.bind(this)
		this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this)
		this.createRows = this.createRows.bind(this)
		this.dataChange = this.dataChange.bind(this)

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			rows: this.createRows(12, nextProps)[0].newRows,
			totals: this.createRows(12, nextProps)[1].newTotals
		})
		console.log(this.state, "from comonent will receive props")
	}

	createRows(numberOfRows, props) {
		let rows = [];
		if (props.rowData.length < 1) {
			for (let i = 0; i < numberOfRows; i++) {
				rows.push({
					Month: i + 1,
					Rent: 0,
					HOA: 0,
					Taxes: 0,
					MFee: 0,
					MI: 0,
					HOI: 0,
					Mortgage: 0,
					CashFlow: 0
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
		let totals = this.dataChange(rows, props.rowData[3])
		console.log(totals, "from createRows")
		return [{ newRows: rows }, { newTotals: totals }];
	}

	dataChange = (data, mortgage) => {
		let totals = [{ totals: undefined }]
		let annualCashflow = 0
		let mortgagePayment = data[0]["Mortgage"]
		let averageMonthlyCashflow = 0
		data.map(row => {
			annualCashflow += row.CashFlow
		})
		averageMonthlyCashflow = (annualCashflow / 12)
		totals[0].totals = { mortgagePayment: mortgagePayment, annualCashflow: annualCashflow, averageMonthlyCashflow: averageMonthlyCashflow }
		return totals
	}

	rowGetter(i) {
		return this.state.rows[i];
	}

	handleGridRowsUpdated({ fromRow, toRow, updated }) {
		let rows = this.state.rows;
		for (let i = fromRow; i <= toRow; i++) {
			debugger
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
		let totals = this.dataChange(rows, this.state.rows[0]["Mortgage"])
		this.setState({ rows, totals });
	}

	render() {
		console.log(this.state, 'from render')
		return (
			<div>
				<Grid padded relaxed textAlign="center">
					<Grid.Row>
						<Grid.Column width={5}>
							<h2 style={styles.headline}>Annual Cash flow: <CountTo to={this.state.totals[0].totals.annualCashflow} speed={1234} /></h2>
						</Grid.Column>
						<Grid.Column width={5}>
							<h2 style={styles.headline}>Average Monthly Cash flow: <CountTo to={this.state.totals[0].totals.averageMonthlyCashflow} speed={1234} /></h2>
						</Grid.Column>
						<Grid.Column width={5}>
							<h2 style={styles.headline}>Mortgage Payment (P&I): <CountTo to={this.state.totals[0].totals.mortgagePayment} speed={1234} /></h2>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<ReactDataGrid
					enableCellSelect={true}
					columns={this.state.columns}
					rowGetter={this.rowGetter}
					rowsCount={this.state.rows.length}
					minHeight={500}
					onGridRowsUpdated={this.handleGridRowsUpdated} />
			</div>
		);
	}
}


export default Table