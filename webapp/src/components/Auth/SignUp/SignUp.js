import React from 'react';
import {Link} from 'react-router-dom';
import {Field, Form, withFormik} from 'formik'
import * as Yup from 'yup'
import {signUp} from '../../../actions'
import {connect} from 'react-redux'

import Particles from 'react-particles-js';
import config from './particle.config.json';
import {PageMain, LoginForm, FormBottom, InfoBox} from './shared/common';

const FormikForm = ({
                        values,
                        touched,
                        errors,
                        status,
                        isSubmitting
                    }) => (
                <div>
    <Particles className="particlejs" params={config} />
    <PageMain>
          <LoginForm>
            <div align="center">
              <h1>
                <span style={{color: '#3895d3'}}>data</span>
                <span style={{color: '#2a81bc'}}>link</span>
              </h1>
              <p>Sign up</p>
                            {touched.username && errors.username &&
                            <small className="form-text text-danger">{errors.username}</small>}{" | "}
                            {touched.email && errors.email &&
                            <small className="form-text text-danger">{errors.email}</small>}{" | "}
                            {touched.name && errors.name &&
                            <small className="form-text text-danger">{errors.name}</small>}{" | "}
                            {touched.surname && errors.surname &&
                            <small className="form-text text-danger">{errors.surname}</small>}{" | "}
                            {touched.password && errors.password &&
                            <small className="form-text text-danger">{errors.password}</small>}{" | "}
                    <Form className="card border-0 p-4 shadow">
                    <div style={{display:'flex',flexWrap:'wrap',width:'75vw'}}>
                            <Field className="form-control" type="text" name="username" placeholder="Username"/>
                            <Field className="form-control" type="text" name="email" placeholder="email@email.com"/>
                                <Field className="form-control" type="text" name="name" placeholder="Name"/>
                                
                                <Field className="form-control" type="text" name="surname" placeholder="Surname"/>
                            <Field className="form-control" type="password" name="password" placeholder="Password"/>
                        
                        {status && status.error && <div className="alert alert-danger">
                            <small>{status.error}</small>
                        </div>}
                        {status && status.success && <div className="alert alert-success">
                            <small>{status.success}</small>
                        </div>}
                        
                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                            {isSubmitting && <span><i className="fa fa-circle-notch fa-spin"></i>&nbsp;</span>}
                            Create my account
                        </button>
                        </div>
                    </Form>
                              <hr />
              <FormBottom>
                Already have an account? <Link to="/signin">Sign in.</Link>
                <br />
                <Link to="/reset">Forgot password</Link>
              </FormBottom>
            </div>
          </LoginForm>
        </PageMain>
        </div>
);

const EnhancedForm = withFormik({
    mapPropsToValues() {
        return {
            username: '',
            email: '',
            name: '',
            surname: '',
            password: '',
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().matches(/^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/, 'Username only contain english characters and (_,-,.). Also usernames must start and end with a letter or number.')
            .required('Username is required'),
        email: Yup.string().email('Please write a correct email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        surname: Yup.string().required('Surname is required'),
        password: Yup.string().min(8, 'Password must be 8 characters or longer')
            .matches(/[a-z]/, 'Password must contain at least one lowercase char')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    }),
    async handleSubmit(values, {props, resetForm, setFieldError, setSubmitting, setStatus}) {
        setStatus(null);
        try {
            await props.signUp(values);
            //setStatus({'success': 'Your account has been created successfully!'})
            setSubmitting(false);
            //resetForm();
        } catch (errors) {
            //setStatus({'error': errors})
            //setSubmitting(false);
        }
    }
})(FormikForm);

const mapStateToProps = (state) => {
    return {me: state.auth.me}
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (values) => {
            dispatch(signUp(values));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedForm);
