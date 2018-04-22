var React = require("react")
var ReactDOM = require("react-dom")
require("./index.css")
var PropTypes = require("prop-types")

class Badge extends React.Component {
    render() {
        return (
            <div>
                <img
                    src={this.props.img}
                    alt="Avatar"
                    style={{ width: 100, height: 100 }}
                />

                <h1>Name: {this.props.name}</h1>
                <h3>Username: {this.props.username}</h3>
            </div>
        )
    }
}

Badge.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

ReactDOM.render(<Badge
    name="Ahmet Oz"
    username="ahmetoz"
    img= {{ "img": "https://avatars3.githubusercontent.com/u/3469524?s=460&v=4" }} />, document.getElementById('app'))