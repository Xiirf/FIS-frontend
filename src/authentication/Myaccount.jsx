import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../_services/authentication.service';
import { userService } from '../_services/user.service';

class Myaccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentToken: authenticationService.currentTokenValue,
            user: null,
            editPassword: false,
            editEmail: false
        };

        this.handleEditEmail = this.handleEditEmail.bind(this);
        this.handleCancelEditEmail = this.handleCancelEditEmail.bind(this);
        this.handleEditPassword = this.handleEditPassword.bind(this);
        this.handleCancelEditPassword = this.handleCancelEditPassword.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        userService.getUser().then(user => this.setState({user: user}));
    }

    handleEditEmail() {
        this.setState({editEmail: true});
    }

    handleCancelEditEmail() {
        this.setState({editEmail: false});
    }

    handleEditPassword() {
        this.setState({editPassword: true});
    }

    handleCancelEditPassword() {
        this.setState({editPassword: false});
    }

    updateUser() {
        userService.getUser().then(user => this.setState({user: user}));
    }

    render() {
        const { user, editEmail, editPassword } = this.state;
        return (
            <div>
                <h2>My Account</h2>
                {user &&
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th>
                                    Username
                                </th>
                                <td>
                                    {user.login}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Email
                                </th>
                                <td>
                                    {user.email} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="button" className="btn btn-primary" onClick={editEmail ? this.handleCancelEditEmail : this.handleEditEmail}>{editEmail ? "Cancel" : "Change email"}</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {editEmail &&
                                        <Formik 
                                            initialValues={{
                                                email: '',
                                                password: ''
                                            }}
                                            validationSchema={Yup.object().shape({
                                                email: Yup.string()
                                                    .email('Invalid email')
                                                    .required('Email is required')
                                            })}
                                            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                                                setStatus();
                                                authenticationService.edit(password, email)
                                                    .then(
                                                        user => {
                                                            this.updateUser();
                                                            this.handleCancelEditEmail();
                                                        },
                                                        error => {
                                                            setSubmitting(false);
                                                            setStatus(error);
                                                        }
                                                    );
                                            }}
                                            render={({ errors, status, touched, isSubmitting }) => (
                                                <Form>
                                                    <div className="form-group">
                                                        <label htmlFor="email">New email</label>
                                                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                                        {isSubmitting &&
                                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                        }
                                                    </div>
                                                    {status &&
                                                        <div className={'alert alert-danger'}>{status}</div>
                                                    }
                                                </Form>
                                            )}
                                        />
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Password
                                </th>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={editPassword ? this.handleCancelEditPassword : this.handleEditPassword}>{editPassword ? "Cancel" : "Change password"}</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {editPassword &&
                                        <Formik 
                                            initialValues={{
                                                email: '',
                                                password: ''
                                            }}
                                            validationSchema={Yup.object().shape({
                                                password: Yup.string()
                                                    .required('Password is required')
                                            })}
                                            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                                                setStatus();
                                                authenticationService.edit(password, email)
                                                    .then(
                                                        user => {
                                                            this.handleCancelEditPassword();
                                                        },
                                                        error => {
                                                            setSubmitting(false);
                                                            setStatus(error);
                                                        }
                                                    );
                                            }}
                                            render={({ errors, status, touched, isSubmitting }) => (
                                                <Form>
                                                    <div className="form-group">
                                                    <label htmlFor="password">New password</label>
                                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                                        {isSubmitting &&
                                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                        }
                                                    </div>
                                                    {status &&
                                                        <div className={'alert alert-danger'}>{status}</div>
                                                    }
                                                </Form>
                                            )}
                                        />
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            {/*    <Formik 
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                        />*/}
            </div>
        )
    }
}

export default Myaccount;