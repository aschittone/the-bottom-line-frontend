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
					key: 'Insurance',
					name: 'Insurance',
					editable: true
				},
				{
					key: 'Mortgage',
					name: 'Mortgage',
					editable: true
				},
				{
					key: 'CashFlow',
					name: 'Monthly Cash flow',
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
					Month: i,
					Rent: 0,
					HOA: 0,
					Taxes: 0,
					MFee: 0,
					Insurance: 0,
					Mortgage: 0,
					CashFlow: 0
				});
			}
		} else {
				for (let i = 0; i < numberOfRows; i++) {
					rows.push({
						Month: i,
						Rent: props.rowData[1],
						HOA: 0,
						Taxes: props.rowData[0],
						MFee: 0,
						Insurance: props.rowData[2],
						Mortgage: props.rowData[3],
						CashFlow: props.rowData[3] + props.rowData[2] + props.rowData[1] + props.rowData[0]
					});
			}
		}
    return rows;
  }

  rowGetter(i) {
    return this.state.rows[i];
  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows;

    for (let i = fromRow; i <= toRow; i++) {
			let rowToUpdate = rows[i];
			
      let updatedRow = update(rowToUpdate, {$merge: updated});
			debugger
			// go through and change the value of the updated cell, and add back up the numbers
			// updatedRow.
      rows[i] = updatedRow;
		}
		

    this.setState({ 
			rows 
		});
  }

  render() {
		
    return  (
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