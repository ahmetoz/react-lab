import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouter, { Link } from 'react-router-dom';

function PlayerPreview({ id, avatar, username, onReset }) {
    return (
        <div>
            <div className="column">
                <img
                    className="avatar"
                    src={avatar}
                    alt={`Avatar for ${username}`}
                />
                <h2 className="username">
                    @{username}
                </h2>
                <button
                    className="reset"
                    onClick={() => onReset(id)}
                >
                    Reset
                    </button>
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;

        this.setState(() => ({
            username: value
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit} >
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    autoComplete='off'
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username} >
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}


export default class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => ({
            [id + 'Name']: username,
            [id + 'Image']: `https://github.com/${username}.png?size=200`
        }));
    }

    handleReset(id) {
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Image']: null
        }));
    }

    render() {
        const { match } = this.props;
        const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
        return (
            <div>
                <div className='row'>
                    {
                        !playerOneName &&
                        <PlayerInput
                            id="playerOne"
                            label="Player One"
                            onSubmit={this.handleSubmit}
                        />
                    }
                    {
                        playerOneImage !== null &&
                        <PlayerPreview
                            id="playerOne"
                            avatar={playerOneImage}
                            username={playerOneName}
                            onReset={this.handleReset}
                        />
                    }
                    {
                        !playerTwoName &&
                        <PlayerInput
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.handleSubmit}
                        />
                    }
                    {
                        playerTwoImage !== null &&
                        <PlayerPreview
                            id="playerTwo"
                            avatar={playerTwoImage}
                            username={playerTwoName}
                            onReset={this.handleReset}
                        />
                    }
                </div>

                {
                    playerOneImage && playerTwoImage &&
                    <Link
                        className="button"
                        to={{
                            pathname: `${match.url}/results`,
                            search:`?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                        }}
                    >
                        Battle
                    </Link>
                }

            </div>
        )
    }
}