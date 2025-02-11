import { useState } from 'react';

import { ErrorMessage, TextInput, useTextInput, useStruct } from '@monoid-dev/reform/react'
import { makeLeft, makeRight, stringField } from '@monoid-dev/reform';

export default function SignupExample() {
  const [result, setResult] = useState('');

  const signup = useStruct({
    username: useTextInput(
      stringField()
        .required('This field cannot be empty. ')
    ),
    password: useTextInput(
      stringField()
        .min(6, 'This password is too short. ')
    ),
    repeatPassword: useTextInput(
      stringField()
    ),
  },
    (o) => o.password === o.repeatPassword ? makeRight(o) : makeLeft({ message: 'Passwords don\'t match. ' })
  );

  return (
    <div>
      <TextInput control={signup.controls.username} placeholder="Username" />
      <ErrorMessage control={signup.controls.username} />
      <br />
      <TextInput control={signup.controls.password} placeholder="Password" />
      <ErrorMessage control={signup.controls.password} />
      <br />
      <TextInput control={signup.controls.repeatPassword} placeholder="Password" />
      <ErrorMessage control={signup.controls.repeatPassword} />
      <br />
      <button
        onClick={() => {
          signup.touchAll();
          setResult(JSON.stringify(signup.getOutput()));
        }}
      >
        Submit
      </button>
      <br />
      <ErrorMessage control={signup} />

      <br />
      Result:
      {' '}
      {result || '-'}
    </div>
  );
}
