import React from 'react';

const RoleContext = React.createContext();

class RoleProvider extends React.Component {
    state = {
        user: {
            role: null,
            email: null
        },
    }

    setUser = (user) => {
        this.setState({ user });
    }

    logout = () => {
        this.setState({
            user: {
                role: null,
                email: null
            }
        })
    }

    render() {
        return (
            <RoleContext.Provider
                value={{
                    user: this.state.user,
                    setUser: this.setUser,
                    logout: this.logout,
                }}>
                {this.props.children}
            </RoleContext.Provider>
        )
    }
}

export { RoleProvider, RoleContext };