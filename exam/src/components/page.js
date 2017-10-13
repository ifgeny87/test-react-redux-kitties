import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as pageActions from '../actions/pageActions'

class Page extends Component {
    onEnterPage(e) {
        this.props.getKitties(+e.target.innerText)
    }

    render() {
        const {isFetching, isDataError} = this.props.page

        return (isFetching
            ? this.renderTrobber()
            : isDataError
                ? this.renderError()
                : this.renderKitties())
    }

    renderError() {
        return <div className="error">Something happens wrong</div>
    }

    renderTrobber() {
        return <div className="trobber">
            <div>
                <span>Loa</span>
                <span>ding</span>
            </div>
        </div>
    }

    renderKitties() {
        const {kitties, selectedKitty} = this.props.page

        if (!kitties.success) {
            return <div className="warning">
                Server says: Kitties will not come :(
            </div>
        }

        const kittyDivs = kitties.tiles.map((tile, index) => {
            const {type, title, description} = tile
            const cls = 'kitty_' + String.fromCharCode(97 + index % 10) // знаем, что кошек 10
            const classList = ['kittyRect', type, cls]
            if (index === selectedKitty) classList.push('selected')

            return <div key={index}
                        className={classList.join(' ')}
                        onClick={() => this.props.pageActions.selectKitty(index === selectedKitty ? null : index)}>
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        })

        if (selectedKitty !== null) {
            const {title, text} = kitties.tiles[selectedKitty]
            kittyDivs.splice(selectedKitty + 1, 0,
                <div key={'story'}>
                    <h1>{title}</h1>
                    <blockquote>{text}</blockquote>
                </div>)
        }

        return <div>
            {kittyDivs}
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(state => state, mapDispatchToProps)(Page)