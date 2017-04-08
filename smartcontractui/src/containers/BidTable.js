import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class BidTable extends Component {
	constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        suppliers: "",
        prices: "",
        timesToComplete: "",
    }
  }
  componentWillMount() {
    var data = smartContract.getBids(this.props.getContractID);
    this.setState({
      contractId: String(data[0]).split(','),
      suppliers: String(data[1]).split(','),
      prices: String(data[2]).split(','),
      timesToComplete: String(data[3]).split(',')

    })
  }

	render() {
    var TableRows = []

    _.each(this.state.contractId, (value, index) => {
      TableRows.push( {
          cId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
          suppliers: ETHEREUM_CLIENT.toAscii(this.state.suppliers[index]),
          price: ETHEREUM_CLIENT.toDecimal(this.state.prices[index]),
          time : ETHEREUM_CLIENT.toDecimal(this.state.timesToComplete[index])
      }
        );
    });

    const columns = [{
    header: 'Contract Id',
    accessor: 'cId' // String-based value accessors!
    },{
    header: 'Supplier',
    accessor: 'suppliers' // String-based value accessors!
    },{
    header: 'Price',
    accessor: 'price' // String-based value accessors!
    },{
    header: 'Time to Complete',
    accessor: 'time' // String-based value accessors!
  }];
      return (
				<div>
					<h3>Bids</h3>
          <ReactTable data={TableRows} columns={columns} defaultPageSize={5}/>
				</div>
      );
  }
}
export default BidTable;