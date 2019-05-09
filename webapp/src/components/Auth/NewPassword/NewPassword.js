import React from 'react';
import {Field, Form, withFormik} from 'formik'
import * as Yup from 'yup'
import {resetPassword} from '../../../actions'
import {connect} from 'react-redux'

let setSubmittingHigher;

const FormikForm = ({
                        values,
                        touched,
                        errors,
                        isSubmitting
                    }) => (
                    <Form className="card border-0 p-4 shadow">
                            <Field type="text" name="token" placeholder="token"/>
                            {touched.token && errors.token &&
                            <small className="form-text text-danger">{errors.token}</small>}
    
                            <Field type="password" name="password" placeholder="password"/>
                            {touched.password && errors.password &&
                            <small className="form-text text-danger">{errors.password}</small>}
    
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <span><i className="fa fa-circle-notch fa-spin"/>&nbsp;</span>}
                            Set my new password
                        </button>
                    </Form>
    
);

const EnhancedForm = withFormik({
    mapPropsToValues({match}) {
        return {
            token: match.params.token,
            password: ''
        }
    },
    validationSchema: Yup.object().shape({
        token: Yup.string().required('Token is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be 8 characters or longer')
            .matches(/[a-z]/, 'Password must contain at least one lowercase char')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    }),
    handleSubmit(values, {props, resetForm, setSubmitting}) {
        setSubmittingHigher = (success) => {
            setSubmitting();
            if (success) {
                resetForm();
            }
        };
        props.resetPassword(values);
    }
})(FormikForm);

const mapStateToProps = (state) => {
    typeof setSubmittingHigher === 'function' && setSubmittingHigher(!!state.system.message);
    return {system: state.system}
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (values) => {
            dispatch(resetPassword(values));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedForm);
