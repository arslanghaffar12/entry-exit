import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logo } from '../helpers/common';
import { loginRequest } from '../helpers/request';
import { useLocation, useNavigate } from 'react-router-dom';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const highlights = useSelector((state) => state.highlights);

  const submit = async (event) => {

    // Perform data validation here (if needed)
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    let obj = {
      data: {
        email,
        password
      },
      dispatch
    }

    const response = await loginRequest(obj)
    console.log('response of login', response);

    if (response.status) {


      navigate("/");
    }

  }



  return (
    <Fragment>
      {<div className='text-center login-container'>

        <main className="form-signin">
          <img className="mb-4" src={logo} alt="" width="250" height="auto" />
          <h1 className="h3 mb-1 fw-normal">Footfall Skill
          </h1>
          <h1 className="h6 mb-3 fw-normal">Sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
            <label>Email address</label>
          </div>
          <div className="form-floating mb-3 input-group">
            <input type={"password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <label >Password</label>

          </div>


          <button className="w-100 btn btn-lg btn-warning my-2"
            id='submitButton'
            onClick={() => submit()}
          >
            {highlights.loading ? "Wait..." : "Signin"}

          </button>
          <p className="mt-5 mb-3 text-muted">&copy;  {new Date().getFullYear()}</p>
        </main>

      </div>}

    </Fragment>
  );
};

export default Login;

