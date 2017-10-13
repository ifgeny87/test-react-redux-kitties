import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Page from '../components/page'
import * as pageActions from '../actions/pageActions'

class App extends Component {
    componentWillMount() {
        this.props.pageActions.getKitties()
    }

    render() {
        const page = this.props.page
        return <Page page={page}/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(state => state, mapDispatchToProps)(App)