import React from 'react'
import { Formik, Form, Field } from 'formik';

const onSubmit = async (values) => {
  let constValuesJson = JSON.stringify(values, null, " ");

  const response = await fetch('/api/challenge', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: constValuesJson,
    mode: 'no-cors', 
  })

  console.log(`response: ${JSON.stringify(response, null, ' ')}`)
}

const Challenge = () => {
  return (
    <Formik
      initialValues={{ opponent: '', limit: '', opponent_limit: '', increment: '', challenger_color: '', sats: ''}}
      onSubmit={ onSubmit }
    >
      <Form>
        <label htmlFor="opponent">Opponent</label>
        <Field type="opponent" name="opponent" /><br/>
        <label htmlFor="limit">Limit</label>
        <Field type="limit" name="limit" /><br/>
        <label htmlFor="opponent_limit">Opponent Limit</label>
        <Field type="opponent_limit" name="opponent_limit" /><br/>
        <label htmlFor="increment">Increment</label>
        <Field type="increment" name="increment" /><br/>
        <label htmlFor="challenger_color">Color</label>
        <Field type="challenger_color" name="challenger_color" /><br/>
        <label htmlFor="sats">Sats</label>
        <Field type="sats" name="sats" /><br/>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default Challenge