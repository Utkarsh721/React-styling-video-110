import React, { useState, useEffect, useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/input/Input';
import AuthContext from '../../Store/auth-context';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
};

const passwordReducer = (state,action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollage, setCollageName] = useState('');
  const [collageValid, setCollageIsValid] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });
  const [passwordState,dispatchPassword]= useReducer(passwordReducer, {
    value: '',
    isValid: null
  });
  const authCtx=useContext(AuthContext);
  const { isValid: emailIsValid} = emailState;
  const { isValid: passwordISValid} = passwordState;

  useEffect(() => {
   const identifier=  setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordISValid && enteredCollage.trim().length >3
      );

    }, 500)

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordISValid, enteredCollage]);


  const emailChangeHandler = (event) => {
   dispatchEmail({type: 'USER_INPUT', val:event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid && enteredCollage.trim().length > 3
    // )
  };


  const passwordChangeHandler = (event) => {
   dispatchPassword({type:'USER_INPUT', val:event.target.value})

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6 && enteredCollage.trim().length > 3
    // )

  };
  const collageChangeHandler = (event) => {
    setCollageName(event.target.value);

    // setFormIsValid(
    // emailState.isValid && passwordState.isValid && event.target.value.trim().length > 3
    // )
  }

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };
  const validCollageHandler = () => {
    setCollageIsValid(enteredCollage.trim().length > 3);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, enteredCollage);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input 
       id="email"
        label="E-Mail" 
        type="email" 
        isValid={emailIsValid} 
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        >

        </Input>
        <Input 
       id="password"
        label="password" 
        type="password" 
        isValid={passwordISValid} 
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        >
         </Input>
        
        <div
          className={`${classes.control} ${collageValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor='Collage'>Collage Name</label>
          <input
            type="text"
            id="collage"
            value={enteredCollage}
            onChange={collageChangeHandler}
            onBlur={validCollageHandler}
          >
          </input>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
