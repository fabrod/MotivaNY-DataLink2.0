import React from 'react';
import {Link} from 'react-router-dom';
import {Field, Form, withFormik} from 'formik'
import * as Yup from 'yup'
import {signIn} from '../../../actions'
import {connect} from 'react-redux'

import Particles from 'react-particles-js';
import config from './particle.config.json';
import {PageMain, LoginForm, FormBottom, InfoBox} from './shared/common';

let setSubmittingHigher;
const FormikForm = ({
                        values,
                        touched,
                        errors,
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
              <p>Sign in</p>
              <Form>
                <Field type="text" name="username" placeholder="Username or Email address"/>
                {touched.email && errors.email &&
                            <small className="form-text text-danger">{errors.email}</small>}
                <Field type="password" name="password" placeholder="Password" />
                <div align="left">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <span><i className="fa fa-circle-notch fa-spin"/>&nbsp;</span>}
                            SIGNIN
                        </button>
              </Form>
              <hr />
              <FormBottom>
                Don't have an account yet? <Link to="/signup">Sign up.</Link>
                <br />
                <Link to="/reset">Forgot password</Link>
              </FormBottom>
            </div>
          </LoginForm>
          <InfoBox>
            <h1>Connect and automate workflows</h1>
            <p>We know ConnectWise. We know Infusionsoft.</p>
            <p>
              With our including onboarding process, we'll get your integration
              running quickly and easily.
            </p>
          </InfoBox>
        </PageMain>
        </div>
);

const EnhancedForm = withFormik({
    mapPropsToValues({username}) {
        return {
            username: username || '',
            password: ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Email/username is required'),
        // password: Yup.string().min(8, 'Password must be 8 characters or longer')
        //   .matches(/[a-z]/, 'Password must contain at least one lowercase char')
        //   .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
        //   .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    }),
    handleSubmit(values, {props, resetForm, setFieldError, setSubmitting}) {
        if (values.username.match(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z0-9.]{2,}$/))
            values = {email: values.username, password: values.password};
        setSubmittingHigher = setSubmitting;
        props.signIn(values);
    },
})(FormikForm);

const mapStateToProps = (state) => {
    typeof setSubmittingHigher === 'function' && setSubmittingHigher(false);
    return {system: state.system}
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (values) => {
            dispatch(signIn(values));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedForm);
