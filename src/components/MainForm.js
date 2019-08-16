import React, {useState, useEffect} from "react";
import { Form, Field, withFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';



function MainForm(errors, touched, values, status){
    const[users, setUsers] = useState([]);
    console.log(users);

    useEffect(status => {
        if (status) {
        setUsers([...users, status]);}
        }, [status]);
  
    return(
       <div className="user-form">
            <Form>
                <Field
                component="input"
                type="text"
                name="userName"
                placeholder="User Name"
                />
                {touched.userName && errors.userName && (<p>{errors.userName}</p>)}
                 <Field
                component="input"
                type="email"
                name="email"
                placeholder="Email"
                />
                {touched.email && errors.email && (<p>{errors.email}</p>)}
                 <Field
                component="input"
                type="password"
                name="password"
                placeholder="Password"
                />
                {touched.password && errors.password && (<p>{errors.password}</p>)}
                <label className="checkbox-container">
                    Terms of Service
                    <Field 
                    type="checkbox"
                    name="tos"
                    // checked={values.tos}
                    />
                </label>
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => (
                <p key={user.id}>{user.userName}</p>
            ))}
        </div>
    )
};

const formikHOC = withFormik({
    mapPropsToValues({userName, email, password, tos}){
        return{
            userName: userName || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        userName: Yup.string()
        .required("User Name is required"),
        email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
        password: Yup.string()
        .min(10, "Password must be 10 characters or longer")
        .required("Password is required")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log(res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log("Error: ", err))
    }
});

const UserFormWithFormik = formikHOC(MainForm);

export default UserFormWithFormik;